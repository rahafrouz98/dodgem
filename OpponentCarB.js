import OpponentCar from "./OpponentCar.js"

export default class OpponentCarB extends OpponentCar
{
    //It is a class for the opponent car B which is inherited from OpponentCar class.
    constructor(_position, _engine, _svgImage ,_carIndex = 0, _startDirection = 0)
    {
        super(_position, 60, 120, 0.00015 , 0.003, _engine, _svgImage, "opponentCar", _carIndex, _startDirection);
    } 
}