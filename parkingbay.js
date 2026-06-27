let {World, Bodies} = Matter

export default class ParkingBay
{
    /**This is a constructor gor the start zone */
    constructor( _x, _y ,_width, _height)
    {
        this.#bayWidth = _width;
        this.#bayHeight = _height;
        this.#x = _x;
        this.#y = _y;

    }
    #bayWidth;
    #bayHeight;
    #x;
    #y;
    draw(p)
    {
        p.push();
            p.noStroke();
            p.fill(189,250,248);
            p.rect(this.#x, this.#y, this.#bayWidth, this.#bayHeight);
            p.stroke(0,0,200)
            p.strokeWeight(1)
            p.fill(255)
            p.translate(this.#bayWidth/2 + this.#x, this.#bayHeight/2 + this.#y)
            p.rotate(Math.PI/2);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(this.#bayWidth/4)
            p.text("Start  Zone" ,0, 0)
        p.pop();
    }
    //checks if the x and y coordinate is inside the parking bay
    isInStartZone(x,y)
    {
        if(x < this.#bayWidth+this.#x && x > this.#x && y > this.#y && y < this.#bayHeight+this.#y)
        {
            return true;
        }
        return false;
    }

}