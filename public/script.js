/* global socket */
// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// INIT
const loginForm = document.querySelector("form");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 1600;
canvas.height = 899;
var playerX = 0;
var playerY = 0;
var connected = false;
var username = "";
var img = new Image();
var hdvImg = new Image();
var caserneImg = new Image();
var trinquetteImg = new Image();
var extracteurImg = new Image();
var portugaisImg = new Image();
var murVImg = new Image();
var murHImg = new Image();

murVImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fmur.png?1607874941836";
murHImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fmur_horizontal.png?1607872442410";
hdvImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fhdv_dfous.png?1607876427163";
caserneImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fcasernedofus.png?1607815040102";
trinquetteImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Ftavernedofus.png?1607814703059";
extracteurImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fbanque.png?1607819328536";
portugaisImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fcabane.png?1607820151355";

var RenduBatiments = {
  murH: {
    image: murHImg,
    height: 30,
    width: 110
  },
  murV: {
    image: murVImg,
    height: 110,
    width: 30
  },
  hdv: {
    image: hdvImg,
    height: 80,
    width: 80
  },
  portugais: {
    image: portugaisImg,
    height: 80,
    width: 80
  },
  caserne: {
    image: caserneImg,
    height: 80,
    width: 80
  },
  trinquette: {
    image: trinquetteImg,
    height: 80,
    width: 80
  },
  extracteur: {
    image: extracteurImg,
    height: 80,
    width: 80
  }
};

var players = [];
/*
players : [
  playerId1,
  playerId2,
]
*/

var map = {};
/*
map : {
      playerId: [
        {buildingName, x, y},
      ],
      playerId2: [
        {buildingName, x, y},
      ]
    }
*/
var closedMap = [];
var buffer = new item(0,0);
closedMap.push(buffer)
function Batiment(nom, coordX, coordY) {
  this.nom = nom;
  this.coordX = coordX;
  this.coordY = coordY;
}
function item(x, y) {
  this.x = x;
  this.y = y;
}

//----------------------------------PARTIE MENU------------------------------------------//

let batSelect;

//if(players != null)document.getElementById("select").disabled = true;

var selectedBat = document.querySelector("select");

selectedBat.addEventListener("change", function() {
  if (selectedBat.value == "") {
    batSelect = null;
  } else {
    batSelect = selectedBat.value;
  }
  //document.getElementById(batSelect).disabled = true;
});

//-------------------------------------------------------MOUSE-----------------------------------------------------------//
document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e) {
  playerX = e.pageX;
  playerY = e.pageY;
  document.getElementById("output").innerHTML =
    "Mouse:  <br />" + " x: " + playerX + ", y: " + playerY + "<br />";
}

//-----------------------------------------------------KEYBOARD----------------------------------------------------------//

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {}

//-------------------------------------------------------CLICK------------------------------------------------------------//
canvas.addEventListener(
  "click",
  function(event) {
    var autorisation = true;
    if (batSelect != null) {
      //devra etre supprimé après test
      //console.log("largeur du batiment seletionnée :  " + RenduBatiments[batSelect].height);
      var hauteur = RenduBatiments[batSelect].width;
      var largeur = RenduBatiments[batSelect].height;
      for (var n = 0; n < closedMap.length; n++) {
      for (
        var batwidth = 0;
        batwidth < hauteur;
        batwidth++
      ) {
        for (
          var batheight = 0;
          batheight < largeur;
          batheight++
        ) {
          if (
            closedMap[n].x == playerX + batwidth &&
            closedMap[n].y == playerY + batheight
          ) {
            autorisation = false;
          }
        }
      }
    }
      //
      if(autorisation == false){
        document.getElementById("output").innerHTML =
    "Vous ne pouvez pas placer un batiment ici";
      }
      if(autorisation == true){
      createBatiment({ nom: batSelect, x: playerX, y: playerY });
      console.log(map);
      batSelect = null;
      }
    }
  },
  false
);

//-------------------------------------------------------DRAW------------------------------------------------------------//
//déplacement de la souris
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (batSelect != null) {
    drawBatimentonMap(batSelect, playerX, playerY);
    
    //ctx.fillRect(playerX, playerY, RenduBatiments[batSelect].width, RenduBatiments[batSelect].height);
    //ctx.fillStyle = "rgba(255,0,0,0.5)";
  }
  for (var i = 0; i < players.length; i++) {
    // pour chaque joueur
    let mapDuJoueur = map[players[i]];
    for (var j = 0; j < mapDuJoueur.length; j++) {
      // pour chaque batiment
      drawBatimentonMap(
        mapDuJoueur[j].nom,
        mapDuJoueur[j].coordX,
        mapDuJoueur[j].coordY
      );
    }
  }
  requestAnimationFrame(draw);
}

function drawBatimentonMap(nomBat, coordX, coordY) {
  switch (nomBat) {
    case "caserne":
      ctx.drawImage(
        RenduBatiments.caserne.image,
        coordX,
        coordY,
        RenduBatiments.caserne.width,
        RenduBatiments.caserne.height
      );
      break;
    case "trinquette":
      ctx.drawImage(
        RenduBatiments.trinquette.image,
        coordX,
        coordY,
        RenduBatiments.trinquette.width,
        RenduBatiments.trinquette.height
      );
      break;
    case "portugais":
      ctx.drawImage(
        RenduBatiments.portugais.image,
        coordX,
        coordY,
        RenduBatiments.portugais.width,
        RenduBatiments.portugais.height
      );
      break;
    case "extracteur":
      ctx.drawImage(
        RenduBatiments.extracteur.image,
        coordX,
        coordY,
        RenduBatiments.extracteur.width,
        RenduBatiments.extracteur.height
      );
      break;
    case "murV":
      ctx.drawImage(
        RenduBatiments.murV.image,
        coordX,
        coordY,
        RenduBatiments.murV.width,
        RenduBatiments.murV.height
      );
      break;
    case "murH":
      ctx.drawImage(
        RenduBatiments.murH.image,
        coordX,
        coordY,
        RenduBatiments.murH.width,
        RenduBatiments.murH.height
      );
      break;
    case "hdv":
      ctx.drawImage(
        RenduBatiments.hdv.image,
        coordX,
        coordY,
        RenduBatiments.hdv.width,
        RenduBatiments.hdv.height
      );
      break;
  }
}

function AddClosedMap(nomBat, batX, batY) {
  console.log("function AddClosedMap called" + nomBat);
  for (var y = batX; y < batX + RenduBatiments[nomBat].width; y++) {
    // pour chaque pixel horizontal
    for (var z = batY; z < batY + RenduBatiments[nomBat].height; z++) {
      // pour chaque pixel vertical
      var batBuffer = new item(y, z);
      closedMap.push(batBuffer);
    }
  }
}

function drawBatiment(data) {
  // data:{nom: "nomDuBatiment", x: 0, y: 0, playerId: "wkfefkefe"}
  //Appelée par le serveur quand un batiment a été ajouté au moteur de jeu
  console.log("drawing batiment " + JSON.stringify(data));
  var batBuffer = new Batiment(data.nom, data.x, data.y);
  map[data.playerId].push(batBuffer);
  AddClosedMap(data.nom, data.x, data.y);
}

//-------------------------------------------------------DRAW------------------------------------------------------------//

function setGoldAmount(amount) {
  //Appelée par le serveur quand le montant d'or est mis à jour
  document.getElementById("gold").innerHTML = "Gold = " + amount;
}

function gotConnected(data) {
  //data: {username, room}
  connected = true;
  username = data.username;
  map[socket.id] = [];
  players.push(socket.id);
  document.getElementById("status").innerHTML =
    "Connected as " + username + "#" + data.room;
  document.getElementById("connexion").style.display = "none";
  if (data.otherPlayer == undefined) {
    document.getElementById("room").innerHTML = "Pas d'autre joueur connecté";
  } else {
    document.getElementById("room").innerHTML =
      "Vous jouez contre " + data.otherPlayer.username;
    players.push(data.otherPlayer.playerId);
    map[data.otherPlayer.playerId] = [];
  }
  document.getElementById("select").disabled = false;
}

function userJoined(user) {
  //user: {username, playerId}

  map[user.playerId] = [];
  players.push(user.playerId);
  document.getElementById("room").innerHTML =
    "Vous jouez contre " + user.username;
  alert(user.username + " a rejoint la partie");
}

/********************** DOCUMENTATION API ***********************
CRÉER UN BATIMENT
  createBatiment({nom, x, y, width, height})
      nom = string : "trinquette", "portugais", "hdv", "caserne", "mur", "extracteur"

*********************** DOCUMENTATION API **********************/

draw();

document.getElementById("buttonCreate").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  let usname = loginForm.elements.username.value;
  socket.emit("create game", usname);
});

document.getElementById("buttonConnect").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  let username = loginForm.elements.username.value;
  let room = loginForm.elements.gameCode.value;
  socket.emit("join game", { username, room });
});

socket.on("connected", function(data) {
  //data: {username, room, otherPlayer?}
  gotConnected(data);
});

socket.on("user joined", function(user) {
  userJoined(user);
});

socket.on("draw batiment", function(data) {
  drawBatiment(data);
});

socket.on("ping", function(data) {
  console.log("ping");
});

socket.on("gold amount updated", function(amount) {
  console.log("Gold : " + amount);
});

function createBatiment(data) {
  socket.emit("create batiment", data);
}

/*
const batimentsList = document.getElementById("batiments");
const batimentsForm = document.querySelector("form");
const buttonRefresh = document.getElementById("sumbitRefresh");
var sok = io();
var socket = io.connect('https://ageof.glitch.me');

var message = document.getElementById('message')

function emit(event){
  var code = event.keyCode;
   console.log(code); 

  if(code != 8 && code != 46)
    var msglen = $("#message").val().length;
    if($("#message").val() == "")
  {
   //  alert("please give some input inside the textbox");
  }
  else{
    socket.emit('doc', {
        message: $("#message").val()[msglen - 1]
    });
  }
}

socket.on('doc', function(data){
 if(data)
 {
   console.log(data.message);
   $("#hello").append(data.message);
 }
});

function appendNewItemOnMap(item) {
  const newListItem = document.createElement("li");
  newListItem.innerText = item;
  batimentsList.appendChild(newListItem);
}

function updateMap(map){
    // remove the loading text
    batimentsList.firstElementChild.remove();

    // get first player map
    let player1map = map.player1;
    appendNewItemOnMap(JSON.stringify(player1map));
}

batimentsForm.addEventListener("submit", event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  let newBatiment = batimentsForm.elements.batiment.value

  fetch("/addBatiment?text=" + newBatiment)
    .then(response => response.json()) // parse the JSON from the server
    .then(map => {updateMap(map); console.log(map);})
  //map.push(newBatiment);
  appendNewItemOnMap(newBatiment);

  // reset form
  batimentsForm.reset();
  batimentsForm.elements.batiment.focus();
});


document.getElementById("submitRefresh").addEventListener("click", event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

});

fetch("/map")
    .then(response => response.json()) // parse the JSON from the server
    .then(map => updateMap(map));
/*

// define variables that reference elements on our page
const dreamsList = document.getElementById("dreams");
const dreamsForm = document.querySelector("form");

// a helper function that creates a list item for a given dream
function appendNewDream(dream) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
}

// fetch the initial list of dreams
fetch("/map")
  .then(response => response.json()) // parse the JSON from the server
  .then(dreams => {
    // remove the loading text
    dreamsList.firstElementChild.remove();
  
    // iterate through every dream and add it to our page
    dreams.forEach(appendNewDream);
  
    // listen for the form to be submitted and add a new dream when it is
    dreamsForm.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();

      // get dream value and add it to the list
      let newDream = dreamsForm.elements.dream.value;
      dreams.push(newDream);
      appendNewDream(newDream);

      // reset form
      dreamsForm.reset();
      dreamsForm.elements.dream.focus();
    });
  });
*/

//AUTOCONNECT
document.getElementById("connexion").firstElementChild.firstElementChild.value = "Joueur 1"
//document.getElementById("buttonCreate").click()