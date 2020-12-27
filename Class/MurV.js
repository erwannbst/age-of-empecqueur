import Mur from "./Mur.js";

class MurV extends Mur {
  constructor(x, y) {
    super(x, y, 30, 110); // x, y, hp
  }

  draw() {
    return {
      ...super.draw(),
      nom: "murV",
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fmur.png?1607874941836",
    };
  }
}

export default MurV