class Car
{
    constructor(_position)
    {
        this.#width = 50;
        this.#length = 100;
        this.#maxVelocity = 1;

        this.accelerate = 0;
        this.#carBody = Bodies.rectangle(_position.x, _position.y, this.#length, this.#width, {
            isStatic:false,
            friction:0.3,
            frictionAir:0.2,
            restitution:.9,
            angle:0,
            density:0.001,
        }) 
        World.add(engine.world, [this.#carBody]) 
    }
    #width;
    #length;
    #maxVelocity;
    #carBody;
    #accelerate = 0;
   
    draw()
    {
        push();
            translate(this.#carBody.position.x, this.#carBody.position.y);
            rectMode(CENTER);
            rotate(this.#carBody.angle);
            fill(255,0,0);
            rect(0, 0, this.#length, this.#width);
        pop();
        this.#update();
    }
    
    #update()
    {
        let direction = p5.Vector.fromAngle(this.#carBody.angle,1 );
        let force = direction.mult(this.#accelerate,this.#accelerate);
        Matter.Body.applyForce(this.#carBody, this.#carBody.position, force);
        console.log(this.#accelerate);
    }
    
    moveForward(isAccelerating) 
    {
        if(isAccelerating)
        {
           this.#accelerate+=0.002 ;
        }
        else
        {
            this.#accelerate=0; 
        }
    }

    moveBackward(isAccelerating) 
    {
        if(isAccelerating)
        {
           this.#accelerate-=0.001 ;
        }
        else 
        {
            this.#accelerate=0; 
        }
    }

    turnRight(isTurning)
    {
        this.#carBody.angle += 0.01;
    }

    turnLeft(isTurning)
    {
        this.#carBody.angle -= 0.01;
    }
    
}


