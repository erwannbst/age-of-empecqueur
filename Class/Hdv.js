import Building from "./Building.js";

class Hdv extends Building {
  constructor(x, y) {
    super(x, y);
    this._hp = 1500;
  }

  draw() {
    return {
      nom: "hdv",
      ...this.getCoordinates(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fhdv_dfous.png?1607876427163",
      hp: this._hp,
      hpMax: this.getHpMax(),
      lvl: this._lvl,
      lvlUpPrice: this._lvlUpPrice,
    };
  }
  
  getHpMax(){
    return 300 + 100*this._lvl;
  }
  
  getLvlUpPrice(){
    return 200 + 100*this._lvl;
  }
  
  lvlUp(){
    this._lvl += 1;
  }
}

export default Hdv