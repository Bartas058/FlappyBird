function preloadImages(images, callback) {
  let loadedImages = 0;
  let totalImages = images.length;

  images.forEach((src) => {
    let img = new Image();
    img.src = src;
    img.onload = function () {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    };
  });
}

function playBackgroundMusic() {
  let backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.volume = 0.01;

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      backgroundMusic.play().catch(error => {
        console.error('Playback failed: ', error);
      });
    }
  });
}

let board, boardWidth = 400, boardHeight = 600, context;

let bird = { x: boardWidth / 8, y: boardHeight / 2, width: 34, height: 24 };

let birdImg, pipeArray = [], pipeWidth = 64, pipeHeight = 600, pipeX = boardWidth, pipeY = 0;

let topPipeImg, bottomPipeImg;

let velocityX = -2, velocityY = 0, gravity = 0.4;

let gameStarted = false, gameOver = false, score = 0;

window.onload = function () {
  let imageSources = [
    "../FlappyBird-Pictures/flappybird.png",
    "../FlappyBird-Pictures/toppipe.png",
    "../FlappyBird-Pictures/bottompipe.png",
  ];

  preloadImages(imageSources, function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "../FlappyBird-Pictures/flappybird.png";
    birdImg.onload = function () {
      context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "../FlappyBird-Pictures/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "../FlappyBird-Pictures/bottompipe.png";

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("touchstart", handleTouchStart);
    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    playBackgroundMusic();
  });
};

function handleKeyPress(e) {
  if (e.code === "Space") {
    if (!gameStarted) {
      gameStarted = true;
    }
    if (gameStarted) {
      velocityY = -6;

      if (gameOver) {
        resetGame();
      }
    }
  }
}

function handleTouchStart() {
  if (!gameStarted) {
    gameStarted = true;
  }
  if (gameStarted) {
    velocityY = -6;

    if (gameOver) {
      resetGame();
    }
  }
}

function resetGame() {
  bird.y = boardHeight / 2 - bird.height / 2;
  pipeArray = [];
  score = 0;
  gameOver = false;
}

function update() {
  requestAnimationFrame(update);
  if (!gameStarted || gameOver) {
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true;
  }

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("GAME OVER", 5, 90);
  }
}

function placePipes() {
  if (!gameStarted || gameOver) {
    return;
  }

  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}