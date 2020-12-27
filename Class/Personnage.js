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
    let coord = super.getCoordinates();
    function frame(){
      let distance = Math.sqrt(Math.pow(building._x - coord.x, 2) + Math.pow(building._y - coord.y, 2)) //distance qui sépare le personnage de sa cible
      console.log("cibler " + building + " à " + distance)
      console.log(coord.x)
      console.log(distance)
      if(distance > this._range && this._hp > 0){
        this.move(building._x, building._y);
      }else if(building.getHp() > 0 && this._hp > 0){
        this.attaque(building);
      }else{
        clearInterval(id);
      }
    }
    let id = setInterval(frame, 20);
  }
  
  attaque(building){
    console.log("Personnage::attaque")
    building.lowerHp(this._damage);
  }
  
  move(toX, toY){
    console.log("Personnage::move")
    var pos = toX;
    var pos2 = toY;
      if((pos2)!=toY-50){
      pos2++;
      }
      if((pos)!=toX-50){
      pos++;
      }
      this._x = pos2;
      this._y = pos;
  }
}

export default Personnage