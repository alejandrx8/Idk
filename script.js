let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let basket = { x: 150, y: 370, width: 70, height: 20 };
let gifts = [];
let score = 0;
let target = 7;
let gameRunning = false;

function startGame() {
  canvas.style.display = "block";
  score = 0;
  gifts = [];
  gameRunning = true;
  document.getElementById("message").style.display = "none";
  updateProgress();
  gameLoop();
}

function spawnGift() {
  gifts.push({
    x: Math.random() * (canvas.width - 30),
    y: 0,
    size: 28,
    speed: 2 + Math.random() * 2
  });
}

document.addEventListener("mousemove", (e) => {
  let rect = canvas.getBoundingClientRect();
  basket.x = e.clientX - rect.left - basket.width / 2;
});

document.addEventListener("touchmove", (e) => {
  let rect = canvas.getBoundingClientRect();
  basket.x = e.touches[0].clientX - rect.left - basket.width / 2;
});

function update() {
  if (Math.random() < 0.04) spawnGift();

  gifts.forEach((gift, index) => {
    gift.y += gift.speed;

    if (
      gift.y + gift.size > basket.y &&
      gift.x < basket.x + basket.width &&
      gift.x + gift.size > basket.x
    ) {
      gifts.splice(index, 1);
      score++;
      updateProgress();
    }

    if (gift.y > canvas.height) {
      gifts.splice(index, 1);
    }
  });

  if (score >= target) {
    winGame();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff4d6d";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

  ctx.font = "24px serif";
  gifts.forEach(gift => {
    ctx.fillText("🎁", gift.x, gift.y);
  });

  document.getElementById("scoreText").innerText = `Gifts: ${score} / ${target}`;
}

function gameLoop() {
  if (!gameRunning) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function updateProgress() {
  let percent = (score / target) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

function winGame() {
  gameRunning = false;
  document.getElementById("message").style.display = "block";
  launchConfetti();
}

function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.animationDuration = (2 + Math.random() * 3) + "s";
    confetti.style.background = `hsl(${Math.random()*360},100%,70%)`;
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}