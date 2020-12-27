import Building from "./Building.js";

class Personnage extends Building {
  constructor(x, y) {
    super(x, y, 50, 50, 50); // x, y, hp
    this._damage = 15;
    this._ms = 20;
    this._range = 4;
  }

  draw() {
    return {
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fcasernedofus.png?1607815040102",
      hpMax: 40 + 10*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
      damage: this._damage,
    };
  }
  
  cibler(building){
    let distance = Math.sqrt(Math.pow(building._x - this.x, 2) + Math.pow(building._y - this.y, 2))
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
    
  }
}

export default Personnage