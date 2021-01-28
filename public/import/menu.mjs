import {map}  from '../script.mjs';


export function displayMenuBatiments(userId, batiment){
 
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
  
  
        //button de click d'ajout de personnage
        if(batiment.nom=="caserne"){
          document.getElementById("btnCreateSoldat").style.display = "block";
          document.getElementById("btnPlaceSoldat").style.display = "block";
          document.getElementById("btnPlaceSoldat").innerHTML = "Placer mes soldats";
          document.getElementById("btnCreateSoldat").innerHTML = "Ajout de soldat";
          document.getElementById("soldierOnMap").style.display = "block";
          document.getElementById("soldierRest").style.display = "block";
        }
        else{
          document.getElementById("btnPlaceSoldat").style.display = "none";
          document.getElementById("btnCreateSoldat").style.display = "none";
          document.getElementById("soldierOnMap").style.display = "none";
          document.getElementById("soldierRest").style.display = "none";
        }
  
        //button de click de placement de personnage
        if(batiment.nom=="trinquette"){
          document.getElementById("soldierOnMap").style.display = "block";
          document.getElementById("soldierRest").style.display = "block";
        }
        else{
          document.getElementById("btnPlaceSoldat").style.display = "none";
          document.getElementById("soldierOnMap").style.display = "none";
          document.getElementById("soldierRest").style.display = "none";
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


