var socket = io();

socket.on('connect', function () {
  console.log('Connected to server via index.js');
  const rooms = ['general', 'node', 'udemy'];
  rooms.forEach(function (room) {
    const option = `<option value="${room.toLowerCase()}">${room}</option>`;
    jQuery('#rooms').append(option);
  });
});
