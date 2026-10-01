import Particle from "./Particle.js";
export default class BurningSmoke {
    /**it is a class for simulating smoke from a burning car
     * _p:p5 object, _emitterSize: number
     */
    constructor(_p, _emitterSize) {
        this.#emitterSize = _emitterSize;
        this.#p = _p;
        this.#seedSize = 5;
        this.#startSmoke();
    }
    #p;
    #smokeSeeds = [];
    #particlesRadius = 2;
    #startAlpha = 150;
    #turbulance = 5;
    #batchSize = 3;
    #seedSize;
    #emitterSize;

    /**it create seeds for the smoke */
    #startSmoke() {
        {
            for (let i = 0; i < this.#seedSize; i++) {
                let seed = { x: 0, y: 0, particles: [] };

                this.#smokeSeeds.push(seed);
            }
        }
    }
    /**updte the position of the burning and ads smoke particles and
     * _emitterPosition: {x:number, y:number}
     */
    emitteSmoke(_emitterPosition) {
        let p = this.#p;

        //update the position of seeds. it is functional when car is hittd and moves
        this.#smokeSeeds.forEach((seed) => {
            seed.x =
                _emitterPosition.x + p.noise(seed.x + p.frameCount / 1000) * 2 * this.#emitterSize - this.#emitterSize;
            seed.y =
                _emitterPosition.y + p.noise(seed.y + p.frameCount / 1000) * 2 * this.#emitterSize - this.#emitterSize;
        });

        //add new smoke
        this.#smokeSeeds.forEach((seed) => {
            for (let i = 0; i < this.#batchSize; i++) {
                seed.particles.push(
                    new Particle(
                        seed.x + p.noise(seed.x / 100 + p.frameCount / 1000) * 2 * this.#turbulance - this.#turbulance,
                        seed.y + p.noise(seed.y / 100 + p.frameCount / 1000) * 2 * this.#turbulance - this.#turbulance,
                        this.#particlesRadius,
                        this.#startAlpha,
                        0,
                        true,
                    ),
                );
            }
        });
    }

    /**draws the smoke particles at each frame and update arrays of seed*/
    draw() {
        let p = this.#p;
        this.#smokeSeeds.forEach((seed) => {
            seed.particles.forEach((particle) => {
                particle.drawBurningSmoke(p);
            });
        });

        this.#update();
    }
    /**removes the faded particles to prevent memory leak */
    #update() {
        this.#smokeSeeds.forEach((seed) => {
            for (let i = seed.particles.length - 1; i >= 0; i--) {
                //if the particle is faded remove it
                if (seed.particles[i].alpha <= 5) {
                    seed.particles.splice(i, 1);
                }
            }
        });
    }
}
