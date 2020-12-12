/* global socket, drawBatiment */

const batimentsList = document.getElementById("batiments");
const batimentsForm = document.querySelector("form");

/*
document.getElementById("buttonAddBatiment").addEventListener("click", event => {
  event.preventDefault(); // stop our form submission from refreshing the page
  let batimentName = batimentsForm.elements.batimentName.value
  let pos = [batimentsForm.elements.x_position.value, batimentsForm.elements.y_position.value]
  socket.emit('add batiment', {name: batimentName, pos});
});

function addBatiment(data){
  const newListItem = document.createElement("li");
  newListItem.innerText = data.name + ' added at [' + data.pos[0] + ',' + data.pos[1] + ']';
  batimentsList.appendChild(newListItem);
}*/

socket.on('draw batiment', function (data) {
  drawBatiment(data);
});

socket.on('ping', function (data) {
  console.log('ping');
});