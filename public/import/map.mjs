import {map} from '../script.mjs';

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
  for (var n = 0; n < map[id].length; n++) {
    if(clickX >= map[id][n].x && clickX <= map[id][n].x + map[id][n].width){
      if(clickY >= map[id][n].y && clickY <= map[id][n].y+ map[id][n].height){      
        if(clickX + RenduBatiments[batSelect].width>= map[id][n].x && clickX + RenduBatiments[batSelect].width <= map[id][n].x + map[id][n].width){
          if(clickY + RenduBatiments[batSelect].height >= map[id][n].y && clickY + RenduBatiments[batSelect].height <= map[id][n].y+ map[id][n].height){
          return false;
          }
        }   
        return false
      }
      
    }
  }
  return true;
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

