import React, { useState } from 'react';
import "../styles/home.scss";
import { Link } from 'react-router-dom';

function Home({socket}){
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");

  //joinRoom function 
  const sendData = () => {
    if (username !== "" && roomname !== ""){
      socket.emit("joinRoom", {username, roomname});
      //서버에서는 socket.on("joinRoom") 이었음
    }else{
      //empty error: error message & 이전 페이지로 되돌아감
      alert("username과 roomname은 필수입니다.");
      window.location.reload();
    }
  };
  
  return(
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>
      <input
        placeholder="username을 입력하세요"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        ></input>
      <input
        placeholder="roomname을 입력하세요"
        value={roomname}
        onChange={(e)=>setRoomname(e.target.value)}
        ></input>
      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>Join</button>
      </Link>
    </div>
  )
}

export default Home;