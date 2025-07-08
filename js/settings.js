import { gameSettings, timer, soloMode } from './state.js';
import { createSoloGame, startGame } from './game.js';
import { CELL_SIZE, canvas } from './state.js';

export function createSettingsForm() {
  const settingsDiv = document.getElementById('settingsContent');
  if (!settingsDiv) return;

  settingsDiv.innerHTML = `
    <h2>Game Settings</h2>
    <label>Speed (ms per frame): <input type="number" id="settingSpeed" value="${gameSettings.speed}"></label><br>
    <label>Wrap Around Walls: <input type="checkbox" id="settingWrap" ${gameSettings.wrapAround ? 'checked' : ''}></label><br>
    <label>Allow Snake Self-Cross: <input type="checkbox" id="settingSelf" ${gameSettings.allowSelfCross ? 'checked' : ''}></label><br>
    <label>Allow Snake Cross Each Other: <input type="checkbox" id="settingCross" ${gameSettings.allowCross ? 'checked' : ''}></label><br>
    <label>Obstacle Count: <input type="number" id="settingObstacles" value="${gameSettings.obstacleCount}"></label><br>
    <label>Timer (seconds): <input type="number" id="settingTimer" value="${timer.value / 1000}"></label><br>
    <button id="startSoloBtn">Start Solo</button>
    <button id="startMultiBtn">Start Multi</button>
  `;

  // Add event listeners here
  document.getElementById('startSoloBtn').onclick = () => applySettings(false);
  document.getElementById('startMultiBtn').onclick = () => applySettings(true);
}

function applySettings(isMulti) {
  gameSettings.speed = parseInt(document.getElementById('settingSpeed').value);
  gameSettings.wrapAround = document.getElementById('settingWrap').checked;
  gameSettings.allowSelfCross = document.getElementById('settingSelf').checked;
  gameSettings.allowCross = document.getElementById('settingCross').checked;
  gameSettings.obstacleCount = parseInt(document.getElementById('settingObstacles').value);
  timer.value = parseInt(document.getElementById('settingTimer').value) * 1000;

  // Set canvas size before starting game
  canvas.width = gameSettings.width * CELL_SIZE;
  canvas.height = gameSettings.height * CELL_SIZE;

  // Use the same launch system as index.html
  if (isMulti) {
    window.launchMultiGame();
  } else {
    window.launchSoloGame();
  }
}
