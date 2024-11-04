class GameBlock_L_Rev extends GameBlock {
    constructor(x, y, width, height, color, max_width, max_height) {
        super(x, y, width, height, color, max_width, max_height);
        this.color = "purple";
        this.blockWidth = this.width * 2;

        this.rotation = 0;
        this.rotationPos = 4;

        this.colisionSet = [[this.x,this.y + this.height], [this.x + this.width, this.y + this.height]];
    }

    updateColisionSet() {
        switch (this.rotation) {
            case 1:
                this.colisionSet = [[this.x,this.y + this.height], [this.x + this.width, this.y + this.height]];
                break;
            case 2:
                this.colisionSet = [[this.x, this.y + this.height], [this.x + this.width, this.y]];
                break;
            case 3:
                this.colisionSet = [[this.x,this.y], [this.x + this.width, this.y + this.height]];
                break;
            case 0:
                this.colisionSet = [[this.x, this.y + this.height], [this.x + this.width, this.y + this.height]];
                break;
        }
    }

    generateNewColisionSet() {
        switch (this.rotation) {
            case 1:    
                this.colisionSet[0][1] -= this.height*2;
                this.colisionSet[1][1] -= this.height;
                break;
            case 2:
                this.colisionSet[0][1] -= this.height*2;
                this.colisionSet[1][1] -= this.height;
                break;
            case 3:
                this.colisionSet[0][1] -= this.height;
                this.colisionSet[1][1] -= this.height*2;
                break;
            case 0:
                this.colisionSet[0][1] -= this.height;
                this.colisionSet[1][1] -= this.height*2;
                break;
        }
        return this.colisionSet;
    }

    generateBlockSet() {
        switch (this.rotation) {
            case 1:
                return [[this.x, this.y], [this.x, this.y + this.height], [this.x + this.width, this.y + this.height]];
            case 2:
                return [[this.x, this.y], [this.x, this.y + this.height], [this.x + this.width, this.y]];
            case 3:
                return [[this.x, this.y], [this.x + this.width, this.y], [this.x + this.width, this.y + this.height]];
            case 0:
                return [[this.x + this.width, this.y], [this.x, this.y + this.height], [this.x + this.width, this.y + this.height]];
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        switch (this.rotation) {
            case 1:
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillRect(this.x, this.y + this.height, this.width*2, this.height);
                break;
            case 2:
                ctx.fillRect(this.x, this.y, this.width*2, this.height);
                ctx.fillRect(this.x, this.y + this.height, this.width, this.height);
                break;
            case 3:
                ctx.fillRect(this.x, this.y, this.width*2, this.height);
                ctx.fillRect(this.x + this.width, this.y + this.height, this.width, this.height);
                break;
            case 0:
                ctx.fillRect(this.x + this.width, this.y, this.width, this.height);
                ctx.fillRect(this.x, this.y + this.height, this.width * 2, this.height);
                break;
        }
    }

    clearCurrent(ctx) {
        switch (this.rotation) {
            case 1:
                ctx.clearRect(this.cur_pos.x, this.cur_pos.y, this.width, this.height);
                ctx.clearRect(this.cur_pos.x, this.cur_pos.y + this.height, this.width*2, this.height);
                break;
            case 2:
                ctx.clearRect(this.cur_pos.x, this.cur_pos.y, this.width*2, this.height);
                ctx.clearRect(this.cur_pos.x + this.width, this.cur_pos.y + this.height, this.width, this.height);
                break;
            case 3:
                ctx.clearRect(this.cur_pos.x, this.cur_pos.y, this.width, this.height);
                ctx.clearRect(this.cur_pos.x + this.width, this.cur_pos.y + this.height, this.width, this.height);
                break;
            case 0:
                ctx.clearRect(this.cur_pos.x + this.width, this.cur_pos.y, this.width, this.height);
                ctx.clearRect(this.cur_pos.x, this.cur_pos.y + this.height, this.width*2, this.height);
                break;
        }
    }

    checkCollision(colisionArr) {
        for (let i of this.colisionSet){
            for (let j of colisionArr){
                if (i[0] === j[0] && i[1] === j[1]){
                    return true;
                }
            }
        }
    }
}