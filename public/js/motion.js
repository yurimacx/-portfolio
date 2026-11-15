'use strict';
// Fluidez: rolagem com inércia, parallax, aparição ao rolar e brilho/profundidade com o mouse.
// Não roda para quem pediu "reduzir movimento" no sistema.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('motion');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Aparição ao rolar ---------- */
  const SEL = 'h2, .lead, .craft dl > div, .portrait, .gallery figure, .card, #contato form';
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    : null;
  const count = new Map();
  function scan() {
    document.querySelectorAll(SEL).forEach((el) => {
      if (el.dataset.r) return;
      el.dataset.r = '1'; el.classList.add('reveal');
      const i = count.get(el.parentElement) || 0; count.set(el.parentElement, i + 1);
      el.style.setProperty('--d', (i % 6) * 80 + 'ms');
      io ? io.observe(el) : el.classList.add('in');
    });
  }
  scan();
  const lista = document.getElementById('lista');
  if (lista) new MutationObserver(scan).observe(lista, { childList: true }); // projetos carregados depois

  /* ---------- Parallax ---------- */
  const stage = document.querySelector('.stage');
  const copy = document.querySelector('.copy');
  const figs = [...document.querySelectorAll('.gallery figure')].map((f, i) => ({
    f, img: f.querySelector('img'), speed: [0.05, 0.09, 0.06, 0.1][i % 4],
  }));

  /* ---------- Mouse: brilho e profundidade ---------- */
  let mx = 0, my = 0, gx = innerWidth / 2, gy = innerHeight / 2, px = 0, py = 0, tx = 0, ty = 0;
  let glow = null;
  if (fine) {
    glow = document.createElement('div'); glow.className = 'cursor-glow'; glow.setAttribute('aria-hidden', 'true');
    document.body.append(glow);
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      tx = (e.clientX / innerWidth - 0.5) * 28; ty = (e.clientY / innerHeight - 0.5) * 18;
    }, { passive: true });
  }

  /* ---------- Rolagem com inércia ---------- */
  let target = scrollY, cur = scrollY, gliding = false;
  const maxScroll = () => root.scrollHeight - innerHeight;
  addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.target.closest('textarea, input, select')) return; // zoom e campos: comportamento nativo
    e.preventDefault();
    if (!gliding) { cur = target = scrollY; }
    const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1;
    target = clamp(target + e.deltaY * unit, 0, maxScroll());
    gliding = true;
  }, { passive: false });
  ['keydown', 'pointerdown'].forEach((ev) => addEventListener(ev, () => { gliding = false; }, { passive: true }));
  document.addEventListener('click', (e) => { // links internos deslizam até a seção
    const a = e.target.closest('a[href^="#"]');
    const dest = a && document.getElementById(a.getAttribute('href').slice(1));
    if (!dest) return;
    e.preventDefault();
    cur = scrollY; target = clamp(dest.getBoundingClientRect().top + scrollY, 0, maxScroll()); gliding = true;
    history.replaceState(null, '', a.getAttribute('href'));
  });

  /* ---------- Loop único ---------- */
  let lastY = -1;
  (function frame() {
    if (gliding) {
      cur += (target - cur) * 0.09;
      if (Math.abs(target - cur) < 0.4) { cur = target; gliding = false; }
      scrollTo(0, cur);
    }
    const y = scrollY, vh = innerHeight;
    if (y !== lastY) {
      lastY = y;
      if (y < vh * 1.3) {
        if (stage) stage.style.transform = `translate3d(0,${y * 0.14}px,0)`;
        if (copy) copy.style.transform = `translate3d(0,${y * -0.08}px,0)`;
      }
      for (const { f, img, speed } of figs) {
        const r = f.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const slack = r.height * 0.07;
        const off = clamp(-(r.top + r.height / 2 - vh / 2) * speed, -slack, slack);
        img.style.transform = `translate3d(0,${off.toFixed(1)}px,0) scale(1.14)`;
      }
    }
    if (fine) {
      gx += (mx - gx) * 0.12; gy += (my - gy) * 0.12;
      glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
      px += (tx - px) * 0.06; py += (ty - py) * 0.06;
      root.style.setProperty('--mx', px.toFixed(2) + 'px'); root.style.setProperty('--my', py.toFixed(2) + 'px');
    }
    requestAnimationFrame(frame);
  })();
})();
