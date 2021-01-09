import {map}  from '../script.mjs';


export function displayMenuBatiments(id, batClick){
  var menu_bat = document.getElementById("menu_bat");
  console.log(batClick);
        menu_bat.style.display = "block";
        //menu_bat.innerHTML = "le bat sur lequel tu a cliqué est " + batClick;
        map[id].forEach(batiment => {
          if (batiment.nom == batClick) {
            document.getElementById("form_bat").style.opacity = 0.8;
            document.getElementById("nom_bat").innerHTML = batiment.nom+" lvl "+batiment.lvl;
            document.getElementById("lvlUpPrice_bat").innerHTML =
              "Coût d'amélioration = " +
              batiment.lvlUpPrice +
              " pièces d'or"
            document.getElementById("hp_bat").value = batiment.hp;
            document.getElementById("hp_bat").max = batiment.hpMax;
            document.getElementById("button1").innerHTML = "Ajout de soldat";
          }
        });
}


