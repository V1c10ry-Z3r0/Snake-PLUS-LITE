export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

export const CELL_SIZE = 20;
export const WIDTH = canvas.width;
export const HEIGHT = canvas.height;

export const snake1 = [];
export const snake2 = [];

export const dir1 = { x: 1, y: 0 };
export const dir2 = { x: -1, y: 0 };

export const apple = { x: 5, y: 5 };
export const gameRunning = { value: false };
export const soloMode = { value: true };

export const scores = { p1: 0, p2: 0 };
export const wins = { p1: 0, p2: 0 };

export const snakeColors = {
  p1: '#00FF00',
  p2: '#FF0000'
};

export const gameSettings = {
  width: 40,
  height: 30,
  speed: 200,
  allowSelfCross: false,
  allowCross: false,
  wrapAround: true,
  appleFrequency: 1,
  obstacleCount: 0,
  snakeLength: 3,
};

export const timer = { value: 0 };
;

export const soloState = {
  timer: 0,
  intervalId: null,
  running: false,
  seed: Date.now(), // shared RNG seed
  player1: {
    snake: [],
    direction: { x: 1, y: 0 },
    apple: {},
    alive: true
  },
  player2: {
    snake: [],
    direction: { x: 1, y: 0 },
    apple: {},
    alive: true
  }
};

;