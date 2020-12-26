class Building {  
  constructor(x, y){    
    this.x = x,
    this.y = y
  }
  
  draw(){
    return({x: this.x, y: this.y});
  }
}

export default class Hdv extends Building {
  constructor(x, y){    
    super(x, y);
    this.lvl = 1;
    this.hp = 1500;
  }
  
  draw(){
    return {..super(), url: "url"}
  }
  
  getHp(){
    return this.hp;
  }
  
  lowerHp(){
    this.hp -= 100;
  }
}

module.exports = Hdv;