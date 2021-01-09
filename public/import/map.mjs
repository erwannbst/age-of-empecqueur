import {map, ctx, players} from '../script.mjs';

var img = new Image();
var hdvImg = new Image();
var caserneImg = new Image();
var trinquetteImg = new Image();
var extracteurImg = new Image();
var portugaisImg = new Image();
var murVImg = new Image();
var murHImg = new Image();
var soldierImg = new Image();

murVImg.src =
  "https://cdn.glitch.com/ed9ae07c-2c55-4291-ad7a-4f0a45476104%2Fmur.png?v=1610210912699";
murHImg.src =
  "https://cdn.glitch.com/ed9ae07c-2c55-4291-ad7a-4f0a45476104%2Fmur_horizontal.png?v=1610210919343";
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
soldierImg.src =
  "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2FIOP.png?v=1608813171788";

export var RenduBatiments = {
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
  },
  soldier: {
    image: soldierImg,
    height: 80,
    width: 80
  }
};

export function emplacementLibre(id, batSelect, clickX, clickY) {
  var autorisation = true;
  var cornerX = clickX + RenduBatiments[batSelect].width;
  var cornerY = clickY + RenduBatiments[batSelect].height;
  for (var n = 0; n < map[id].length; n++) {
    if(clickX >= map[id][n].x && clickX <= map[id][n].x + map[id][n].width){
      if(clickY >= map[id][n].y && clickY <= map[id][n].y+ map[id][n].height){      
        //coin haut gauche erreur
        autorisation = false;
      }    
    }
    if(cornerX >= map[id][n].x && cornerX <= map[id][n].x + map[id][n].width){
      if(cornerY >= map[id][n].y && cornerY <= map[id][n].y + map[id][n].height){
        //coin bas droite erreur
        autorisation =  false;
      }
    }
    if(cornerX >= map[id][n].x && cornerX <= map[id][n].x + map[id][n].width){
      if(clickY>= map[id][n].y && clickY <= map[id][n].y + map[id][n].height){
        //coin haut droite erreur
        autorisation =  false;
      }
    }
    if(clickX >= map[id][n].x && clickX <= map[id][n].x + map[id][n].width){
      if(cornerY >= map[id][n].y && cornerY <= map[id][n].y + map[id][n].height){
        //coin bas gauche erreur
        autorisation =  false;
      }
    }
  }
  return autorisation;
}

export function menuBatiments(id, clickX, clickY){
  for (var n = 0; n < map[id].length; n++) {
        //console.log(map[socket.id][n].width);
        if (
          clickX >= map[id][n].x &&
          clickX <= map[id][n].x + map[id][n].width
        ) {
          if (
            clickY >= map[id][n].y &&
            clickY <= map[id][n].y + map[id][n].height
          ) {
            return map[id][n].nom;
          }
        }
      }
}

export function drawAllBatiments(){
  players.forEach(player => {
    map[player].forEach(batiment => {
      //affichage de chaque batiments
      let img = new Image();
      img.src = batiment.image;
      ctx.drawImage(
        img,
        batiment.x,
        batiment.y,
        batiment.width,
        batiment.height
      );
      if (batiment.nom != "murH" && batiment.nom != "murV")
        //affichage de la barre de point de vie pour chaque batiments
        drawHpBar(
          batiment.x + batiment.width / 2,
          batiment.y + 10 + batiment.height,
          batiment.hp,
          batiment.hpMax
        );
    });
  });
}


export function drawHpBar(x, y, hp, hpMax) {
  let height = 20;
  let width = 120;
  ctx.beginPath();
  ctx.rect(x - width / 2, y, width, height);
  ctx.fillStyle = "#AAA";
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.rect(x - width / 2, y, width * (hp / hpMax), height);
  if (hp > 63) {
    ctx.fillStyle = "green";
  } else if (hp > 37) {
    ctx.fillStyle = "gold";
  } else if (hp > 13) {
    ctx.fillStyle = "orange";
  } else {
    ctx.fillStyle = "red";
  }
  ctx.closePath();
  ctx.fill();

  ctx.font = "bold 15px verdana, sans-serif ";
  ctx.fillStyle = "#FFF";
  ctx.fillText(
    hp + "/" + hpMax,
    x - ctx.measureText(hp + "/" + hpMax).width / 2,
    y + ctx.measureText(hp + "/" + hpMax).fontBoundingBoxAscent
  );
}