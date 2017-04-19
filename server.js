const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3038);

app.use('/public', express.static('public'))

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

let guestNumber = 1;
let nickNames = {};

io.on('connection', (socket) => {

  guestNumber = assignGuestName(socket, guestNumber, nickNames);

  // socket.on('not typing msg', () => {
  //   io.emit('not typing msg');
  // })
  //
  // socket.on('typing msg', () => {
  //   io.emit('typing msg', guestName);
  // })

  console.log('user: ' + guestName + ' connected');

  socket.on('send message', (msg) => {
    io.emit('send message', msg);
    console.log('user: ' + socket.id + ' send message: ' + msg);
  })

  userDisconnectionHandler(socket, nickNames);
})



const assignGuestName = (socket, guestNumber, nickNames) => {
  guestName = 'guest_'+guestNumber;
  nickNames[socket.id] = guestName;
  io.emit('user connected', guestName);
  socket.emit('nameResult', {
    success: true,
    name: guestName
  })
  guestNumber++;
  return guestNumber;
};

const userDisconnectionHandler = (socket, nickNames) => {
  socket.on('disconnect', () => {
    io.emit('user disconnected', nickNames[socket.id]);
    delete nickNames[socket.id];
  });
};
