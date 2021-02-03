
//INIT CANVAS
var canvas = document.getElementById("myCanvas");
export var ctx = canvas.getContext("2d");
canvas.width = 1900;
canvas.height = 900;

//VARIABLES DOCS
var playerX = 0;
var playerY = 0;
var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;

document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e) {
  var rect = canvas.getBoundingClientRect();
  playerX = e.clientX - rect.left;
  playerY = e.clientY - rect.top;

}


//VARIABLES UTILISATEURS
var connected = false;
var username = "";
var goldAmount = 0;
var placeSoldats= false;
var batClick = false;

//------------------------------IMPORTATION---------------------------------//
import {
  emplacementLibre,
  findClickMenuBatiments,
  drawAllBatiments
} from "./import/map.mjs";

import {RenduBatiments} from './import/map.mjs'

import {displayMenuBatiments, BatMenuManage} from './import/menu.mjs';

//------------------------------ARCHITECTURE MAP---------------------------------//

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





//-----------------------------------------------------PARTIE MENU-------------------------------------------------------//

// Variable contenant le batiment selectionné dans le menu des batiments
let batSelect;

// boutons selection batiments
var btnExtracteur = document.getElementById("extracteur");
var btnCaserne = document.getElementById("caserne");
var btnPortugais = document.getElementById("portugais");
var btnTrinquette = document.getElementById("trinquette");
var btnMurH = document.getElementById("murH");
var btnMurV = document.getElementById("murV");

// Evenements "CLICK" sur les différents boutons du menu
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


// ************  CASERNE  ************ //

// CLICK sur le bouton de création de soldats du menu de la CASERNE
let btnCreateSoldat = document.getElementById("btnCreateSoldat");
btnCreateSoldat.addEventListener("click", event => {
  event.preventDefault(); 
  
  //Fonction de création de soldats connecté au socket
  createBatiment({nom :"soldier"});
});

// CLICK sur le bouton de placements de soldats de soldats du menu de la CASERNE
let btnPlaceSoldat = document.getElementById("btnPlaceSoldat");
btnPlaceSoldat.addEventListener("click", event => {
  event.preventDefault(); 
  placeSoldats = !placeSoldats; // invrsement de l'état du bouton
  
  // si le bouton est activé 
  if(placeSoldats == true){
    // changement de couleur du bouton 
    btnPlaceSoldat.style.background = "linear-gradient(-135deg, #D52802, #E29E8F)";
    batSelect = "soldier";
  }
  // si le bouton est désactivé 
  else{
    // changement de couleur du bouton 
    btnPlaceSoldat.style.background = "linear-gradient(-135deg, #5B6E44, #D2EBB5)";
    batSelect = null;
  }
});

// ************  PORTUGAIS  ************ //

// CLICK sur le bouton d'améliorations de batiments du menu du PORTUGAIS
let btnUpgrade = document.getElementById("btnUpgrade");
btnUpgrade.addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  //socket.emit("create batiment", { nom: "soldier" });
});


// ************  MENU DE CONNEXION  ************ //

const loginForm = document.getElementById("connect");
const createForm = document.getElementById("creation");


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



//--------------------------------------------------CHAT-------------------------------------------------------------//

//initialisaion du formulaire pour le mini-chat
var chatForm = document.getElementById('chat-form');
var messageInput = document.getElementById("content");
var displayMessage = document.getElementById("messages-box");

// Evenement lors de l'envoie du message après l'appui sur la touche ENTREE
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendChat({msg : messageInput.value, pseudo : username}); // data:{msg: "test", pseudo: "pseudo"}
  console.log("message envoyé au serveur : " + messageInput.value );
  messageInput.value = '';
});

// Fonction d'affichage du message
// La fonction est appelée lors de la reception d'un nouveau message par le serveur (ligne 370)

function renderMessage(data){
  // console.log("message recu par le serveur : " + data);
  
  //consitutions du message a envoyer
  let p = document.createElement('p');
  p.innerHTML = data.pseudo + " : " + data.msg;
  
  // changement de couleur en fonction de l'utilisateur qui l'a envoyé
  if(data.pseudo == username){
    p.style.color = "rgba(0, 170, 0, 0.8)"
  }else{
    p.style.color = "rgba(170, 0, 0, 0.8)"
  }
  p.style.fontSize ="small";
  p.style.height = "14px";
  
  displayMessage.appendChild(p);
  //scroll automatique du mini chat
  displayMessage.scrollTop = displayMessage.scrollHeight;
}


function renderMessageLog(text){

    let p = document.createElement('p');
    p.innerHTML = text;
    p.style.color = "rgba(166, 166, 166, 1)" 
    p.style.fontSize ="small";
    p.style.height = "14px";
    p.style.fontStyle = "italic";

    displayMessage.appendChild(p);
    //scroll automatique du mini chat
    displayMessage.scrollTop = displayMessage.scrollHeight;  
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




//-------------------------------------------------------MOUSE CLICK------------------------------------------------------------//

canvas.addEventListener(
  "click",
  function(event) {
    var batClick = false;
    
    
    // PLACEMENT DE SOLDAT 
    if(placeSoldats == true){
      // ON VERIFIE SI LE CLICK EST SITUE SUR UN ENDROIT AUTORISE DE LA MAP
        if (emplacementLibre(socket.id, "soldier", playerX, playerY)) {
          socket.emit("place personnage", {nom:"soldier", x:playerX, y:playerY});
        }
        else{
          renderMessageLog("impossible de placer un soldat ici")
          placeSoldats = null;
          btnPlaceSoldat.style.background = "linear-gradient(-135deg, #5B6E44, #D2EBB5)";
          batSelect = null;
        }
    }
    
    // PLACEMENT DE BATIMENT
    if (batSelect != null) {
      if(batSelect != "soldier"){
        if (emplacementLibre(socket.id, batSelect, playerX, playerY)) {
          createBatiment({ nom: batSelect, x: playerX, y: playerY });
          //remise a 0 de la valeur batSelect
          batSelect = null;
        }
        else{
          //impossible de placer un batiments
          renderMessageLog("impossible de placer un batiment ici")
        }
      }
    }
    
    // ACCES AUX MENUS DE GESTION DE BATIMENTS
    else {
      batClick = findClickMenuBatiments(socket.id, playerX, playerY);
      //si oui on affiche le menu du batiment 
      if (batClick) {
        displayMenuBatiments(socket.id, batClick);
        //batClick = batiment sur lequel on a cliqué
      } 
      //sinon on desactive le menu de gestion
      else {
        document.getElementById("menu_bat").style.display = "none";
      }
    }
  },
  false
);



//-------------------------------------------------------DRAW------------------------------------------------------------//

// Function d'affichage du CANVAS
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //permet d'afficher le visuel du batiment au deplacement de la souris

  if (batSelect != null) {
    ctx.drawImage(
      RenduBatiments[batSelect].image,
      playerX,
      playerY,
      RenduBatiments[batSelect].width,
      RenduBatiments[batSelect].height
    );
  }

  //fonction d'affichage de tous les batiments
  
  drawAllBatiments(socket.id); 
  requestAnimationFrame(draw);
}


//-------------------------------------------------------SERVEUR------------------------------------------------------------//

// **************** FUNCTION D'ACTUALISATION DE LA MAP **************************//

function receiveMap(data){
  //console.log("actualisation de la map" + JSON.stringify(data));
  let nbSoldatsOnMaps = 0;
  let nbSoldatsOnRest = 0;
  map = data;
  
  //boucle de recherche des soldats contenu dans la map
  map[socket.id].forEach(batiment => {
    if(batiment.nom == "caserne") {
      nbSoldatsOnRest = batiment.unitsInside.length;
    }
    if(batiment.nom == "soldier"){
      nbSoldatsOnMaps++;
    }
  });
  //actualisation du menu de gestion de la CASERNE
  document.getElementById("btnPlaceSoldat").innerHTML = "Soldats a placer : " + nbSoldatsOnRest ;
  document.getElementById("soldierOnMap").innerHTML = "Soldats en guerre " + nbSoldatsOnMaps ;
}


// ************* FUNCTION D'ACTUALISATION DES DONNEES DU JOUEUR ******************//

function receivePlayerItems(data){
  
  // actualisation du niveau d'or du joueur
  goldAmount = data.gold;
  document.getElementById("gold").innerHTML =  " " + data.gold;
  
  //function de gestion d'accesibilité des boutons de batiments
  //Elle est située dans le fichier import/menu.mjs
  BatMenuManage(goldAmount, btnExtracteur, btnCaserne, btnPortugais, btnTrinquette, btnMurH, btnMurV);
  
}

// ************************* FUNCTIONS DE LA CONNEXION **************************//

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

// ************************* FUNCTIONS DE CONNEXION AU SOCKET **************************//


// CONNEXION DU PREMIER CLIENT
socket.on("connected", function(data) {
  //data: {username, room, otherPlayer?}
  gotConnected(data);
});

// CONNEXION DU DEUXIEME CLIENT
socket.on("user joined", function(user) {
  userJoined(user);
});

// RECEPTION D'UN MESSAGE DANS LE MINI CHAT
socket.on("send chat", function(data) {
  renderMessage(data);
});

// RECEPTION DES DONNEES DE LA PARTIE
socket.on("receive players data", function(data) {
  //console.log(data)
  receiveMap(data.map);
  receivePlayerItems(data.items);
})

socket.on("ping", function(data) {
  console.log("ping");
});


function createBatiment(data) {
  socket.emit("create batiment", data);
}


function sendChat(data){
  socket.emit("send chat", data);
}


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% //

draw();

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% //



/********************** DOCUMENTATION API ***********************
CRÉER UN BATIMENT
  createBatiment({nom, x, y, width, height})
      nom = string : "trinquette", "portugais", "hdv", "caserne", "mur", "extracteur"

*********************** DOCUMENTATION API **********************/


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
