import { wins } from './state.js';

export function showWinStats() {
  const div = document.getElementById('winStats');
  div.innerHTML = `<h3>Wins</h3><p>Player 1: ${wins.player1}</p><p>Player 2: ${wins.player2}</p>`;
}

export function determineWinner() {
  const s1 = scores.lastP1 || 0;
  const s2 = scores.lastP2 || 0;
  if (s1 > s2) wins.player1++;
  else if (s2 > s1) wins.player2++;
}

export function recordScore() {
  const total = (scores.lastP1 || 0) + (scores.lastP2 || 0);
  scores.multi.push(total);
}
