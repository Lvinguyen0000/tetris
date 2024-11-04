class Row{
    constructor(y, width, height, board_width){
        this.y = y;
        this.width = width;
        this.height = height;
        this.board_width = board_width;
        
        //create map
        this.map = new Map();
        for (let i = 0; i < board_width; i += width){
            this.map.set(i, {block: false, color: 0});
        }
    }

    checkRow(){
        //if all blocks are true, return true
        for (let i of this.map){
            if (!i[1].block) return false;
        }
        return true;
    }

    draw(ctx){
        for (let i of this.map){
            if (i[1].block){
                ctx.fillStyle = i[1].color;
                ctx.fillRect(i[0], this.y, this.width, this.height);
            }
        }
    }

    updateRow(x, color){
        this.map.set(x, {block: true, color: color});
    }
}