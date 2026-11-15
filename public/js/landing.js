'use strict';
// Parallax suave da escultura: cursor (profundidade entre escultura e círculo) e rolagem.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const art = document.querySelector('.art'), disc = document.querySelector('.disc');
  if (!art || !disc) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let tx = 0, ty = 0, x = 0, y = 0, lastS = -1;
  if (fine) addEventListener('pointermove', (e) => {
    tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });
  (function frame() {
    const s = scrollY;
    if (Math.abs(tx - x) > 0.0005 || Math.abs(ty - y) > 0.0005 || s !== lastS) {
      x += (tx - x) * 0.06; y += (ty - y) * 0.06; lastS = s;
      art.style.setProperty('--ax', (x * 16).toFixed(2) + 'px');
      art.style.setProperty('--ay', (y * 10 - s * 0.05).toFixed(2) + 'px');
      disc.style.setProperty('--dx', (-x * 12).toFixed(2) + 'px');
      disc.style.setProperty('--dy', (-y * 8).toFixed(2) + 'px');
    }
    requestAnimationFrame(frame);
  })();
})();
