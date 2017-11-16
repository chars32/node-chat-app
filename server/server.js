const express = require('express');
const http = require('http');
const {isRealString} = require('./utils/validation');
const {generateLocationMessage} = require('./utils/message');
const {generateMessage} = require('./utils/message');
const path = require('path');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected.');

  socket.on('join', (params, callback) => {
    console.log('This is the param --> ', params);
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.');
    }
    params.room = params.room.toLowerCase();
    socket.join(params.room);
    // Check to see if the user already exists in the list of logged in users.
    const userExists = users.users.findIndex((user) => user.name === params.name);
    if (userExists < 0) {
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('admin', 'Welcome to the Node Chat App'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined.`));
      callback();
    }
    else {
      return callback(`The name, ${params.name} is already used. Please use another display name.`);
    }

  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});