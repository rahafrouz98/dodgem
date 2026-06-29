export default class Particle
{
    constructor(_x, _y, _radius, _startAlpha, _angle ,_isFlow = false)
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
            p.fill(100,100,100,this.alpha);
            p.translate(this.#x, this.#y);
            p.rotate(this.#angle)
            p.rectMode(p.CENTER)
            p.rect(0, 0, this.#radius*3, this.#radius, this.#radius/2);
            console.log(this.alpha)
        p.pop();

        this.#update(p);
    }

    #update(p)
    {
        this.#life++;
    
        if(this.#isFlow)
        {
            this.#x += p.noise(this.life/100);
            this.#y += p.noise((this.life/100)+0.03) ;
        }
    }
}