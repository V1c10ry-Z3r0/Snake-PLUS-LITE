import {
  ctx, CELL_SIZE, gameSettings, snake1, snake2,
  dir1, dir2, apple, gameRunning, soloMode, scores, wins, snakeColors, timer
} from './state.js';

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function moveSnake(snake, dir) {
  const head = { ...snake[0] };
  head.x += dir.x;
  head.y += dir.y;

  if (gameSettings.wrapAround) {
    head.x = (head.x + gameSettings.width) % gameSettings.width;
    head.y = (head.y + gameSettings.height) % gameSettings.height;
  }

  snake.unshift(head);

  const ateApple = head.x === apple.x && head.y === apple.y;
  if (!ateApple) snake.pop();
  else spawnApple();

  return ateApple;
}

function spawnApple() {
  apple.x = Math.floor(Math.random() * gameSettings.width);
  apple.y = Math.floor(Math.random() * gameSettings.height);
}

export function startGame() {
  snake1.length = 0;
  snake2.length = 0;
  dir1.x = 1; dir1.y = 0;
  dir2.x = -1; dir2.y = 0;

  for (let i = 0; i < gameSettings.snakeLength; i++) {
    snake1.push({ x: 5 - i, y: 5 });
    snake2.push({ x: gameSettings.width - 5 + i, y: gameSettings.height - 5 });
  }

  spawnApple();
  gameRunning.value = true;
  timer.value = 600; // 60 seconds default if not set
}

function detectCollision(snake, otherSnake) {
  const [head, ...body] = snake;

  // Wall collision
  if (!gameSettings.wrapAround &&
    (head.x < 0 || head.x >= gameSettings.width || head.y < 0 || head.y >= gameSettings.height)
  ) return true;

  // Self collision
  if (!gameSettings.allowSelfCross && body.some(p => p.x === head.x && p.y === head.y)) {
    return true;
  }

  // Collision with other snake
  if (!gameSettings.allowCross && otherSnake.some(p => p.x === head.x && p.y === head.y)) {
    return true;
  }

  return false;
}

export function updateGame() {
  if (!gameRunning.value) return false;

  timer.value--;
  if (timer.value <= 0) {
    gameRunning.value = false;
    wins[determineWinner()]++;
    return false;
  }

  const ate1 = moveSnake(snake1, dir1);
  const ate2 = moveSnake(snake2, dir2);

  if (detectCollision(snake1, snake2)) {
    gameRunning.value = false;
    wins.p2++;
    return false;
  }
  if (detectCollision(snake2, snake1)) {
    gameRunning.value = false;
    wins.p1++;
    return false;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  snake1.forEach(p => drawCell(p.x, p.y, snakeColors.p1));
  snake2.forEach(p => drawCell(p.x, p.y, snakeColors.p2));
  drawCell(apple.x, apple.y, 'red');

  return true;
}
