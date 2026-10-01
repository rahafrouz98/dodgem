import Car from "./Car.js"

export default class PlayerCar extends Car
{
    /**It is a class for the PlayerCar and inherits fron the Car
    *_p: p5 instance, _position: {x: number, y: number}, _width: number, 
    *_Length: number, _engine: Matter.Engine 
    */
    constructor(_p,_position, _width, _Length ,_engine)
    {
        super(_p,_position, _width, _Length, .0001 , 0.0006, _engine, [40,127,240] , "playerCar")
    }
    /**it handles the movement of the player car at each 
     * _p: p5 instance
    */
    steering(_p)
    {
        //up arrow
        if(_p.keyIsDown(38))
        {
            this.moveForward(true);
        }
        //down arrow
        else if (_p.keyIsDown(40))
        {
            this.moveBackward(true);
        }
        else
        {
            this.moveForward(false);
            this.moveBackward(false);
        }
        //right arrow
        if(_p.keyIsDown(39) && (_p.keyIsDown(40) || _p.keyIsDown(38)))
        {
            this.turnWheels(0.05);
        }
        //left arrow 
        else if(_p.keyIsDown(37) && (_p.keyIsDown(40) || _p.keyIsDown(38)))
        {
            this.turnWheels(-0.05);
        }
        //move straight
        else
        {
            this.turnWheels(0);
        }
    }  
}


