import Building from "./Building.js";

class Mur extends Building {
  constructor(x, y, width, height, owner) {
    super(x, y, width, height, 300, owner); // x, y, hp
  }

  draw() {
    return {
      ...super.draw(),
      hpMax: 200 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
}

export default Mur