class GameBlock_Square extends GameBlock {
    constructor(x, y, width, height, color, max_width, max_height) {
        super(x, y, width, height, color, max_width, max_height);
        this.color = "yellow";
        this.blockWidth = this.width * 2;

        this.rotation = 0;
        this.rotationPos = 1;

        this.colisionSet = [[this.x, this.y + this.height], [this.x + this.width, this.y + this.height]];
    }

    updateColisionSet() {
        this.colisionSet = [[this.x, this.y + this.height], [this.x + this.width, this.y + this.height]];
    }

    generateNewColisionSet() {
        this.colisionSet[0][1] -= this.height*2;
        this.colisionSet[1][1] -= this.height*2;
        return this.colisionSet;
    }

    generateBlockSet() {
        return [[this.x, this.y], [this.x + this.width, this.y], [this.x, this.y + this.height], [this.x + this.width, this.y + this.height]];
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width * 2, this.height * 2);
    }

    clearCurrent(ctx) {
        ctx.clearRect(this.cur_pos.x, this.cur_pos.y, this.width * 2, this.height * 2);
    }

    checkCollision(colisionArr) {
        for (let i of this.colisionSet) {
            for (let j of colisionArr) {
                if (i[0] === j[0] && i[1] === j[1]) {
                    return true;
                }
            }
        }
    }
}