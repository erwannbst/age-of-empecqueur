
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

var players = [];
var games = {};
/*
games = {
  roomId : [{socketId, username}, {socketId2, username2}]
}
*/


io.on('connection', function (socket) {
  console.log('a user connected');
  
  socket.on('create game', function (username) {
    let room = "ABCE";
    //if(games[room] == undefined){
      games[room] = [{socketId : socket.id,  username}];
      socket.join(room);
      socket.emit('connected', {username, room});
    //}
  });
  
  socket.on('join game', function (username, room) {
    if(games[room].length<2){
      games[room].push({socketId: socket.id, username})
      socket.join(room);
      socket.broadcast.emit('new connection', players);
      socket.emit('connected', username);
    }
  });
  
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