import Building from "./Building.js";
import {incrementPlayerGold, runAtFrequency} from "../server.js";

class Extracteur extends Building {
  constructor(x, y) {
    super(x, y, 80, 80, 250, 80, 0); // x, y, width, height, hp, cost, createDelay
  }
  
  run(data){
    let id = data.playerId;
    runAtFrequency(10, incrementPlayerGold(id, 1));
  }

  draw() {
    return {
      nom: "extracteur",
      ...super.draw(),
      image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fbanque.png?1607819328536",
      hpMax: 150 + 100*this._lvl,
      lvlUpPrice: 200 + 100*this._lvl,
    };
  }
  
  getType(){
    return "trinquette";
  }
}

export default Extracteur