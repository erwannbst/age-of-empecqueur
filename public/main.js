/* global io */

const batimentsList = document.getElementById("batiments");
const batimentsForm = document.querySelector("form");

var socket = io();


document.getElementById("buttonAddBatiment").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  let newBatiment = batimentsForm.elements.batimentName.value
  socket.emit('add batiment', newBatiment);
});

function addBatiment(data){
  batimentsList.appendChild(data.name);
}

socket.on('batiment added', function (data) {
  addBatiment(data.name);
});

io.on('ping', function (data) {
  console.log('ping');
});