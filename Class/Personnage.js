import Building from "./Building.js";

class Personnage extends Building {
  constructor(x, y, damage, ms, as, range, hp, cost) {
    super(x, y, 50, 50, hp, cost); // x, y, width, height, hp, cost
    this._damage = damage;
    this._as = as
    this._ms = ms;
    this._range = range;
  }

  draw() {
    return {
      ...super.draw(),
      damage: this._damage,
    };
  }
  
  run(map){
    var nearestBatiment = map[0];
    var shorterDistance = 999999;
    map.forEach(batiment => {
      let coord = batiment.getCoordinates();
      let distance = Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2));
      if(distance < shorterDistance){
        shorterDistance = distance;
        nearestBatiment = batiment;
      }
    })
    console.log(nearestBatiment);
    this.cibler(nearestBatiment);
  }
  
  cibler(building){
    let coord = super.getCoordinates();
    let distance = Math.sqrt(Math.pow(building._x - coord.x, 2) + Math.pow(building._y - coord.y, 2)) //distance qui sépare le personnage de sa cible
    console.log("cibler " + building + " à " + distance)
    if(distance > this._range && this.getHp() > 0){
      this.move(building._x, building._y);
    }else if(building.getHp() > 0 && this.getHp() > 0){
      this.attaque(building);
    }
  }
  
  attaque(building){
    console.log("Personnage::attaque")
    building.lowerHp(this._damage);
  }
  
  move(toX, toY){
    console.log("Personnage::move")
    let coord = super.getCoordinates();
    let xDist = Math.abs(coord.x - toX);
    let yDist = Math.abs(coord.y - toY);
    let dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    let sin = yDist/dist;
    let cos = xDist/dist;
    coord.x > toX ? this._y -= sin * this._ms : this._y += sin * this._ms; 
    this._x += cos * this._ms;
    /*
    
    j'ai fait des bails moi aussi
    Nickel
    mais pas bcp fin que le menu avec les golds
    Ah oui dac
    Et faudrait que t'ajustes le prix des batiments en fonction de l'argument de l'objet
    comment ca ?
    En gros je t'envoie dans les données de l'objet le prix du batiment normalement
    Parce que là ils sont tous à 200
    oui mais de base ils sont tous a 
    200 tu peut pas facetime ?
    mais en gros 'ai regardé et de base il coute tous 200 et apres leur prix est dynamique dans le menu pour ameliorer le batiment'
    Nope
    Après peut etre
    Et j'ai fait aussi la fonction qui déduit le prix des batiments quand tu les places
    parfait
    Faut juste que dans l'interface tu grises le bouton pour ajouter un batiment si le montant est pas suffisant
    yes je vais faire ca la 
    je vais faire ca et apres je vais avancer sur l'interface du minichat <- Nickel ca
    mais si on est pas en vocal ca va etre compliqué de tester
    Tkt tkt au pire je me mettrai après mais la je peux pas
    bon bah au boulot bg
    Okok
    */
  }
}

export default Personnage