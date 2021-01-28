import Personnage from "./Personnage.js";
import {SOLDIER_VALUES} from './../gameValues.js';

class Soldier extends Personnage {
  constructor(x, y) {
    super(x, y, SOLDIER_VALUES.damage, SOLDIER_VALUES.ms, SOLDIER_VALUES.as, SOLDIER_VALUES.range, SOLDIER_VALUES.hp, SOLDIER_VALUES.cost, SOLDIER_VALUES.createDelay); // x, y, damage, ms, as, range, hp, cost
  }
  
  run(enemyMap){
    super.run(enemyMap);
  }

  draw() {
    return {
      nom: "soldier",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2FIOP.png?1610016410702",
      hpMax: 40,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
  
  move(x, y){
    super.move(x, y);
  }
}

export default Soldier