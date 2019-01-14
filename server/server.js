const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const { Users } = require('./utils/users');
let moment = require('moment');
let app = express();
app.use(bodyParser.json());
app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

io.on('connection', socket => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app!')
    );
    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined the room!`)
      );
    callback();
  });
  socket.on('createMessage', (newMessage, callback) => {
    let user = users.getUser(socket.id);
    if (user && isRealString(newMessage.text)) {
      let newMsg = generateMessage(user.name, newMessage.text);
      io.to(user.room).emit('newMessage', newMsg);
    }
    callback();
  });
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Admin', `${user.name} has left.`)
      );
    }
  });
  socket.on('createLocationMessage', coords => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        'newLocationMessage',
        generateLocationMessage(user.name, coords)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
