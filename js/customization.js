import { snakeColors } from './state.js';
import { saveSettings } from './storage.js';

export function initCustomizationUI() {
  const p1 = document.getElementById('color1');
  const p2 = document.getElementById('color2');
  p1.value = snakeColors[0];
  p2.value = snakeColors[1];

  document.getElementById('saveColorsBtn').onclick = () => {
    snakeColors[0] = p1.value;
    snakeColors[1] = p2.value;
    saveSettings();
  };
}
