import Building from "./Building.js";

class Personnage extends Building {
  constructor(x, y, damage, ms, as, range, hp, cost, createDelay) {
    super(x, y, 50, 50, hp, cost, createDelay); // x, y, width, height, hp, cost, createDelay
    this._damage = damage;
    this._as = as
    this._ms = ms;
    this._range = range;
  }

  draw() {
    return {
      ...super.draw(),
      damage: this._damage,
    };
  }
  
  run(map){
    var nearestBatiment = map[0];
    var shorterDistance = 999999;
    map.forEach(batiment => {
      let coord = batiment.getCoordinates();
      let distance = Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2));
      console.log(JSON.stringify(batiment.draw()))
      console.log(distance + "<" + shorterDistance + ":")
      if(distance < shorterDistance){
        shorterDistance = distance;
        nearestBatiment = batiment;
        console.log("nearestBatiment " + JSON.stringify(nearestBatiment.draw()))
      }
    })
    console.log("map")
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
    console.log("Personnage::attaque")
    building.lowerHp(this._damage);
  }
  
  move(toX, toY){
    console.log("Personnage::move")
    let coord = super.getCoordinates();
    let xDist = coord.x - toX;
    let yDist = coord.y - toY;
    let dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    let sin = yDist/dist;
    let cos = xDist/dist;
    console.log("sin: " + sin + " | cos:" + cos)
    this._y -= sin * this._ms; 
    this._x -= cos * this._ms;
  }
}

export default Personnage