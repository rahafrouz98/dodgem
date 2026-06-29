import OpponentCar from "./OpponentCar.js"

export default class OpponentCarB extends OpponentCar
{
    /**It is a class for the opponent car B which is inherited from OpponentCar class.
    * it is slow and smoking 
    *_engine is the instance of Matter.Engine*/ 
    constructor(_position, _width, _Length, _engine, _carIndex = 0, _startDirection = 0)
    {  
        super(_position, _width, _Length, 0.00005 , 0.002, _engine, [212,76,2] , "opponentCar", true , _carIndex, _startDirection);
    } 
}