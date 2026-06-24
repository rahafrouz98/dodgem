let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let engine = Engine.create();
engine.gravity.y = 0;
engine.gravity.y = 0;

let numberOfLots = 5;
let parkingBay;
let opponentCars =[];
let playerCar;
let arenaWidth;
let arenaHeight;

function setup() {
    createCanvas(windowWidth, windowHeight);
    arenaWidth = windowWidth*.9;
    arenaHeight = windowHeight*.9;
    parkingBay = new ParkingBay(numberOfLots, (windowWidth-arenaWidth)/2, (windowHeight-arenaHeight)/2 
                                ,arenaWidth/5, arenaHeight);
}

function draw() {
    background(215,252,251);
    Matter.Engine.update(engine)

    parkingBay.draw();

    playerCar?.draw();

    //up arrow
    if(keyIsDown(38))
    {
        playerCar?.moveForward(true);
    }
    //down arrow
    else if (keyIsDown(40))
    {
        playerCar?.moveBackward(true);
    }
    else
    {
        playerCar?.moveForward(false);
        playerCar?.moveBackward(false);
    }
    //right arrow
    if(keyIsDown(39) && (keyIsDown(40) || keyIsDown(38)))
    {
        playerCar?.turnRight(true);
    }
    //left arrow 
    else if(keyIsDown(37) && (keyIsDown(40) || keyIsDown(38)))
    {
        playerCar?.turnLeft(true);
    }


}

/*################################# interactions ###############################*/

function mouseClicked()
{

    if(keyIsDown(73) )
    {
        let lotIndex = parkingBay.isLotAvailavle(mouseX, mouseY)
        if(lotIndex != -1)
        {
            spawnPlayerCar(lotIndex)
            parkingBay.lotAvailablity[lotIndex] = false;
        }
    }
}



/*################################# functions ###################################*/
function spawnPlayerCar(lotIndex)
{
    let carPosition = parkingBay.signaling(lotIndex)

    playerCar= new Car(carPosition);
}




