(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;

  // Theme: saved choice, else system preference
  let saved = null; try { saved = localStorage.getItem('theme'); } catch (e) {}
  root.dataset.theme = saved || 'dark';
  $('#theme').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // Mobile menu
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));

  // Project filter
  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.chip').forEach(c => c.classList.toggle('active', c === chip));
    const f = chip.dataset.filter;
    $$('.proj').forEach(p => p.classList.toggle('hide', f !== 'all' && !p.dataset.cat.split(' ').includes(f)));
  }));

  // Active nav link
  const links = $$('.menu a');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-40% 0px -55% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  // Scroll reveal
  const rev = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } }), { threshold: .1 });
  $$('.card, .timeline li').forEach(el => { el.classList.add('reveal'); rev.observe(el); });

  // Back to top
  const top = $('#top-btn');
  addEventListener('scroll', () => { top.hidden = scrollY < 600; }, { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0 }));

  // Contact form: opens the visitor's email app (mailto), no backend
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (!f.checkValidity()) return f.reportValidity();
    const body = `${$('#cmsg').value}\n\nFrom: ${$('#cname').value} (${$('#cemail').value})`;
    location.href = `mailto:es-AhmedAdel2025@alexu.edu.eg?subject=${encodeURIComponent('Portfolio message from ' + $('#cname').value)}&body=${encodeURIComponent(body)}`;
  });

  $('#year').textContent = new Date().getFullYear();
})();
