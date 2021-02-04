//------------------------------INITIALISATION---------------------------------//

import {map}  from '../script.mjs';


document.getElementById("menu").style.display =" none";
document.getElementById("bat-container").style.display = "none";
document.getElementById("menu_bat").style.display = "none";
document.getElementById("gold").style.display = "none";
document.getElementById("chat").style.display = "none";

//------------------------------AFFICHAGE DES BATIMENTS---------------------------------//

export function displayMenuBatiments(userId, batiment){
 
  var menu_bat = document.getElementById("menu_bat");
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
  
        switch (batiment.nom) {
          case 'caserne':
            document.getElementById("soldierOnMap").style.display = "block";
            document.getElementById("soldierRest").style.display = "block";
            document.getElementById("btnCreateSoldat").style.display = "block";
            document.getElementById("btnCreateSoldat").innerHTML = "Ajout de soldat";
            document.getElementById("btnPlaceSoldat").style.display = "block";
            document.getElementById("btnUpgrade").style.display = "none";
            break;
          case 'portugais':
            document.getElementById("btnUpgrade").innerHTML = "Améliorer"; 
            break;
          default:
            document.getElementById("btnPlaceSoldat").style.display = "none";
            document.getElementById("btnCreateSoldat").style.display = "none";
            document.getElementById("soldierOnMap").style.display = "none";
            document.getElementById("soldierRest").style.display = "none";
            document.getElementById("btnUpgrade").style.display = "none";
        }

   
}


//------------------------------GESTION DU MENU DES BATIMENTS---------------------------------//

export function BatMenuManage(goldAmount, btnExtracteur, btnCaserne, btnPortugais, btnTrinquette, btnMurH, btnMurV){
  if(goldAmount < 80){
    btnExtracteur.style.filter = "grayscale(100%)";
    btnExtracteur.disabled = true;
    btnCaserne.style.filter = "grayscale(100%)";
    btnCaserne.disabled = true;
    btnPortugais.style.filter = "grayscale(100%)";
    btnPortugais.disabled = true;
    btnTrinquette.style.filter = "grayscale(100%)";
    btnTrinquette.disabled = true;
    
    if(goldAmount < 35){
      btnMurH.style.filter = "grayscale(100%)";
      btnMurH.disabled = true;
      btnMurV.style.filter = "grayscale(100%)";
      btnMurV.disabled = true;
    }
  }
  
  else{
    btnExtracteur.style.filter = "grayscale(0%)";
    btnExtracteur.disabled = false;
    btnCaserne.style.filter = "grayscale(0%)";
    btnCaserne.disabled = false;
    btnPortugais.style.filter = "grayscale(0%)";
    btnPortugais.disabled = false;
    btnTrinquette.style.filter = "grayscale(0%)";
    btnTrinquette.disabled = false;
    btnMurH.style.filter = "grayscale(0%)";
    btnMurH.disabled = false;
    btnMurV.style.filter = "grayscale(0%)";
    btnMurV.disabled = false;
  }
}

//-------------------------------------DARK MODE-------------------------------------------//

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