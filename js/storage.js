export function saveSettings() {
  const settings = {
    snakeColors,
    wins,
    scores
  };
  localStorage.setItem('snakeSettings', JSON.stringify(settings));
}

export function loadSettings() {
  const saved = JSON.parse(localStorage.getItem('snakeSettings'));
  if (!saved) return;

  if (saved.snakeColors) Object.assign(snakeColors, saved.snakeColors);
  if (saved.wins) Object.assign(wins, saved.wins);
  if (saved.scores) Object.assign(scores, saved.scores);
}
