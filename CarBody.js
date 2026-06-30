let {World, Bodies, Body} = Matter;

export default class CarBody
{
    /**this is a class for creating the car body in matter js and rendeing it using p5 */
    constructor(_position, _length, _width, _density, _engine, _color, _name="",_carIndex=0 , _startDirection=0)
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

    }
    #length;
    #width;
    #hoodPeak;
    #fenderWidth
    #cornersRadius;
    #color;
    physic;

    //centroid is calculated as c=(x1+x2+..+xn)/n and the same for y
    /**generates the centroid of the provided vertices*/
    #getCentroid(vertices)
    {
        let xSum =0
        let ySum =0

        vertices.forEach(vertex => {
            xSum += vertex.x;
            ySum += vertex.y;
        });

        return {x: xSum/vertices.length , y: ySum/vertices.length }
    }

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


    draw(p)
    {
        p.push()
        p.noStroke();
        p.translate(this.physic.position.x, this.physic.position.y);
        p.rotate(this.physic.angle);
        this.#drawBody(p);
        let windowPoints = this.#drawFrontWindow(p);
        this.#drawRoof(p, windowPoints);
        this.#drawBackWindow(p);
        this.#drawLeftWindow(p);
        this.#drawRightWindow(p);
        this.#drawFrontGrill(p);
        this.#drawBackGrill(p);
        this.#drawRightTaillight(p);
        this.#drawLeftTaillight(p);
        this.#drawLeftHeadlight(p);
        this.#drawRightHeadlight(p);
        p.pop()
    }

    #drawBody(p, x, y)
    {
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
    #drawRoof(p, windowPoints)
    {
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
    /**draw the backwindow */
    #drawBackWindow(p)
    {this.#length
        p.push();
            p.fill(220,230,235,200);
            p.stroke(0)
            p.strokeWeight(0.1)
            p.beginShape();
            p.vertex(-this.#length/5, -this.#width/2.5);
            p.vertex(-this.#length/3, -this.#width/2.3);
            p.vertex(-this.#length/3, +this.#width/2.3);
            p.vertex(-this.#length/5, +this.#width/2.5);
            p.endShape(p.CLOSE);
        p.pop();
    }

    /**draws the front window and returns the top corners coordinates for later use */
    #drawFrontWindow(p)
    {
        let windowPoints
        p.push()
            p.fill(220,230,235,200);
            p.stroke(0)
            p.strokeWeight(0.1)
            p.beginShape()
            //the buttom curve of the front window
            this.#vertexCurve(p, -this.#length/15, 0, this.#length/2.6, -Math.PI/5.2, Math.PI/5.2)
            //the top curve of the front window
            windowPoints = this.#vertexCurve(p, -this.#length*.95, 0, this.#length*1.1, Math.PI/17, -Math.PI/17)
            p.endShape(p.CLOSE)
        p.pop()
        return windowPoints;
    }

    /**draws left window */
    #drawLeftWindow(p)
    {
        p.push();
        p.fill(220, 230, 235, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        p.vertex(this.#length*.23, -this.#width*.47);
        p.vertex(this.#length*.12, -this.#width*.43);
        p.vertex(-this.#length*.18, -this.#width*.43);
        p.vertex(-this.#length*.25, -this.#width*.47);
        p.endShape(p.CLOSE);
        p.pop();
    }

    /**draws right window */
    #drawRightWindow(p)
    {
        p.push();
        p.fill(220, 230, 235, 200);
        p.stroke(0);
        p.strokeWeight(0.1);
        p.beginShape();
        p.vertex(this.#length*.23, this.#width*.47);
        p.vertex(this.#length*.12, this.#width*.43);
        p.vertex(-this.#length*.18, this.#width*.43);
        p.vertex(-this.#length*.25, this.#width*.47);
        p.endShape(p.CLOSE);
        p.pop();
    }

    /**draw front grille */
    #drawFrontGrill(p)
    {
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
     #drawBackGrill(p)
     {
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

    /**left taillight */
    #drawRightTaillight(p)
    {
        p.push();
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
        p.pop();
    }
    /**left taillight */
    #drawLeftTaillight(p)
    {
        p.push();
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
        p.pop();
    }
    /**left headlight */
    #drawLeftHeadlight(p)
    {
        p.push();
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
        p.pop();
    }
    /**right headlight */
    #drawRightHeadlight(p)
    {
        p.push();
            p.fill(220, 230, 235, 200);
            p.stroke(0);
            p.strokeWeight(0.1);
            p.beginShape();
            //top-left
            p.vertex(this.#length/2-this.#fenderWidth*1.7,(this.#width/2-this.#fenderWidth*.3));
            //botrom-left
            p.vertex(this.#length/2-this.#fenderWidth*.3, (this.#width/2-this.#fenderWidth*.8));
            //bottom-right
            p.vertex(this.#length/2+this.#fenderWidth*1.2, (this.#width/2-this.#fenderWidth*6));
            //top-right
            p.vertex(this.#length/2+this.#fenderWidth*.3,(this.#width/2-this.#fenderWidth*6));
            p.endShape(p.CLOSE);
        p.pop();
    }
    


    /**it is a customized function for generating curve vertices based on the center of the arc, 
     * radious and start and end angles and retuen the start and end points of the curve.
     * It is used to create curved windows with straight edges
      */
    #vertexCurve( p, x,y,radious,startAngle, endAngle)
    {

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


/**
 * Note: To optionally enable automatic concave vertices decomposition the poly-decomp package must be first installed and provided see Common.setDecomp, otherwise the convex hull of each vertex set will be used
 https://en.wikipedia.org/wiki/Centroid
*/