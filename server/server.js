const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
app.use(bodyParser.json());
app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', socket => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
