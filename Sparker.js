import Particle from "./Particle.js"
export default class Sparker
{
    /**It creates a new spark at position x,y with a size based on collision depth */
    constructor(_x, _y, _collisionDepth)
    {
        this.#x = _x;
        this.#y = _y;
        this.#collisionDepth = _collisionDepth;

    }
    #x;
    #y;
    #collisionDepth;
    #particleSize = 5;
    #startAlpha = 150;
    sparkParticles=[];
    
    generateSpark(_collisionDepth)
    {
        
        let sparksNumber = _collisionDepth * 10;
        console.log(sparksNumber)
        for(let i = 0; i < sparksNumber; i++)
        {                                           
            this.sparkParticles.push(new Particle(this.#x, this.#y, this.#particleSize, this.#startAlpha, 0, true));
        }
    }
    
    draw(p)
    {
        this.sparkParticles.forEach(particle => {
            particle.drawSpark(p);
        });
    }

    update(p)
    {
        //remove faded particles
        for(let i = this.sparkParticles.length - 1; i >= 0; i--)
        {
            if(this.sparkParticles[i].alpha <= 5)
            {
                this.sparkParticles.splice(i, 1);
            }
        }
    }
}