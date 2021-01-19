import Mur from "./Mur.js";

class MurH extends Mur {
  constructor(x, y, owner) {
    super(x, y, 110, 30, owner); // x, y, hp
  }

  draw() {
    return {
      ...super.draw(),
      nom: "murH",
      image: "https://cdn.glitch.com/ed9ae07c-2c55-4291-ad7a-4f0a45476104%2Fmur_horizontal.png?v=1610210919343",
    };
  }
}

export default MurH