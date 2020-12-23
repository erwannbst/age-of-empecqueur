
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

var players = {};
var games = {};
/*
games = {
  roomId : {
    playerNumber 
    playerId: username,
    playerId2: username,
    map : {
      playerId: [
        {buildingName, x, y},
      ],
      playerId2: [
        {buildingName, x, y},
      ]
    }
}
*/


io.on('connection', function (socket) {
  console.log('a user connected');
  
  socket.on('create game', function (username) {
    let room = makeid();
    //if(games[room] == undefined){
      games[room][socket.id] = username;
      players[socket.id] = room;
      socket.join(room);
      socket.emit('connected', {username, room});
    //}
  });
  
  socket.on('join game', function (data) { //data: {username, room}
    let {username, room} = data
    if(games[room] != undefined && games[room][player] != undefined && games[room].player2 == undefined){
      console.log('adding ' + username + " to " + room)
      games[room].player2 = {socketId: socket.id, username};
      players[socket.id] = room;
      socket.join(room);
      io.to(games[room].player1.socketId).emit('user joined', username); //Préviens le premier joueur qu'un autre s'est connecté
      socket.emit('connected', {username, room, otherPlayer: games[room].player1.username});
    }
  });
  
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  
  socket.on('create batiment', function(data) { // data:{nom: "nomDuBatiment", x: 0, y: 0}
    let room = players[socket.id]
    games[room].map.append(data)
    io.to(room).emit('draw batiment', data);
  });

});

function makeid() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < 4; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}