import Building from "./Building.js";

class Personnage extends Building {
  constructor(x, y) {
    super(x, y, 50, 50, 50); // x, y, hp
    this._damage = 15;
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
  
  attaque(building){
    building.lowerHp(this._damage);
  }
  
  move(toX, toY){
    
  }
}

export default Personnage