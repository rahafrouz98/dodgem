import Car from "./Car.js"

let {Body} = Matter

export default class OpponentCar extends Car
{
    //This is a parrent class for opponent cars. It inherits from Cars and add a specific method of steering for opponent cars
    constructor(_position, _width, _length, _throttle ,_density, _engine, _svgImage, _type="",_carIndex =0, _startDirection=0)
    {     
        super(_position, _width,_length, _throttle , _density, _engine, _svgImage, _type,_carIndex ,_startDirection);
        this.#isMovingForward= Math.random() < 0.5 ? true : false;
    }

    //set a random direction of the opponent car
    #isMovingForward
    steering(mode)
    {
        if(mode == 2)
        {
            this.#isMovingForward ?this.moveForward(true):this.moveBackward(true);
        }   
    }  
    reverseHeading()
    {  
        this.acceleration=0
        Body.setVelocity(this.carBody, {x:0,y:0})
        this.#isMovingForward = !this.#isMovingForward;
    }
}
