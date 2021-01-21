import Building from "./Building.js";

class Hdv extends Building {
  constructor(x, y) {
    super(x, y, 80, 80, 300, 80, 0); // x, y, width, height, hp, cost, createDelay
  }

  draw() {
    return {
      nom: "hdv",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fhdv_dfous.png?1607876427163",
      hpMax: 200 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
}

export default Hdv