const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const { get_current_user, user_disconnect, join_user} = require("./dummyuser");

app.use(express());

const port = 8000; 

app.use(cors());

var server = app.listen(
  port,
  console.log(`Listening on port ${port}`)
);
const io = socket(server);

io.on("connection", (socket) => {
  //새 유저가 채팅방에 들어오면
  socket.on("joinRoom", ({ username, roomname }) => {
    //create user
    const p_user = join_user(socket.id, username, roomname);
    console.log("user id: ", socket.id);
    socket.join(p_user.room);

    //채팅방에 들어온 유저에게 웰컴 메시지 보내기
    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username}님 환영합니다.`
    });

    //새 유저가 들어왔다는 메시지를 다른 유저에게 보내기
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username}님이 들어왔습니다.`,
    });
  });

  //메시지 보내기
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = get_current_user(socket.id);

    io.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: text,
    });
  });

  //유저 퇴장
  socket.on("disconnect", () => {
    //유저가 배열에서 삭제되고 채팅방에서 나갔다는 메시지가 출력됨
    const p_user = user_disconnect(socket.id);

    if (p_user){
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username}님이 채팅방을 나갔습니다.`,
      });
    };
  });
});