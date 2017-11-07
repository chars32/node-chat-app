const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected.');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hello.',
  //   createAt: 123
  // });

  // socket.emit('newMessage', {
  //   from: 'wade@example.com',
  //   text: 'Hello there.',
  //   createAt: (new Date()).toJSON()
  // });

  socket.on('disconnect', () => {
    console.log('Disconnected from the client.');
  });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
  });

});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});