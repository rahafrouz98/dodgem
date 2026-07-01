import BurnningSmoke from "./BurningSmoke.js"

let {World, Bodies, Body} = Matter;

export default class CarBody
{
    /**this is a class for creating the car body in matter js and rendeing it using p5 */
    constructor(_p,_position, _length, _width, _density, _engine, _color, _name="",_carIndex=0 , _startDirection=0)
    {    
        this.#color = _color;
        this.#cornersRadius = _width/20;
        this.#length = _length;
        this.#width = _width;
        this.#hoodPeak = this.#width/7;
        this.#fenderWidth = this.#length/50;
        

        this.physic = Bodies.fromVertices(_position.x, _position.y, this.#generateVertices(_length, _width) ,{
                isStatic:false,
                friction:0.3,
                frictionAir:0.3,
                restitution:1,
                angle:0,
                density:_density,
            })
       
        this.physic.carIndex = _carIndex;
        this.physic.name= _name;
        World.add(_engine.world, [this.physic]) 
        Body.setAngle(this.physic, _startDirection)
        this.#p = _p;

        /*###############################initialize window crack layers#################################  */
        //starts with no crack
        this.#frontWindowCrack = this.#initiallizeCrackGraph(this.#width/2, this.#length/2);
        this.#backWindowCrack = this.#initiallizeCrackGraph(this.#width/4, this.#length/2.4);
        this.#rightWindowCrack = this.#initiallizeCrackGraph(this.#width*.83, this.#length*.08);
        this.#leftWindowCrack = this.#initiallizeCrackGraph(this.#width*.83, this.#length*.08);
        this.#rightHeadlightCrack = this.#initiallizeCrackGraph(this.#width/10, this.#width/5);
        this.#leftHeadlightCrack = this.#initiallizeCrackGraph(this.#width/10, this.#width/5);
        this.#rightTaillightCrack = this.#initiallizeCrackGraph(this.#width/10, this.#width/4);
        this.#leftTaillightCrack = this.#initiallizeCrackGraph(this.#width/10, this.#width/4);
    }
    //p5 instance
    #p;
    #burningSmoke;
    //percentage of remained life
    #length;
    #width;
    #hoodPeak;
    #fenderWidth
    #cornersRadius;
    #color;
    #frontWindowCrack;
    #backWindowCrack;
    #rightWindowCrack;
    #leftWindowCrack;
    #rightHeadlightCrack;
    #leftHeadlightCrack;
    #rightTaillightCrack;
    #leftTaillightCrack;
    #collisionHistory={
        "front":0,
        "front-right":0,
        "right":0,
        "back-right":0,
        "back":0,
        "back-left":0,
        "left":0,
        "front-left":0
    }
    #crackOnWindow={
        "front": ()=>{this.#updateWindowCrack(this.#frontWindowCrack)},
        "back": ()=>{this.#updateWindowCrack(this.#backWindowCrack)},
        "right": ()=>{this.#updateWindowCrack(this.#rightWindowCrack)},
        "left": ()=>{this.#updateWindowCrack(this.#leftWindowCrack)},
        "front-right": ()=>{this.#updateLightCrack(this.#rightHeadlightCrack)},
        "front-left": ()=>{this.#updateLightCrack(this.#leftHeadlightCrack)},
        "back-right": ()=>{this.#updateLightCrack(this.#rightTaillightCrack)},
        "back-left": ()=>{this.#updateLightCrack(this.#leftTaillightCrack)}
    }
    physic;
    remainedLife;

 

    /**it generates the vertices  of the shape */
    #generateVertices()
    {
        let vertices = [];
        //hood peak
        vertices.push({x:this.#length/2+this.#hoodPeak, y: 0} )
        //right-front fender 1 
        vertices.push({x: this.#length/2, y: this.#width/2});
        //right-front fender 2
        vertices.push({x: (this.#length/2-this.#fenderWidth*2), y: this.#width/2+this.#fenderWidth});
        //right-front-fender 3
        vertices.push({x: this.#length/4, y: (this.#width/2+this.#fenderWidth)});
        //right-front-fender 4
        vertices.push({x: this.#length/4-this.#fenderWidth*2, y: this.#width/2});
        //right-back-fender 1
        vertices.push({x: -this.#length/4+this.#fenderWidth*2, y: this.#width/2});
        //right-back-fender 2
        vertices.push({x: -this.#length/4, y: this.#width/2+this.#fenderWidth});
        //right-back-fender 3
        vertices.push({x: -this.#length/2+this.#fenderWidth*2, y: this.#width/2+this.#fenderWidth});
        //right-back-fender 4
        vertices.push({x: -this.#length/2, y: this.#width/2});
        //left-back-fender 4
        vertices.push({x: -this.#length/2, y: -this.#width/2});
        //left-back-fender 3
        vertices.push({x: -this.#length/2+this.#fenderWidth*2, y: -this.#width/2-this.#fenderWidth});
        //left-back-fender 2
        vertices.push({x: -this.#length/4,  y:-this.#width/2-this.#fenderWidth});
        //left-back-fender 1
        vertices.push({x: -this.#length/4+this.#fenderWidth*2, y: -this.#width/2});
        //left-front-fender 4
        vertices.push({x: this.#length/4-this.#fenderWidth*2, y: -this.#width/2});
        //left-front-fender 3
        vertices.push({x: this.#length/4, y: -(this.#width/2+this.#fenderWidth)});
        //left-front-fender 2
        vertices.push({x: this.#length/2-this.#fenderWidth*2, y: -(this.#width/2+this.#fenderWidth)});
        //left-front-fender 1
        vertices.push({x: this.#length/2, y: -this.#width/2});

        return vertices;
    }

    #initiallizeCrackGraph = (w,h)=>
    {
        let p = this.#p;
        let graph = p.createGraphics(w, h);
        graph.stroke(0);
        graph.strokeWeight(.4);
        graph.noFill();
        
        return graph
    }


    draw()
    {
        let p = this.#p;
        p.push()
        p.noStroke();
        p.translate(this.physic.position.x, this.physic.position.y);
        p.rotate(this.physic.angle);

        /*############################### draw components ################################################### */
        this.#drawBody();
        let windowPoints = this.#drawFrontWindow();
        this.#drawRoof(windowPoints);
        this.#drawBackWindow();
        this.#drawLeftWindow();
        this.#drawRightWindow();
        this.#drawFrontGrill();
        this.#drawBackGrill();
        this.#drawRightTaillight();
        this.#drawLeftTaillight();
        this.#drawLeftHeadlight();
        this.#drawRightHeadlight();

        /*################################# draw burning smoke ############################################## */
        if(this.#burningSmoke)
        {
            this.#burningSmoke.emitteSmoke({x: this.physic.position.x + this.#length/4, y: this.physic.position.y})
            this.#burningSmoke.draw(this.#p);
        }


        p.pop()
    }

    #drawBody(x, y)
    {
        let p = this.#p;
        let vertices = this.#generateVertices()
        p.push();
            p.fill(this.#color[0], this.#color[1], this.#color[2]);
            p.beginShape();
            for(let point of vertices)
            {
                p.vertex(point.x, point.y);
            }
            p.endShape(p.CLOSE);
            
         p.pop();
    }
    /**draw roof */
    #drawRoof(windowPoints)
    {
        let p = this.#p;
        p.push();
            p.blendMode(p.MULTIPLY)
            p.fill(200,200,200);
            p.beginShape();
            p.vertex(windowPoints[0].x, windowPoints[0].y);
            p.vertex(windowPoints[1].x, windowPoints[1].y);
            p.vertex(-this.#length/5, -this.#width/2.5);
            p.vertex(-this.#length/5, +this.#width/2.5);
            p.endShape(p.CLOSE);
        p.pop();
    }
    /**draw the backwindow and crack */
    #drawBackWindow()
    {
        let p = this.#p;
        p.push();
            //draw the glass
            this.#drawBacwindowGlass()
            //define the clip area
            p.beginClip();
            this.#drawBacwindowGlass()
            p.endClip();
            //add drack
            p.image(this.#backWindowCrack, -this.#length/3, -this.#width/2.3)
        p.pop();
    }
    /**draws the backwindow glass */
    #drawBacwindowGlass()
    {
        let p = this.#p;
        p.fill(220,230,235,200);
        p.stroke(0)
        p.strokeWeight(0.1)
        p.beginShape();
        //left-top
        p.vertex(-this.#length/5, -this.#width/2.5);
        //left-bottom
        p.vertex(-this.#length/3, -this.#width/2.3);
        //right-bottom
        p.vertex(-this.#length/3, +this.#width/2.3);
        //right-top
        p.vertex(-this.#length/5, +this.#width/2.5);
        p.endShape(p.CLOSE);
    }

    /**draws the front window and crack and returns the top corners coordinates for later use */
    #drawFrontWindow()
    {
        let p = this.#p;
        let windowTopCorners
        p.push()
            //draw the glass
            windowTopCorners=this.#drawFrontWindowGlass()
            //define the clip area
            p.beginClip();
            this.#drawFrontWindowGlass()
            p.endClip();
            //add cracks
            p.image(this.#frontWindowCrack,windowTopCorners[1].x, windowTopCorners[1].y)
        p.pop()
        return windowTopCorners;
    }
    /**draws the glass and returns the top corners of front window for later use */
    #drawFrontWindowGlass()
    {
        let p = this.#p;
        let windowPoints
        p.fill(220,230,235,200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape()
            //the buttom curve of the front window
            this.#vertexCurve(-this.#length/15, 0, this.#length/2.6, -Math.PI/5.2, Math.PI/5.2)
            //the top curve of the front window
            windowPoints = this.#vertexCurve(-this.#length*.95, 0, this.#length*1.1, Math.PI/17, -Math.PI/17)
        p.endShape(p.CLOSE)
        return windowPoints;
    }

    /**draws left window and crack*/
    #drawLeftWindow()
    {
        let p = this.#p;
        p.push();
       //draw glass
       this.#drawLeftWindowGlass();

       //define clip area
       p.beginClip();
       this.#drawLeftWindowGlass();
       p.endClip();

        //add crack
        p.image(this.#leftWindowCrack, -this.#length*.25, -this.#width*.47)
        
        p.pop();
    }
    /**draw left window glass */
    #drawLeftWindowGlass()
    {
        let p = this.#p;
        p.fill(220, 230, 235, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        //bottom-front
        p.vertex(this.#length*.23, -this.#width*.47);
        //top-front
        p.vertex(this.#length*.12, -this.#width*.43);
        //top-back
        p.vertex(-this.#length*.18, -this.#width*.43);
        //bottom-back
        p.vertex(-this.#length*.25, -this.#width*.47);
        p.endShape(p.CLOSE);
    }

    /**draws right window and crack */
    #drawRightWindow()
    {
        let p = this.#p;
        p.push();
        //draw glass
        this.#drawRightWindowGlass();

        //define the clip area
        p.beginClip();
        this.#drawRightWindowGlass();
        p.endClip();

        //add crack
        p.image(this.#rightWindowCrack, -this.#length*.20, this.#width*.4)

        p.pop();
    }
    /**draw right window glass */
    #drawRightWindowGlass()
    {
        let p = this.#p;
        p.fill(220, 230, 235, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        //bottom-front
        p.vertex(this.#length*.23, this.#width*.47);
        //top-front
        p.vertex(this.#length*.12, this.#width*.43);
        //top-back
        p.vertex(-this.#length*.18, this.#width*.43);
        //bottom-back
        p.vertex(-this.#length*.25, this.#width*.47);
        p.endShape(p.CLOSE);
    }


    /**draw front grille */
    #drawFrontGrill()
    {
        let p = this.#p;
        p.push();
            p.blendMode(p.MULTIPLY)
            p.fill(200,200,200);
            p.beginShape();
            //left-front-fender 2
            p.vertex(this.#length/2-this.#fenderWidth*2,-(this.#width/2+this.#fenderWidth));
            //left-front-fender 1
            p.vertex(this.#length/2, -this.#width/2);
            //hood peak
            p.vertex(this.#length/2+this.#hoodPeak, 0)
            //right-front fender 1 
            p.vertex(this.#length/2,this.#width/2);
            //right-front fender 2
            p.vertex((this.#length/2-this.#fenderWidth*2), this.#width/2+this.#fenderWidth);
            //grill top-center
            p.vertex(this.#length/2+this.#fenderWidth*2,0)
            p.endShape(p.CLOSE);
        p.pop();
    }
    /**draw back grill*/
     #drawBackGrill()
     {
        let p = this.#p;
         p.push();
            p.blendMode(p.MULTIPLY)
            p.fill(200,200,200);
            p.beginShape();
            //right-back-fender 3
            p.vertex(-this.#length/2+this.#fenderWidth*2, this.#width/2+this.#fenderWidth);
            //right-back-fender 4
            p.vertex(-this.#length/2, this.#width/2);
            //left-back-fender 4
            p.vertex(-this.#length/2,-this.#width/2);
            //left-back-fender 3
            p.vertex(-this.#length/2+this.#fenderWidth*2, -this.#width/2-this.#fenderWidth);
            p.endShape(p.CLOSE);
        p.pop();
     }

    /**left taillight and crack*/
    #drawRightTaillight()
    {
        let p = this.#p;
        p.push();
            //draw glass
            this.#drawRightTaillightGlass();

            //define the clip area
            p.beginClip();
            this.#drawRightTaillightGlass();
            p.endClip();

            //add crack
            p.image(this.#rightTaillightCrack, -this.#length/2+this.#fenderWidth*.3, (this.#width/2-this.#fenderWidth*7))
        p.pop();
    }
        
    
    /**draw right taillight glass*/
    #drawRightTaillightGlass()
    {
        let p = this.#p;
        p.fill(220, 230, 235, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        //top-right
        p.vertex(-this.#length/2+this.#fenderWidth*1.7, this.#width/2-this.#fenderWidth);
        //top-left
        p.vertex(-this.#length/2+this.#fenderWidth*1.7, this.#width/2-this.#fenderWidth*8);
        //bottom-left
        p.vertex( -this.#length/2+this.#fenderWidth*.3,this.#width/2-this.#fenderWidth*7)
        //bottom-right
        p.vertex( -this.#length/2+this.#fenderWidth*.3,this.#width/2-this.#fenderWidth*1.4)
        p.endShape(p.CLOSE);
}

    /**draw left taillight and crack*/
    #drawLeftTaillight()
    {
        let p = this.#p;
        p.push();
            //draw glass
            this.#drawLeftTaillightGlass();

            //define the clip area
            p.beginClip();
            this.#drawLeftTaillightGlass();
            p.endClip();

            //add crack
            p.image(this.#leftTaillightCrack, -this.#length/2+this.#fenderWidth*.3, -(this.#width/2-this.#fenderWidth*1.4))
        p.pop();
    }
    /** draw  left taillight glass */
    #drawLeftTaillightGlass()
    {
        let p = this.#p;
      
        p.fill(220, 230, 235, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        //top-right
        p.vertex(-this.#length/2+this.#fenderWidth*1.7, -(this.#width/2-this.#fenderWidth));
        //top-left
        p.vertex(-this.#length/2+this.#fenderWidth*1.7, -(this.#width/2-this.#fenderWidth*8));
        //bottom-left
        p.vertex( -this.#length/2+this.#fenderWidth*.3,-(this.#width/2-this.#fenderWidth*7))
        //bottom-right
        p.vertex( -this.#length/2+this.#fenderWidth*.3,-(this.#width/2-this.#fenderWidth*1.4))
        p.endShape(p.CLOSE);
        
    }
    /**left headlight */
    #drawLeftHeadlight()
    {
        let p = this.#p;
        p.push();

        //draw glass
        this.#drawLeftHeadlightGlass();

        //define the clip area
        p.beginClip();
        this.#drawLeftHeadlightGlass();
        p.endClip();

        //add crack
        p.image(this.#leftHeadlightCrack, this.#length/2-this.#fenderWidth*1.7, -(this.#width/2-this.#fenderWidth*.3));

        p.pop();
    }
    /**draw left headlight glass */
    #drawLeftHeadlightGlass()
    {
        let p = this.#p;
       
        p.fill(220, 230, 235, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        //top-left
        p.vertex(this.#length/2-this.#fenderWidth*1.7,-(this.#width/2-this.#fenderWidth*.3));
        //botrom-left
        p.vertex(this.#length/2-this.#fenderWidth*.3, -(this.#width/2-this.#fenderWidth*.8));
        //bottom-right
        p.vertex(this.#length/2+this.#fenderWidth*1.2, -(this.#width/2-this.#fenderWidth*6));
        //top-right
        p.vertex(this.#length/2+this.#fenderWidth*.3,-(this.#width/2-this.#fenderWidth*6));
        p.endShape(p.CLOSE);
    }

    /**right headlight and crack */
    #drawRightHeadlight()
    {
        let p = this.#p;
        p.push();
            //draw glass
            this.#drawRightHeadLightGlass();

            //define clip area
            p.beginClip();
            this.#drawRightHeadLightGlass();
            p.endClip();

            //add crack
            p.image(this.#rightHeadlightCrack, this.#length/2-this.#fenderWidth, (this.#width/2-this.#fenderWidth*6))
        p.pop();
    }
    /**draw right headlight glass */
    #drawRightHeadLightGlass()
    {
        let p = this.#p;
       
        p.fill(255, 255, 255, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        //top-left
        p.vertex(this.#length/2-this.#fenderWidth*1.7, (this.#width/2-this.#fenderWidth*.3));
        //botrom-left
        p.vertex(this.#length/2-this.#fenderWidth*.3, (this.#width/2-this.#fenderWidth*.8));
        //bottom-right
        p.vertex(this.#length/2+this.#fenderWidth*1.2, (this.#width/2-this.#fenderWidth*6));
        //top-right
        p.vertex(this.#length/2+this.#fenderWidth*.3, (this.#width/2-this.#fenderWidth*6));
        p.endShape(p.CLOSE);
        
    }

    /** adds crack on the provided p5 graph*/
    #updateWindowCrack(crackGraph)
    {
        let p = this.#p;
        let x = p.random(crackGraph.width);
        let y = p.random(crackGraph.height);
        crackGraph.beginShape();
        crackGraph.vertex(x,y);
        for(let i = 0; i < crackGraph.width*crackGraph.height*2; i+=20)
        {
            x+=p.noise(i/10)*2-1;
            y+=p.noise(x/10)*2-1;
            crackGraph.vertex(x,y);
        }
        crackGraph.endShape();

        return crackGraph;
    }

    #updateLightCrack(lightFilter)
    {
        let p = this.#p;
        lightFilter.background(50,50,50)
        return lightFilter;
    }

    /**it takes the side of the collision and the depth of the collision. Updates the collitionHistory and cracks */
    collitionHistoryManager(collisionSide, depth)
    {
        this.#collisionHistory[collisionSide] += depth;

        /*#################### crack on windows##########################*/
        this.#crackOnWindow[collisionSide]?.();

        /*#################### update and check the remained life ###################*/
        let totalCollision = 0;
        for (let key in this.#collisionHistory) {
            totalCollision += this.#collisionHistory[key];
        }
        //if the car is crashed too much, it will be destroyed
        let maxCollision = 20;
        //in percentage
        this.remainedLife = 100 - (totalCollision/maxCollision) * 100;

        if (this.remainedLife <= 0)
        {
            this.#destroyCar();
        }

    }

    /**this function will create a BurningSmoke instance when it is called from the collision manager */
    #destroyCar()
    {
        this.#burningSmoke = new BurnningSmoke(this.#p, this.#width/4);
    }
    


    /**it is a customized function for generating curve vertices based on the center of the arc, 
     * radious and start and end angles and retuen the start and end points of the curve.
     * It is used to create curved windows with straight edges
      */
    #vertexCurve(x,y,radious,startAngle, endAngle)
    {
        let p = this.#p;
        p.vertex(x+radious*Math.cos(startAngle), y+radious*Math.sin(startAngle));

        if(startAngle < endAngle) 
        {
            for(let angle = startAngle; angle <= endAngle; angle += (endAngle-startAngle)/100)
            {
                p.vertex(x+radious*Math.cos(angle), y+radious*Math.sin(angle));
            }
        }
        else
        {
            for(let angle = startAngle; angle >= endAngle; angle += (endAngle-startAngle)/100)
            {
                p.vertex(x+radious*Math.cos(angle), y+radious*Math.sin(angle));
            }
        }
        //it returns the points slightly more toward the positive x (related to the real points) to cover the whole top curve
        let startVertex ={x:x+radious*Math.cos(startAngle)*1.015, y:y+radious*Math.sin(startAngle)};
        let endVertex = {x:x+radious*Math.cos(endAngle)*1.015, y:y+radious*Math.sin(endAngle)} ;
        
        return [startVertex, endVertex];
    }
}


