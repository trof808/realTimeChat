$(function() {
  var socket = io();

  // $("#m").keydown(() => {
  //   socket.emit('typing msg');
  // });
  //
  // $("#m").keyup(() => {
  //   socket.emit('not typing msg');
  // });

  $("form").on('submit', () => {
    socket.emit('send message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('send message', (msg) => {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('nameResult', (result) => {
    if(result.success) {
      $('#messages').append($('<li class="personal">').text('now you now as: ' + result.name));
    }
  });

  socket.on('user connected', (name) => {
    $('#messages').append($('<li>').text('user: ' + name + ' connected!'));
  });

  socket.on('user disconnected', (name) => {
    $('#messages').append($('<li>').text('user: ' + name + ' disconnected!'));
  });

  // socket.on('typing msg', (name) => {
  //   showWhoType(name);
  //   console.log(name + ' type msg');
  // });
  //
  // socket.on('not typing msg', (name) => {
  //   $('#type_msg').fadeOut();
  //   console.log(name + ' type msg');
  // });
  //
  // const showWhoType = (name) => {
  //   $('#type_msg').text(name + ' is typing msg');
  //   $('#type_msg').fadeIn();
  // }
});
