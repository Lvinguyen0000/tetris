function newBlock(){
    switch (Math.ceil(Math.random() * 5)) {
        case 1:
            return new GameBlock_Square(startX, 0, block_W, block_H, "red", canvas.width, canvas.height);
        case 2:
            return new GameBlock_L(startX, 0, block_W, block_H, "red", canvas.width, canvas.height);
        case 3:
            return new GameBlock_L_Rev(startX, 0, block_W, block_H, "red", canvas.width, canvas.height);
        case 4:
            return new GameBlock_T(startX, 0, block_W, block_H, "red", canvas.width, canvas.height);
        case 5:
            return new GameBlock_Line5(startX, 0, block_W, block_H, "red", canvas.width, canvas.height);
    }
}

function loadKeyDownEvents(gameBlock){
    keyDownEventListener = (event) => {
        event.preventDefault();
        switch (event.key) {
            case "ArrowRight":
                gameBlock.keys.right = true;
                break;
            case "ArrowLeft":
                gameBlock.keys.left = true;
                break;
        }
    };
    document.addEventListener("keydown", keyDownEventListener);
}

function loadKeyUpEvents(gameBlock){
    keyUpEventListener = (event) => {
        event.preventDefault();
        switch (event.key) {
            case "ArrowRight":
                gameBlock.moveRight(ctx);
                break;
            case "ArrowLeft":
                gameBlock.moveLeft(ctx);
                break;
            case "a":
                gameBlock.rotateLeft(ctx);
                break;
            case "d":
                gameBlock.rotateRight(ctx);
                break;
        }
    };
    document.addEventListener("keyup", keyUpEventListener);
}


function animate(){
    if (gameBlock.checkCollision(board.colisionArr)) {
        document.removeEventListener("keydown", keyDownEventListener);
        document.removeEventListener("keyup", keyUpEventListener);

        board.updateColision(gameBlock.generateNewColisionSet());

        board.updateRows(gameBlock.generateBlockSet(), gameBlock.color);
        board.check_deleteRows();

        gameBlock = newBlock();

        loadKeyUpEvents(gameBlock);

        gameBlock.draw(ctx);
        if (gameBlock.checkCollision(board.colisionArr)) {
            console.log("Game Over");
            clearInterval(interval);
            document.removeEventListener("keydown", keyDownEventListener);
            document.removeEventListener("keyup", keyUpEventListener);
            return;
        }
    }

    board.clearBoard(ctx);
    board.drawBoard(ctx);
    gameBlock.moveDown(ctx);
    
}

let canvas = document.getElementById("gWindow");
let ctx = canvas.getContext("2d");
let startX = canvas.width*(Math.floor(Math.random() * 5) * 10)/100;
let block_W = canvas.width*10/100;
let block_H = canvas.height*10/100;
let interval = null;
let board, gameBlock;
let keyDownEventListener = null;
let keyUpEventListener = null;

document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key === " ") {
        clearInterval(interval);

        document.removeEventListener("keydown", keyDownEventListener);
        document.removeEventListener("keyup", keyUpEventListener);

        board = new Board(canvas.width, canvas.height);
        board.clearBoard(ctx);

        gameBlock = newBlock();
        gameBlock.draw(ctx);

        //loadKeyDownEvents(gameBlock);
        loadKeyUpEvents(gameBlock);
        interval = setInterval(animate, 500);
    }

    else if (event.ket === "Enter") {
        clearInterval(interval);
    }
});