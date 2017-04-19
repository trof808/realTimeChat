const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3038);

app.use('/public', express.static('public'))

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('user: ' + socket.id + ' connected');
  socket.on('send message', (msg) => {
    io.emit('send message', msg);
    console.log('user: ' + socket.id + ' send message: ' + msg);
  })
  socket.on('disconnect', () => {
    console.log('user: ' + socket.id + ' disconnected');
  })
})
