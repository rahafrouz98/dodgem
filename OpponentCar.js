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
    //this object is used to keep the status of 90 degree turning for the car
    //staus 0 means it is not active, 1 means it is turning right, -1 means it is turning left
    //initial angle is the angle of the car that it start to turning 90 degree
    #turn90 ={
        status:0,
        initialAngle:undefined
    }
    //this object is used to keep the status of trajectory path for the car
    //time is the parameter which is used in the sine formula to simulate time
    //using different phase will decreae the chance that car get stuck in a corner
    #trajictoryPath = {
        isActive:false,
        baseLineAngle:undefined,
        time:0,
        frequency:5,
        timeFragment:undefined,
        phase: undefined,
    }
    //resets the parameters of the trajectory path
    #resetTrajictoryPath()
    {
        this.#trajictoryPath.isActive = true;
        this.#trajictoryPath.time = 0;
        this.#trajictoryPath.baseLineAngle = this.carBody.angle;
        this.#trajictoryPath.timeFragment = .005+(1-Math.random()*2)/1000;
        let phaseSelector = Math.random() <0.5?0:1
        this.#trajictoryPath.phase = phaseSelector==0 ? 0 : Math.PI;
        console.log(this.#trajictoryPath.phase)
    }
    //It activate and deactivate the action of turning 90 degree
    #toggleTurn90()
    {
        if(this.#turn90.status != 0 )
        {
            this.#turn90.status=0;
        }
        else
        {
            let isTurnRight = Math.random() < 0.5 ? true : false;
            this.#turn90.status = isTurnRight? 1:-1;
        }
        initialAngle:this.carBody.angle
    }

    steering(mode)
    {
        //the car will move forward or backward 
        (mode == 2 || mode == 3) && this.#isMovingForward ?this.moveForward(true):this.moveBackward(true);
        this.manageTurn90();

        //the car will move on the trajectory path based on the parameters of the this.##trajictoryPath
        mode ==3 && this.sineMovement();

        //car will turn 90 degree to left or right based on the status of this.#turn90
        this.manageTurn90()
    }  

    reverseHeading()
    {  
        this.acceleration=0
        Body.setVelocity(this.carBody, {x:0,y:0})
        this.#isMovingForward = !this.#isMovingForward;
        //it resets the trajectory path with new phase to prevent cars from being stuck and keep hitting barriers
        this.#resetTrajictoryPath();

    }

    setTurn90()
    {
        this.#toggleTurn90();
        this.#trajictoryPath.isActive = false;
    }  

    manageTurn90()
    {
        if(this.#turn90.status != 0)
        {
            let targetAngle = this.#turn90.initialAngle + (Math.PI/2)*this.#turn90.status;
            if(this.carBody.angle < targetAngle && this.#turn90.status > 0 || this.carBody.angle > targetAngle && this.#turn90.status < 0)
            {
                this.#turn90.status==-1 ? this.turnLeft(true) : this.turnRight(true);
            }
            else
            {
                this.#toggleTurn90();
            }
        }
    }

    sineMovement()
    {
        if(this.#turn90.status==0)
        {
            if(!this.#trajictoryPath.isActive)
            {
                console.log("yes")
                this.#resetTrajictoryPath();
            }
            //this is a sine wave formula for the angle of the car to make the car move in a sine trajectory path
            //the amplitude is equal to pi/4 (45 degree) and the baseline for the angle is the angle of car at start of the trejectory
            let newAngle = Math.PI/4*Math.sin(this.#trajictoryPath.time*this.#trajictoryPath.frequency +this.#trajictoryPath.phase);
            Body.setAngle(this.carBody, this.#trajictoryPath.baseLineAngle + newAngle);
            this.#trajictoryPath.time+=this.#trajictoryPath.timeFragment;
        }
    }
}
