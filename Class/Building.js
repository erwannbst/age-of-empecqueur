class Building {  
  constructor(x, y, hp){    
    this._x = x,
    this._y = ;
    this._hp = hp;
    this._lvl = 1;
  }
  
  draw(){
    return({x: this._x, y: this._y});
  }

  getCoordinates() {
    return { x: this._x, y: this._y };
  }

  lowerHp(amount) {
    this._hp -= amount;
    if(this._hp < 0){
      this._hp = 0;
    }
  }
  
  getHp(){
    return this._hp;
  }
}

export default Building