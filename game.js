// creat js representation from DOM
const startText = document.getElementById("startText");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");
const player1ScoreElement = document.getElementById("player1Score");
const player2ScoreElement = document.getElementById("player2Score");
const lossSound = document.getElementById("lossSound");
const wallSound = document.getElementById("wallSound");
const paddleSound = document.getElementById("paddleSound");

// Game variable
let gamerunning = false;
let keysPressd = {};
let paddle1Speed = 0;
let paddle1y = 150;
let paddle2Speed = 0;
let paddle2y = 150;
let ballx = 290;
let ballSpeedx = 2;
let bally = 190;
let ballSpeedy = 2;
let player2Score = 0;
let player1Score = 0;

// game const
const paddleAcceleration = 1;
const maxPaddleSpeed = 5;
const paddleDeceleration = 1;
const gameHight = 400;
const gameWidth = 600;

document.addEventListener("keydown", startGame);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyup);

// startGame
function startGame() {
  gamerunning = true;
  startText.style.display = "none";
  document.removeEventListener("keydown", startGame);
  gameLoop();
}

function gameLoop() {
  if (gamerunning) {
    updatePaddle1();
    updatePaddle2();
    moveBall();
    setTimeout(gameLoop, 8);
  }
}

function handleKeyDown(e) {
  keysPressd[e.key] = true;
}

function handleKeyup(e) {
  keysPressd[e.key] = false;
}

function updatePaddle1() {
  if (keysPressd["w"]) {
    paddle1Speed = Math.max(paddle1Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keysPressd["s"]) {
    paddle1Speed = Math.min(paddle1Speed + paddleAcceleration, maxPaddleSpeed);
  } else if (paddle1Speed < 0) {
    paddle1Speed = Math.min(paddle1Speed + paddleDeceleration, 0);
  } else {
    if (paddle1Speed > 0) {
      paddle1Speed = Math.max(paddle1Speed - paddleDeceleration, 0);
    }
  }

  paddle1y += paddle1Speed;

  if (paddle1y < 0) {
    paddle1y = 0;
  }
  if (paddle1y > gameHight - paddle1.clientHeight) {
    paddle1y = gameHight - paddle1.clientHeight;
  }

  paddle1.style.top = paddle1y + "px";
}

function updatePaddle2() {
  if (keysPressd["ArrowUp"]) {
    paddle2Speed = Math.max(paddle2Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keysPressd["ArrowDown"]) {
    paddle2Speed = Math.min(paddle2Speed + paddleAcceleration, maxPaddleSpeed);
  } else if (paddle2Speed < 0) {
    paddle2Speed = Math.min(paddle2Speed + paddleDeceleration, 0);
  } else {
    if (paddle2Speed > 0) {
      paddle2Speed = Math.max(paddle2Speed - paddleDeceleration, 0);
    }
  }

  paddle2y += paddle2Speed;

  if (paddle2y < 0) {
    paddle2y = 0;
  }
  if (paddle2y > gameHight - paddle2.clientHeight) {
    paddle2y = gameHight - paddle2.clientHeight;
  }

  paddle2.style.top = paddle2y + "px";
}

function moveBall() {
  ballx += ballSpeedx;
  bally += ballSpeedy;

  if (bally >= gameHight - ball.clientHeight || bally <= 0) {
    ballSpeedy = -ballSpeedy;
    playsound(wallSound);
  }

  if (
    ballx <= paddle1.clientWidth &&
    bally >= paddle1y &&
    bally <= paddle1y + paddle1.clientHeight
  ) {
    ballSpeedx = -ballSpeedx;
    playsound(paddleSound);
  }

  if (
    ballx >= gameWidth - paddle2.clientWidth - ball.clientWidth &&
    bally >= paddle2y &&
    bally <= paddle2y + paddle2.clientHeight
  ) {
    ballSpeedx = -ballSpeedx;
    playsound(paddleSound);
  }

  if (ballx <= 0) {
    player2Score++;
    playsound(lossSound);
    updateScore();
    restBall();
    pausgame();
  } else if (ballx >= gameWidth - ball.clientWidth) {
    playsound(lossSound);
    player1Score++;
    updateScore();
    restBall();
    pausgame();
  }

  ball.style.left = ballx + "px";
  ball.style.top = bally + "px";
}

function updateScore() {
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
}

function restBall() {
  ballx = gameWidth / 2 - ball.clientWidth / 2;
  bally = gameHight / 2 - ball.clientHeight / 2;
  ballSpeedx = Math.random() > 0.5 ? 2 : -2;
  ballSpeedy = Math.random() > 0.5 ? 2 : -2;
}

function pausgame() {
  gamerunning = false;
  document.addEventListener("keydown", startGame);
}

function playsound(sound) {
  sound.currentTime = 0;
  sound.play();
}
