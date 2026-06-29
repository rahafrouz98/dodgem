import OpponentCar from "./OpponentCar.js"

export default class OpponentCarB extends OpponentCar
{
    //It is a class for the opponent car B which is inherited from OpponentCar class.
    constructor(_position, _engine, _carIndex = 0, _startDirection = 0)
    {
        super(_position, 60, 120, 0.00006 , 0.0016, _engine, [234,187,70] ,"opponentCar", _carIndex, _startDirection);
    } 
}