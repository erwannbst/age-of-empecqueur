class Building {  
  constructor(x, y, width, height, hp){    
    this._x = x;
    this._y = y;
    this._hp = hp;
    this._lvl = 1;
    this._height = height;
    this._width = width;
  }
  
  draw(){
    return({x: this._x, y: this._y, width: this._width, height: this._height, hp: this._hp, lvl: this._lvl});
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
  
  lvlUp(){
    this._lvl += 1;
  }
}

export default Building