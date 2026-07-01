import Particle from "./Particle.js"
export default class BurningSmoke
{
    /**it is a class for simulating smoke from a burning car
     * _p is a reference to p5 object
     * the positin of the smoke
     */
    constructor( _p, _emitterSize)
    {
        this.#emitterSize = _emitterSize;
        this.#p = _p;
        this.#seedSize = 10;
        this.#startSmoke()
    }
    #p;
    #smokeSeeds=[];
    #particlesRadius = 3;
    #startAlpha = 150;
    #turbulance = 5;
    #batchSize = 5;
    #seedSize;
    #emitterSize;
    
    /**it create seeds for the smoke */
    #startSmoke()
    { 
        {
            for(let i = 0; i < this.#seedSize; i++)
            {
                let seed = {x: 0,
                            y: 0,
                            particles:[]}
                
                this.#smokeSeeds.push(seed);
            }
            
        }
    }
    //ads smoke particles and updte the position
    emitteSmoke( _emitterPosition)
    {
        let p = this.#p;
       
        //update the position of seeds. it is functional when car is hittd and moves
        this.#smokeSeeds.forEach(seed => {
            seed.x = _emitterPosition.x + Math.random()*2*this.#emitterSize-this.#emitterSize
            seed.y = _emitterPosition.y + Math.random()*2*this.#emitterSize-this.#emitterSize;
        })
        console.log(this.#smokeSeeds)

        //add new smoke 
        this.#smokeSeeds.forEach(seed => {
            
            for(let i = 0; i < this.#batchSize; i++)
            {     
                seed.particles.push(new Particle(seed.x+p.noise(seed.x/100+p.framecount/1000)*2*this.#turbulance-this.#turbulance,
                                                seed.y+p.noise(seed.y/100+p.framecount/1000)*2*this.#turbulance-this.#turbulance,
                                                this.#particlesRadius, this.#startAlpha, 0, true)); seed.y, 
                                                this.#particlesRadius, this.#startAlpha, 0, true;
            }
        })
    }

    draw(p)
    {
        console.log(this.#smokeSeeds)
        this.#smokeSeeds.array.forEach(seed => {
            console.log(seed)
            console.log(seed.particles);
            seed.particles.forEach(particle => {
                particle.drawBurningSmoke(p);
            })
            
        });
     
        this.#update();
    }
    
    #update(p)
    {
        this.#smokeSeeds.forEach((seed)=>
        {
            for (let i = seed.particles.length - 1; i >= 0; i--)
            {
                //if the particle is faded remove it
                if(seed.particles[i].alpha <= 5)
                {
                    seed.particles[i].splice(i, 1);
                }
            }
        })
    }
}