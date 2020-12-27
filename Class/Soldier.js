import Personnage from "./Personnage.js";

class Soldier extends Personnage {
  constructor(x, y, callbackUpdated) {
    super(x, y, 10, 2, 4, 50); // x, y, damage, ms, range, hp
    this.callbackUpdated = callbackUpdated;
  }

  draw() {
    return {
      nom: "soldier",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2FIOP.png?v=1608813171788",
      hpMax: 40 + 10*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
  
  move(x, y){
    console.log("Soldier::move")
    super.move(x, y);
    this.callbackUpdated(this.draw())
  }
}

export default Soldier