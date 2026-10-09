/* ════════════════════════════════════════════════════════════
   MAIN — smooth scroll, header state, active nav, reveals,
   mobile menu, contact form (FormSubmit)
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const M = k => (window.I18N ? window.I18N.msg(k) : k);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) window.scrollTo(0, 0);

  /* hero entrance once fonts are ready */
  const go = () => root.classList.add('is-ready');
  (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]) : Promise.resolve()).then(() => requestAnimationFrame(go));

  /* smooth scroll */
  let lenis = null;
  if (window.Lenis && !reduce && fine) {
    lenis = new window.Lenis({ duration: 1.0, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const headH = () => ($('#header') ? $('#header').offsetHeight : 0);
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    const el = id === '#top' ? document.body : $(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(id === '#top' ? 0 : el, { offset: -(headH() + 8), duration: 1.2 });
    else window.scrollTo({ top: id === '#top' ? 0 : el.getBoundingClientRect().top + scrollY - headH() - 8, behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* header + active nav */
  const header = $('#header');
  const links = $$('.nav a');
  const sections = $$('main section[id]');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    let cur = '';
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.35) cur = s.id;
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  const btn = $('#menu-btn'), mnav = $('#mobile-nav');
  const menuLabel = open => {
    const en = document.documentElement.lang === 'en';
    btn.textContent = open ? (en ? 'Close' : '閉じる') : 'Menu';
  };
  function closeMenu() { if (!mnav || mnav.hidden) return; mnav.hidden = true; btn.setAttribute('aria-expanded', 'false'); menuLabel(false); }
  if (btn && mnav) btn.addEventListener('click', () => { const open = mnav.hidden; mnav.hidden = !open; btn.setAttribute('aria-expanded', String(open)); menuLabel(open); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* reveals */
  const targets = $$('[data-reveal], [data-reveal-img]');
  if ('IntersectionObserver' in window && !reduce) {
    const seen = new Map();
    targets.forEach(el => { const p = el.parentElement; const n = seen.get(p) || 0; seen.set(p, n + 1); el.style.setProperty('--d', Math.min(n, 5) * 0.07 + 's'); });
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    targets.forEach(el => io.observe(el));
  } else targets.forEach(el => el.classList.add('is-in'));

  /* contact form */
  const form = $('#contact-form');
  if (form) {
    const status = $('#form-status'), submit = $('#form-submit');
    const f = k => String(form.elements.namedItem(k)?.value ?? '');
    let state = 'idle';
    const set = (k, type) => { state = k; status.textContent = M(k); status.className = 'form-status' + (type ? ' ' + type : ''); };
    set('idle', '');
    if (window.I18N) window.I18N.onChange(() => { status.textContent = M(state); });
    form.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', () => el.closest('.field')?.classList.remove('invalid')));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      let first = null;
      form.querySelectorAll('[required]').forEach(el => {
        const ok = el.checkValidity() && el.value.trim() !== '';
        el.closest('.field')?.classList.toggle('invalid', !ok);
        if (!ok && !first) first = el;
      });
      if (first) { set('invalid', 'err'); first.focus(); return; }
      if (f('_honey')) return;
      const data = { name: f('name').trim(), organization: f('organization').trim() || '-', email: f('email').trim(), message: f('message').trim(),
        _subject: `[Portfolio] ${M('subject')} / ${f('name').trim()}`, _replyto: f('email').trim(), _template: 'table', _captcha: 'false' };
      submit.disabled = true; set('sending', '');
      try {
        const res = await fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || String(json.success) === 'false') throw new Error(json.message || res.status);
        form.reset(); set('ok', 'ok');
      } catch (err) { set('err', 'err'); console.error(err); }
      finally { submit.disabled = false; }
    });
  }
})();
