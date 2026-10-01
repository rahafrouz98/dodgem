<<<<<<< HEAD
import Sparker from "./Sparker.js";
=======
import Sparker from "./Sparker.js"
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200

/**this function handles the cars instant reaction when collision happens with batrrier or another car.
 It takes the event and the opponent car array as input.
 *_event: Matterjs Event instance, _opponentCars: a reference to the array of opponentCars in the sketch
 */
<<<<<<< HEAD
export let collisionInstanteManeuver = (_event, _opponentCars) => {
    //loop through all the pairs of collisions
    _event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        /*############################# barrier collision #########################################*/
        //only the barrier component have parent as they are assembled as a single component
        if (bodyA.name == "barrier" && bodyB.name == "opponentCar") {
            _opponentCars[bodyB.carIndex].toggleHeading();
        } else if (bodyB.name == "barrier" && bodyA.name == "opponentCar") {
            _opponentCars[bodyA.carIndex].toggleHeading();
        } else if (bodyA.name == "opponentCar" || bodyB.name == "opponentCar") {
        /*############################## car-car collision ###########################################*/
            //randomly decides both cars turn 90 degree or just on car turns 90 degree
            //with 0 only one opponent car turns and 1 both opponent cars (if applicable) turns
            // chaining operator is used to prevent error when one of the cars is player car
            let selector = Math.random() < 0.5 ? 0 : 1;
            if (selector == 1) {
                _opponentCars[bodyA.carIndex]?.setOnTurn90();
                _opponentCars[bodyB.carIndex]?.setOnTurn90();
            } else {
                _opponentCars[bodyA.carIndex]?.setOnTurn90();
            }
        }
    });
};
=======
export let collisionInstanteManeuver = (_event, _opponentCars)=> {
    //loop through all the pairs of collisions
    _event.pairs.forEach(pair=>{
        const {bodyA, bodyB} = pair;
        /*############################# barrier collision #########################################*/
        //only the barrier component have parent as they are assembled as a single component
        if(bodyA.name == "barrier" && bodyB.name=="opponentCar")
        {
            _opponentCars[bodyB.carIndex].toggleHeading();
        }
        else if(bodyB.name == "barrier" && bodyA.name=="opponentCar")
        {
            _opponentCars[bodyA.carIndex].toggleHeading();
        }
        /*############################## car-car collision ###########################################*/
        else if(bodyA.name == "opponentCar" || bodyB.name == "opponentCar")
        {

            //randomly decides both cars turn 90 degree or just on car turns 90 degree
            //with 0 only one opponent car turns and 1 both opponent cars (if applicable) turns
            // chaining operator is used to prevent error when one of the cars is player car 
            let selector = Math.random() <0.5 ? 0 : 1;
            if(selector == 1)
            {
                _opponentCars[bodyA.carIndex]?.setOnTurn90();
                _opponentCars[bodyB.carIndex]?.setOnTurn90();
            }
            else
            {
                _opponentCars[bodyA.carIndex]?.setOnTurn90(); 
            }
        }
    })
}
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200

/**this function will be used for handeling active collision between cars to change the heading of the engaged car and 
prevent it from getting stuck.
*_event: Matterjs Event instance, _opponentCars: a reference to the array of opponentCars in the sketch
 */
<<<<<<< HEAD
export let collisionActiveManeuver = (_event, _opponentCars) => {
    _event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (bodyA.name == "opponentCar" && bodyA.speed == 0) {
            _opponentCars[bodyA.carIndex]?.toggleHeading();
        } else if (bodyB.name == "opponentCar" && bodyB.speed == 0) {
            _opponentCars[bodyB.carIndex]?.toggleHeading();
        }
    });
};
=======
export let collisionActiveManeuver = (_event, _opponentCars)=>
{
    _event.pairs.forEach(pair=>{
        const {bodyA, bodyB} = pair;
        if(bodyA.name == "opponentCar" && bodyA.speed ==0 )
        {
                _opponentCars[bodyA.carIndex]?.toggleHeading();
        }
        else if(bodyB.name == "opponentCar" && bodyB.speed == 0)
        {
            _opponentCars[bodyB.carIndex]?.toggleHeading();
        }
    })
}
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
/**this callback function generates spark particles when collision happens and adds the collision history to the engaged cars
  *_event: Matterjs Event instance, _sparks: [Sparks], _opponentCars: [OpponentCars] , _playerCar: PlayerCar
 
 */
<<<<<<< HEAD
export let collisionSpark = (_event, _sparks, _opponentCars, _playerCar) => {
    //loop through all the pairs of collisions
    _event.pairs.forEach((pair) => {
        const { bodyA, bodyB, collision } = pair;
        //if collision is between two cars or between a car and a pole (not wall)
        if (
            ((bodyA.name == "opponentCar" || bodyA.name == "playerCar") &&
                (bodyB.name == "opponentCar" || bodyB.name == "playerCar")) ||
            ((bodyA.name == "opponentCar" || bodyA.name == "playerCar") && bodyB.side == "pole") ||
            ((bodyB.name == "opponentCar" || bodyB.name == "playerCar") && bodyA.side == "pole")
        ) {
            collision.supports.forEach((support) => _sparks.push(new Sparker(support.x, support.y, collision.depth)));
            //record collision data on the hidtory of cars
            if (bodyA.name == "playerCar") _playerCar?.manageCollision(collision);
            else if (bodyB.name == "playerCar") _playerCar?.manageCollision(collision);
            if (bodyA.name == "opponentCar") _opponentCars[bodyA.carIndex]?.manageCollision(collision);
            if (bodyB.name == "opponentCar") _opponentCars[bodyB.carIndex]?.manageCollision(collision);
        }
    });
};
=======
export let collisionSpark = (_event, _sparks, _opponentCars, _playerCar) =>
{
    //loop through all the pairs of collisions
    _event.pairs.forEach(pair=>{
        const {bodyA, bodyB, collision} = pair;
        //if collision is between two cars or between a car and a pole (not wall)
        if(((bodyA.name == "opponentCar" || bodyA.name == "playerCar")&& 
           (bodyB.name == "opponentCar" || bodyB.name == "playerCar")) ||
           ((bodyA.name == "opponentCar" || bodyA.name == "playerCar")&& bodyB.side == "pole") ||
           ((bodyB.name == "opponentCar" || bodyB.name == "playerCar")&& bodyA.side == "pole"))
        {
            collision.supports.forEach(support=>_sparks.push(new Sparker(support.x, support.y, collision.depth)));
            //record collision data on the hidtory of cars
            if(bodyA.name == "playerCar") _playerCar?.manageCollision(collision);
            else if(bodyB.name == "playerCar") _playerCar?.manageCollision(collision);
            if(bodyA.name == "opponentCar") _opponentCars[bodyA.carIndex]?.manageCollision(collision);
            if(bodyB.name == "opponentCar") _opponentCars[bodyB.carIndex]?.manageCollision(collision);
        }
    })
}
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200

/**this callback function generates pulse on the barrier when collision happens
 * _event: Matterjs Event instance, _guard: Guard instance
 */
<<<<<<< HEAD
export let collisionPulse = (_event, _guard) => {
    //loop through all the pairs of collisions
    _event.pairs.forEach((pair) => {
        const { bodyA, bodyB, collision } = pair;
        /*############################# barrier collision #########################################*/
        //only the barrier component have parent as they are assembled as a single component
        if (bodyA.name == "barrier") {
            _guard.collisionManager(bodyA.side, collision.depth);
        } else if (bodyB.name == "barrier") {
            _guard.collisionManager(bodyB.side, collision.depth);
        }
    });
};
=======
export let collisionPulse = (_event, _guard)=> {
    //loop through all the pairs of collisions
    _event.pairs.forEach(pair=>{
        const {bodyA, bodyB, collision} = pair;
        /*############################# barrier collision #########################################*/
        //only the barrier component have parent as they are assembled as a single component
        if(bodyA.name == "barrier" )
        {
            _guard.collisionManager(bodyA.side, collision.depth);
        }
        else if(bodyB.name == "barrier")
        {
            _guard.collisionManager(bodyB.side, collision.depth);
        }
    })
}




>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
