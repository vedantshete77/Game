document.addEventListener('DOMContentLoaded', () => {
  const paddleLeft = document.querySelector('.paddle-left');
  const paddleRight = document.querySelector('.paddle-right');
  const ball = document.querySelector('.ball');
  const gameContainer = document.querySelector('.game-container');

  const gameArea = {
    width: gameContainer.offsetWidth,
    height: gameContainer.offsetHeight,
  };

  const paddleHeight = paddleLeft.offsetHeight;
  const paddleSpeed = 5;
  const ballSpeedX = 5;
  const ballSpeedY = 5;

  let ballX = gameArea.width / 2;
  let ballY = gameArea.height / 2;
  let ballDirectionX = 1;
  let ballDirectionY = 1;

  function update() {
    movePaddle(paddleLeft);
    movePaddle(paddleRight);
    moveBall();
    requestAnimationFrame(update);
  }

  function movePaddle(paddle) {
    const isLeftPaddle = paddle.classList.contains('paddle-left');
    const paddleTop = parseInt(paddle.style.top) || 0;
    if ((isLeftPaddle && keys.w) || (!isLeftPaddle && keys.ArrowUp)) {
      if (paddleTop > 0) {
        paddle.style.top = `${paddleTop - paddleSpeed}px`;
      }
    }
    if ((isLeftPaddle && keys.s) || (!isLeftPaddle && keys.ArrowDown)) {
      if (paddleTop < gameArea.height - paddleHeight) {
        paddle.style.top = `${paddleTop + paddleSpeed}px`;
      }
    }
  }

  function moveBall() {
    ballX += ballSpeedX * ballDirectionX;
    ballY += ballSpeedY * ballDirectionY;

    if (ballY <= 0 || ballY >= gameArea.height - ball.offsetHeight) {
      ballDirectionY *= -1;
    }

    if (ballX <= 0 || ballX >= gameArea.width - ball.offsetWidth) {
      ballDirectionX *= -1;
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
  }

  const keys = {};

  document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  });

  document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });

  update();
});
