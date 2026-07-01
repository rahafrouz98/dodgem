import OpponentCar from "./OpponentCar.js"

export default class OpponentCarB extends OpponentCar
{
    /**It is a class for the opponent car B which is inherited from OpponentCar class.
    * it is slow and smoking 
    *_engine is the instance of Matter.Engine*/ 
    constructor(_p,_position, _width, _Length, _engine, _carIndex = 0, _startDirection = 0)
    {  
        super(_p,_position, _width, _Length, 0.00003 , 0.005, _engine, [120,120,150] , "opponentCar", true , _carIndex, _startDirection);
    } 
}