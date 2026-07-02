let {World, Bodies, Body} = Matter
import CarBody from "./CarBody.js";
import Trail from "./Trail.js";
import Smoker from "./Smoker.js";

export default class Car
{
    /**This is the parent class pf PlayerCar and OpponentCar.
    *_p:p5 instance, _position:{x:number, y:number}, _width: number, _length: number, _throttle: number, _density:number  
    *_engine: Matterjs Engine instance, _color:[number, number, number], _name: string, _smoker: boolean,
    * _carIndex: number, _startDirection: number
    */
    constructor( _p,_position, _width, _length, _throttle ,_density, _engine, _color, _name="", _smoker = false , _carIndex=0 ,_startDirection=0)
    {
        this.acceleration = 0;
        this.#throttle = _throttle;
        this.carBody = new CarBody( _p ,_position, _length, _width,_density, _engine, _color, _name , _carIndex, _startDirection) 
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
    #maxSpeed;
    #rightTrackRelativePosition;
    #leftTrackRelativePosition;
    #emitterRelativePosition
    //this object holds the data related to the angle of the wheel
    wheels={
        increment:0,
        angle:0,
        maxAngle: Math.PI/4, // absolute
        decrement:0.3
    }
    acceleration;
    carBody;

    /**draw the carBody, smoker and trail instances at each frame and update the physical properties of carBody.physic in Matterjs
     * _p: p5 instance
     */
    draw(_p)
    {
        this.#update();
        this.#trail.draw(_p);
        this.#smoker?.draw(_p);
        this.carBody.draw(_p);
    }
   
    #update()
    {
        //check if there is any life remained
        if (this.carBody.remainedLife <=0 )return;
        
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
    /**adds to the acceleration positively to move the car forward
     * _isAccelerating: boolean
     */
   moveForward(_isAccelerating)
    {
        if(_isAccelerating && this.acceleration < this.#maxAcceleration)
        {
            this.acceleration += this.#throttle ;
        }
        else if (_isAccelerating && this.acceleration >= this.#maxAcceleration)
        {
            this.acceleration=this.#maxAcceleration; 
        }
        else
        {
            this.acceleration=0; 
        }
    }

    /**adds to the acceleration negatively to move the car backward
     * _isAccelerating: boolean
     */
    moveBackward(_isAccelerating)
    {
        if(_isAccelerating && -this.acceleration < this.#maxAcceleration )
        {
           this.acceleration -= this.#throttle/2 ;
        }
        else if (_isAccelerating && -this.acceleration >= this.#maxAcceleration)
        {
             this.acceleration=-this.#maxAcceleration; 
        }
        else 
        {
            this.acceleration=0; 
        }
    }

    /**is called at each frame and based on the data in the this.wheels updates the whell angle */
    #wheelManager()
    {
        if(this.wheels.increment !==0)
        {
            let newAngle = this.wheels.angle +this.wheels.increment;
            //new wheel angle will be maximum equal to the this.wheels.maxAngle
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
    /**it is an interface method that is used in the child classes to change the status of wheels for turning right and left
     * _increment: number(radian)
    */
    turnWheels(_increment)
    {
        this.wheels.increment = _increment;
    }
    
    /**returns the absolute postion of the given relative position (relative to the venter of the car) 
     * _relativePosition: Matter.Vector
    */
    #getAbsolutePosition(_relativePosition)
    {
        //rotate the relative position of the track with the car angle
        let rotatedVector = Matter.Vector.rotate(_relativePosition, this.carBody.physic.angle)
        //transfer the vector to the body
        let absolutePosition = Matter.Vector.add(this.carBody.physic.position, rotatedVector);
        return absolutePosition;
    }
    /**updates the collision history of the carBody
     * _collision: Matterjs Collision instance
     */
    manageCollision(_collision)
    {
        this.carBody.collitionHistoryManager(this.#getCollisionArea(_collision.supports[0]), _collision.depth);
    }

    /**divides the car into four parts and finds which part is collided based on the provided collision point
     * _collisionPoint{x:number, y:number}
     */
    #getCollisionArea(_collisionPoint)
    {
        //coordinate of collision point relatrive to center of the body in world coordination (not rotated)
        let collisionVector = Matter.Vector.create(_collisionPoint.x-this.carBody.physic.position.x,
                                                   _collisionPoint.y-this.carBody.physic.position.y)
        //rotated vector to be coordinated with the car when its angle is zero
        collisionVector = Matter.Vector.rotate(collisionVector, -this.carBody.physic.angle)

        if(collisionVector.x >= this.#length/4 && Math.abs(collisionVector.y) <= this.#width/4)
        {
            return "front";
        }
        if(collisionVector.x >= this.#length/4 && collisionVector.y >= this.#width/4)
        {
            return "front-right";
        }
        if(Math.abs(collisionVector.x) <= this.#length/4 && collisionVector.y >= this.#width/4)
        {
            return "right";
        }
        if(collisionVector.x <= -this.#length/4 && collisionVector.y >= this.#width/4)
        {
            return "back-right";
        }
        if(collisionVector.x <= -this.#length/4 && Math.abs(collisionVector.y) <= this.#width/4)
        {
            return "back";
        }
        if(collisionVector.x <= -this.#length/4 && collisionVector.y <= -this.#width/4)
        {
            return "back-left"
        }
        if(Math.abs(collisionVector.x) <= this.#length/4 && collisionVector.y <= -this.#width/4)
        {
            return "left"
        }
        return "front-left";
        
    }
}

/**
 https://freesvg.org/top-view-car-vector for cars svg
 */