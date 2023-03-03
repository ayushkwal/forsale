const ChatRoom = require('../models/chatRoomModel')
const http = require('http');
const app = require('express')
const server = http.createServer(app);
const io = require('socket.io')(server);

const users = {};
io.on('connection', (socket) => {
  
  socket.on('new-user-joined',name=>{
    users[name] = socket.id;
    console.log(name,'joined the chat')
  })

  socket.on('sendMessage', (message) => {
    console.log(message);
    io.to(users[message.to]).emit("getMessage", {msg:message.msg,from:message.from});
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  });
  server.listen(8000, '192.168.29.33', () => {
    console.log('Server is running on 192.168.29.33:8000 for websocket');
  });

  module.exports = server