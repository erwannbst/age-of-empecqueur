/* global socket */
// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// INIT
const loginForm = document.querySelector("form");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 1600;
canvas.height = 900;
var playerX = 0;
var playerY = 0;
var connected = false;
var username = "";
var img = new Image();
var hdv = new Image();

ctx.strokeStyle = "black";
ctx.fillStyle = "white";

img.src =
  "https://cdn.glitch.com/d4bfa1e1-3618-4fd0-bc6f-635c34b0e5d1%2Fplayer.png";
hdv.src =
  "https://cdn.glitch.com/d4bfa1e1-3618-4fd0-bc6f-635c34b0e5d1%2F393-3937430_comments-th8-clash-of-clans-png.png?v=1607726161883";


var tabBatiment = [];
function Batiment(nom, coordX, coordY, width, height) {
  this.nom = nom;
  this.coordX = coordX;
  this.coordY = coordY;
  this.width = width;
  this.height = height;
}

//----------------------------------PARTIE MENU------------------------------------------//

let batSelect;


const btnSelectBat = document.querySelector("#boutonSelectionBatiment");
// handle click button
btnSelectBat.onclick = function() {
  const rbs = document.querySelectorAll('input[name="bat"]');
  for (const rb of rbs) {
    if (rb.checked) {
      batSelect = rb.value;
      break;
    }
  }
};

function SelectGoodBat(nomBat)


//-------------------------------------------------------MOUSE-----------------------------------------------------------//
document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e) {
  playerX = e.pageX;
  playerY = e.pageY;
  document.getElementById("output").innerHTML =
    "Mouse:  <br />" + " x: " + playerX + ", y: " + playerY + "<br />";
}
//-------------------------------------------------------CLICK------------------------------------------------------------//
canvas.addEventListener(
  "click",
  function(event) {
    //devra etre supprimé après test
    var bat = new Batiment(
      batSelect,
      playerX,
      playerY,
      40,
      60
    );
    tabBatiment.push(bat);
    //trinquette 40 et 60 devront être changé en variable lors de la selection
    //dans le menu
    createBatiment(batSelect, playerX, playerY, 40, 60);
    console.log(tabBatiment);
  },
  false
);

//-------------------------------------------------------DRAW------------------------------------------------------------//
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(batSelect!=null){drawRectangle(batSelect, playerX, playerY, 50, 50, "red");}
  for (var i = 0; i < tabBatiment.length; i++) {
    drawRectangle(
      tabBatiment[i].nom,
      tabBatiment[i].coordX,
      tabBatiment[i].coordY,
      tabBatiment[i].width,
      tabBatiment[i].height
    );
  }
  requestAnimationFrame(draw);
}

function drawRectangle(nom, x, y, width, height) {
  ctx.beginPath();
  ctx.lineWidth = "4";
  ctx.strokeStyle = "red";
  ctx.rect(x, y, width, height);
  ctx.fillText(nom, x, y);
  ctx.stroke();
}



function drawBatiment(data) {
  //Appelée par le serveur quand un batiment a été ajouté au moteur de jeu
  console.log("drawing batiment " + JSON.stringify(data));
  // data:{nom: "nomDuBatiment", x: 0, y: 0, width, height}

  drawRectangle(data.nom, data.x, data.y, data.width, data.height);
}
//-------------------------------------------------------DRAW------------------------------------------------------------//

function setGoldAmount(amount) {
  //Appelée par le serveur quand le montant d'or est mis à jour
  document.getElementById("gold").innerHTML = "Gold = " + amount;
}

function gotConnected(usname) {
  connected = true;
  username = usname;
  document.getElementById("status").innerHTML = "Connected as " + username;
  document.getElementById("connexion").style.display = "none";
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
  socket.emit("createGame", usname);
});

document.getElementById("buttonConnect").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  let usname = loginForm.elements.username.value;
  let gameCode = loginForm.elements.gameCode.value;
  socket.emit("add player", { usname, gameCode });
});

socket.on("connected", function(usname) {
  gotConnected(usname);
});

socket.on("new connection", function(players) {
  alert(players);
});

socket.on("draw batiment", function(data) {
  drawBatiment(data);
});

socket.on("ping", function(data) {
  console.log("ping");
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
