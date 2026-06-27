import OpponentCar from "./OpponentCar.js"

export default class OpponentCarA extends OpponentCar
{
    //It is a class for the opponent car A which is inherited from OpponentCar class.
    constructor(_position, _engine, _svgImage, _carIndex = 0, _startDirection = 0)
    {
        super(_position, 50,100, 0.0002 , 0.002, _engine, _svgImage, "opponentCar", _carIndex, _startDirection);
    } 
}