import {map}  from '../script.mjs';


export function displayMenuBatiments(userId, batiment){
  var menu_bat = document.getElementById("menu_bat");
  console.log(batiment);
        menu_bat.style.display = "block";
        var inputX = document.createElement("input");
          inputX.setAttribute("type", "hidden");
          inputX.setAttribute("id", "coordX");
          inputX.value = batiment.x
          document.getElementById("form_bat").appendChild(inputX);
        var inputY = document.createElement("input");
          inputY.setAttribute("type", "hidden");
          inputY.setAttribute("id", "coordY");
          inputY.value = batiment.y
          document.getElementById("form_bat").appendChild(inputY);
        
        //menu_bat.innerHTML = "le bat sur lequel tu a cliqué est " + batClick;
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
          document.getElementById("btnCreateSoldat").style.display = "block";
          document.getElementById("btnCreateSoldat").innerHTML = "Ajout de soldat";
        }
        else{
          document.getElementById("btnCreateSoldat").style.display = "none";
        }
        document.getElementById("btnUpgrade").innerHTML = "Améliorer";        
}



