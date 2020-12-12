// Setup basic express server
var express = require('express');
var app = express();

var players = [];
var games = {};



// Routing
//app.use(express.static('public'));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/createGame", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

//let gameCode = request.data.gameCode
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var port = process.env.PORT || 3000;

  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });
  
  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('create game', function (username) {
      // creer une partie
      if(games.length<10){
        games.push({player1: username})
        socket.emit('connected', username);
      }
    });

    socket.on('add player', function (username) {
      // we tell the client to execute 'new message'
      if(players.length<10){
        players.push(username)
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

app.get("/game", (request, response) => {
  let gameCode = request.data.gameCode
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var port = process.env.PORT || 3000;

  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });
  
  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('create game', function (username) {
      // creer une partie
      if(games.length<10){
        games.push({player1: username})
        socket.emit('connected', username);
      }
    });

    socket.on('add player', function (username) {
      // we tell the client to execute 'new message'
      if(players.length<10){
        players.push(username)
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
});
