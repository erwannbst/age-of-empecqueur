import {createGame, joinGame} from '../script.mjs';

const loginForm = document.querySelector("form");

document.getElementById("buttonCreate").addEventListener("click", event => {
  event.preventDefault();
  let usname = loginForm.elements.username.value;
  createGame(usname);
});

document.getElementById("buttonConnect").addEventListener("click", event => {
  event.preventDefault();
  let username = loginForm.elements.username.value;
  let room = loginForm.elements.gameCode.value;
  joinGame(username, room);
});