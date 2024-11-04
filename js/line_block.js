class GameBlock_Line5 extends GameBlock {
    constructor(x, y, width, height, color, max_width, max_height) {
        super(x, y, width, height, color, max_width, max_height);
        this.color = "green";
        this.blockWidth = this.width * 5;

        this.rotation = 0;
        this.rotationPos = 2;

        this.colisionSet = [[this.x,this.y], [this.x + this.width, this.y], [this.x + this.width*2, this.y], [this.x + this.width*3, this.y], [this.x + this.width*4, this.y]];
    }

    updateColisionSet(){
        if (this.rotation === 0) {
            this.colisionSet = [[this.x,this.y], [this.x + this.width, this.y], [this.x + this.width*2, this.y], [this.x + this.width*3, this.y], [this.x + this.width*4, this.y]];
        }
        else if (this.rotation === 1) {
            this.colisionSet = [[this.x, this.y + this.height * 4]];
        }
    }

    generateNewColisionSet(){
        if (this.rotation === 0) {
            for (let i of this.colisionSet) {
                i[1] -= this.height;
            }
        }
        else if (this.rotation === 1) {
            this.colisionSet = [[this.x, this.y - this.height]];
        }
        return this.colisionSet;
    }

    generateBlockSet() {
        if (this.rotation === 0) {
            return [[this.x, this.y], [this.x + this.width, this.y], [this.x + this.width*2, this.y], [this.x + this.width*3, this.y], [this.x + this.width*4, this.y]];
        }
        else if (this.rotation === 1) {
            return [[this.x, this.y], [this.x, this.y + this.height], [this.x, this.y + this.height*2], [this.x, this.y + this.height*3], [this.x, this.y + this.height*4]];
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        if (this.rotation === 0) {
            ctx.fillRect(this.x, this.y, this.width*5, this.height);
        }
        else if (this.rotation === 1) {
            ctx.fillRect(this.x, this.y, this.width, this.height*5);
        }
    }

    clearCurrent(ctx) {
        if (this.rotation === 0) {
            ctx.clearRect(this.cur_pos.x, this.cur_pos.y, this.width*5, this.height);
        }
        else if (this.rotation === 1) {
            ctx.clearRect(this.cur_pos.x, this.cur_pos.y, this.width, this.height*5);
        }
    }

    checkCollision(colisionArr) {
        //check if the x positions in the colisionSet and the x position in the colisionArr have the same y position
        for (let i of this.colisionSet) {
            if (colisionArr.some((pos) => pos[0] === i[0] && pos[1] === i[1])) {
                return true;
            }
        }
    }
}