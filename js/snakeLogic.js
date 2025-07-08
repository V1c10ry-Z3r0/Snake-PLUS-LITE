import { WIDTH, HEIGHT } from './utils.js';
import { apple, snake1, snake2 } from './state.js';

export function createSnake(x, y) {
  return [
    { x, y },
    { x: x - 1, y },
    { x: x - 2, y }
  ];
}

export function moveSnake(snake, dir) {
  const head = { ...snake[0] };
  if (dir === 'UP') head.y--;
  if (dir === 'DOWN') head.y++;
  if (dir === 'LEFT') head.x--;
  if (dir === 'RIGHT') head.x++;

  // wrapping
  if (head.x < 0 || head.y < 0 || head.x >= WIDTH || head.y >= HEIGHT) {
    return false;
  }

  if (snake.slice(1).some(p => p.x === head.x && p.y === head.y)) {
    return false;
  }

  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    spawnApple();
  } else {
    snake.pop();
  }
  return true;
}

export function spawnApple() {
  do {
    apple.x = Math.floor(Math.random() * WIDTH);
    apple.y = Math.floor(Math.random() * HEIGHT);
  } while (
    snake1.some(p => p.x === apple.x && p.y === apple.y) ||
    snake2.some(p => p.x === apple.x && p.y === apple.y)
  );
}
