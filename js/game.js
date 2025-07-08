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

export function createSoloGame() {
  // Placeholder for future solo-mode logic
  console.log("Solo game not yet implemented.");
}
