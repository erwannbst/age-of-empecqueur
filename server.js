// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
var map = {
  player1:{
    hdv:{
      position: [10,48]
    }
  },
  player2:{
    hdv:{
      position: [90,48]
    }
  }
}

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/map", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(map);
});

// send the default array of dreams to the webpage
app.get("/addBatiment", (request, response) => {
  map.player1.trinquette.player1 = request.data.text;
  response.json(map);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
