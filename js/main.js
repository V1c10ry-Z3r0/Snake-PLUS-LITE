import { initMenus, switchMenu } from './menus.js';
import { loadSettings } from './storage.js';
import { showWinStats } from './leaderboard.js';

window.onload = () => {
  loadSettings();
  initMenus();
  switchMenu('main');
  showWinStats();
};