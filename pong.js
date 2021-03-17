let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let myMusic

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let paddleHeight = 40;
let paddleWidth = 40;
let paddleX = (canvas.width - paddleWidth)/2;
let paddleY = 10;

let enemyHeight = 40;
let enemyWidth = 40;
let enemyX = (canvas.width - enemyWidth)/2;
let enemyY = canvas.height-enemyHeight;
let enemyCounter =  0;
let enemySpeed = 1;

let enemy2Height = 40;
let enemy2Width = 40;
let enemy2X = 0;
let enemy2Y = (canvas.height-enemyHeight)/2;
let enemy2Counter =  0;
let enemy2Speed = 1;

let level = 1;
let score = 0;
let startStatus = 0;
let interval;
document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);

function keyDownHandler(e){
  if(e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'd'){
    rightPressed = true;
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft' || e.key == 'a'){
    leftPressed = true;
  }
  else if(e.key == 'Up' || e.key == 'ArrowUp' || e.key == 'w'){
    upPressed = true;
  }
  else if(e.key == 'Down' || e.key == 'ArrowDown' || e.key == 's'){
    downPressed = true;
  }
  else if(e.key == 'Enter' || e.which == 13){
      startStatus = true;
  }
  else if(e.key == 'r' || e.which == 82){
      document.location.reload();
      clearInterval(interval);
      begin();
    }
  else if((e.key == 'p' || e.which == 80) && startStatus == true){
      startStatus = false;
    }
  else if((e.key == 'p' || e.which == 80) && startStatus == false){
        startStatus = true;
      }

}

function keyUpHandler(e){
  if(e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'd'){
    rightPressed = false;
  }
  else if(e.key == 'Left' || e.key == 'ArrowLeft' || e.key == 'a'){
    leftPressed =false;
  }
  else if(e.key == 'Up' || e.key == 'ArrowUp' || e.key == 'w'){
    upPressed = false;
  }
  else if(e.key == 'Down' || e.key == 'ArrowDown' || e.key == 's'){
    downPressed = false;
  }

}

function sound(src){
  this.sound = document.createElement('audio')
}

function drawPaddle(){
  ctx.beginPath()
//  ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
  let image = new Image();
  image.src = 'boota.png';
  ctx.drawImage(image,paddleX,paddleY,paddleWidth,paddleHeight);
  ctx.fill();
  ctx.closePath();
}

function drawLevel(){
  ctx.font = '32px Serif';
  ctx.fillStyle = ' white';
  ctx.fillText('Level:' + level, 8, 20)
}
function drawScore(x){
  ctx.font = '32px Serif';
  ctx.fillStyle = ' white';
  ctx.fillText('Score:' + x, 8, 40)
}

function collisionDetection(){
  if(enemyX <paddleX + paddleWidth &&
    enemyX + enemyWidth > paddleX &&
    enemyY < paddleY + paddleHeight &&
    enemyY + enemyHeight > paddleY){

    document.location.reload();
    clearInterval(interval);
  }
  if(enemy2X <paddleX + paddleWidth &&
    enemy2X + enemy2Width > paddleX &&
    enemy2Y < paddleY + paddleHeight &&
    enemy2Y + enemy2Height > paddleY){

    document.location.reload();
    clearInterval(interval);
  }
}

function drawEnemy(){
  ctx.beginPath()
  let enemy1 = new Image();
  enemy1.src = 'knife.png';
  ctx.drawImage(enemy1,enemyX,enemyY,enemyWidth,enemyHeight);
  ctx.fill();
  ctx.closePath();
}

function drawEnemy2(){
  ctx.beginPath()
  let enemy2 = new Image();
  enemy2.src = 'knife.png';
  ctx.drawImage(enemy2,enemy2X,enemy2Y,enemy2Width,enemy2Height);
  ctx.fill();
  ctx.closePath();
}
function checkStart(){
  if(startStatus == true){
    draw();
  }else{
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Press Enter to Start', canvas.width/4, canvas.height/3)
    ctx.fillText('WASD to move',canvas.width/4, canvas.height/2)
  }
}


function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawPaddle();
  drawEnemy();
  if(level >= 2){
  drawEnemy2();
  enemy2X =enemy2X + enemy2Speed;
  if(enemy2X + enemy2Width >canvas.width){
    enemy2X = 0
    enemy2Y = Math.random() * (canvas.height);
    score ++;
    if(enemyCounter%3 == 0){
      enemy2Speed = enemy2Speed + .25;
      level++;
    }
  }
}
  drawLevel();
  drawScore(score);
  collisionDetection();

  if(rightPressed){
    paddleX +=5;
    if(paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width-(paddleWidth);
    }
  }
  if(leftPressed){
    paddleX -=5;
    if(paddleX < 0){
      paddleX = 0;
    }
  }
  if(upPressed){
    paddleY -=3;
    if(paddleY < 0){
      paddleY = 0;
    }
  }
  if(downPressed){
    paddleY +=3;
    if(paddleY + paddleHeight > canvas.height){
      paddleY = canvas.height - (paddleHeight);
    }
  }
  enemyY = enemyY - enemySpeed;
  if(enemyY+enemyHeight < 0){
    enemyY = canvas.height-enemyHeight;
    enemyX = Math.random() * (canvas.width);
    enemyCounter++;
    score ++;
    if(enemyCounter%3 == 0){
      if(enemySpeed != 1.5){
        console.log(enemySpeed)
      enemySpeed = enemySpeed + .25;
      }
      level++;
    }
  }



}
function begin(){
   interval = setInterval(checkStart,10);
}
begin();
