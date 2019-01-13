let socket = io();

socket.on('connect', function() {
  console.log('connected to server');
  socket.emit('createMessage', {
    from: 'kevin@test.com',
    text: 'hey'
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  console.log('new message: ', newMessage);
});
