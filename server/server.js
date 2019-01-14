const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
app.use(bodyParser.json());
app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', socket => {
  console.log('new user connected');

  socket.emit(
    'newMessage',
    generateMessage('admin', 'Welcome to the chat app!')
  );
  socket.broadcast.emit(
    'newMessage',
    generateMessage('admin', 'A new user has joined the room!')
  );

  socket.on('createMessage', (newMessage, callback) => {
    console.log(
      `message created: \nfrom: ${newMessage.from}\ntext: ${newMessage.text}`
    );
    let newMsg = generateMessage(newMessage.from, newMessage.text);
    io.emit('newMessage', newMsg);
    callback();
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('createLocationMessage', coords => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
