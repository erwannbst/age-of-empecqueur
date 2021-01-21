/* global socket */
// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// INIT
document.getElementById("menu").style.display =" none";
document.getElementById("bat-container").style.display = "none";
document.getElementById("menu_bat").style.display = "none";
document.getElementById("menu-gold").style.display = "none";
document.getElementById("chat").style.display = "none";

const loginForm = document.getElementById("connect");
const createForm = document.getElementById("creation");
var canvas = document.getElementById("myCanvas");
export var ctx = canvas.getContext("2d");
canvas.width = 1900;
canvas.height = 900;
var playerX = 0;
var playerY = 0;
var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;
var connected = false;
var username = "";
var goldAmount = 0;

import {
  emplacementLibre,
  menuBatiments,
  drawHpBar,
  drawAllBatiments
} from "./import/map.mjs";

import {RenduBatiments} from './import/map.mjs'

import {displayMenuBatiments} from './import/menu.mjs';

export var players = [];
/*
players : [
  playerId1,
  playerId2,
]
*/


export var map = {};
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


function item(x, y, name) {
  this.name = name;
  this.x = x;
  this.y = y;
}


//-----------------------------------------------------PARTIE MENU-------------------------------------------------------//




let batSelect;
//boutons selection batiments
var btnExtracteur = document.getElementById("extracteur");
var btnCaserne = document.getElementById("caserne");
var btnPortugais = document.getElementById("portugais");
var btnTrinquette = document.getElementById("trinquette");
var btnMurH = document.getElementById("murH");
var btnMurV = document.getElementById("murV");

btnExtracteur.addEventListener("click", event => {
  event.preventDefault();
  batSelect = btnExtracteur.value;
});
btnCaserne.addEventListener("click", event => {
  event.preventDefault();
  batSelect = btnCaserne.value;
});
btnPortugais.addEventListener("click", event => {
  event.preventDefault();
  batSelect = btnPortugais.value;
});
btnTrinquette.addEventListener("click", event => {
  event.preventDefault();
  batSelect = btnTrinquette.value;
});
btnMurH.addEventListener("click", event => {
  event.preventDefault();
  batSelect = btnMurH.value;
});
btnMurV.addEventListener("click", event => {
  event.preventDefault();
  batSelect = btnMurV.value;
});


let btnCreateSoldat = document.getElementById("btnCreateSoldat");
btnCreateSoldat.addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  
  //passer x et y en argument en les recuperant sur l'input
  socket.emit("create batiment", { nom: "soldier" , x: document.getElementById("coordX").value, y: document.getElementById("coordY").value});
});

let btnUpgrade = document.getElementById("btnUpgrade");
btnUpgrade.addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  //socket.emit("create batiment", { nom: "soldier" });
});

var chatForm = document.getElementById('chat-form');
var messageInput = document.getElementById("content");
var displayMessage = document.getElementById("messages-box");

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendChat({msg : messageInput.value, pseudo : username}); // data:{msg: "test", pseudo: "pseudo"}
  console.log("message envoyé au serveur : " + messageInput.value );
  messageInput.value = '';
});

function renderMessage(data){
  console.log("message recu par le serveur : " + data);
  let p = document.createElement('p');
  p.innerHTML = data.pseudo + " : " + data.msg;
  displayMessage.appendChild(p);
}



//-----------------------------------------------------KEYBOARD----------------------------------------------------------//

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
var keynum;
if(window.event) // IE
  {
  keynum = e.keyCode;
  }
else if(e.which) // Netscape/Firefox/Opera
  {
  keynum = e.which;
  }
//alert(keynum);
	if (keynum == 27) batSelect = null;
}

//-------------------------------------------------------MOUSE-----------------------------------------------------------//
document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e) {
  var rect = canvas.getBoundingClientRect();
  playerX = e.clientX - rect.left;
  playerY = e.clientY - rect.top;
  document.getElementById("output").innerHTML =
    "Mouse:  <br />" + " x: " + playerX + ", y: " + playerY + "<br />";
}


//-------------------------------------------------------CLICK------------------------------------------------------------//


canvas.addEventListener(
  "click",
  function(event) {
    var menu_bat = document.getElementById("menu_bat");
    var batClick = false;

    //si un batiment est selectionné on verifie si on peut le placer sur la map
    if (batSelect != null) {
      //
      if (emplacementLibre(socket.id, batSelect, playerX, playerY)) {
        createBatiment({ nom: batSelect, x: playerX, y: playerY });
        batSelect = null;
      }
      else{
        document.getElementById("output").innerHTML =
          "Vous ne pouvez pas placer un batiment ici";
      }
    }
    //si aucun batiment selectionné on verifie si le click porte sur un batiment en particulier
    else {
      batClick = menuBatiments(socket.id, playerX, playerY);
      //si oui on affiche le menu du batiment 
      if (batClick) {
        displayMenuBatiments(socket.id, batClick);
        //batClick = batiment sur lequel on a cliqué
        
      } 
      //sinon on affiche rien
      else {
        menu_bat.style.display = "none";
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
    //permet d'afficher le visuel du batiment au deplacement de la souris
    ctx.drawImage(
      RenduBatiments[batSelect].image,
      playerX,
      playerY,
      RenduBatiments[batSelect].width,
      RenduBatiments[batSelect].height
    );
  }
  drawAllBatiments(socket.id); //fonction d'affichage de tous les batiments
  requestAnimationFrame(draw);
}


//-------------------------------------------------------SERVEUR------------------------------------------------------------//

/*
function drawBatiment(data) {
  // data:{nom: "nomDuBatiment", x: 0, y: 0, owner: "wkfefkefe"}
  //Appelée par le serveur quand un batiment a été ajouté au moteur de jeu
  console.log("drawing batiment " + JSON.stringify(data));
  map[data.owner].push(data);
  //AddClosedMap(data.nom, data.x, data.y);
}
*/

function receiveMap(data){
  //console.log("actualisation de la map" + JSON.stringify(data));
  map = data;
}

/*
function itemUpdated(item) {
  map[item.owner][1] = item;
}
*/

function setGoldAmount(amount) {
  //Appelée par le serveur quand le montant d'or est mis à jour
  goldAmount = amount;
  document.getElementById("gold").innerHTML =  " " + amount;
}

function gotConnected(data) {
  //data: {username, room, playerId}
  //_playerId = data.playerId;
  connected = true;
  username = data.username;
  map[socket.id] = [];
  console.log("gotConnected" + JSON.stringify(data));
  players.push(socket.id);
  document.getElementById("status").innerHTML =
    "Connected as " + username + "#" + data.room;
  document.getElementById("connexion").style.display = "none";
  if (data.otherPlayer == undefined) {
    document.getElementById("room").innerHTML = "En attente d'un autre joueur....";
  } else {
    document.getElementById("room").innerHTML =
      "Vous jouez contre " + data.otherPlayer.username;
    players.push(data.otherPlayer.playerId);
    map[data.otherPlayer.playerId] = [];
    document.getElementById("bat-container").style.display = "block";
    document.getElementById("menu-gold").style.display = "block";
    document.getElementById("chat").style.display = "block";
    }
  //document.getElementById("select").disabled = false;
}

function userJoined(user) {
  //user: {username, playerId}
  map[user.playerId] = [];
  players.push(user.playerId);
  document.getElementById("room").innerHTML =
    "Vous jouez contre " + user.username;
  document.getElementById("bat-container").style.display = "block";
  document.getElementById("menu-gold").style.display = "block";
  document.getElementById("chat").style.display = "block";
}

/********************** DOCUMENTATION API ***********************
CRÉER UN BATIMENT
  createBatiment({nom, x, y, width, height})
      nom = string : "trinquette", "portugais", "hdv", "caserne", "mur", "extracteur"

*********************** DOCUMENTATION API **********************/

draw();


document.getElementById("buttonCreate").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  let usname = createForm.elements.username.value;
  console.log("dreate game for "+usname+".....");
  socket.emit("create game", usname);
  
});

document.getElementById("buttonConnect").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  let username = loginForm.elements.pseudo.value;
  let room = loginForm.elements.gameCode.value;
  socket.emit("join game", { username, room });
});


// client.js
socket.on("connected", function(data) {
  //data: {username, room, otherPlayer?}
  gotConnected(data);
});

socket.on("user joined", function(user) {
  userJoined(user);
});

socket.on("send chat", function(data) {
  renderMessage(data);
});


socket.on("receive map", function(data) {
  receiveMap(data);
})

/*
socket.on("item updated", function(data) {
  //data : {...drawData, owner: playerId}
  itemUpdated(data);
});
*/

socket.on("ping", function(data) {
  console.log("ping");
});

socket.on("gold amount updated", function(amount) {
  setGoldAmount(amount);
});

function createBatiment(data) {
  socket.emit("create batiment", data);
}

function sendChat(data){
  socket.emit("send chat", data);
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

//document.getElementById("buttonCreate").click()
