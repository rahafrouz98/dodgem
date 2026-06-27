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
            frictionAir:0.18,
            restitution:.9,
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
    #maxAcceleration = 0.1;
    acceleration;
    #maxVelocity =20;
    turningIncrement = 0.03;
   
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
        //direction before applying force
        let direction1 = p5.Vector.fromAngle(this.carBody.angle);
        let force = direction1.mult(this.acceleration);
        Body.applyForce(this.carBody,this.carBody.position, force);
        //limit the speed of the car

        if(this.carBody.speed > this.#maxVelocity)
        {
            //direction after applying force
            let direction2 = p5.Vector.fromAngle(this.carBody.angle);
            Body.setVelocity(this.carBody, direction2.mult(this.#maxVelocity))
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

    turnRight = (isTurning)=>
    {
        Body.setAngle(this.carBody, this.carBody.angle + this.turningIncrement);
    }

    turnLeft = (isTurning)=>
    {
        Body.setAngle(this.carBody, this.carBody.angle - this.turningIncrement)
    }

    steering()
    {
       
    }
    
}

/**
 https://freesvg.org/top-view-car-vector for cars svg
 */