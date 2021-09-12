import '../styles/chat.scss';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { process } from "../ducks/modules";
import {to_Decrypt, to_Encrypt} from "../aes.js";

function Chat({ username, roomname, socket }){
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(()=>{
    socket.on("message", (data)=>{
      //메시지 암호화
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== ""){
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };

  //스크롤 바닥유지하기
  const messagesEndRef = useRef(null); //useRef를 이용해 Ref 객체를 만듦
  const scrollToBottom = () => {
		//Ref객체.current: 원하는 DOM을 가르킴
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  console.log("message: ", messages);

  return(
    <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem"}}>in {roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {
          messages.map((i)=>{
            if(i.username === username){
              return(
                <div className="message">
                  <p>{i.text}</p>
                  <span>{i.username}</span>
                </div>
              );
            }else{
              return(
                <div className="message mess-right">
                  <p>{i.text}</p>
                  <span>{i.username}</span>
                </div>
              );
            }
          })
        }
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="메시지를 입력하세요"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          onKeyPress={(e)=>{
            if(e.key === "Enter"){sendData();}
          }}
          ></input>
          <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}

export default Chat;