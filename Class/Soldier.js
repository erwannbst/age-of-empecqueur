import Personnage from "./Personnage.js";

class Soldier extends Personnage {
  constructor(x, y /*, callbackUpdated*/) {
    super(x, y, 2, 2, 20, 20, 50, 20); // x, y, damage, ms, as, range, hp, cost
  }

  draw() {
    return {
      nom: "soldier",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2FIOP.png?1610016410702",
      hpMax: 40 + 10*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
  
  move(x, y){
    console.log("Soldier::move")
    super.move(x, y);
  }
}

export default Soldier