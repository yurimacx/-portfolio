'use strict';
// Carrossel de prévias. Dados: /data/previews.json | mídia: /assets/previews/ (imagens ou vídeos).
(async () => {
  const $ = (id) => document.getElementById(id);
  const track = $('car-track'), bar = $('car-bar'), empty = $('car-empty');
  if (!track) return;
  const OK_MEDIA = /^\/assets\/previews\/[\w.\-\/]+\.(webp|jpe?g|png|avif|mp4|webm)$/i;
  const OK_VIDEO = /\.(mp4|webm)$/i;
  let items = [];
  try { const r = await fetch('/data/previews.json'); if (r.ok) items = await r.json(); } catch { /* sem dados */ }
  items = (Array.isArray(items) ? items : []).filter((i) => i && OK_MEDIA.test(i.media || '')).slice(0, 12);
  if (!items.length) { track.hidden = true; bar.hidden = true; empty.hidden = false; return; }

  const n = items.length;
  const safeUrl = (u) => (typeof u === 'string' && /^https?:\/\//i.test(u) ? u : '');
  const slides = items.map((it, i) => {
    const url = safeUrl(it.url);
    const el = document.createElement(url ? 'a' : 'figure'); el.className = 'slide';
    if (url) { el.href = url; el.target = '_blank'; el.rel = 'noopener noreferrer'; }
    const chrome = document.createElement('div'); chrome.className = 'chrome';
    let host = ''; try { host = url ? new URL(url).hostname : ''; } catch { /* ignora */ }
    const label = document.createElement('span'); label.textContent = host || String(it.title || '');
    chrome.append(document.createElement('i'), document.createElement('i'), document.createElement('i'), label);
    const shot = document.createElement('div'); shot.className = 'shot';
    let media;
    if (OK_VIDEO.test(it.media) || it.type === 'video') {
      media = document.createElement('video'); media.muted = true; media.loop = true; media.playsInline = true; media.preload = 'metadata';
      media.setAttribute('aria-label', String(it.alt || it.title || '')); media.src = it.media;
    } else {
      media = document.createElement('img'); media.src = it.media; media.alt = String(it.alt || it.title || '');
      media.loading = i < 2 ? 'eager' : 'lazy'; media.decoding = 'async';
    }
    shot.append(media); el.append(chrome, shot); track.append(el);
    el.addEventListener('click', (e) => { if (!el.classList.contains('is-active')) { e.preventDefault(); go(i); } });
    return { el, media };
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = 6000;
  let idx = 0, prog = 0, playing = !reduced, hovering = false, last = performance.now();
  const half = Math.floor(n / 2);

  function render() {
    slides.forEach(({ el, media }, i) => {
      let o = ((i - idx + n + half) % n) - half; if (n % 2 === 0 && o === -half) o = half;
      const a = Math.abs(o);
      el.style.transform = `translateX(${o * 56}%) scale(${1 - Math.min(a, 2) * 0.15})`;
      el.style.opacity = a === 0 ? 1 : a === 1 ? 0.5 : a === 2 ? 0.15 : 0;
      el.style.zIndex = 10 - a; el.style.pointerEvents = a > 1 ? 'none' : 'auto';
      el.classList.toggle('is-active', a === 0);
      el.toggleAttribute('inert', a > 1); el.setAttribute('aria-hidden', a === 0 ? 'false' : 'true');
      if (a !== 0) el.tabIndex = -1; else el.removeAttribute('tabindex');
      if (media.tagName === 'VIDEO') { if (a === 0) media.play().catch(() => {}); else media.pause(); }
    });
    const it = items[idx], url = safeUrl(it.url), open = $('car-open');
    $('car-title').textContent = String(it.title || ''); $('car-desc').textContent = String(it.description || '');
    open.hidden = !url; if (url) open.href = url;
    $('car-i').textContent = String(idx + 1).padStart(2, '0'); $('car-n').textContent = String(n).padStart(2, '0');
  }
  function go(i) { idx = (i + n) % n; prog = 0; last = performance.now(); render(); }
  $('car-prev').addEventListener('click', () => go(idx - 1));
  $('car-next').addEventListener('click', () => go(idx + 1));
  const toggle = $('car-toggle');
  function setPlaying(v) {
    playing = v; toggle.dataset.i18nLabel = v ? 'pf.pause' : 'pf.play'; toggle.setAttribute('aria-label', t(toggle.dataset.i18nLabel));
    $('car-icon').setAttribute('d', v ? 'M4 3h3v10H4zM9 3h3v10H9z' : 'M4 2.5l9 5.5-9 5.5z');
  }
  toggle.addEventListener('click', () => setPlaying(!playing));
  const root = $('carousel');
  root.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') go(idx - 1); else if (e.key === 'ArrowRight') go(idx + 1); });
  root.addEventListener('pointerenter', () => { hovering = true; }); root.addEventListener('pointerleave', () => { hovering = false; });
  let sx = null;
  track.addEventListener('pointerdown', (e) => { sx = e.clientX; });
  track.addEventListener('pointerup', (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 50) go(idx + (e.clientX < sx ? 1 : -1)); sx = null; });

  setPlaying(playing); render();
  (function tick(now) {
    const dt = now - last; last = now;
    if (playing && !hovering && !document.hidden && !root.contains(document.activeElement) && n > 1) {
      prog += dt; if (prog >= DUR) { go(idx + 1); }
    }
    $('car-fill').style.setProperty('--p', (((idx + Math.min(prog / DUR, 1)) / n)).toFixed(4));
    requestAnimationFrame(tick);
  })(performance.now());
})();
