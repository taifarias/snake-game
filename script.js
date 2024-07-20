const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 1200;
const canvasHeight = canvas.height = 800;

let gameActive = false;
let gameOver = false;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];
const snakeSize = 20

const food = {
};
const foodSize = snakeSize/3;
const x1 = 260; // onde a food inicia a ser desenhada e o que deve ser aleatorio
const x2 = x1 + snakeSize;
const x3 = x1 + (snakeSize/2);

const y1 = x1*2;
const y2 = y1 - (snakeSize/2)
const y3 = y2 + snakeSize;

let snakeHead = {
    x: 440,
    y: 350,
    width: snakeSize,
    height: snakeSize,
 
    reset: function() {
        this.x = 440,
        this.y = 350
          
    }
} 


function resetGame() {
    
    snakeHead.reset();
    snakeBody = []; 
    score = 0;
    velocityX = 1;
    velocityY = 0;
}




function drawBackground() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Limpa o canvas

    ctx.fillStyle = "rgba(137, 166, 105, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.lineWidth = 80; // Define a espessura do contorno
    ctx.strokeStyle = "rgb(100, 125, 68)";
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight); //contorno
      
    requestAnimationFrame(drawBackground); 
}

function drawSnake(){

    ctx.fillStyle = "black"; 
    ctx.fillRect(snakeHead.x, snakeHead.y, snakeHead.width, snakeHead.height);
     
    requestAnimationFrame(drawSnake); 
}


function drawFood() {

    // Configura a cor e a largura da linha
    ctx.strokeStyle = 'black';
    ctx.lineWidth = foodSize;
    
    ctx.setLineDash([foodSize, foodSize]); // Define a grossura linha pontilhada
    // Desenha a linha pontilhada
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x3, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
    
       
    ctx.setLineDash([]); // está linha foi colocada para restaurar outros desenhos, antes a dashLine estava estilizando a border do BG

    }
    
function moveSnake(){
    snakeHead.x += velocityX;
    snakeHead.y += velocityY;
}


function drawStartScreen(){

    ctx.fillStyle = "black";
    ctx.font = "100px 'Bungee Shade'";
    ctx.fillText("SNAKE GAME ", canvasWidth / 5, canvasHeight / 2.5 );

    ctx.fillStyle = "black";
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText("Pressione espaço para iniciar", canvasWidth / 4, canvasHeight / 1.7);

}

function drawGameOverScreen(){
    ctx.fillStyle = "black"
    ctx.font = "100px 'Bungee Shade'";
    ctx.fillText("GAME OVER", canvasWidth / 5, canvasHeight / 2.5);

    ctx.fillStyle = "black";
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText("Pressione espaço para recomeçar", canvasWidth / 4, canvasHeight / 1.7);

}

function checkCollision(){
    let collision = false;

    if(snakeHead.x >= 1140 || snakeHead.x <= 40){
        collision = true;
    }

    if (snakeHead.y >= 740 || snakeHead.y <= 40){
        collision = true;
    }

    if(collision){
        gameOver = true;
    }
}


function update(){
    if(!gameActive && !gameOver){
        drawStartScreen();
        
        
        
    }


    if(gameActive && !gameOver){
        drawSnake();
        drawFood();
        moveSnake();         
        checkCollision();
    }


    if(gameOver){
    drawGameOverScreen();
    }

    requestAnimationFrame(update);
}


function handleKeyPress(event){
    if (event.code === "Space" && !gameActive  && !gameOver){
        gameActive = true;
        velocityX = 1;
        
    }
    if (event.code === "Space" && gameOver){
        resetGame();
        gameOver = false
    }

   if (gameActive){
        switch (event.code) {
            case "ArrowUp":
                if (velocityY === 0){
                    velocityX = 0;
                    velocityY = -1;
                }
                break;
            case "ArrowDown":
                if (velocityY === 0){
                    velocityX = 0;
                    velocityY = 1;
                }
                break;
            case "ArrowLeft":
                if (velocityX === 0){
                    velocityY = 0;
                    velocityX = -1
                }
                break;
            case "ArrowRight":
                if (velocityX === 0){
                    velocityY = 0;
                    velocityX = 1
                }
        }
   }


}







document.addEventListener("keydown", handleKeyPress);


drawBackground();

update();





