aprendi que tem um ordem quando desenha no canvas:
    tx.fillStyle = "black";
    ctx.font = "100px 'Bungee Shade'";
    ctx.fillText("SNAKE GAME ", canvasWidth / 5, canvasHeight / 2.5 );

1º estilo > depois: fillText() ou fillText()

usei switch case pela primeira vez
    para o movimento dado pelo controle, se manter até que outro evento aconteça

usei dash line para desenhar a comida
    e ao fim coloquei  ctx.setLineDash([]); para restaurar o estilo de outras coisas


20/07/24 10:30
+ primeiro commit

-Tela Inicial ✓
-Tela GameOver ✓
-drawBackground() ✓
-drawSnake() ✓ + resetSnake ✓
-moveSnake() ✓ + handleKeyPress() ✓
-checkollision(falta check collision com o snakeBody) ✓
-resetGame ✓

-drawFood() foi definido inicialmente da segunte forma:
        const snakeSize = 20
        const food = {};
        const foodSize = snakeSize/3;
        const x1 = 50;
        const x2 = x1 + snakeSize;
        const x3 = x1 + (snakeSize/2);

        const y1 = x1*2;
        const y2 = y1 - (snakeSize/2)
        const y3 = y2 + snakeSize;
        
        
        function drawFood() {           
            ctx.strokeStyle = 'black';
            ctx.lineWidth = foodSize;            
            ctx.setLineDash([foodSize, foodSize]);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.stroke();            
            ctx.beginPath();
            ctx.moveTo(x3, y2);
            ctx.lineTo(x3, y3);
            ctx.stroke();           
            
            ctx.setLineDash([]); 
            }
            
-nächste: 
    vou fazer alguns experimentos agora com o posicionamento aleatorio da comida
    obs: a comida não está alinhada com a cobra

Planejamento futuro:

    -Food
        -> posição aleatoria da comida
        -> comida sumir ao entrar em contato com a cobra

    -Pontuação
        ->escrever pontuação na Tela
        ->aumentar a pontuação ao comer
        ->localStorage para lembrar a pontuação
        -> escrever na tela "pontuação maxima: XX"

    -Body
        -> configurar o corpo da cobra
        -> configurar o movimento do corpo
        -> aumentar o corpo quando comer
        -> colisão cabeça e corpo da cobra

    -Efeito Sonoro
        -> som ao iniciar o jogo
        -> som ao comer
        -> som perder
    
    -Aumento de nivel
        -> aumento de velocidade a partir de certo tamanho do corpo
        -> gerar "comida especial" que da "poderes" como atravesar a parede 


    -colocar tela inteira
    -mobile responsive (tamanho e controle)