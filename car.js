let {World, Bodies, Body} = Matter
import CarBody from "./CarBody.js";
import Trail from "./Trail.js";
import Smoker from "./Smoker.js";

export default class Car
{
    /**This is a parent class which PlayerCar and two OpponentCar classes are extended from 
     * _engine is the instance of Matter.Engine 
    */
    constructor(_position, _width, _length, _throttle ,_density, _engine, _color, _name="", _smoker = false , _carIndex=0 ,_startDirection=0, _isHoodPeaked=true)
    {
        this.acceleration = 0;
        this.#throttle = _throttle;
        this.carBody = new CarBody(_position, _length, _width,_density, _engine, _color, _name , _carIndex, _startDirection, _isHoodPeaked) 
        this.#length = _length;
        this.#width = _width;
        this.#maxSpeed = 25;
        this.#maxAcceleration = 0.05;
        this.#rightTrackRelativePosition = Matter.Vector.create(-this.#length/2, this.#width*0.4)
        this.#leftTrackRelativePosition = Matter.Vector.create(-this.#length/2, -this.#width*0.4)
        this.#trail = new Trail(this.#width/10, this.#maxSpeed)
        _smoker ? this.#smoker = new Smoker(this.#maxAcceleration, this.#width/20) : null;
        _smoker ? this.#emitterRelativePosition =  Matter.Vector.create(-this.#length/2, this.#width*.4) : null;
        
    }
    #trail;
    #smoker;
    #throttle;
    #length;
    #width;
    //It is needed to limit the amount of force on car so it does not act up in collision with
    //barriers when the car keep throttling
    #maxAcceleration;
    acceleration;
    #maxSpeed;
    #rightTrackRelativePosition;
    #leftTrackRelativePosition;
    #emitterRelativePosition
    carBody;
    wheels={
        increment:0,
        angle:0,
        maxAngle: Math.PI/4, // absolute
        decrement:0.3
    }
    draw(p)
    {
        this.update();
        this.#trail.draw(p);
        this.#smoker?.draw(p);
        this.carBody.draw(p);
    }
   
    update()
    {
        //update wheel angle
        this.#wheelManager()

        //normal vector from the wheel direction
        let forceDirection = p5.Vector.fromAngle(this.carBody.physic.angle+this.wheels.angle);
        let force = p5.Vector.mult(forceDirection,this.acceleration);
        //it applies the force infront of the car to simulate front wheel drive
        let forceOffsetX = this.#length/3*2 * Math.cos(this.carBody.physic.angle);
        let forceOffsetY = this.#length/3*2 * Math.sin(this.carBody.physic.angle);
        let forcePosition= {x:this.carBody.physic.position.x+forceOffsetX , y:this.carBody.physic.position.y+forceOffsetY}

        Body.applyForce(this.carBody.physic,forcePosition, force);
        
        //limit the speed of the car
        if(this.carBody.physic.speed > this.#maxSpeed)
        {
            //direction after applying force
            let direction = p5.Vector.fromAngle(this.carBody.physic.angle);
            let newVelocity = p5.Vector.mult(direction, this.#maxSpeed)
            Body.setVelocity(this.carBody.physic, newVelocity)
        }
        this.#trail.addTrack(  this.#getAbsolutePosition(this.#leftTrackRelativePosition), 
                                this.#getAbsolutePosition(this.#rightTrackRelativePosition), 
                               this.carBody.physic.speed, Math.abs(this.carBody.physic.angularVelocity), this.carBody.physic.angle);
        
        //if smoker is operational
        this.#smoker?.emmitSmoke(this.#getAbsolutePosition(this.#emitterRelativePosition), Math.abs(this.acceleration))
    }
    
   moveForward(isAccelerating)
    {
        if(isAccelerating && this.acceleration < this.#maxAcceleration)
        {
            this.acceleration += this.#throttle ;
        }
        else if (isAccelerating && this.acceleration >= this.#maxAcceleration)
        {
            this.acceleration=this.#maxAcceleration; 
        }
        else
        {
            this.acceleration=0; 
        }
    }

    moveBackward(isAccelerating)
    {
        if(isAccelerating && -this.acceleration < this.#maxAcceleration )
        {
           this.acceleration -= this.#throttle/2 ;
        }
        else if (isAccelerating && -this.acceleration >= this.#maxAcceleration)
        {
             this.acceleration=-this.#maxAcceleration; 
        }
        else 
        {
            this.acceleration=0; 
        }
    }


    #wheelManager()
    {
        if(this.wheels.increment !==0)
        {
            let newAngle = this.wheels.angle +this.wheels.increment;
            //new wheel angle will be maximum equal to the this.#wheels.maxAngle
            if(newAngle > 0)
            {
                newAngle = Math.min(newAngle, this.wheels.maxAngle)
            }
            else if(newAngle < 0)
            {
                newAngle = Math.max(newAngle, -this.wheels.maxAngle)
            }
            this.wheels.angle= newAngle
        }
        //if status is 0 turn the wheels to 0 degree gradually
        else
        {
            //if the wheel angle is less than the decrement then set the angle to 0 to prevent it from keeping passing zero
            if(Math.abs(this.wheels.angle) <= this.wheels.decrement)
            {
                this.wheels.angle = 0;
            }
            else
            {

                this.wheels.angle > 0 ? this.wheels.angle-=this.wheels.decrement:
                this.wheels.angle+=this.wheels.decrement;
            } 
        }

    }
    /**it is an interface method that is used in the child classes to change the status of wheels for turning right and left*/
    turnWheels(increment)
    {
        this.wheels.increment = increment;
    }
    
    /**returns the absolute postion of the given relative position (relative to the venter of the car) */
    #getAbsolutePosition(relativePosition)
    {
        //rotate the relative position of the track with the car angle
        let rotatedVector = Matter.Vector.rotate(relativePosition, this.carBody.physic.angle)
        //transfer the vector to the body
        let absolutePosition = Matter.Vector.add(this.carBody.physic.position, rotatedVector);
        return absolutePosition;
    }
}

/**
 https://freesvg.org/top-view-car-vector for cars svg
 */