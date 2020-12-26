import Mur from "./Mur.js";

class MurH extends Mur {
  constructor(x, y) {
    super(x, y, 300); // x, y, hp
  }

  draw() {
    return {
      ...super.draw(),
      nom: "murV",
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fmur_horizontal.png?1607872442410",
    };
  }
}

export default MurH