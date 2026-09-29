(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);   const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme (saved choice, else system preference) ---------- */
  $('#theme').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = next === 'dark' ? '#080d19' : '#f5f7fb';
  });

  /* ---------- Mouse Glow Effect ---------- */
  const mouseGlow = $('#mouseGlow');
  if (mouseGlow && !reduceMotion) {
    let glowX = 0, glowY = 0;
    document.addEventListener('mousemove', e => {
      glowX = e.clientX;
      glowY = e.clientY;
      mouseGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    });
  }

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger'), menu = $('#menu');   const setMenu = open => {     menu.classList.toggle('open', open);     burger.setAttribute('aria-expanded', String(open));   };   burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));   $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Project filter ---------- */
  const chips = $$('.chip'), projects =$$('.proj');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => {
      const on = c === chip;
      c.classList.toggle('active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    const f = chip.dataset.filter;
    projects.forEach(p => { p.hidden = f !== 'all' && !p.dataset.cat.split(' ').includes(f); });
  }));

  /* ---------- Active nav link ---------- */
  const links = $$('.menu a');   const spy = new IntersectionObserver(entries => entries.forEach(e => {     if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));   }), { rootMargin: '-40\% 0px -55\% 0px' });   $$('main section[id]').forEach(s => spy.observe(s));

  /* ---------- Scroll progress + back to top ---------- */
  const bar = $('#progress'), topBtn = $('#top-btn');
  let ticking = false;
  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    topBtn.hidden = scrollY < 700;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Stat counters ---------- */
  const counters = $$('[data-count]');   if (!reduceMotion && 'IntersectionObserver' in window) {     const io = new IntersectionObserver(entries => entries.forEach(e => {       if (!e.isIntersecting) return;       io.unobserve(e.target);       const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix \vert{}\vert{} '';       const t0 = performance.now(), dur = 1100;       const tick = now => {         const p = Math.min((now - t0) / dur, 1);         el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : '');         if (p < 1) requestAnimationFrame(tick);       };       requestAnimationFrame(tick);     }), { threshold: .6 });     counters.forEach(c => io.observe(c));   }    /* ---------- Broken image fallback ---------- */   $$('.shot img, .cimg img').forEach(img => {
    const fail = () => img.parentElement.classList.add('broken');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0 && img.src) fail();
  });

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-zoom]');
    if (!a || !lb.showModal) return;
    e.preventDefault();
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.dataset.caption || '';
    lbCap.textContent = a.dataset.caption || '';
    lb.showModal();
  });
  $('#lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('close', () => { lbImg.removeAttribute('src'); });

  /* ---------- Contact form ---------- */
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (!f.checkValidity()) return f.reportValidity();
    const name = $('#cname').value.trim(), email = $('#cemail').value.trim();
    const body = `${$('#cmsg').value}\n\nFrom: ${name} (${email})`;
    location.href = `mailto:es-AhmedAdel2025@alexu.edu.eg?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(body)}`;
  });

  $('#year').textContent = new Date().getFullYear();
})();
