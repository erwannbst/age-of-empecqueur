import Building from "./Building.js";

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
      isOnMap: this._isOnMap
    };
  }
  
  placerOnMap(x, y){
    super.setCoordinates({x: x, y: y});
    this._isOnMap = true;
  }
  /*
  run(map){
    var nearestBatiment = map[0];
    var shorterDistance = 999999;
    map.forEach(batiment => {
      let batCoord = batiment.getCoordinates();
      let distance = Math.sqrt(Math.pow(batCoord.x - this._x, 2) + Math.pow(batCoord.y - this._y, 2));
      if(distance < shorterDistance){
        shorterDistance = distance;
        nearestBatiment = batiment;
      }
    })
    
    this.cibler(nearestBatiment);
  }*/
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
    let coord = super.getCoordinates();
    let distance = Math.sqrt(Math.pow(building._x - coord.x, 2) + Math.pow(building._y - coord.y, 2)) //distance qui sépare le personnage de sa cible
    if(distance > this._range && this.getHp() > 0){
      this.move(building._x, building._y);
    }else if(building.getHp() > 0 && this.getHp() > 0){
      this.attaque(building);
    }
  }
  
  attaque(building){
    //if(new Date().getTime() % this._as)
      building.lowerHp(this._damage);
  }
  
  move(toX, toY){
    let coord = super.getCoordinates();
    let xDist = coord.x - toX;
    let yDist = coord.y - toY;
    let dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    let sin = yDist/dist;
    let cos = xDist/dist;
    this._y -= sin * this._ms; 
    this._x -= cos * this._ms;
  }
}

export default Personnage