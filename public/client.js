$(function() {
  var socket = io();

  $("form").on('submit', () => {
    socket.emit('send message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('send message', (msg) => {
    $('#messages').append($('<li>').text(msg));
  });
});
