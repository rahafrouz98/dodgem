<<<<<<< HEAD
import OpponentCar from "./OpponentCar.js";

export default class OpponentCarA extends OpponentCar {
    /**It is a class for the opponent car type A which is inherited from OpponentCar class. It is a standard car .
     *_p:p5 instance, _position:{x:number, y:number}, _width: number, _length: number, _engine: Matterjs Engine instance
     *_carIndex: number, _startDirection: number
     */
    constructor(_p, _position, _width, _Length, _engine, _carIndex = 0, _startDirection = 0) {
        super(
            _p,
            _position,
            _width,
            _Length,
            0.0001,
            0.0006,
            _engine,
            [120, 120, 150],
            "opponentCar",
            false,
            _carIndex,
            _startDirection,
        );
    }
}
=======
import OpponentCar from "./OpponentCar.js"

export default class OpponentCarA extends OpponentCar
{
    /**It is a class for the opponent car type A which is inherited from OpponentCar class. It is a standard car .
    *_p:p5 instance, _position:{x:number, y:number}, _width: number, _length: number, _engine: Matterjs Engine instance
    *_carIndex: number, _startDirection: number
    */ 
    constructor(_p,_position, _width, _Length, _engine, _carIndex = 0, _startDirection = 0)
    {   
        super(_p,_position, _width, _Length, 0.0001, 0.0006, _engine, [120,120,150] , "opponentCar", false, _carIndex, _startDirection);
    } 
}
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
