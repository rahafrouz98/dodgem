class ParkingBay
{
    constructor(_numberOfLots, _x, _y ,_width, _height)
    {
        this.#numberOfLots = _numberOfLots;
        this.#bayWidth = _width;
        this.#bayHeight = _height;
        this.#lotWidth = this.#bayHeight / this.#numberOfLots;
        this.#x = _x;
        this.#y = _y;
        //items will be true when the correspondent lot is available
        this.lotAvailablity = Array(this.#numberOfLots).fill(true);
    }
    #numberOfLots;
    #bayWidth;
    #bayHeight;
    #lotWidth;
    #x;
    #y;
    draw()
    {
        noStroke();
        fill(189,250,248);
        rect(this.#x, this.#y, this.#bayWidth, this.#bayHeight);
        let edgeWidth = this.#bayHeight / 30;
        for(let i = this.#lotWidth + this.#y; i < this.#bayHeight; i+=this.#lotWidth)
        {
            push();
                translate(this.#x,i-edgeWidth/2)
                noStroke();
                fill(255,255,255)
                rect(0, 0 , this.#bayWidth, edgeWidth);
            pop();
        }
    }
    //checks if the selected lot is available
    isLotAvailavle(x,y)
    {
        if(x < this.#bayWidth+this.#x && x > this.#x && y > this.#y && y < this.#bayHeight+this.#y)
        {
            let lotIndex = floor((y-this.#y)/this.#lotWidth);
            if(this.lotAvailablity[lotIndex])
            {
                return lotIndex;
            }
        }
        return -1
    }

    //returns a vector pointing to the center of the selected lot
    signaling(lotIndex)
    {
        if(lotIndex >= 0 && lotIndex < this.#numberOfLots)
        {
            let y = (lotIndex + 1) * this.#lotWidth - this.#lotWidth/2 +this.#y;
            let position = createVector(this.#bayWidth/2+this.#x, y);
            return position;
        }
    }
}