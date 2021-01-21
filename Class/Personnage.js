import Building from "./Building.js";

class Personnage extends Building {
  constructor(x, y, damage, ms, as, range, hp, cost) {
    super(x, y, 50, 50, hp, cost); // x, y, width, height, hp, cost
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
    var shorterDistance = map[0].
    map.forEach(batiment => {
      let coord = batiment.getCoordinates();
      let distance = Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2));
      distances.push(distance);
    })
    this.cibler(map);
  }
  
  cibler(building){
    let coord = super.getCoordinates();
    let distance = Math.sqrt(Math.pow(building._x - coord.x, 2) + Math.pow(building._y - coord.y, 2)) //distance qui sépare le personnage de sa cible
    console.log("cibler " + building + " à " + distance)
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
    let xDist = Math.abs(coord.x - toX);
    let yDist = Math.abs(coord.y - toY);
    let dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    let sin = yDist/dist;
    let cos = xDist/dist;
    this._y += sin * this._ms;
    this._x += cos * this._ms;
  }
}

export default Personnage