class Building {  
  constructor(x, y){    
    this.x = x,
    this.y = y
  }
  
  draw(){
    return({x: this.x, y: this.y});
  }
}

 class Hdv extends Building {
  constructor(x, y){    
    super(x, y);
    this.lvl = 1;
    this.hp = 1500;
  }
  
  getCoordinates(){
    return {x: this.x, y: this.y}
  }
/*
  draw(){
    return {..getCoordinates(), url: "url"}
  }
  */
  getHp(){
    return this.hp;
  }
  
  lowerHp(){
    this.hp -= 100;
  }
}

module.exports = Hdv;