class Building {  
  constructor(x, y){    
    this.x = x,
    this.y = y
  }
}

class Hdv extends Building {
  constructor(x, y){    
    super(x, y);
    this.lvl = 1;
    this.hp = 1500;
  }
  
  draw(){
    return "urlHdv";
  }
  
  getHp(){
    return this.hp;
  }
  
  lowerHp(){
    this.hp -= 100;
  }
}

module.exports = Hdv;