// Setup basic express server
import * as gameValues from './gameValues.js';
import Hdv from './Class/Hdv.js';
import MurH from './Class/MurH.js';
import MurV from './Class/MurV.js';
import Caserne from './Class/Caserne.js';
import Portugais from './Class/Portugais.js';
import Trinquette from './Class/Trinquette.js';
import Extracteur from './Class/Extracteur.js';
import Personnage from './Class/Personnage.js';
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

export var tic = 0;


var players = {};
/*
players : {
  playerId : {roomId, username, gold: 0, buildings: [
    {type: "soldier", lvl: 1}    // soldat de niveau 1 sera créé dans 4 secondes
  ]},
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
      setInterval(() => sendPlayersData(room), gameValues.INTERVAL_SEND_MAP);
      setInterval(() => run(room), gameValues.INTERVAL_SEND_MAP);
      var hdvXPos = 170;
      games[room].players.forEach(playerId => {
        let hdv = new Hdv(hdvXPos, 400, playerId);
        hdvXPos = 1650
        maps[playerId].push(hdv);
      })
    }
  });
  
  socket.on('create batiment', function(data) { // data:{nom: "soldier", x: 100, y: 100}
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
    
    if(canCreateBatimentType(playerId, batiment.draw().nom)){
      if(players[playerId].gold - batiment.getCost() >= 0){
        players[playerId].gold -= batiment.getCost();
        if(batiment instanceof Soldier){
          maps[playerId].forEach(batimentOnMap => {
            if(batimentOnMap instanceof Caserne){
              batimentOnMap.addUnit(batiment);
            }
          })
        }else{
          maps[playerId].push(batiment)
        }
      }
    }
  });
  
  socket.on('send chat', function(data) { // data:{text: "test", pseudo: "pseudo"}
    let room = players[socket.id].roomId;
    console.log(data)
    if(data.msg == "gold"){
      data.msg = "Essaye pas de tricher"
      io.to(room).emit('send chat', data);
    }else if(data.msg == "goldd"){
      for (const [playerId, player] of Object.entries(players)) {
        if(player.username == data.pseudo)
          incrementPlayerGold(playerId, 500)
      }
    }else{
        io.to(room).emit('send chat', data);
    }
  
  });
  
  
  socket.on('place personnage', function(data) {
    maps[socket.id].forEach(batimentOnMap => {
      if(batimentOnMap instanceof Caserne){
        var unit = batimentOnMap.removeUnit(data.nom);
        if(unit != "error"){
          unit.placerOnMap({x: data.x, y: data.y})
          maps[socket.id].push(unit)
        }
      }
    })
  })
  
});

/*
function placerPersonnage(data){ // data:{type: "soldier", x: 50, y: 50, playerId: "lskefe"}
  console.log("map avant placerPersonnage " + JSON.stringify(data))
  console.log(maps[data.playerId])
  maps[data.playerId].forEach(bat => {
    if(bat instanceof Personnage && bat._isOnMap == false){
      console.log("Personnage placé en " + data.x)
      bat.placerOnMap(data.x, data.y);
    }
  })
  console.log("map après placerPersonnage")
  console.log(maps[data.playerId])
}
*/
/*
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
}*/

function getNumberOfBatimentCreated(playerId, type){
  var number = 0;
  maps[playerId].forEach(batimentOnMap => {
    if((batimentOnMap.draw().nom == "murV" || batimentOnMap.draw().nom == "murH") && (type == "murV" || type == "murH")){ // Si c'est un mur
      number++;
    }else if(batimentOnMap.draw().nom == type){
      number++;
    }
  });
  return number;
}

function canCreateBatimentType(playerId, type){
  console.log("type: " + type)
  let max;
  if(type == "murV" || type == "murH"){
    max = gameValues.LVL_VALUES[getHdvLvl(playerId)].mur
  }else{
    max = gameValues.LVL_VALUES[getHdvLvl(playerId)][type]
  }
  console.log(getNumberOfBatimentCreated(playerId, type) + "<" + max)
  return getNumberOfBatimentCreated(playerId, type) < max;
}

function getHdvLvl(playerId){
  return 1
}

function sendPlayersData(room){
  let playersId = games[room].players;
  var map = {}
  /* 
  map: {
    player1: [building1, building2],
    player2: [building1, building2]
  }
  items: {
    gold: 200,
    buildings: [
      {type: "soldier", lvl: 1},
      {type: "soldier", lvl: 1},
      {type: "soldier", lvl: 1},
    ]
  }
  */
  playersId.forEach(playerId => {
    map[playerId] = [];
    maps[playerId].forEach(batiment => {
      map[playerId].push(batiment.draw());
    })
  })
  
  playersId.forEach(playerId => {
    let dataToSend = {
      map,
      items: {
        gold: players[playerId].gold
      }
    }
    io.to(playerId).emit('receive players data', dataToSend);
  })
  
  
}

function run(room){
  tic += 1
  runAtFrequency(8, () => incrementGold(room))
  let players = games[room].players;
  players.forEach(player => {
    maps[player].forEach(batiment => {
      var enemyId;
      games[room].players.forEach(id => {
         if(id != player)
            enemyId = id;
      })
      let enemyMap = maps[enemyId]
      
      if(batiment.getHp() > 0){ 
        batiment.run({enemyMap, playerId: player})
      }else{ //enlève les unités avec 0 HP
        const index = maps[player].indexOf(batiment);
        if (index > -1) {
          maps[player].splice(index, 1);
        }
      }
    })
  })
}

export function runAtFrequency(freq, callback){
  //4/sec
  //frequence raffraichissement = 1000/*gameValues.INTERVAL_SEND_MAP
  /*
  50
  1   4
  
  */
  if(!(tic% (gameValues.INTERVAL_SEND_MAP/freq)))
    callback()
}

function makeid() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < 4; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   //result = "AAAA";
   return result;
}

function incrementGold(room){
  console.log("")
  games[room].players.forEach(playerId => {
    players[playerId].gold += 1;
  })
}

export function incrementPlayerGold(playerId, amount){
  players[playerId].gold += amount;
  io.to(playerId).emit('gold amount updated', players[playerId].gold);
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