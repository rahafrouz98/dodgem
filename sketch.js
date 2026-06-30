import PlayerCar from "./PlayerCar.js"
import ParkingBay from "./ParkingBay.js"
import Guard from "./Guard.js"
import OpponentCarA from "./OpponentCarA.js"
import OpponentCarB from "./OpponentCarB.js"
import {collisionActiveManeuver,collisionInstanteManeuver, collisionSpark} from "./eventCallBacks.js"

let {Engine, Events} = Matter

const sketch = (p)=>
{
    let engine = Engine.create();
    engine.gravity.y = 0;
    engine.gravity.y = 0;
        
    let parkingBay;
    let playerCar;
    let arenaWidth;
    let arenaHeight;
    let guard;
    let opponentCars=[]
    let numberOfOpponentCars =  2;
    let mode =3;
    let sparks=[]

    p.setup = ()=>
    {
        p.createCanvas(1400, 700);
        let barrierThickness = 10;
        parkingBay = new ParkingBay( barrierThickness, barrierThickness,
                                    p.width/5, p.height-(barrierThickness*2), engine);
        guard = new Guard(25,25, 1375,675, barrierThickness, engine);
        //spawn the opponent cars at random places inside the parking bay(start zone)
        spawnOpponentCars(numberOfOpponentCars);
    }
    
    p.draw = ()=>
    {
        p.background(215,252,251);
        Matter.Engine.update(engine)
    
        parkingBay.draw(p);
        
        
        playerCar?.draw(p);
        playerCar?.steering(p);
        
        opponentCars.forEach(car => {
            car.draw(p);
            car.steering(mode);
        })

        manageSparks()
        
        guard.draw(p);
    
    }
    
    /*################################# interactions ###############################*/
    p.mouseClicked = ()=>
    {
        if(p.keyIsDown(73) )
        {
            spawnPlayerCar(p.mouseX, p.mouseY, 60,120);
        }
    }
    
    /*################################# functions ###################################*/
    let spawnPlayerCar =(_x,_y, carLength, carWidth)=>
    {
        //if there is no overlap with other existing cars and it is not already existing and the mouse is inside start zone
        if(!playerCar && !isOverlapped( _x, _y, carLength) && parkingBay.isInStartZone(_x,_y))
        {
            let carPosition = {x:_x,y:_y};
            playerCar= new PlayerCar(carPosition, carLength, carWidth , engine);
        }
    }

    //cheks if the an area of length equal to _carLength and at given x and y has any car in it
    let isOverlapped =(_x,_y, _carLength)=>
    {
        //list of bodies pressented at the point (_x,_y)
        let point = {x:_x, y:_y};
        let carBodies =[];
        //if playerCar exists add its matterjs body to the list
        playerCar && carBodies.push(playerCar.carBody.physic);
        //add the matterjs bodies of opponent cars'  to the list 
        opponentCars.forEach(car => carBodies.push(car.carBody.physic));
        let bounds = Matter.Bounds.create([{x:_x+ _carLength, y: _y+ _carLength}, 
                                           {x:_x+ _carLength, y: _y- _carLength},
                                           {x:_x- _carLength, y: _y- _carLength},
                                           {x:_x- _carLength, y: _y+ _carLength}
                                        ])
        let collidedBodiesList = Matter.Query.region(carBodies, bounds)
        if(collidedBodiesList.length != 0) return true;
        return false;
    }
    //inserts the opponent cars where there is no overlap with other cars
    //Based on game mode provides start angle to opponents
    let insertOpponentCar =(cartype, carLength, carWidth)=>
    {
        let _x, _y;
        while(true)
        {
            _x = p.random(60, p.width/5-60);
            _y = p.random(60, p.height-60);

            if(!isOverlapped(_x, _y, carLength))
            {
                break;
            }
        }
        //sets the start angle to zero for mode 1 and random angle for mode 2 and 3
        let startAngle = mode == 1 ? 0 : p.random(0,Math.PI*2);

        if(cartype == "A")
        {
            opponentCars.push(new OpponentCarA({x:_x, y:_y}, carLength, carWidth ,engine, opponentCars.length, startAngle))
        }
        else
        {
            opponentCars.push(new OpponentCarB({x:_x, y:_y}, carLength, carWidth ,engine, opponentCars.length, startAngle))
        }
        
    }
    //spawn the opponent cars inside the start zone based on the provided number of cars
    //It starts with filling the first half with carA and the fill the remaining with carB
    let spawnOpponentCars = (numberOfOpponentCars)=>
    {
        for(let i = 0; i < numberOfOpponentCars/2; i++)
        {
            insertOpponentCar("A", 60, 120);
        }
        let availableNumber = numberOfOpponentCars - opponentCars.length;
        for(let i = 0; i < availableNumber; i++)
        {
            insertOpponentCar("B", 60,120);
        }
    }

    let manageSparks =()=>
    {
        for(let i = sparks.length - 1; i >= 0; i--)
        {
            if(sparks[i].sparkParticles.length ==0)
            {
                sparks.splice(i, 1);
                continue;
            }
            sparks[i].draw(p);
        }
         console.log(sparks.length);
    }
    /*#################################### Event Listeners ##############################################*/
    Events.on(engine, 'collisionStart', (event)=>
        {
            collisionInstanteManeuver(event,opponentCars);
            collisionSpark(event, sparks);
        });
    Events.on(engine, 'collisionActive', (event)=>collisionActiveManeuver(event,opponentCars));
}
new p5(sketch);


/**https://www.html5gamedevs.com/topic/39536-identify-objects-in-collisionstart/ for adding label
 https://github.com/liabru/matter-js/issues/744 for parent
 https://stackoverflow.com/questions/70624648/matter-query-region-not-returning-any-collisions-even-though-the-bound-is-clearl for query.region
 */


