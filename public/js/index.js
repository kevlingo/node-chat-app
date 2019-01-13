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
socket.on('newLocationMessage', function(message) {
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.Url);
  li.append(a);
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

let btnLocation = $('#sendLocation');
btnLocation.click(function(e) {
  e.preventDefault();

  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert('Unable to fetch location');
    }
  );
});
