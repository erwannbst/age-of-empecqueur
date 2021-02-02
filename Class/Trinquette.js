import Building from "./Building.js";

class Trinquette extends Building {
  constructor(x, y) {
    super(x, y, 80, 80, 250, 50, 0); // x, y, hp
  }

  draw() {
    return {
      nom: "trinquette",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Ftavernedofus.png?1607814703059",
      hpMax: 150 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
  
}

export default Trinquette