import Particle from "./Particle.js"
export default class Smoker
{
    constructor( _maxAcceleration, _emitterSize)
    {
        this.#maxAcceleration = _maxAcceleration;
        this.#emitterSize = _emitterSize;
    }
    #smokeCloude=[];
    #maxAcceleration;
    #emitterSize;
    #particlesRadius = 5;
    #startAlpha = 150;

    /**it takes the absolute acceleration of the car and absolute position of the emoitter */
    emmitSmoke( _emitterPosition, _acceleration)
    { 
        if(_acceleration > 0.005 )
        {
            let batchSize = _acceleration/this.#maxAcceleration * 5; 
            for(let i = 0; i < batchSize; i++)
            {
                
                this.#smokeCloude.push(new Particle(_emitterPosition.x + Math.random()*2*this.#emitterSize-this.#emitterSize,
                                                    _emitterPosition.y + Math.random()*2*this.#emitterSize-this.#emitterSize, 
                                                    this.#particlesRadius, this.#startAlpha, 0, true));
            } 
            
        }
    }

    draw(p)
    {
        this.#smokeCloude.forEach(particle => {
            particle.drawSmoke(p);
        });

        this.#update();
    }
    
    #update(p)
    {
        for (let i = this.#smokeCloude.length - 1; i >= 0; i--)
        {
            //if the particle is faded remove it
            if(this.#smokeCloude[i].alpha <= 5)
            {
                this.#smokeCloude.splice(i, 1);
            }
        }
    }


}
