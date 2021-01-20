import Building from "./Building.js";

class Personnage extends Building {
  constructor(x, y, damage, ms, range, hp) {
    super(x, y, 50, 50, hp); // x, y, width, height, hp
    this._damage = damage;
    this._ms = ms;
    this._range = range;
  }

  draw() {
    return {
      ...super.draw(),
      damage: this._damage,
    };
  }
  
  cibler(building){
    const frame = () => {
      let coord = super.getCoordinates();
      let distance = Math.sqrt(Math.pow(building._x - coord.x, 2) + Math.pow(building._y - coord.y, 2)) //distance qui sépare le personnage de sa cible
      console.log("cibler " + building + " à " + distance)
      if(distance > this._range && this.getHp() > 0){
        this.move(building._x, building._y);
      }else if(building.getHp() > 0 && this.getHp() > 0){
        this.attaque(building);
      }else{
        clearInterval(id);
      }
    }
    let id = setInterval(frame, 50);
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
    let distRatio = xDist/yDist;
    coord.x < toX ? this._x+=distRatio*this._ms : this._x-=distRatio*this._ms;
    coord.y < toY ? this._y+=(1/distRatio)*this._ms : this._y-=(1/distRatio)*this._ms;
  }
}

export default Personnage