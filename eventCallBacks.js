/**this function handles the cars instant reaction when collision happens with batrrier or another car.
 * It takes the event and the opponent car array as input
 */
export let collisionInstanteManeuver = (event,opponentCars)=> {
        //loop through all the pairs of collisions
        event.pairs.forEach(pair=>{
            const {bodyA, bodyB} = pair;
            /*############################# barrier collision #########################################*/
            //only the barrier component have parent as they are assembled as a single component
            if(bodyA?.parent.name == "barrier" && bodyB.name=="opponentCar")
            {
                opponentCars[bodyB.carIndex].toggleHeading();
            }
            //barrier collision
            else if(bodyB?.parent.name == "barrier" && bodyA.name=="opponentCar")
            {
                opponentCars[bodyA.carIndex].toggleHeading();
            }
            /*############################## cars collision ###########################################*/
            else if(bodyA.name == "opponentCar" || bodyB.name == "opponentCar")
            {

                //randomly decides both cars turn 90 degree or just on car turns 90 degree
                //with 0 only one opponent car turns and 1 both opponent cars (if applicable) turns
                let selector = Math.random() <0.5 ? 0 : 1;
                if(selector == 1)
                {
                    opponentCars[bodyA.carIndex]?.setOnTurn90();
                    opponentCars[bodyB.carIndex]?.setOnTurn90();
                }
                else
                {
                   opponentCars[bodyA.carIndex]?.setOnTurn90(); 
                }
            }
        })
}

/**this function will be used for handiling active collision between to change the headingof the engaged car and 
 *prevent it from getting stuck
 */
export let collisionActiveManeuver = (event, opponentCars)=>
{
    event.pairs.forEach(pair=>{
        const {bodyA, bodyB} = pair;
        if(bodyA.name == "opponentCar" && bodyA.speed ==0 )
        {
                opponentCars[bodyA.carIndex].toggleHeading();
        }
        else if(bodyB.name == "opponentCar" && bodyB.speed == 0)
        {
            opponentCars[bodyB.carIndex].toggleHeading();
        }
    })
}