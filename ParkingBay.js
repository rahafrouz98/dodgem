let { World, Bodies } = Matter;

export default class ParkingBay {
    /**This is a constructor for the start zone. It draws the start zone and provides a function to check if the provided
     coordinate is inside the start zone.
     * _x: number, _y:number, _width: number, _height: number
      */
    constructor(_x, _y, _width, _height) {
        this.#bayWidth = _width;
        this.#bayHeight = _height;
        this.#x = _x;
        this.#y = _y;
    }
    #bayWidth;
    #bayHeight;
    #x;
    #y;

    /**draws the start zone at each frame
     *_p: p5 instance */
    draw(_p) {
        _p.push();
        _p.noStroke();
        _p.fill(189, 250, 248);
        _p.rect(this.#x, this.#y, this.#bayWidth, this.#bayHeight);
        _p.stroke(0, 0, 200);
        _p.strokeWeight(1);
        _p.fill(255);
        _p.translate(this.#bayWidth / 2 + this.#x, this.#bayHeight / 2 + this.#y);
        _p.rotate(Math.PI / 2);
        _p.textAlign(_p.CENTER, _p.CENTER);
        _p.textSize(this.#bayWidth / 4);
        _p.text("Start  Zone", 0, 0);
        _p.pop();
    }
    /**checks if the  coordinate is inside the parking bay
     * _x: number, _y:number
     */
    isInStartZone(_x, _y) {
        if (
            _x < this.#bayWidth + this.#x - 60 &&
            _x > this.#x + 60 &&
            _y > this.#y + 60 &&
            _y < this.#bayHeight + this.#y - 60
        ) {
            return true;
        }
        return false;
    }
}
