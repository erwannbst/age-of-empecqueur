import {map}  from '../script.mjs';

export function displayMenuBatiments(userId, batiment){
  map[userId].forEach(batiment => {
  if(batiment.nom = "soldier"){
    var nbSoldats++;;
    if(batiment.isOnMap){
      var nbSoldatsOnMaps += 1;
    }
  }
  });
  var menu_bat = document.getElementById("menu_bat");
  console.log(batiment);
        menu_bat.style.display = "block";
        
        //menu_bat.innerHTML = "le bat sur lequel tu a cliqué est " + batClick;
        document.getElementById("form_bat").style.opacity = 0.8;
        document.getElementById("nom_bat").innerHTML = batiment.nom.toUpperCase();
        document.getElementById("lvl_bat").innerHTML =
          "lvl " + batiment.lvl;
        document.getElementById("lvlUpPrice_bat").innerHTML =
          "Coût d'amélioration = " +
          batiment.lvlUpPrice +
          " pièces d'or" ;
  
        document.getElementById("soldierOnMap").innerHTML = "Soldats en opération : " + nbSoldatsOnMaps ;
        document.getElementById("soldierRest").innerHTML = "Soldats en réserve : "  + (nbSoldats - nbSoldatsOnMaps);
  
        //button de click d'ajout de personnage
        if(batiment.nom=="caserne"){
          document.getElementById("btnCreateSoldat").style.display = "block";
          document.getElementById("btnCreateSoldat").innerHTML = "Ajout de soldat";
        }
        else{
          document.getElementById("btnCreateSoldat").style.display = "none";
        }
  
        //button de click de placement de personnage
        if(batiment.nom=="trinquette"){
          document.getElementById("btnPlaceSoldat").style.display = "block";
          document.getElementById("btnPlaceSoldat").innerHTML = "Placer mes soldats";
        }
        else{
          document.getElementById("btnPlaceSoldat").style.display = "none";
        }
  
  
        document.getElementById("btnUpgrade").innerHTML = "Améliorer";        
}


var checkbox = document.getElementById("theme");
checkbox.onchange = function() {
  //darkmode
  if(checkbox.checked) {
    document.getElementById("bat-container").style.backgroundColor = "rgba(31, 31, 45, 0.3)";
    document.getElementById("menu_bat").style.backgroundColor = "rgba(31, 31, 45, 0.3)";
    document.getElementsByTagName("body")[0].style.backgroundColor= "#34344b";
    document.getElementById("connexion").style.backgroundColor = "rgba(31, 31, 45, 0.7)";
    document.getElementById("creation").style.backgroundColor = "rgba(31, 31, 45, 1)";
    document.getElementById("connect").style.backgroundColor = "rgba(31, 31, 45, 1)";
    document.getElementById("myCanvas").style.background = "#f3f3f3 url('https://zupimages.net/up/21/03/zicf.png') no-repeat";
  }
  //clear mode
  else{
    document.getElementById("bat-container").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    document.getElementById("menu_bat").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    document.getElementsByTagName("body")[0].style.backgroundColor= "lightgray";
    document.getElementById("connexion").style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    document.getElementById("creation").style.backgroundColor = "rgba(255, 255, 255, 1)";
    document.getElementById("connect").style.backgroundColor = "rgba(255, 255, 255, 1)";
    document.getElementById("myCanvas").style.background = "#f3f3f3 url('https://zupimages.net/up/21/01/z09j.png') no-repeat";
  }
};


