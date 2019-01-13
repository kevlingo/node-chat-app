let socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  let li = $('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);
  $('#messages').append(li);
});

$('#message-form').submit(function(e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    { from: 'User', text: $('#message').val() },
    function() {}
  );
});
