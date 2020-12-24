
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

var games = {};
/*
games = {
  roomId : {
    players: [
      {playerId, username, gold: 0},
      {playerId, username, gold: 0},
      ]
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
var players = {};
/*
players : {
  playerId :
}
*/

// CONSTANTES
const initialGoldAmount = 200;


io.on('connection', function (socket) {
  console.log('a user connected');
  
  socket.on('create game', function (username) {
    let room = makeid();
    if(games[room] == undefined){
      games[room]= {players: [{playerId: socket.id, username, gold: initialGoldAmount}], map: {}};
      games[room].map[socket.id] = [];
      socket.join(room);
      socket.emit('connected', {username, room});
      incrementGold(socket.id);
    }
  });
  
  socket.on('join game', function (data) { //data: {username, room}
    let {username, room} = data
    if(games[room] != undefined && games[room].players.length < 2){
      console.log('adding ' + username + " to " + room)
      console.log(games[room])
      let newPlayer = {playerId: socket.id, username, gold: initialGoldAmount};
      games[room].players.push(newPlayer);
      games[room].map[socket.id] = [];
      socket.join(room);
      io.to(games[room].players[0].playerId).emit('user joined', newPlayer); //Préviens le premier joueur qu'un autre s'est connecté
      socket.emit('connected', {username, room, otherPlayer: games[room].players[0]});
      incrementGold(socket.id);
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
    let roomsValues = socket.rooms.values();
    let id = roomsValues.next()
    let room = roomsValues.next().value
    console.log("Room : '" + room + "'");
    console.log(games[room])
    console.log("Socket.id : '" + socket.id + "'");
    games[room].map[socket.id].push(data)
    var batimentToCreate = data;
    batimentToCreate.playerId = socket.id;
    console.log("Sending drawBatiment(" + JSON.stringify(batimentToCreate) + ")")
    io.to(room).emit('draw batiment', batimentToCreate);
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

function incrementGold(playerId){
  console.log("incrementing " + playerId)
  let amount = getPlayerDetailsFromId(playerId).gold + 1;
  io.to(playerId).emit('gold amount updated', amount);
  //setTimeout(incrementGold(playerId), 1000);
}

function getPlayerDetailsFromId(playerId){
  let room = getRoomFromPlayerId(playerId);
  let playerDetails;
  games[room].players.forEach(e => {
    if(e.playerId == playerId)
      playerDetails = e;
  });
  return playerDetails;
}

function getRoomFromPlayerId(playerId){
  console.log("rooms : " + playerId)
  let roomsValues = playerId.rooms.values();
  let id = roomsValues.next();
  let room = roomsValues.next().value;
  return room;
}