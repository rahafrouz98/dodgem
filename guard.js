let {World, Bodies, Body} = Matter

export default class Guard
{
    /**It takes coordinates of four corner of the guard and its thickness to construct a solid guard barrier */
    constructor(xLeft, yTop, xRight, yBottom, thickness, engine)
    {
        this.#thickness = thickness;
        //pole top-left
        this.#poleTL = Bodies.rectangle(xLeft, yTop, this.#thickness*4, this.#thickness*4,
             {isStatic: true, restitution: 0});
        //pole top-right
        this.#poleTR = Bodies.rectangle(xRight, yTop, this.#thickness*4, this.#thickness*4,
             {isStatic: true, restitution: 0 });
        //pole bottom-left
        this.#poleBL = Bodies.rectangle(xLeft, yBottom, this.#thickness*4, this.#thickness*4,
             {isStatic: true, restitution: 0 });
        //ple bottom-right
        this.#poleBR = Bodies.rectangle(xRight, yBottom, this.#thickness*4, this.#thickness*4,
             {isStatic: true, restitution: 0 });
        //top wall
        this.#barrierTop = Bodies.rectangle((xRight + xLeft)/2, yTop - this.#thickness*2, xRight - xLeft, this.#thickness,
        {isStatic:true, restitution: 0 });
        //bottom wall
        this.#barrierBottom = Bodies.rectangle((xRight + xLeft)/2, yBottom + this.#thickness*2, xRight - xLeft, this.#thickness,
        {isStatic:true, restitution: 0 });
        //right wall
        this.#barrierRight = Bodies.rectangle(xRight + this.#thickness*2, (yBottom + yTop)/2, this.#thickness, yBottom - yTop,
        {isStatic:true, restitution: 0 });
        //left wall
        this.#barrierLeft = Bodies.rectangle(xLeft - this.#thickness*2, (yBottom + yTop)/2, this.#thickness, yBottom - yTop,
        {isStatic:true, restitution: 0 });

        this.barrier = Body.create({isStatic:true,parts:[this.#poleTL, this.#poleTR, this.#poleBL, this.#poleBR, this.#barrierTop, 
           this.#barrierBottom, this.#barrierRight, this.#barrierLeft]})
        this.barrier.name = "barrier"
        World.add(engine.world, [this.barrier]);
    }
    #poleTL;
    #poleTR;
    #poleBL;
    #poleBR;
    #barrierTop;
    #barrierBottom;
    #barrierRight;
    #barrierLeft;
    #thickness;
    //whole barrier
    barrier
    draw(p)
    {

        p.push()
            p.rectMode(p.CENTER);
            p.fill(0,0,255)
            //pole top-left
            p.rect(this.#poleTL.position.x, this.#poleTL.position.y, this.#thickness*4 , this.#thickness*4);
            //pole top-right
            p.rect(this.#poleTR.position.x, this.#poleTR.position.y, this.#thickness*4, this.#thickness*4);
            //pole bottom-left
            p.rect(this.#poleBL.position.x, this.#poleBL.position.y, this.#thickness*4, this.#thickness*4);
            //pole bottom-right
            p.rect(this.#poleBR.position.x, this.#poleBR.position.y, this.#thickness*4, this.#thickness*4);
            //top Wall
            p.rect(this.#barrierTop.position.x, this.#barrierTop.position.y, 
                 this.#poleTR.position.x-this.#poleTL.position.x, this.#thickness);
            //bottom wall
            p.rect(this.#barrierBottom.position.x, this.#barrierBottom.position.y, 
                 this.#poleBR.position.x-this.#poleBL.position.x, this.#thickness);
            //right wall
            p.rect(this.#barrierRight.position.x, this.#barrierRight.position.y, 
                 this.#thickness,this.#poleBR.position.y-this.#poleTR.position.y);
            //left wall
            p.rect(this.#barrierLeft.position.x, this.#barrierLeft.position.y, 
                 this.#thickness,this.#poleBL.position.y-this.#poleTL.position.y);
        p.pop()
    }
}

/**https://github.com/liabru/matter-js/blob/master/examples/chains.js */