import Building from "./Building.js";
import {runAtFrequency} from "../server.js";
import * as gameValues from "../gameValues.js";

class Personnage extends Building {
  constructor(x, y, damage, ms, as, range, hp, cost, createDelay) {
    super(x, y, 50, 50, hp, cost, createDelay); // x, y, width, height, hp, cost, createDelay
    this._damage = damage;
    this._as = as
    this._ms = ms;
    this._range = range;
    this._isOnMap = false;
  }

  draw() {
    return {
      ...super.draw(),
      damage: this._damage,
    };
  }
  
  placerOnMap({x, y}){
    super.setCoordinates({x: x, y: y});
    this._isOnMap = true;
  }
  
  run(data){
    if(!this._isOnMap){
      return;
    }
    let map = data.enemyMap;
    var nearestBatiment = map[0];
    var shorterDistance = 999999;
    map.forEach(batiment => {
      if(batiment.getHp() > 0){
        let batCoord = batiment.getCoordinates();
        let distance = Math.sqrt(Math.pow(batCoord.x - this._x, 2) + Math.pow(batCoord.y - this._y, 2));
        if(distance < shorterDistance){
          shorterDistance = distance;
          nearestBatiment = batiment;
        }
      }
    })
    this.cibler(nearestBatiment);
  }
  
  cibler(building){
    if(building instanceof Building){ // evite bug ou building est undefined
      let coord = super.getCoordinates();
      let buildingCoord = building.getCoordinates();
      let distance = Math.sqrt(Math.pow(buildingCoord.x - coord.x, 2) + Math.pow(buildingCoord.y - coord.y, 2)) //distance qui sépare le personnage de sa cible
      if(distance > this._range && this.getHp() > 0){
        this.move(buildingCoord.x, buildingCoord.y);
      }else if(building.getHp() > 0 && this.getHp() > 0){
        runAtFrequency(this._as, () => this.attaque(building));
      }
    }
  }
  
  attaque(building){
    building.lowerHp(this._damage)
  }
  
  move(toX, toY){
    let coord = super.getCoordinates();
    let xDist = coord.x - toX;
    let yDist = coord.y - toY;
    let dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    let sin = yDist/dist;
    let cos = xDist/dist;
    this._y -= sin * this._ms / (gameValues.INTERVAL_SEND_MAP);
    this._x -= cos * this._ms / (gameValues.INTERVAL_SEND_MAP);
  }
}

export default Personnage