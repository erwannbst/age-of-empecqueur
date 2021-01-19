import {map}  from '../script.mjs';


export function displayMenuBatiments(id, batClick){
  var menu_bat = document.getElementById("menu_bat");
  console.log(batClick);
        menu_bat.style.display = "block";
        //menu_bat.innerHTML = "le bat sur lequel tu a cliqué est " + batClick;
        map[id].forEach(batiment => {
          if (batiment.nom == batClick) {
            document.getElementById("form_bat").style.opacity = 0.8;
            document.getElementById("nom_bat").innerHTML = batiment.nom.toUpperCase();
            document.getElementById("lvl_bat").innerHTML =
              "lvl " + batiment.lvl;
            document.getElementById("lvlUpPrice_bat").innerHTML =
              "Coût d'amélioration = " +
              batiment.lvlUpPrice +
              " pièces d'or" ;
            document.getElementById("hp_bat").value = batiment.hp;
            document.getElementById("hp_bat").max = batiment.hpMax;
            if(batiment.nom=="caserne"){
            document.getElementById("button1").style.display = "flex";
            document.getElementById("button1").innerHTML = "Ajout de soldat";
            }
            else{
              document.getElementById("button1").style.display = "none";
            }
          }
        });
}

let batSelect;
//boutons selection batiments
var btnExtracteur = document.getElementById("extracteur");
var btnCaserne = document.getElementById("caserne");
var btnPortugais = document.getElementById("portugais");
var btnTrinquette = document.getElementById("trinquette");
var btnMurH = document.getElementById("murH");
var btnMurV = document.getElementById("murV");

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



