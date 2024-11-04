class Block{
    constructor(x, y, width, height, color, max_width, max_height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.max_width = max_width;
        this.max_height = max_height;

        this.cur_pos = {x: this.x, y: this.y};
    }
}