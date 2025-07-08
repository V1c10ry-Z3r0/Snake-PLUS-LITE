export function switchMenu(id) {
  const menus = document.querySelectorAll('.menu');
  menus.forEach(menu => menu.classList.remove('visible'));

  document.getElementById('gameCanvas').style.display = 'none';
  document.getElementById('soloCanvasContainer').style.display = 'none';

  if (id) {
    const target = document.getElementById(id);
    if (target) target.classList.add('visible');
  }
}

export function initMenus() {
  switchMenu("main");
}
