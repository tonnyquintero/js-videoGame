const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

let canvasSize;
let elementSize;

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
    
        for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
        game.fillText(emojis['X'], elementSize * row, elementSize * col);
        }

        
        }
        
    }