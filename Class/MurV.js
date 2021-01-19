import Mur from "./Mur.js";

class MurV extends Mur {
  constructor(x, y, owner) {
    super(x, y, 30, 110, owner); // x, y, hp
  }

  draw() {
    return {
      ...super.draw(),
      nom: "murV",
      image: "https://cdn.glitch.com/ed9ae07c-2c55-4291-ad7a-4f0a45476104%2Fmur.png?v=1610210912699",
    };
  }
}

export default MurV