const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')


const reset_button = document.querySelector('#reset_button');

reset_button.addEventListener('click', resetGame);

function resetGame() {
    location.reload();
}


let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPostions = []

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)


function setCanvasSize() {
    
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    
    canvasSize = Number(canvasSize.toFixed(0))

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = canvasSize / 10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
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

        const map = maps[level];

        if (!map) {
            gameWin();
            return;
        }

        if (!timeStart) {
            timeStart = Date.now();
            timeInterval = setInterval(showTimer ,100)
            showRecord()
        }

        const mapRows = map.trim().split('\n')
        const mapRowCols = mapRows.map(row => row.trim().split(''))
        console.log(map)

        showLives()

        enemyPostions = [];
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
                } else if (col == 'I') {
                    giftPosition.x = posX;
                    giftPosition.y = posY;
                } else if (col == 'X') {
                    enemyPostions.push({
                        x: posX,
                        y: posY,
                    })
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

    function levelWin() {
        console.log('Subiste de Nivel');
        level++;
        startGame()
    }

    function levelFail() {

        console.log('Chocaste con el enemigo');
        lives--;

        console.log(lives);

        if (lives <= 0) {
            level = 0;
            lives = 3;
            timeStart = undefined;
        }

            playerPosition.x = undefined;   
            playerPosition.y = undefined;
            startGame()

        
    }

    function gameWin() {
        console.log('Terminaste!!!');
        clearInterval(timeInterval);

        const recordTime = localStorage.getItem('record_time')
        const playerTime = Date.now() - timeStart;

        if (recordTime) {
            if (recordTime >= playerTime) {
                localStorage.setItem('record_time', playerTime)
                pResult.innerHTML = 'SUPERASTE EL RECORD!!!';
            } else {
                pResult.innerHTML = 'No superaste el record =(';
            }
        } else  {
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'Intenta imponer un record';
        } 
        console.log({recordTime, playerTime});
    }

    function showLives() {

        const heartsArray = Array(lives).fill(emojis['HEART'])
        //console.log(heartsArray)
        spanLives.innerHTML = ""
        heartsArray.forEach(hearth => spanLives.append(hearth))


    }

    // function showTime() {
    //     spanTime.innerHTML = Date.now() - timeStart;
    // }



    function showTimer(){
    
        spanTime.innerText = ((Date.now()-timeStart)/1000);
    
    }

    function showRecord(){
    
        spanRecord.innerText = localStorage.getItem('record_time');
    
    }


    function movePlayer() {
        const giftCollisionX = playerPosition.x.toFixed(2) == 
        giftPosition.x.toFixed(2);
        const giftCollisionY = playerPosition.y.toFixed(2) == 
        giftPosition.y.toFixed(2)

        const giftCollision = giftCollisionX && giftCollisionY

        if (giftCollision) {
            levelWin();
        }

        const enemyColission = enemyPostions.find(enemy => {
            const enemyColissionX = enemy.x.toFixed(2) == 
            playerPosition.x.toFixed(2)
            const enemyColissionY = enemy.y.toFixed(2) == 
            playerPosition.y.toFixed(2)
            return enemyColissionX && enemyColissionY;
        })

        if (enemyColission) {
            levelFail();
        }

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