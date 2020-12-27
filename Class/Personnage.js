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
    console.log("cibler " + building)
    let distance = Math.sqrt(Math.pow(building._x - this.x, 2) + Math.pow(building._y - this.y, 2)) //distance qui sépare le personnage de sa cible
    while(distance > this._range && this._hp > 0){
      this.move(building._x, building._y);
    }
    while(building.getHp() > 0 && this._hp > 0){
      this.attaque(building);
    }
  }
  
  attaque(building){
    building.lowerHp(this._damage);
  }
  
  move(toX, toY){
    var pos = toX;
    var pos2 = toY;
    var id = setInterval(frame, 20);
    
    function frame() {
      if (pos == toY-50 && pos2 == toX-50) {
        clearInterval(id);
      } else {
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
  }
}

export default Personnage