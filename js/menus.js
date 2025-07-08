import { saveSettings } from './storage.js';

const menus = {
  main: document.getElementById('main'),
  gameMode: document.getElementById('gameMode'),
  customization: document.getElementById('customization'),
  leaderboards: document.getElementById('leaderboards'),
  settingsForm: document.getElementById('settingsForm')
};

export function switchMenu(id) {
  Object.values(menus).forEach(menu => menu.classList.remove('visible'));
  menus[id]?.classList.add('visible');
}

export function initMenus() {
  document.getElementById('playBtn')?.addEventListener('click', () => switchMenu('gameMode'));
  document.getElementById('customizeBtn')?.addEventListener('click', () => switchMenu('customization'));
  document.getElementById('leaderboardBtn')?.addEventListener('click', () => switchMenu('leaderboards'));
  document.getElementById('optionsBtn')?.addEventListener('click', () => switchMenu('settingsForm'));
  document.getElementById('exitBtn')?.addEventListener('click', () => {
    saveSettings?.();
    alert('Game saved. Please close the tab manually.');
  });
}
