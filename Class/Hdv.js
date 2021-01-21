import Building from "./Building.js";

class Hdv extends Building {
  constructor(x, y) {
    
    const run = () => {
      
    }
    super(x, y, 80, 80, 300, run); // x, y, width, height, hp
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