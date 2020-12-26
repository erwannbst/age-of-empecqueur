import Building from "./Building.js";

class Caserne extends Building {
  constructor(x, y) {
    super(x, y, 300); // x, y, hp
  }

  draw() {
    return {
      nom: "caserne",
      ...this.getCoordinates(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fcasernedofus.png?1607815040102",
      hpMax: 200 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
}

export default Caserne