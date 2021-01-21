// Setup basic express server
import * as gameValues from './gameValues.js';
import Hdv from './Class/Hdv.js';
import MurH from './Class/MurH.js';
import MurV from './Class/MurV.js';
import Caserne from './Class/Caserne.js';
import Portugais from './Class/Portugais.js';
import Trinquette from './Class/Trinquette.js';
import Extracteur from './Class/Extracteur.js';
import Soldier from './Class/Soldier.js';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
var app = express();
var server = http.createServer(app);
var io = new Server(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('public'));


var players = {};
/*
players : {
  playerId : {roomId, username, gold: 0},
}
*/

var games = {};
/*
games = {
  roomId : {
    players: [playerId, playerId2]
  },
}
*/

var maps = {}
/*
maps : {
      playerId: [
        {buildingName, x, y},
      ],
      playerId2: [
        {buildingName, x, y},
      ]
    }
*/

// CONSTANTES

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('create game', function (username) {
    let room = makeid();
    if(games[room] == undefined){
      let playerId = socket.id
      socket.join(room);
      players[playerId] = {roomId: room, username, gold: gameValues.INITIAL_GOLD_AMOUNT};
      games[room] = {players: [playerId]};
      maps[playerId] = [];
      socket.emit('connected', {username, room, playerId});
    }
  });
  
  socket.on('join game', function (data) { //data: {username, room}
    let {username, room} = data
    if(games[room] != undefined && Object.keys(games[room].players).length < 2){
      console.log('adding ' + username + " to " + room)
      let newPlayer = {roomId: room, username, gold: gameValues.INITIAL_GOLD_AMOUNT};
      let playerId = socket.id
      socket.join(room);
      players[playerId] = newPlayer;
      games[room].players.push(playerId);
      maps[playerId] = [];
      io.to(games[room].players[0]).emit('user joined', {playerId, username}); //Préviens le premier joueur créateur de la game qu'un autre s'est connecté
      socket.emit('connected', {username, room, otherPlayer: {playerId: games[room].players[0], ...players[games[room].players[0]]}});
      setInterval(() => incrementGold(room), gameValues.INTERVAL_GOLD_INCREMENT);
      setInterval(() => sendMap(room), gameValues.INTERVAL_SEND_MAP);
      setInterval(() => run(room), gameValues.INTERVAL_SEND_MAP);
      var hdvXPos = 170;
      games[room].players.forEach(playerId => {
        let hdv = new Hdv(hdvXPos, 400, playerId);
        hdvXPos = 1650
        maps[playerId].push(hdv);
      })
    }
  });
  
  socket.on('create batiment', function(data) { // data:{nom: "nomDuBatiment", x: 0, y: 0}
    let playerId = socket.id;
    let room = players[playerId].roomId;
    let batiment;
    switch(data.nom){
      case "hdv":
         batiment = new Hdv(data.x, data.y, playerId);
        break;
      case "murV":
         batiment = new MurV(data.x, data.y, playerId);
        break;
      case "murH":
         batiment = new MurH(data.x, data.y, playerId);
        break;
      case "caserne":
         batiment = new Caserne(data.x, data.y, playerId);
        break;
      case "portugais":
         batiment = new Portugais(data.x, data.y, playerId);
        break;
      case "trinquette":
         batiment = new Trinquette(data.x, data.y, playerId);
        break;
      case "extracteur":
         batiment = new Extracteur(data.x, data.y, playerId);
        break;
      case "soldier":
         batiment = new Soldier(data.x, data.y);
        break;
    }
    if(players[playerId].gold - batiment.getCost() >= 0){
      players[playerId].gold -= batiment.getCost();
      setTimeout(() => {maps[playerId].push(batiment)}, 1000);
    }
  });
  
  socket.on('send chat', function(data) { // data:{text: "test", pseudo: "pseudo"}
    let room = players[socket.id].roomId;
    io.to(room).emit('send chat', data);
  });
  
  
});


function sendMap(room){
  let players = games[room].players;
  var mapToSend = {}
  players.forEach(player => {
    mapToSend[player] = [];
    maps[player].forEach(batiment => {
      mapToSend[player].push(batiment.draw());
    })
  })
  io.to(room).emit('receive map', mapToSend);
}

function run(room){
  let players = games[room].players;
  players.forEach(player => {
    maps[player].forEach(batiment => {
      var enemyId;
      games[room].players.forEach(id => {
         if(id != player)
            enemyId = id;
      })
      let enemyMap = maps[enemyId]
      batiment.run(enemyMap)
    })
  })
}

function makeid() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < 4; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function incrementGold(room){
  games[room].players.forEach(playerId => {
    players[playerId].gold += 1;
    io.to(playerId).emit('gold amount updated', players[playerId].gold);
  })
}

/*
var games = {};

/*
games = {
  roomId : {
    players: {
      playerId: {username, gold: 0},
      playerId: {username, gold: 0},
    }
    map : {
      playerId: [
        {buildingName, x, y},
      ],
      playerId2: [
        {buildingName, x, y},
      ]
    }
}

var players = {};
/*
players : {
  playerId : {roomId},
}


// CONSTANTES
const initialGoldAmount = 200;
const goldIncrementInterval = 1500;


io.on('connection', function (socket) {
  console.log('a user connected');
  
  socket.on('create game', function (username) {
    let room = makeid();
    if(games[room] == undefined){
      games[room] = {players: {}, map: {}};
      games[room].players[socket.id] = {username, gold: initialGoldAmount}
      games[room].map[socket.id] = [];
      socket.join(room);
      players[socket.id] = {roomId: room};
      socket.emit('connected', {username, room});
      setInterval(() => incrementGold(socket.id), goldIncrementInterval);
    }
  });
  
  socket.on('join game', function (data) { //data: {username, room}
    let {username, room} = data
    if(games[room] != undefined && Object.keys(games[room].players).length < 2){
      console.log('adding ' + username + " to " + room)
      console.log(games[room])
      let newPlayer = {username, gold: initialGoldAmount};
      games[room].players[socket.id] = newPlayer;
      games[room].map[socket.id] = [];
      socket.join(room);
      players[socket.id] = {roomId: room};
      io.to(games[room].players[0].playerId).emit('user joined', newPlayer); //Préviens le premier joueur qu'un autre s'est connecté
      socket.emit('connected', {username, room, otherPlayer: games[room].players[0]});
      //incrementGold(socket.id);
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
  let room = players[playerId].roomId
  let player = getPlayerFromId(playerId);
  let amount = player.gold + 1;
  games[room].players
  
  io.to(playerId).emit('gold amount updated', amount);
}

function getPlayerFromId(playerId){
  let room = players[playerId].roomId
  let playersInGame = games[room].players
  for(let i = 0; i < playersInGame.length; i++){
    if(playersInGame[i].playerId == playerId){
      return playersInGame[i]; 
    }
  }
  return undefined;
}
*/