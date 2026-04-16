const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 180,
  y: 550,
  width: 40,
  height: 40,
  speed: 6
};

let obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  }
  if (e.key === "ArrowRight" && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
}

function createObstacle() {
  let size = Math.random() * 30 + 20;
  obstacles.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    speed: Math.random() * 3 + 2
  });
}

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach((obs, index) => {
    obs.y += obs.speed;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

    if (
      obs.x < player.x + player.width &&
      obs.x + obs.width > player.x &&
      obs.y < player.y + player.height &&
      obs.y + obs.height > player.y
    ) {
      gameOver = true;
    }

    if (obs.y > canvas.height) {
      obstacles.splice(index, 1);
      score++;
      document.getElementById("score").innerText = "Score: " + score;
    }
  });
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 130, 300);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawObstacles();

  requestAnimationFrame(gameLoop);
}

setInterval(createObstacle, 800);
gameLoop();