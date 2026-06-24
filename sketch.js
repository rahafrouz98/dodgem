
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

function setup() {
    createCanvas(windowWidth, windowHeight);
    parkingBay = new ParkingBay(numberOfLots, windowWidth/5, windowHeight);
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
    else if(keyIsDown(37))
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



/*#################################functions###################################*/
function spawnPlayerCar(lotIndex)
{
    let carPosition = parkingBay.signaling(lotIndex)

    playerCar= new Car(carPosition);
}




