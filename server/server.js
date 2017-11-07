const express = require('express');
const http = require('http');
const {generateMessage} = require('./utils/message');
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

  socket.emit('newMessage', generateMessage('admin', 'Welcome to the Node Chat App'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the client.');
  });

});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});