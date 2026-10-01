<<<<<<< HEAD
import Particle from "./Particle.js";
export default class Smoker {
=======
import Particle from "./Particle.js"
export default class Smoker
{
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
    /**simulates an smooking exhaust for carB. It draws smoke for the exhaust when the acceleration reaches to a level (like
     when the car engine is working hard).
    *_maxAcceleration: number, _emitterSize:number
    */
<<<<<<< HEAD
    constructor(_maxAcceleration, _emitterSize) {
        this.#maxAcceleration = _maxAcceleration;
        this.#emitterSize = _emitterSize;
    }
    #smokeCloude = [];
=======
    constructor( _maxAcceleration, _emitterSize)
    {
        this.#maxAcceleration = _maxAcceleration;
        this.#emitterSize = _emitterSize;
    }
    #smokeCloude=[];
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
    #maxAcceleration;
    #emitterSize;
    #particlesRadius = 5;
    #startAlpha = 150;

    /**adds a batch of particles to the smokeCloude array. The number of particles are based on the provided 
    acceleration. it takes the absolute acceleration of the car and absolute position of the emitter
     * _emitterPosition: {x:number, y:number}, _acceleration: positive number
     */
<<<<<<< HEAD
    emmitSmoke(_emitterPosition, _acceleration) {
        if (_acceleration > 0.005) {
            let batchSize = (_acceleration / this.#maxAcceleration) * 1.5;
            for (let i = 0; i < batchSize; i++) {
                this.#smokeCloude.push(
                    new Particle(
                        _emitterPosition.x + Math.random() * 2 * this.#emitterSize - this.#emitterSize,
                        _emitterPosition.y + Math.random() * 2 * this.#emitterSize - this.#emitterSize,
                        this.#particlesRadius,
                        this.#startAlpha,
                        0,
                        true,
                    ),
                );
            }
        }
    }
    /**draws the particles and update the smokeCloude array
     * _p: p5 instance
     */
    draw(_p) {
        this.#smokeCloude.forEach((particle) => {
=======
    emmitSmoke( _emitterPosition, _acceleration)
    { 
        if(_acceleration > 0.005 )
        {
            let batchSize = _acceleration/this.#maxAcceleration *1.5; 
            for(let i = 0; i < batchSize; i++)
            {
                
                this.#smokeCloude.push(new Particle(_emitterPosition.x + Math.random()*2*this.#emitterSize-this.#emitterSize,
                                                    _emitterPosition.y + Math.random()*2*this.#emitterSize-this.#emitterSize, 
                                                    this.#particlesRadius, this.#startAlpha, 0, true));
            } 
            
        }
    }
    /**draws the particles and update the smokeCloude array 
     * _p: p5 instance
    */
    draw(_p)
    {
        this.#smokeCloude.forEach(particle => {
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
            particle.drawEngineSmoke(_p);
        });

        this.#update();
    }
<<<<<<< HEAD

    /**removes the faded particles to prevent memory leak */
    #update() {
        for (let i = this.#smokeCloude.length - 1; i >= 0; i--) {
            //if the particle is faded remove it
            if (this.#smokeCloude[i].alpha <= 5) {
=======
    
    /**removes the faded particles to prevent memory leak */
    #update()
    {
        for (let i = this.#smokeCloude.length - 1; i >= 0; i--)
        {
            //if the particle is faded remove it
            if(this.#smokeCloude[i].alpha <= 5)
            {
>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
                this.#smokeCloude.splice(i, 1);
            }
        }
    }
<<<<<<< HEAD
=======


>>>>>>> 2314b52870a68583f081bd6b798956e8b34df200
}
