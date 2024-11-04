class GameBlock extends Block {

    constructor(x, y, width, height, color, max_width, max_height) {
        super(x, y, width, height, color, max_width, max_height);

        this.keys = {
            left: false,
            right: false,
        }
    }

    moveDown() {
        this.cur_pos.x = this.x;
        this.cur_pos.y = this.y;

        this.y += this.height;
        this.clearCurrent(ctx);
        this.draw(ctx);
        this.updateColisionSet();
    }

    moveLeft (ctx) {
        if (this.x > 0) {
            this.cur_pos.x = this.x;
            this.cur_pos.y = this.y;
            this.x -= this.width;
            this.clearCurrent(ctx);
            this.draw(ctx);
            this.updateColisionSet();
        }
        
    }

    moveRight (ctx) {
        if (this.x < this.max_width - this.blockWidth) {
            this.cur_pos.x = this.x;
            this.cur_pos.y = this.y;
            this.x += this.width;
            this.clearCurrent(ctx);
            this.draw(ctx);
            this.updateColisionSet();
        }
    }

    rotateLeft (ctx) {
        this.clearCurrent(ctx);
        this.rotate(-1);
        this.draw(ctx);
        this.updateColisionSet();
    }

    rotateRight (ctx) {    
        this.clearCurrent(ctx);
        this.rotate(1);
        this.draw(ctx);
        this.updateColisionSet();
    }

    rotate (offset) {
        this.rotation += offset;
        if (this.rotation < 0) {
            this.rotation = (this.rotationPos + this.rotation) % this.rotationPos;
        }
        else {
            this.rotation %= this.rotationPos;
        }
    }
}