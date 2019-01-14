let socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  let template = $('#message-template').html();
  let formattedTime = moment(newMessage.createdAt).format('h:mm a');
  let html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  // let li = $('<li></li>');
  // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
  // $('#messages').append(li);
});
socket.on('newLocationMessage', function(newMessage) {
  let template = $('#locationMessage-template').html();
  let formattedTime = moment(newMessage.createdAt).format('h:mm a');
  let html = Mustache.render(template, {
    url: newMessage.Url,
    from: newMessage.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

let msgTextBox = $('#message');
$('#message-form').submit(function(e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    { from: 'User', text: msgTextBox.val() },
    function() {
      msgTextBox.val('');
    }
  );
});

let btnLocation = $('#sendLocation');
btnLocation.click(function(e) {
  e.preventDefault();

  btnLocation.attr('disabled', true);
  btnLocation.text('Sending Location...');
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      btnLocation.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      msgTextBox.val('');
    },
    function() {
      btnLocation.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location');
    }
  );
});
