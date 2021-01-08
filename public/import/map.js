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

var RenduBatiments = {
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

var map = {};
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

function emplacementLibre(id, batSelect, clickX, clickY) {
  var hauteur = RenduBatiments[batSelect].width;
  var largeur = RenduBatiments[batSelect].height;

  for (var batwidth = 0; batwidth < hauteur; batwidth++) {
    for (var batheight = 0; batheight < largeur; batheight++) {
      for (var n = 0; n < map[id].length; n++) {
        if (
          map[id][n].x + batwidth == clickX &&
          map[id][n].y + batheight == clickY
        ) {
          //si un batiment est deja placé a l'endroit du clic on interdit la création du batiment
          return false;
        }
      }
    }
  }
  return true;
}

function menuBatiments(id, clickX, clickY){
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

function displayMenuBatiments(id, batClick){
  var menu_bat = document.getElementById("menu_bat");
  console.log(batClick);
        menu_bat.style.display = "block";
        //menu_bat.innerHTML = "le bat sur lequel tu a cliqué est " + batClick;
        map[id].forEach(batiment => {
          if (batiment.nom == batClick) {
            document.getElementById("menu_bat").style.backgroundImage =
              "url(" + batiment.image + ")";
            document.getElementById("form_bat").style.opacity = 0.8;
            document.getElementById("nom_bat").innerHTML = batiment.nom;
            document.getElementById("lvl_bat").innerHTML =
              batiment.nom + " de niveau " + batiment.lvl;
            document.getElementById("lvlUpPrice_bat").innerHTML =
              "Il vous faudra pièces d'or " +
              batiment.lvlUpPrice +
              " pour ameliorer votre " +
              batiment.nom;
            document.getElementById("hp_bat").value = batiment.hp;
            document.getElementById("hp_bat").max = batiment.hpMax;
            document.getElementById("button1").innerHTML = "Ajout de soldat";
          }
        });
}


export {emplacementLibre};
export {menuBatiments};
export {displayMenuBatiments};
