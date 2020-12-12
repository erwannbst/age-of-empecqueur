// Setup basic express server
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


// Routing
app.use(express.static('public'));

var players = [];
var games = {};

app.get("/createGame", (request, response) => {
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  //map.player1.trinquette.player1 = request.data.text;
  
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });

  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('create game', function (username) {
      // creer une partie
      if(games.length<10){
        let id = makeId();
        games.id = {player1: username}
        socket.emit('connected', {username, gameCode: id});
      }
    });

    socket.on('add player', function (data) { // data:{username, gameCode}
      // we tell the client to execute 'new message'
      if(players.length<10){
        socket.broadcast.emit('new connection', players);
        //socket.emit('connected', username);
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
  response.send(200);
});



function makeId() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}