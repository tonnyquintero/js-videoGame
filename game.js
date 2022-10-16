const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)


function setCanvasSize() {
    
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = canvasSize / 10;

    startGame()
    }
    
    function startGame() {
        //Los parametros: El primero es horizontal, el segundo vertical, el tercero with y el cuarto heigth
        // game.fillRect(30,0,100,100)
        // game.clearRect(50, 50, 50, 50)
    
        // game.fillStyle = 'purple'
        // game.font = '25px Verdana'
        // game.fillText('Tonny', 25, 25, 64)       
    
        console.log({ canvasSize, elementSize });
    
        game.font = elementSize + 'px Verdana'
        game.textAlign = 'end' 

        const map = maps[0];
        const mapRows = map.trim().split('\n')
        const mapRowCols = mapRows.map(row => row.trim().split(''))
        console.log(map)

        game.clearRect(0, 0, canvasSize, canvasSize)

        //Con Refactorización
        mapRowCols.forEach((row, rowI) => {
            row.forEach((col, colI) => {
                const emoji = emojis[col];
                const posX = elementSize * (colI + 1)
                const posY = elementSize * (rowI + 1)

                if (col == 'O') {
                    if (!playerPosition.x && !playerPosition.y) {
                        playerPosition.x = posX
                        playerPosition.y = posY
                        console.log({playerPosition})
                    }
                }

                game.fillText(emoji, posX, posY)
             })
        })
    
        // Sin Refactorización...
        // for (let col = 1; col <= 10; col++) {
        // for (let row = 1; row <= 10; row++) {
        // game.fillText(emojis[mapRowCols[col - 1][row -1]],
        //      elementSize * row, elementSize * col);
        // }
        // }
        movePlayer();
    }


    function movePlayer() {
        game.fillText(emojis['PLAYER'], playerPosition.x, 
        playerPosition.y);
    }

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();   
}

function moveUp() {
    console.log('Me quiero mover arriba')

    if ((playerPosition.y - elementSize) < elementSize) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementSize;
        startGame()
    }
}
function moveLeft() {
    console.log('Me quiero mover Izquierda')

    if ((playerPosition.x - elementSize) < elementSize) {
        console.log('OUT');
    } else {
    playerPosition.x -= elementSize;
    startGame()
    }
}
function moveRight() {
    console.log('Me quiero mover Derecha')

    if ((playerPosition.x + elementSize) > canvasSize) {
        console.log('OUT');
    } else {
    playerPosition.x += elementSize;
    startGame()
    }
}
function moveDown() {
    console.log('Me quiero mover abajo')

    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log('OUT');
    } else {
    playerPosition.y += elementSize;
    startGame()
    }
}