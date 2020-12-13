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

var tabBatiment = [];
function Batiment(nom, coordX, coordY) {
  this.nom = nom;
  this.coordX = coordX;
  this.coordY = coordY;
}

//----------------------------------PARTIE MENU------------------------------------------//

let batSelect;

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
    if (batSelect != null) {
      //devra etre supprimé après test
      var bat = new Batiment(batSelect, playerX, playerY);
      tabBatiment.push(bat);

      //

      createBatiment(batSelect, playerX, playerY);
      console.log(tabBatiment);
    }
  },
  false
);

//-------------------------------------------------------DRAW------------------------------------------------------------//
//déplacement de la souris
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (batSelect != null) {
    drawRectangle(batSelect, playerX, playerY);
  }
  for (var i = 0; i < tabBatiment.length; i++) {
    drawRectangle(
      tabBatiment[i].nom,
      tabBatiment[i].coordX,
      tabBatiment[i].coordY
    );
  }
  requestAnimationFrame(draw);
}

function drawRectangle(nomBat, coordX, coordY) {
  switch (nomBat) {
    case "caserne":
      ctx.drawImage(caserneImg, coordX, coordY, 80, 80);
      break;
    case "trinquette":
      ctx.drawImage(trinquetteImg, coordX, coordY, 80, 80);
      break;
    case "portugais":
      ctx.drawImage(portugaisImg, coordX, coordY, 80, 80);
      break;
    case "extracteur":
      ctx.drawImage(extracteurImg, coordX, coordY, 80, 80);
      break;
    case "murV":
      ctx.drawImage(murVImg, coordX, coordY, 30, 110);
      break;
    case "murH":
      ctx.drawImage(murHImg, coordX, coordY, 110, 30);
      break;
    case "hdv":
      ctx.drawImage(hdvImg, coordX, coordY, 80, 80);
      break;
  }
}

function drawBatiment(data) {
  //Appelée par le serveur quand un batiment a été ajouté au moteur de jeu
  console.log("drawing batiment " + JSON.stringify(data));
  // data:{nom: "nomDuBatiment", x: 0, y: 0, width, height}

  drawRectangle(data.nom, data.x, data.y);
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
