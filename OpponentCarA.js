import OpponentCar from "./OpponentCar.js"

export default class OpponentCarA extends OpponentCar
{
    /**It is a class for the opponent car A which is inherited from OpponentCar class.*/
    constructor(_position, _width, _Length, _engine, _carIndex = 0, _startDirection = 0)
    {   
        super(_position, _width, _Length, 0.0001, 0.0006, _engine, [212,76,2] , "opponentCar", false, _carIndex, _startDirection);
    } 
}