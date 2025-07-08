export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

export const CELL_SIZE = 20;

export const snake1 = { body: [] };
export const snake2 = { body: [] };

export const dir1 = { x: 1, y: 0 };
export const dir2 = { x: -1, y: 0 };

export const apple = { x: 5, y: 5 };
export const gameRunning = { value: false };
export const soloMode = { value: false };

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

export const soloState = {
  timer: 0,
  intervalId: null,
  running: false,
  seed: Date.now(),
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

export const wins = { p1: 0, p2: 0 };
export const timer = { value: 60000 }; // default 60 seconds
