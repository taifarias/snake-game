const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 1200;
const canvasHeight = canvas.height = 800;

let gameActive = false;
let gameOver = false;

let velocityX = 0;
let velocityY = 0;

let score = 0;

let snakeBody = [];
const snakeSize = 20
const foodSize = snakeSize;


function getRandomXY(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;   
}
let randomX = getRandomXY(40, 1140);
let randomY = getRandomXY(40, 740);

const foodImg = new Image();
foodImg.src = "img/food.png";
const food = {
    img: foodImg,
    x: randomX,
    y: randomY
};
function drawFood() {
    ctx.drawImage(foodImg, food.x, food.y)    
   }


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
function drawSnake(){
    ctx.fillStyle = "black"; 
    ctx.fillRect(snakeHead.x, snakeHead.y, snakeSize, snakeSize);

    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize);
    }
     
}

function detectFood(){
    if(snakeHead.x < food.x + foodSize &&
        snakeHead.x + snakeSize > food.x &&
        snakeHead.y < food.y + foodSize &&
        snakeHead.y + snakeSize > food.y){
    
        score++;
        food.x = getRandomXY(40, 1140);
        food.y = getRandomXY(40, 740);
        snakeBody.push({ x: snakeHead.x, y: snakeHead.y });
        

    }
}






function resetGame() {
    
    snakeHead.reset();
    snakeBody = []; 
    score = 0;
    velocityX = 2;
    velocityY = 0;


}

function drawBackground() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Limpa o canvas

    ctx.fillStyle = "rgba(137, 166, 105, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.lineWidth = 80; // Define a espessura do contorno
    ctx.strokeStyle = "rgb(100, 125, 68)";
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight); //contorno
      
    requestAnimationFrame(drawBackground); 
}




    

function moveSnake() {
    // Armazena a posição anterior da cabeça
    const previousHeadPosition = { x: snakeHead.x, y: snakeHead.y };


  
    // Move a cabeça da cobra
    snakeHead.x += velocityX;
    snakeHead.y += velocityY;

    // Adiciona a nova posição da cabeça ao corpo
    snakeBody.unshift(previousHeadPosition);

    // Remove o último segmento do corpo se a cobra não comeu comida
    if (snakeBody.length > score) {
        snakeBody.pop();
    }
}

function drawStartScreen(){

    ctx.fillStyle = "black";
    ctx.font = "100px 'Bungee Shade'";
    ctx.fillText("SNAKE GAME ", canvasWidth / 5, canvasHeight / 2.5 );

    ctx.fillStyle = "black";
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText("Pressione espaço para iniciar", canvasWidth / 4, canvasHeight / 1.7);

}

function drawScore(){
    ctx.fillStyle = "black";
    ctx.font = "40px 'Press Start 2P'";
   
    ctx.fillText(score, 55, 100);
}

function drawGameOverScreen(){
    ctx.fillStyle = "black"
    ctx.font = "100px 'Bungee Shade'";
    ctx.fillText("GAME OVER", canvasWidth / 5, canvasHeight / 2.5);

    ctx.fillStyle = "black";
    ctx.font = "18px 'Press Start 2P'";
    ctx.fillText("Sua pontuação foi: " + score , canvasWidth / 3, canvasHeight / 2);


    ctx.fillStyle = "black";
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText("Pressione espaço para recomeçar", canvasWidth / 4, canvasHeight / 1.7);

}

function checkCollision(){
    let collision = false;

    if(snakeHead.x > 1140 || snakeHead.x < 40){
        collision = true;
    }

    if (snakeHead.y > 740 || snakeHead.y < 40){
        collision = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeHead.x === snakeBody[i].x && snakeHead.y === snakeBody[i].y) {
            collision = true;
            break;
        }}

    if(collision){
        gameOver = true;
    }


}


function update(){
    if(!gameActive && !gameOver){
        drawStartScreen();     
    }

    if(gameActive && !gameOver){
        drawScore()  
        drawFood();  
        drawSnake();
           
        moveSnake();         
        checkCollision();
        detectFood();

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
                    velocityY = -2;
                }
                break;
            case "ArrowDown":
                if (velocityY === 0){
                    velocityX = 0;
                    velocityY = 2;
                }
                break;
            case "ArrowLeft":
                if (velocityX === 0){
                    velocityY = 0;
                    velocityX = -2;
                }
                break;
            case "ArrowRight":
                if (velocityX === 0){
                    velocityY = 0;
                    velocityX = 2
                }
        }
   }


}







document.addEventListener("keydown", handleKeyPress);


drawBackground();

update();