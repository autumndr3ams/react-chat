const c_users = [];

//유저를 채팅방에 join시킴
function join_user(id, username, room){
  const p_user = { id, username, room }
  c_users.push(p_user);
  console.log(c_users, "users");

  return p_user;
}

console.log("user out", c_users);

//Gets a particular user id to return the current user
function get_current_user(id){
  return c_users.find((p_user) => p_user.id === id);
}

//유저가 채팅방을 나가면 c_user배열에서 삭제
function user_disconnect(id){
  const index = c_users.findIndex((p_user)=>p_user.id === id);

  if(index !== -1){
    return c_users.splice(index,1)[0];
  }
}

module.exports = {
  join_user,
  get_current_user,
  user_disconnect
};