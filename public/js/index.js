var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey'
  // });
  // socket.emit('createMessage', {
  //   to: 'jen2@example.com',
  //   text: 'Hey there.'
  // });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

// socket.on('newEmail', function(email) {
//   console.log("New email", email);
// });

socket.on('newMessage', function(message) {
  console.log("New message", message);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function(data) {
  console.log('Got it', data);
});