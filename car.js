let {World, Bodies, Body} = Matter

export default class Car
{
    /**This is a parent class which PlayerCar and two OpponentCar classes are extended from */
    constructor(_position, _width, _length, _throttle ,_density, _engine, _svgImage,_type=""
         ,_carIndex=0 ,_startDirection=0)
    {
        this.#width = _width;
        this.#length = _length;
        this.acceleration = 0;
        this.#throttle = _throttle;
        this.carBody = Bodies.rectangle(_position.x, _position.y, this.#length, this.#width, {
            isStatic:false,
            friction:0.3,
            frictionAir:0.3,
            restitution:1,
            angle:0,
            density:_density,
        }) 
        this.carBody.carIndex = _carIndex;
        this.carBody.name= _type;
        World.add(_engine.world, [this.carBody]) 
        Body.setAngle(this.carBody, _startDirection)
        this.svgImage = _svgImage;
    }
    svgImage
    carBody;
    #throttle
    #width;
    #length;
    //It is needed to limit the amount of force on car so it does not act up in collision with
    //barriers when the car keep throttling
    #maxAcceleration = 0.05;
    acceleration;
    #maxVelocity =25;
    wheels={
        increment:0,
        angle:0,
        maxAngle: Math.PI/4, // absolute
        decrement:0.3
    }
   
    draw(p)
    {
        this.update();
        p.push();
            p.translate(this.carBody.position.x, this.carBody.position.y);
            p.rotate(this.carBody.angle);
            p.imageMode(p.CENTER);
            p.image(this.svgImage, 0, 0, this.#length, this.#width);
        p.pop();
    }
    
    update()
    {
        //update wheel angle
        this.#wheelManager()

        //normal vector from the wheel direction
        let forceDirection = p5.Vector.fromAngle(this.carBody.angle+this.wheels.angle);
        let force = p5.Vector.mult(forceDirection,this.acceleration);
        //it applies the force infront of the car to simulate front wheel drive
        let forceOffsetX = this.#length/3*2 * Math.cos(this.carBody.angle);
        let forceOffsetY = this.#length/3*2 * Math.sin(this.carBody.angle);
        let forcePosition= {x:this.carBody.position.x+forceOffsetX , y:this.carBody.position.y+forceOffsetY}

        Body.applyForce(this.carBody,forcePosition, force);
        
        //limit the speed of the car
        if(this.carBody.speed > this.#maxVelocity)
        {
            //direction after applying force
            let direction = p5.Vector.fromAngle(this.carBody.angle);
            let newVelocity = p5.Vector.mult(direction, this.#maxVelocity)
            Body.setVelocity(this.carBody, newVelocity)
        }

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

    
}

/**
 https://freesvg.org/top-view-car-vector for cars svg
 */