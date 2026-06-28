/**this function handles the cars reaction when collision happens with batrrier or another car
 -it takes the event and the opponent car array as input
 */
export let collisionManeuver = (event,opponentCars)=> {
        event.pairs.forEach(pair=>{
            const {bodyA, bodyB} = pair;
            //barrier collision
            if(bodyA?.parent.name == "barrier")
            {
                (bodyB.name=="opponentCar") && opponentCars[bodyB.carIndex].reverseHeading();
            }
            //barrier collision
            else if(bodyB?.parent.name == "barrier")
            {
                (bodyA.name=="opponentCar") && opponentCars[bodyA.carIndex].reverseHeading();
            }
            //cars collision
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