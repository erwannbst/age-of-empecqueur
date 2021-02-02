import Building from "./Building.js";
import * as gameValues from "../gameValues.js";

class Mur extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, gameValues.MUR_VALUES.hp, gameValues.MUR_VALUES.cost, 0); // x, y, width, height, hp, cost, createDelay
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