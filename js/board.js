class Board{
    constructor(width, height){
        this.width = width;
        this.height = height;

        this.colisionArr = [];
        for (let i = 0; i <this.width; i += this.width*10/100){
            this.colisionArr.push([i, this.height - this.height*5/100]);
        }

        this.rowArr = [];
        for (let i =0; i < this.height; i += this.height*5/100){
            this.rowArr.push(new Row(i, this.width*10/100, this.height*5/100, this.width));
        }
    }

    clearBoard(ctx){
        ctx.clearRect(0, 0, this.width, this.height);
    }

    drawBoard(ctx){
        for (let i of this.rowArr){
            i.draw(ctx);
        }
    }

    updateColision(colisionSet){
        //delete the colision position with similar x
        for (let i of colisionSet){
            this.colisionArr = this.colisionArr.filter((pos) => pos[0] !== i[0]);
            this.colisionArr.push([i[0], i[1]]);
        }
    }

    updateRows(blockSet, color){
        for (let i of blockSet) {
            for (let j of this.rowArr) {
                if (i[1] === j.y) {
                    j.updateRow(i[0], color);
                }
            }
        }        
    }

    check_deleteRows(){
        let rowToDelete = 0;
        let lowestY = 0;
        for (let i in this.rowArr) {
            if (this.rowArr[i].checkRow()) {
                rowToDelete++;
                lowestY = this.rowArr[i].y;
                //update all row above the row to delete
                for (let j in this.rowArr) {
                    if (parseInt(j) < i) {
                        this.rowArr[j].y += this.rowArr[i].height;
                    }
                }

                //splice the row
                this.rowArr.splice(i, 1);

                let scoreDiv = document.getElementById("scoreValue");
                if (!+scoreDiv.textContent) { scoreDiv.textContent = 1; }
                else {
                    scoreDiv.textContent = parseInt(scoreDiv.textContent) + parseInt(scoreDiv.textContent);
                }
            }
        }
        
        if (rowToDelete){
            //for each deleted row, unshift a new row
            for (let i = 0; i < rowToDelete; i++) {
                this.rowArr.unshift(new Row((rowToDelete -i -1) * (this.height*5/100), this.width*10/100, this.height*10/100, this.width));
            }

            //for every elemnt in colisionArr, update element with y < lowestY
            for (let i in this.colisionArr) {
                if (this.colisionArr[i][1] + this.height*5/100 < lowestY) {
                    this.colisionArr[i][1] += this.height*5/100 * rowToDelete;
                }

                //if y == lowestY, find the row with with the lowest y with the same x
                else if (this.colisionArr[i][1] + this.height*5/100 == lowestY) {
                    let isAvail = false;
                    for (let j in this.rowArr) {
                        if (this.rowArr[j].y > lowestY && this.rowArr[j].map.has(this.colisionArr[i][0]) && this.rowArr[j].map.get(this.colisionArr[i][0]).block) {
                            this.colisionArr[i][1] = this.rowArr[j].y - this.height*5/100;
                            isAvail = true;
                            break;
                        }
                    }
                    if (!isAvail) {
                        this.colisionArr[i][1] = this.height - this.height*5/100;
                    }
                }
            }
        }
    }
}