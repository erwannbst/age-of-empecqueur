// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('public'));


io.on('connection', function (socket) {

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  
  socket.on('add batiment', function(data) {
    //io.emit('ping');
    let details = {nom: "Trinquette", x: 500, y: 100, width: 50, height: 50}
    io.emit('draw batiment', details);
  });

});