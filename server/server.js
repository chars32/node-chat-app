const express = require('express');
const http = require('http');
const {isRealString} = require('./utils/validation');
const {generateLocationMessage} = require('./utils/message');
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

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room are required.');
    }
    socket.join(params.room);
    socket.emit('newMessage', generateMessage('admin', 'Welcome to the Node Chat App'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the client.');
  });

});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});