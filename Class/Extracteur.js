import Building from "./Building.js";

class Extracteur extends Building {
  constructor(x, y) {
    const run = () => {
      
    }
    super(x, y, 80, 80, 250, run); // x, y, hp
  }

  draw() {
    return {
      nom: "extracteur",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fbanque.png?1607819328536",
      hpMax: 150 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
}

export default Extracteur