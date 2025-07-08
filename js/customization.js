import { snakeColors } from './state.js';
import { saveSettings } from './storage.js';

export function initCustomizationUI() {
  const p1 = document.getElementById('color1');
  const p2 = document.getElementById('color2');

  // Load existing values
  p1.value = snakeColors.p1;
  p2.value = snakeColors.p2;

  document.getElementById('saveColorsBtn').onclick = () => {
    snakeColors.p1 = p1.value;
    snakeColors.p2 = p2.value;
    saveSettings();
    alert("Colors saved!");
  };
}
