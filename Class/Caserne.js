import Building from "./Building.js";
import Soldier from "./Soldier.js";

class Caserne extends Building {
  constructor(x, y) {
    super(x, y, 80, 80, 300, 80, 0); // x, y, width, height, hp, cost, createDelay
    this._unitsInside = []
  }

  draw() {
    return {
      nom: "caserne",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fcasernedofus.png?1607815040102",
      hpMax: 200 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
      unitsInside: this._unitsInside.map(unit => unit.draw()),
    };
  }
  
  addUnit(unit){
    this._unitsInside.push(unit);
  }
  
  removeUnit(type){
    let unitClass;
    switch(type) {
        case "soldier":
          unitClass = Soldier
          break;
    }
    for(let i = 0; i < this._unitsInside.length; i++){
      let unit = this._unitsInside[i];
      if(unit instanceof unitClass){
        this._unitsInside.splice(i, 1);
        console.log("return " + JSON.stringify(unit))
        return unit;
      }
    }
    console.log("return error")
    return "error";
  }
}

export default Caserne