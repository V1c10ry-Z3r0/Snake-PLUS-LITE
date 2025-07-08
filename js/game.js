import { canvas, ctx, CELL_SIZE, snake1, snake2, dir1, dir2, apple, gameRunning, scores, gameSettings } from './state.js';

export function startGame() {
  snake1.body = [{ x: 5, y: 5 }];
  snake2.body = [{ x: 10, y: 10 }];
  dir1.x = 1; dir1.y = 0;
  dir2.x = -1; dir2.y = 0;
  apple.x = 15; apple.y = 15;
  gameRunning.value = true;
}

export function updateGame() {
  if (!gameRunning.value) return false;

  moveSnake(snake1, dir1);
  moveSnake(snake2, dir2);
  draw();
  return true;
}

function moveSnake(snake, dir) {
  const head = { x: snake.body[0].x + dir.x, y: snake.body[0].y + dir.y };
  snake.body.unshift(head);
  snake.body.pop();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00FF00';
  snake1.body.forEach(seg => ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE, CELL_SIZE));

  ctx.fillStyle = '#FF0000';
  snake2.body.forEach(seg => ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE, CELL_SIZE));

  ctx.fillStyle = '#FF00FF';
  ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

import { soloState, CELL_SIZE, gameSettings } from './state.js';

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

function drawSolo(canvasId, snake, apple, color) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apple
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  // Snake
  ctx.fillStyle = color;
  for (let part of snake) {
    ctx.fillRect(part.x * CELL_SIZE, part.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function moveSnake(snake, dir) {
  const newHead = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  snake.unshift(newHead);
  snake.pop(); // No growth for now
  return newHead;
}

export function createSoloGame() {
  const width = gameSettings.width || 20;
  const height = gameSettings.height || 20;
  const seed = soloState.seed;

  // Shared apple spawn
  const apple = seededPos(seed, width, height);
  soloState.player1.snake = [{ x: 5, y: 5 }];
  soloState.player1.apple = apple;
  soloState.player2.snake = [{ x: 5, y: 5 }];
  soloState.player2.apple = apple;

  soloState.running = true;
  soloState.timer = 0;

  soloState.intervalId = setInterval(() => {
    if (!soloState.running) return;

    soloState.timer += 16;

    // Player 1
    if (soloState.player1.alive) {
      moveSnake(soloState.player1.snake, soloState.player1.direction);
      drawSolo("player1Canvas", soloState.player1.snake, soloState.player1.apple, "#00FF00");
      if (checkCollision(soloState.player1.snake)) soloState.player1.alive = false;
    }

    // Player 2
    if (soloState.player2.alive) {
      moveSnake(soloState.player2.snake, soloState.player2.direction);
      drawSolo("player2Canvas", soloState.player2.snake, soloState.player2.apple, "#FF0000");
      if (checkCollision(soloState.player2.snake)) soloState.player2.alive = false;
    }

    // Stop game if either dies
    if (!soloState.player1.alive || !soloState.player2.alive) {
      clearInterval(soloState.intervalId);
      soloState.running = false;
      alert("Game over! Time: " + soloState.timer + "ms");
    }
  }, 16);
}

function checkCollision(snake) {
  const head = snake[0];
  // Wall collision
  if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20) return true;
  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) return true;
  }
  return false;
}

