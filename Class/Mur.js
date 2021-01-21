import Building from "./Building.js";

class Mur extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, 300, 10, 0); // x, y, width, height, hp, cost, createDelay
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