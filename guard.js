class Guard
{
    /**It takes coordinates of four corner of the guard and its thickness to construct a solid guard barrier */
    constructor(xLeft, yTop, xRight, yBottom, thickness)
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
        this.#barrierTop = Bodies.rectangle((xRight + xLeft)/2, yTop - this.#thickness, xRight - xLeft, this.#thickness,
        {isStatic:true, restitution: 0 });
        //bottom wall
        this.#barrierBottom = Bodies.rectangle((xRight + xLeft)/2, yBottom + this.#thickness, xRight - xLeft, this.#thickness,
        {isStatic:true, restitution: 0 });
        //right wall
        this.#barrierRight = Bodies.rectangle(xRight + this.#thickness, (yBottom + yTop)/2, this.#thickness, yBottom - yTop,
        {isStatic:true, restitution: 0 });
        //left wall
        this.#barrierLeft = Bodies.rectangle(xLeft - this.#thickness, (yBottom + yTop)/2, this.#thickness, yBottom - yTop,
        {isStatic:true, restitution: 0 });
        
        World.add(engine.world, [this.#poleTL, this.#poleTR, this.#poleBL, this.#poleBR, this.#barrierTop,      
                                 this.#barrierBottom, this.#barrierRight, this.#barrierLeft]);
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

    draw()
    {

        push()
            rectMode(CENTER);
            fill(0,0,255)
            //pole top-left
            rect(this.#poleTL.position.x, this.#poleTL.position.y, this.#thickness*4 , this.#thickness*4);
            //pole top-right
            rect(this.#poleTR.position.x, this.#poleTR.position.y, this.#thickness*4, this.#thickness*4);
            //pole bottom-left
            rect(this.#poleBL.position.x, this.#poleBL.position.y, this.#thickness*4, this.#thickness*4);
            //pole bottom-right
            rect(this.#poleBR.position.x, this.#poleBR.position.y, this.#thickness*4, this.#thickness*4);
            //top Wall
            rect(this.#barrierTop.position.x, this.#barrierTop.position.y, 
                 this.#poleTR.position.x-this.#poleTL.position.x, this.#thickness);
            //bottom wall
            rect(this.#barrierBottom.position.x, this.#barrierBottom.position.y, 
                 this.#poleBR.position.x-this.#poleBL.position.x, this.#thickness);
            //right wall
            rect(this.#barrierRight.position.x, this.#barrierRight.position.y, 
                 this.#thickness,this.#poleBR.position.y-this.#poleTR.position.y);
            //left wall
            rect(this.#barrierLeft.position.x, this.#barrierLeft.position.y, 
                 this.#thickness,this.#poleBL.position.y-this.#poleTL.position.y);
        pop()
    }
}

/**https://github.com/liabru/matter-js/blob/master/examples/chains.js */