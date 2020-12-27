import Building from "./Building.js";

class Portugais extends Building {
  constructor(x, y) {
    super(x, y, 80, 80, 250); // x, y, hp
  }

  draw() {
    return {
      nom: "portugais",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fcabane.png?1607820151355",
      hpMax: 150 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
}

export default Portugais