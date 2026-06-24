class ParkingBay
{
    constructor(_numberOfLots, _width, _height)
    {
        this.numberOfLots = _numberOfLots;
        this.bayWidth = _width;
        this.bayHeight = _height;
        this.lotWidth = this.bayHeight / this.numberOfLots
        //items will be true when the correspondent lot is available
        this.lotAvailablity = Array(this.numberOfLots).fill(true)
    }

    draw()
    {
        noStroke();
        fill(189,250,248);
        rect(0, 0, this.bayWidth, this.bayHeight);
      
        let edgeWidth = this.bayHeight / 30;

        for(let i = this.lotWidth; i < this.bayHeight; i+=this.lotWidth)
        {
            push();
                translate(0,i-edgeWidth/2)
                noStroke();
                fill(255,255,255)
                rect(0, 0 , this.bayWidth, edgeWidth);
            pop();
        }
    }
    //checks if the selected lot is available
    isLotAvailavle(x,y)
    {
        if(x < this.bayWidth && y < this.bayHeight)
        {
            let lotIndex = floor(y/this.lotWidth);
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
        if(lotIndex >= 0 && lotIndex < this.numberOfLots)
        {
            let y = (lotIndex + 1) * this.lotWidth - this.lotWidth/2;
            let position = createVector(this.bayWidth/2, y);
            return position;
        }
    }
}