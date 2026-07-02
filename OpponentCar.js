import Car from "./Car.js"

let {Body} = Matter

export default class OpponentCar extends Car
{
    /**This is a parrent class for opponent cars A and B. It inherits from Cars and add a specific method of steering for opponent cars
    *_p:p5 instance, _position:{x:number, y:number}, _width: number, _length: number, _throttle: number, _density:number  
    *_engine: Matterjs Engine instance, _color:[number, number, number], _name: string, _smoker: boolean,
    * _carIndex: number, _startDirection: number
    */ 
    constructor(_p,_position, _width, _length, _throttle ,_density, _engine, _color, _name ="" , _smoker = false, _carIndex =0, _startDirection=0)
    {      
        super(_p,_position, _width,_length, _throttle , _density, _engine, _color,_name, _smoker ,_carIndex ,_startDirection);
        this.#isMovingForward= Math.random() < 0.5 ? true : false;
    }

    //set a random heading of the opponent car
    #isMovingForward = Math.random() < 0.5? true: false;
    //this object is used to keep the status of 90 degree turning for the car
    //staus 0 means it is not active, 1 means it is turning right, -1 means it is turning left
    //initial angle is the angle of the car when it start to turn 90 degree
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
        frequency:6,
        amplitude:Math.PI/15,
        timeFragment:undefined,
        phase: undefined,
    }
    /**turns on the trajectory path and resets its parameters */
    #resetTrajictoryPath()
    {
        this.#trajictoryPath.isActive = true;
        this.#trajictoryPath.time = 0;
        this.#trajictoryPath.baseLineAngle = this.carBody.physic.angle;
        this.#trajictoryPath.timeFragment = .005;
        let phaseSelector = Math.random() <0.5?0:1
        this.#trajictoryPath.phase = phaseSelector==0 ? 0 : Math.PI;
    }
    /**It activate the action of turning 90 degree*/
    #resetTurn90()
    {
        //randomly set turn90 status to turn right(1) or left(-1)
        let isTurnRight = Math.random() < 0.5 ? true : false;
        this.#turn90.status = isTurnRight? 1:-1;
        this.#turn90.initialAngle=this.carBody.physic.angle;
    }
    /**handles the movement of opponent cars based on the provided mode
     * mode: number 1 - stop, 2 - forward/backward and turn 90 at car-car collision,
     *  3 - sine movement and turn 90 at car-car collision
     */
    steering(mode)
    {
        //makes all cars stop when switch from mode 2 or 3 to mode 1
        if(mode == 1 )
        {
            this.#trajictoryPath.isActive = false;
            this.#turn90.status = 0;
            this.moveForward(false);
            this.moveBackward(false);
        }
        //makes sure in mode 2 the wheel is straight if it has been in mode 3 before
        mode == 2 && this.turnWheels(0);

        //the car will move forward or backward 
        if(mode == 2 || mode == 3)
        {
            this.#isMovingForward?this.moveForward(true):this.moveBackward(true);
            this.manageTurn90()
        }

        //the car will move on the trajectory path based on the parameters of the this.#trajictoryPath
        mode ==3 && this.sineMovement();

        //car will turn 90 degree to left or right based on the status of this.#turn90
    }  
    /**Toggle the car from moving forward to backward */
    toggleHeading()
    {  
        this.acceleration=0
        this.#isMovingForward = !this.#isMovingForward;
        //it resets the trajectory path with new phase to prevent cars from being stuck and keep hitting barriers
        this.#resetTrajictoryPath();
    }
    /**starts turning 90 and deactivates trajictory path*/
    setOnTurn90()
    {
        this.#resetTurn90();
        this.#trajictoryPath.isActive = false;
    }  
    /**is called at each frame and if turn90 is active will update the wheel angle  */
    manageTurn90()
    {
        if(this.#turn90.status !== 0)
        {
            //this is used to count the moving forward and backward of car into calculation. Whithout this
            //car will keep truning infinitly when it is backwarding and turn90 happens
            let backwardCofficient = this.#isMovingForward? 1 :-1;
            let targetAngle = this.#turn90.initialAngle + (Math.PI/2) * this.#turn90.status*backwardCofficient;
            //check if the turn90 is on and the action of turning is completed turn it of
            if(this.carBody.physic.angle > targetAngle && this.#turn90.status == 1 || this.carBody.physic.angle < targetAngle && this.#turn90.status == -1)
            {
                this.#turn90.status = 0;
            }
            //update the wheel status based on the status of turn90 object
            this.turnWheels(0.02*this.#turn90.status); 
        }
    }
    /** is called at each drame and if turn90 is not active updates the wheel angle base don the sine formula. Time and frequency
     of sine formula are taken from this.#trajictoryPath
    */
    sineMovement()
    {
        if(this.#turn90.status===0 )
        {
            if(!this.#trajictoryPath.isActive)
            {
                this.#resetTrajictoryPath();
            }
            //this is a sine wave formula for the angle of the car to make the car move in a sine trajectory path
            //the amplitude is equal to pi/4 (45 degree) and the baseline for the angle is the angle of car at start of the trejectory
            let wheelAngleTarget = this.#trajictoryPath.amplitude*Math.sin(this.#trajictoryPath.time*this.#trajictoryPath.frequency +this.#trajictoryPath.phase);
            let incrementAngle = wheelAngleTarget-this.wheels.angle;
            this.turnWheels(incrementAngle);
            this.#trajictoryPath.time+=this.#trajictoryPath.timeFragment;
        }
    }
}
