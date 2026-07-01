let {World, Bodies, Body} = Matter

export default class Guard
{
    /**It takes coordinates of four corner of the guard and its thickness to construct a solid guard barrier */
    constructor(_p,xLeft, yTop, xRight, yBottom, thickness, engine)
    {
        //p5 instance
        this.#p = _p;

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
        this.#barrierTop.side = "top"
        this.#barrierTop.name = "barrier"
        //bottom wall
        this.#barrierBottom = Bodies.rectangle((xRight + xLeft)/2, yBottom + this.#thickness, xRight - xLeft, this.#thickness,
        {isStatic:true, restitution: 0 });
        this.#barrierBottom.side = "bottom"
        this.#barrierBottom.name = "barrier"
        //right wall
        this.#barrierRight = Bodies.rectangle(xRight + this.#thickness, (yBottom + yTop)/2, this.#thickness, yBottom - yTop,
        {isStatic:true, restitution: 0 });
        this.#barrierRight.side = "right"
         this.#barrierRight.name = "barrier"
        //left wall
        this.#barrierLeft = Bodies.rectangle(xLeft - this.#thickness, (yBottom + yTop)/2, this.#thickness, yBottom - yTop,
        {isStatic:true, restitution: 0 });
        this.#barrierLeft.side = "left"
        this.#barrierLeft.name = "barrier"

        this.barrier = Body.create({isStatic:true,parts:[this.#poleTL, this.#poleTR, this.#poleBL, this.#poleBR, this.#barrierTop, 
           this.#barrierBottom, this.#barrierRight, this.#barrierLeft]})
        this.barrier.name = "barrier"
        World.add(engine.world, [this.barrier]);
    }
    #p;
    #poleTL;
    #poleTR;
    #poleBL;
    #poleBR;
    #barrierTop;
    #barrierBottom;
    #barrierRight;
    #barrierLeft;
    #thickness;
    #pulseContainer={
     "top": 0,
     "bottom": 0,
     "left": 0,
     "right": 0
    }
    //whole barrier
    barrier
    draw()
    {
          let p = this.#p;
          p.push()
               /*######################################### poles ##############################################*/
               p.rectMode(p.CENTER);
               p.noStroke()
               p.fill(46,114,135)
               //pole top-left
               p.rect(this.#poleTL.position.x, this.#poleTL.position.y, this.#thickness*4 , this.#thickness*4);
               //pole top-right
               p.rect(this.#poleTR.position.x, this.#poleTR.position.y, this.#thickness*4, this.#thickness*4);
               //pole bottom-left
               p.rect(this.#poleBL.position.x, this.#poleBL.position.y, this.#thickness*4, this.#thickness*4);
               //pole bottom-right
               p.rect(this.#poleBR.position.x, this.#poleBR.position.y, this.#thickness*4, this.#thickness*4);
               p.stroke(46,114,135)
               p.strokeWeight(this.#thickness)
          
               /*########################################## walls #############################################*/
               p.stroke(46,114,135);
               p.strokeWeight(this.#thickness);
               //top Wall
          
               this.#drawWall("top", this.#poleTL.position.x, this.#poleTL.position.y-this.#thickness, 
                                   this.#poleTR.position.x, this.#poleTR.position.y-this.#thickness);

               //bottom wall
               this.#drawWall("bottom", this.#poleBL.position.x, this.#poleBL.position.y+this.#thickness,
                                    this.#poleBR.position.x, this.#poleBR.position.y+this.#thickness);
               //right wall
               this.#drawWall("right", this.#poleTR.position.x+this.#thickness, this.#poleTR.position.y,
                                    this.#poleBR.position.x+this.#thickness, this.#poleBR.position.y);
               //left wall
               this.#drawWall("left", this.#poleTL.position.x-this.#thickness, this.#poleTL.position.y,
                                    this.#poleBL.position.x-this.#thickness, this.#poleBL.position.y);

          p.pop()
        
    }
    /**it takes the side of the barrier and the collision depth as input anf add data to the collision pulse container */
    collisionManager(_side, _depth)
    {
        this.#pulseContainer[_side] = _depth*10000;
    }

    /**takes the side of the wall , start point and end point and draw it based on the existin pulse in the pulse container
     * this function is appicable for horizontal and vertical walls only
     */
    #drawWall(_side, _startX, _startY, _endX, _endY)
    {
          let p = this.#p;    
          if(this.#pulseContainer[_side] < 500)
          {
                p.line(_startX, _startY, _endX, _endY);
          } 
          else
          {
               //pulse amplitude factor to control the height of the pulse
               let rangeFactor = 0.0001;
               

               
               if(_side == "top" || _side == "bottom")
               {
                    p.beginShape();
                    p.vertex(_startX, _startY);

                    for (let axis = _startX+1; axis < _endX; axis++) 
                    {
     
                         //multiplies the pulse based on the distance from srart and end point to max the pukse at the center of the wall
                         let positionfactor = (axis-_startX)*(_endX-axis)*.00001;
     
                         let y = _startY + (p.noise(axis / 50, this.#pulseContainer[_side] / 30)) *
                          this.#pulseContainer[_side]*rangeFactor*positionfactor; ; 
                         p.vertex(axis, y);  
                    }
                    p.vertex(_endX, _endY);
                    p.endShape();
               }
               else
               {
                    p.beginShape();
                    p.vertex(_startX, _startY);
                    for (let axis = _startY+1; axis < _endY; axis++) 
                    {
     
                         //multiplies the pulse based on the distance from srart and end point to max the pukse at the center of the wall
                         let positionfactor = (axis-_startY)*(_endY-axis)*.00001;
     
                         let x = _startX + (p.noise(axis / 50, this.#pulseContainer[_side] / 30)) *
                          this.#pulseContainer[_side]*rangeFactor*positionfactor; ; 
                         p.vertex(x, axis);  
                    }
                    p.vertex(_endX, _endY);
                    p.endShape();
               }
          
               //dump the pulse
               this.#pulseContainer[_side] *=.992
          }

    }
}