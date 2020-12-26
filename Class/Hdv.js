import Building from './Building.js';

export default class Hdv extends Building {
  #x = 0;
  constructor(x, y){    
    super(x, y);
    this.lvl = 1;
    this.hp = 1500;
  }
  
  getCoordinates(){
    return {x: this.x, y: this.y}
  }

  draw(){
    return {...this.getCoordinates(), image: "https://cdn.glitch.com/8d02ca95-ce82-4fca-ad42-d3d9bd309d64%2Fthumbnails%2Fhdv_dfous.png?1607876427163"}
  }
  
  getHp(){
    return this.hp;
  }
  
  lowerHp(){
    this.hp -= 100;
  }
}