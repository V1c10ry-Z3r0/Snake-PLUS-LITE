import { canvas, ctx, snake1, snake2, dir1, dir2, apple, gameRunning, snakeColors } from './state.js';
import { soloState, CELL_SIZE, gameSettings, timer } from './state.js';

// === Multiplayer Mode ===
export function startGame() {
  snake1.body = [{ x: 5, y: 5 }];
  snake2.body = [{ x: 10, y: 10 }];
  dir1.x = 1; dir1.y = 0;
  dir2.x = -1; dir2.y = 0;
  apple.x = 15; apple.y = 15;
  gameRunning.value = true;
}

function moveSnakeMultiplayer(snake, dir) {
  const head = { x: snake.body[0].x + dir.x, y: snake.body[0].y + dir.y };
  snake.body.unshift(head);
  snake.body.pop();
}

export function updateGame() {
  if (!gameRunning.value) return false;
  moveSnakeMultiplayer(snake1, dir1);
  moveSnakeMultiplayer(snake2, dir2);
  drawMultiplayer();
  return true;
}

function drawMultiplayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = snakeColors.p1;
  snake1.body.forEach(seg => ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE, CELL_SIZE));

  ctx.fillStyle = snakeColors.p2;
  snake2.body.forEach(seg => ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE, CELL_SIZE));

  ctx.fillStyle = '#FF00FF'; // Apple
  ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// === Solo Mode ===
function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function seededPos(seed, width, height) {
  return {
    x: Math.floor(seededRandom(seed) * width),
    y: Math.floor(seededRandom(seed + 1) * height)
  };
}

function moveSnakeSolo(snake, dir) {
  if (snake.length === 0) return undefined;
  const newHead = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  snake.unshift(newHead);
  snake.pop();
  return newHead;
}


function drawSolo(canvasId, snake, apple, color) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  ctx.fillStyle = color;
  for (let part of snake) {
    ctx.fillRect(part.x * CELL_SIZE, part.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function checkCollision(snake) {
  const head = snake[0];
  const width = gameSettings.width;
  const height = gameSettings.height;
  if (head.x < 0 || head.y < 0 || head.x >= width || head.y >= height) return true;
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) return true;
  }
  return false;
}

export function createSoloGame() {
  const width = gameSettings.width;
  const height = gameSettings.height;
  const seed = soloState.seed = Date.now();
  const sharedApple = seededPos(seed, width, height);

  soloState.player1.snake = [{ x: 5, y: 5 }];
  soloState.player2.snake = [{ x: 5, y: 5 }];
  soloState.player1.apple = sharedApple;
  soloState.player2.apple = sharedApple;
  soloState.player1.alive = true;
  soloState.player2.alive = true;
  soloState.timer = 0;
  soloState.running = true;
soloState.intervalId = setInterval(() => {
  if (!soloState.running) return;
  soloState.timer += 16;
  if (soloState.timer >= timer.value) {
    soloState.running = false;
    clearInterval(soloState.intervalId);
    alert("Time's up!");
    return;
  }

  // Player 1
  if (soloState.player1.alive) {
    const head = moveSnakeSolo(soloState.player1.snake, soloState.player1.direction);
    if (head.x === soloState.player1.apple.x && head.y === soloState.player1.apple.y) {
      soloState.player1.snake.push({ ...soloState.player1.snake[soloState.player1.snake.length - 1] });
      soloState.player1.apple = seededPos(soloState.seed++, gameSettings.width, gameSettings.height);
    }
    drawSolo("player1Canvas", soloState.player1.snake, soloState.player1.apple, snakeColors.p1);
    if (checkCollision(soloState.player1.snake)) soloState.player1.alive = false;
  }

  // Player 2
  if (soloState.player2.alive) {
    const head = moveSnakeSolo(soloState.player2.snake, soloState.player2.direction);
    if (head.x === soloState.player2.apple.x && head.y === soloState.player2.apple.y) {
      soloState.player2.snake.push({ ...soloState.player2.snake[soloState.player2.snake.length - 1] });
      soloState.player2.apple = seededPos(soloState.seed++, gameSettings.width, gameSettings.height);
    }
    drawSolo("player2Canvas", soloState.player2.snake, soloState.player2.apple, snakeColors.p2);
    if (checkCollision(soloState.player2.snake)) soloState.player2.alive = false;
  }

  if (!soloState.player1.alive || !soloState.player2.alive) {
    clearInterval(soloState.intervalId);
    soloState.running = false;
    alert("Game over! Time: " + soloState.timer + "ms");
  }
}, 16)};
