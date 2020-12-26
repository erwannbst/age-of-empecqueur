import Building from "./Building.js";

class Hdv extends Building {
  constructor(x, y) {
    super(x, y);
    var _lvl = 1;
    var _hp = 1500;
  }

  getCoordinates() {
    return { x: this.x, y: this.y };
  }

  draw() {
    return {
      ...this.getCoordinates(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fhdv_dfous.png?1607876427163",
      hp: this._hp,
    };
  }

  lowerHp() {
    this._hp -= 100;
  }
  
  getHpMax(){
    return 300 + 100*this._lvl;
  }
}

export default Hdv