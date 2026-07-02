import PlayerCar from "./PlayerCar.js"
import ParkingBay from "./ParkingBay.js"
import Guard from "./Guard.js"
import OpponentCarA from "./OpponentCarA.js"
import OpponentCarB from "./OpponentCarB.js"
import {collisionActiveManeuver,collisionInstanteManeuver, collisionSpark, collisionPulse} from "./eventCallBacks.js"

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
    let opponentCars=[];
    let numberOfOpponentCars =  4;
    let mode =3;
    let sparks=[];
    let barrierThickness = 10;

    p.setup = ()=>
    {
        p.createCanvas(1400, 700);
        createMenu();
        parkingBay = new ParkingBay( barrierThickness, barrierThickness,
                                    p.width/4, p.height-(barrierThickness*2), engine);
        guard = new Guard(p,20,20, 1380,680, barrierThickness, engine);
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

        manageSparks();
        
        guard.draw();
    
    }
    
    /*################################# interactions ###############################*/
    p.mouseClicked = ()=>
    {
        if(p.keyIsDown(73) )
        {
            spawnPlayerCar(p.mouseX, p.mouseY, 60,120);
        }
    }
    p.mouseMoved = ()=>
    {
        if(p.mouseX < p.width && p.mouseX > p.width -300  && p.mouseY < 300)
        {
            p.select("#menu").style("display", "block")
        }
        else 
        {
            p.select("#menu").style("display", "none")
        }
    }
    
    /*################################# functions ###################################*/
    /** checks the provided location and if the car with specified length and width fit in .
    it creates a player car at that point
     * -x: number, -y: number, _carWidth: number, _carLength: number 
      */
    let spawnPlayerCar =(_x,_y, _carWidth, _carLength)=>
    {
        //if there is no overlap with other existing cars and it is not already existing and the mouse is inside start zone
        if(!playerCar && !isOverlapped( _x, _y, _carLength/2) && parkingBay.isInStartZone(_x,_y))
        {
            let carPosition = {x:_x,y:_y};
            playerCar= new PlayerCar(p,carPosition, _carWidth, _carLength , engine);
        }
    }

    /**checks if the area with provided center and twice of provided dimension has any other body with its center inside that area
     * -x: number, _y: number, _length: number
    */
    let isOverlapped =(_x,_y, _length)=>
    {
        //list of bodies pressented at the point (_x,_y)
        let point = {x:_x, y:_y};
        let carBodies =[];
        //if playerCar exists add its matterjs body to the list
        playerCar && carBodies.push(playerCar.carBody.physic);
        //add the matterjs bodies of opponent cars'  to the list 
        opponentCars.forEach(car => carBodies.push(car.carBody.physic));
        let bounds = Matter.Bounds.create([{x:_x+ _length, y: _y+ _length}, 
                                           {x:_x+ _length, y: _y- _length},
                                           {x:_x- _length, y: _y- _length},
                                           {x:_x- _length, y: _y+ _length}
                                        ])
        let collidedBodiesList = Matter.Query.region(carBodies, bounds)
        if(collidedBodiesList.length != 0) return true;
        return false;
    }
    /**inserts the opponent cars where there is no overlap with other cars. 
    in Mode 1, cars will start with zero angle and in mode 2 and 3 they have random directions
     * -ca*/
    let insertOpponentCar =(_cartype, _carLength, _carWidth)=>
    {
        let _x, _y;
        while(true)
        {
            _x = p.random(60, p.width/5-60);
            _y = p.random(60, p.height-60);

            if(!isOverlapped(_x, _y, _carLength))
            {
                break;
            }
        }
        //sets the start angle to zero for mode 1 and random angle for mode 2 and 3
        let startAngle = mode == 1 ? 0 : p.random(0,Math.PI*2);

        if(_cartype == "A")
        {
            opponentCars.push(new OpponentCarA(p,{x:_x, y:_y}, _carLength, _carWidth ,engine, opponentCars.length, startAngle))
        }
        else
        {
            opponentCars.push(new OpponentCarB(p,{x:_x, y:_y}, _carLength, _carWidth ,engine, opponentCars.length, startAngle))
        }
        
    }
    /**spawn the opponent cars inside the start zone based on the provided number of cars
    It starts with filling the first half with carA and the fill the remaining with carB
    *-numberOfOpponentCars: number*/
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
    }
    /**clears the instances , the MAtterjs engine and reinitiate them*/
    let resetGame = ()=>
    {
        playerCar = null;
        opponentCars = [];
        sparks = [];

        Matter.World.clear(engine.world, false);
        Engine.clear(engine)


        parkingBay = new ParkingBay( barrierThickness, barrierThickness,
                                    p.width/4, p.height-(barrierThickness*2), engine);
        guard = new Guard(p,20,20, 1380,680, barrierThickness, engine);
        //spawn the opponent cars at random places inside the parking bay(start zone)
        spawnOpponentCars(numberOfOpponentCars);

    }
    /*#################################### Event Listeners ##############################################*/
    /**it is an event listerner for instante action when collision happens
     it manages collision maneuver, sparking and adding collision data to the car instances, and pulse on the walls
     */
    Events.on(engine, 'collisionStart', (event)=>
        {
            collisionInstanteManeuver(event,opponentCars);
            collisionSpark(event, sparks, opponentCars, playerCar);
            collisionPulse(event, guard);
        });

    /**This event listenr is applied to toogle the direction of cars when they are stuck */
    Events.on(engine, 'collisionActive', (event)=>collisionActiveManeuver(event,opponentCars));


    /*################################### Menu #############################################################*/
    /**It creates a menu on the left top side of the canvas and will pop up when the mouse moves on that area */
    let  createMenu = ()=>
    {

        let menuContainer = p.createDiv();
        menuContainer.style("width", "300px");
        menuContainer.style("height", "200px");
        menuContainer.style("background", "rgba(2, 57, 121, 0.3)")
        menuContainer.id("menu");
        setTimeout(() => { menuContainer.style("display", "none")}, 2000 );
        menuContainer.position(p.width-350, 25);

        
        let modeLabel = p.createElement("label", "Select game mode: ");
        modeLabel.position(50,30)

        menuContainer.child(modeLabel)

        let modeSelector = p.createRadio();
        modeSelector.position(50,50);
        modeSelector.size(250)
        modeSelector.option(1);
        modeSelector.option(2);
        modeSelector.option(3);

        //event listener for the change in the mode
        modeSelector.changed(()=>
            {
                mode = modeSelector.value();
            })
        modeSelector.selected(String(mode));

        menuContainer.child(modeSelector);

        let numberSelectorLabel = p.createElement("label", "Select Number of Cars: ");
        numberSelectorLabel.position(50,100)

        menuContainer.child(numberSelectorLabel)


        let carNumbersSelector = p.createSelect();
        carNumbersSelector.position(50, 120);
        carNumbersSelector.option(4);
        carNumbersSelector.option(3);
        carNumbersSelector.option(2);
        carNumbersSelector.option(1);
        carNumbersSelector.selected(String(numberOfOpponentCars))

        //event listener for the change in the number of cars
        carNumbersSelector.changed(()=>{
            numberOfOpponentCars = carNumbersSelector.value();
           
            while(numberOfOpponentCars < opponentCars.length)
            {
                Matter.World.remove(engine.world, opponentCars.at(-1).carBody.physic);
                opponentCars.pop();
            
            }
            while(numberOfOpponentCars > opponentCars.length)
            {
                spawnOpponentCars((numberOfOpponentCars - opponentCars.length));
            }
        });

        menuContainer.child(carNumbersSelector);

        let resetButton = p.createButton("Reset Game");
        resetButton.position(50, 160);
        resetButton.style("width", "200px");
        resetButton.style("height", "30px");
        resetButton.style("border-radius", "15px");
        
        resetButton.mousePressed(resetGame);

         menuContainer.child(resetButton);
    }
}
new p5(sketch);


/**https://www.html5gamedevs.com/topic/39536-identify-objects-in-collisionstart/ for adding label
 https://github.com/liabru/matter-js/issues/744 for parent
 https://stackoverflow.com/questions/70624648/matter-query-region-not-returning-any-collisions-even-though-the-bound-is-clearl for query.region
 https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/6-physics-libraries/3-matterjs-deleting-bodies removig bodies
 https://github.com/liabru/matter-js/issues/564 to reset engine
 https://stackoverflow.com/questions/60195772/how-to-completely-stop-reset-reinitialize-matter-js-canvas-world-engine-instance
 */


