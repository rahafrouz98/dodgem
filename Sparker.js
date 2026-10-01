import Particle from "./Particle.js";
export default class Sparker {
    /**creates a new spark at provided position based on the provided collision depth
     * _x: number, _y: number, _collisionDepth: number
     */
    constructor(_x, _y, _collisionDepth) {
        this.#x = _x;
        this.#y = _y;
        this.#collisionDepth = _collisionDepth;
        this.generateSparkParticles();
    }
    #x;
    #y;
    #collisionDepth;
    #particleSize = 4;
    #startAlpha = 150;
    sparkParticles = [];

    /**initiates spark particles and adds them to the sparkParticles array. The number of
     particles is calculated based on the collision depth
     *_collisionDepth: number */
    generateSparkParticles(_collisionDepth) {
        let sparksNumber = this.#collisionDepth * 0.7;
        for (let i = 0; i < sparksNumber; i++) {
            this.sparkParticles.push(
                new Particle(this.#x, this.#y, this.#particleSize, this.#startAlpha, 0, CSSViewTransitionRule),
            );
        }
    }

    /**draws the spark particles
     * _p: p5 instance
     */
    draw(_p) {
        this.sparkParticles.forEach((particle) => {
            particle.drawSpark(_p);
        });
    }

    /**removes the faded particles to prevent memory leak */
    update() {
        for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
            if (this.sparkParticles[i].alpha <= 5) {
                this.sparkParticles.splice(i, 1);
            }
        }
    }
}
