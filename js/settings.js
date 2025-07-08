import { gameSettings, timer } from './state.js';
import { startGame } from './game.js';

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
    <label>Timer (seconds): <input type="number" id="settingTimer" value="60"></label><br>
    <button onclick="applySettings(false)">Start Solo</button>
    <button onclick="applySettings(true)">Start Multi</button>
  `;
}

window.applySettings = function (isMulti) {
  gameSettings.speed = parseInt(document.getElementById('settingSpeed').value);
  gameSettings.wrapAround = document.getElementById('settingWrap').checked;
  gameSettings.allowSelfCross = document.getElementById('settingSelf').checked;
  gameSettings.allowCross = document.getElementById('settingCross').checked;
  gameSettings.obstacleCount = parseInt(document.getElementById('settingObstacles').value);
  timer.value = parseInt(document.getElementById('settingTimer').value) * 10;

  startGame(!isMulti);
};
