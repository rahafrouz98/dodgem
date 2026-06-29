import Car from "./Car.js"

export default class PlayerCar extends Car
{
    //It is a class for the PlayerCar
    constructor(_position, _engine)
    {
        super(_position, 50, 100, .0001 , 0.0005, _engine, [150,150,252] , "playerCar")
    }
    //it takes p as the instance of p5
    steering(p)
    {
        //up arrow
        if(p.keyIsDown(38))
        {
            this.moveForward(true);
        }
        //down arrow
        else if (p.keyIsDown(40))
        {
            this.moveBackward(true);
        }
        else
        {
            this.moveForward(false);
            this.moveBackward(false);
        }
        //right arrow
        if(p.keyIsDown(39) && (p.keyIsDown(40) || p.keyIsDown(38)))
        {
            this.turnWheels(0.05);
        }
        //left arrow 
        else if(p.keyIsDown(37) && (p.keyIsDown(40) || p.keyIsDown(38)))
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


