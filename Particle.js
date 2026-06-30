export default class Particle
{
    /**This Particle class is used in Trail, Smoker and sparker
     * for trail and smoke particles the _isFlow will be true to sumulate the drifting particles
     */
    constructor(_x, _y, _radius, _startAlpha, _angle=0 ,_isFlow = false)
    {
        this.#isFlow = _isFlow;
        this.#x = _x;
        this.#y = _y;
        this.#radius = _radius;
        this.#startAlpha = _startAlpha;
        this.#angle = _angle;
    }
    #life = 0;
    #maxLife = 50;
    #isFlow;
    #x;
    #y;
    #radius;
    #startAlpha;
    #angle
    alpha

    drawTrail(p)
    {
        this.alpha = p.map(this.#life, 0, this.#maxLife , this.#startAlpha, 0)

        p.push();
            p.noStroke();
            p.fill(70,70,70,this.alpha);
            p.translate(this.#x, this.#y);
            p.rotate(this.#angle)
            p.rectMode(p.CENTER)
            p.rect(0, 0, this.#radius*3, this.#radius, this.#radius/2);
        p.pop();

        this.#update(p);
    }
    drawSmoke(p)
    {
        this.alpha = p.map(this.#life, 0, this.#maxLife , this.#startAlpha, 0)

        p.push();
            p.noStroke();
            p.fill(50,50,50,this.alpha);
            p.translate(this.#x, this.#y);
            p.ellipse(0, 0, this.#radius, this.#radius);
        p.pop();

        this.#update(p);
    }

    drawSpark(p)
    {
        this.alpha = p.map(this.#life, 0, this.#maxLife , this.#startAlpha, 0)
        p.push();
            p.stroke(255,255,0,this.alpha);
            p.strokeWeight(this.#radius/6);
            p.translate(this.#x, this.#y);
            for(let i = 0; i < 4; i++ )
            {
                this.#angle += i*Math.PI/4;
                p.rotate(this.#angle)
                line(this.#x-this.#radius/2, 0,this.#x-this.#radius/2,0 )
            }
        p.pop();

        this.#update(p);
    }

    #update(p)
    {
        this.#life++;
    
        if(this.#isFlow)
        {
            this.#x += p.noise(this.#life/10);
            this.#y += p.noise((this.#life/10)+.3) ;
        }
    }
}