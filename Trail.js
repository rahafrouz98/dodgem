import Particle from "./Particle.js";

export default class Trail {
    /**this is a constructor for simulating the track of tires on the ground when the car is in turning with enough speed
     * _width: number, _maxSpeed: number
     */
    constructor(_width, _maxSpeed) {
        this.#width = _width;
        this.#maxSpeed = _maxSpeed;
    }
    #maxSpeed;
    #width;
    #rightTrack = [];
    #leftTrack = [];
    #maxAlpha = 100;

    /**it takes the position, car width, angle,  and absolute speed of car and adds particles to the right and left track to the  */
    addTrack(_leftPosition, _rightPosition, _speed, _rotationSpeed, _angle) {
        if (_speed > 3 && _rotationSpeed > 0.02) {
            //max opacity will be when the speed is maximum
            let startAlpha = (_speed / this.#maxSpeed) * this.#maxAlpha;
            //left track particles insertion
            for (let i = 0; i < 5; i++) {
                //each batch will be spread in a square of 5 * this.#width
                this.#leftTrack.push(
                    new Particle(
                        _leftPosition.x + (i * this.#width) / 15,
                        _leftPosition.y,
                        this.#width,
                        startAlpha,
                        _angle,
                    ),
                );
            }
            //right track particles insertion
            for (let i = 0; i < 5; i++) {
                //each batch will be spread in a square of 5 * this.#width
                this.#rightTrack.push(
                    new Particle(
                        _rightPosition.x + (i * this.#width) / 15,
                        _rightPosition.y,
                        this.#width,
                        startAlpha,
                        _angle,
                    ),
                );
            }
        }
    }

    /**draws the trails and updates them at each frame
     * _p: p5 instance
     */
    draw(_p) {
        this.#leftTrack.forEach((particle) => {
            particle.drawTrail(_p);
        });
        this.#rightTrack.forEach((particle) => {
            particle.drawTrail(_p);
        });
        this.#update();
    }
    /**removes the faded particles to prevent memory leak */
    #update() {
        //left
        for (let i = this.#leftTrack.length - 1; i >= 0; i--) {
            //if the particle is faded remove it
            if (this.#leftTrack[i].alpha <= 5) {
                this.#leftTrack.splice(i, 1);
            }
        }
        //right
        for (let i = this.#rightTrack.length - 1; i >= 0; i--) {
            //if the particle is faded remove it
            if (this.#rightTrack[i].alpha <= 5) {
                this.#rightTrack.splice(i, 1);
            }
        }
    }
}
