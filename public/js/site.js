'use strict';
// Template: parallax da escultura, rolagem com inércia, aparição ao rolar, brilho do mouse e botão de topo.
(() => {
  const root = document.documentElement;
  const totop = document.getElementById('totop');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const onScroll = () => totop && totop.classList.toggle('show', scrollY > 700);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (reduced) return;
  root.classList.add('motion');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Aparição ao rolar */
  const SEL = 'h2, .lead, .about dl > div, .portrait-wrap, .gallery figure, #carousel, #contato form';
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    : null;
  const count = new Map();
  document.querySelectorAll(SEL).forEach((el) => {
    el.classList.add('reveal');
    const i = count.get(el.parentElement) || 0; count.set(el.parentElement, i + 1);
    el.style.setProperty('--d', (i % 6) * 80 + 'ms');
    io ? io.observe(el) : el.classList.add('in');
  });

  /* Elementos animados */
  const art = document.querySelector('.art'), disc = document.querySelector('.disc');
  const figs = [...document.querySelectorAll('.gallery figure')].map((f, i) => ({
    f, img: f.querySelector('img'), speed: [0.05, 0.09, 0.06, 0.1][i % 4] }));
  let tx = 0, ty = 0, x = 0, y = 0, mx = 0, my = 0, gx = innerWidth / 2, gy = innerHeight / 2, glow = null;
  if (fine) {
    glow = document.createElement('div'); glow.className = 'cursor-glow'; glow.setAttribute('aria-hidden', 'true'); document.body.append(glow);
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY; tx = (mx / innerWidth - 0.5) * 2; ty = (my / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* Rolagem com inércia */
  let target = scrollY, cur = scrollY, gliding = false;
  const maxScroll = () => root.scrollHeight - innerHeight;
  addEventListener('wheel', (e) => {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.target.closest('textarea, input, select')) return;
    e.preventDefault();
    if (!gliding) cur = target = scrollY;
    const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1;
    target = clamp(target + e.deltaY * unit, 0, maxScroll()); gliding = true;
  }, { passive: false });
  ['keydown', 'pointerdown'].forEach((ev) => addEventListener(ev, () => { gliding = false; }, { passive: true }));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    const dest = a && document.getElementById(a.getAttribute('href').slice(1));
    if (!dest) return;
    e.preventDefault();
    cur = scrollY; target = clamp(dest.getBoundingClientRect().top + scrollY, 0, maxScroll()); gliding = true;
    history.replaceState(null, '', a.getAttribute('href'));
  });

  /* Loop único */
  let lastY = -1;
  (function frame() {
    if (gliding) {
      cur += (target - cur) * 0.09;
      if (Math.abs(target - cur) < 0.4) { cur = target; gliding = false; }
      scrollTo(0, cur);
    }
    const s = scrollY, vh = innerHeight;
    x += (tx - x) * 0.06; y += (ty - y) * 0.06;
    if (art && disc) {
      art.style.setProperty('--ax', (x * 16).toFixed(2) + 'px');
      art.style.setProperty('--ay', (y * 10 - Math.min(s, vh) * 0.05).toFixed(2) + 'px');
      disc.style.setProperty('--dx', (-x * 12).toFixed(2) + 'px');
      disc.style.setProperty('--dy', (-y * 8).toFixed(2) + 'px');
    }
    if (s !== lastY) {
      lastY = s;
      for (const { f, img, speed } of figs) {
        const r = f.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const slack = r.height * 0.07;
        img.style.transform = `translate3d(0,${clamp(-(r.top + r.height / 2 - vh / 2) * speed, -slack, slack).toFixed(1)}px,0) scale(1.14)`;
      }
    }
    if (glow) { gx += (mx - gx) * 0.12; gy += (my - gy) * 0.12; glow.style.transform = `translate3d(${gx}px,${gy}px,0)`; }
    requestAnimationFrame(frame);
  })();
})();
