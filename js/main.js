/* ═══════════════════════════════════════════════
   STARFIELD (subtle: 3 depth layers, slow drift,
   twinkle, scroll/mouse parallax, rare shooting star)
═══════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LAYERS = [
    { share: 0.62, size: [0.35, 0.8], alpha: [0.18, 0.42], speed: 0.018, parallax: 0.015 },
    { share: 0.30, size: [0.6, 1.1],  alpha: [0.28, 0.6],  speed: 0.035, parallax: 0.035 },
    { share: 0.08, size: [1.0, 1.6],  alpha: [0.45, 0.85], speed: 0.06,  parallax: 0.07 },
  ];
  const TINTS = ['237,250,255', '167,219,236', '131,222,244', '243,226,196'];
  let W = 0, H = 0, dpr = 1, stars = [], shooting = null, nextShoot = 0;
  let mx = 0, my = 0, tmx = 0, tmy = 0, running = true;
  const rand = (a, b) => a + Math.random() * (b - a);

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const total = Math.min(260, Math.round((W * H) / 6500)); // density scales with area, capped
    stars = [];
    LAYERS.forEach((L, li) => {
      const n = Math.round(total * L.share);
      for (let i = 0; i < n; i++) {
        stars.push({
          li, x: Math.random() * W, y: Math.random() * H,
          r: rand(...L.size), a: rand(...L.alpha),
          tw: Math.random() * Math.PI * 2, ts: rand(0.4, 1.3),
          c: TINTS[(Math.random() * TINTS.length) | 0],
        });
      }
    });
  }

  function spawnShoot(t) {
    const fromLeft = Math.random() < 0.5;
    shooting = {
      x: fromLeft ? rand(0, W * 0.4) : rand(W * 0.6, W), y: rand(0, H * 0.35),
      vx: (fromLeft ? 1 : -1) * rand(5, 7), vy: rand(1.6, 2.6), life: 0, max: rand(55, 75),
    };
    nextShoot = t + rand(9000, 16000);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
    const sy = window.scrollY;
    for (const s of stars) {
      const L = LAYERS[s.li];
      if (!reduce) {
        s.x -= L.speed; s.y += L.speed * 0.35;
        if (s.x < -4) s.x += W + 8;
        if (s.y > H + 4) s.y -= H + 8;
      }
      const tw = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.ts + s.tw);
      let px = s.x + mx * L.parallax * 40;
      let py = (s.y - sy * L.parallax) % H; if (py < 0) py += H;
      py += my * L.parallax * 40;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${s.c},${(s.a * tw).toFixed(3)})`;
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.li === 2) { // soft glow on nearest layer only
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c},${(s.a * tw * 0.12).toFixed(3)})`;
        ctx.arc(px, py, s.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (!reduce && W > 768) {
      if (!shooting && t > nextShoot) spawnShoot(t);
      if (shooting) {
        const s = shooting; s.life++; s.x += s.vx; s.y += s.vy;
        const k = s.life / s.max, alpha = Math.sin(Math.PI * k) * 0.55;
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
        g.addColorStop(0, `rgba(210,245,255,${alpha})`); g.addColorStop(1, 'rgba(131,222,244,0)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.1;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14); ctx.stroke();
        if (s.life >= s.max) shooting = null;
      }
    }
    if (running && !reduce) requestAnimationFrame(draw);
  }

  build();
  nextShoot = performance.now() + 6000;
  window.addEventListener('resize', build);
  window.addEventListener('pointermove', e => {
    tmx = e.clientX / W - 0.5; tmy = e.clientY / H - 0.5;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running && !reduce) requestAnimationFrame(draw);
  });
  if (reduce) { window.addEventListener('scroll', () => draw(0), { passive: true }); }
  requestAnimationFrame(draw);
})();

/* ═══════════════════════════════════════════════
   TYPING EFFECT
═══════════════════════════════════════════════ */
(function () {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = () => (window.I18N ? window.I18N.msg('typed') : ['Graduate Researcher / Computer Vision']);
  let pi = 0, ci = 0, deleting = false;
  function tick() {
    const list = phrases();
    const phrase = list[pi % list.length];
    if (deleting) {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % list.length; setTimeout(tick, 420); return; }
      setTimeout(tick, 40);
    } else {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 70);
    }
  }
  setTimeout(tick, 600);
})();

/* ═══════════════════════════════════════════════
   JST CLOCK
═══════════════════════════════════════════════ */
(function () {
  const el = document.getElementById('clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const update = () => { el.textContent = fmt.format(new Date()); };
  update();
  setInterval(update, 1000);
})();

/* ═══════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════ */
(function () {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

/* ═══════════════════════════════════════════════
   ACTIVE NAV + REVEAL
═══════════════════════════════════════════════ */
(function () {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const onScroll = () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
      const idx = Math.max(0, siblings.indexOf(entry.target));
      setTimeout(() => entry.target.classList.add('visible'), idx * 90);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  targets.forEach(t => obs.observe(t));
})();

/* ═══════════════════════════════════════════════
   CONTACT FORM (FormSubmit AJAX)
═══════════════════════════════════════════════ */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const submit = document.getElementById('form-submit');
  const endpoint = form.dataset.endpoint;
  const f = key => String(form.elements.namedItem(key)?.value ?? "");

  const M = key => (window.I18N ? window.I18N.msg(key) : key);
  let state = 'idle';
  const setStatus = (key, type) => {
    state = key;
    status.textContent = '> ' + M(key);
    status.className = 'form-status' + (type ? ' ' + type : '');
  };

  setStatus('idle', '');
  if (window.I18N) window.I18N.onChange(() => { status.textContent = '> ' + M(state); });

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.closest('.field')?.classList.remove('invalid'));
    el.addEventListener('change', () => el.closest('.field')?.classList.remove('invalid'));
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach(el => {
      const ok = el.checkValidity() && String(el.value).trim() !== '';
      el.closest('.field')?.classList.toggle('invalid', !ok);
      if (!ok && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      setStatus('invalid', 'err');
      firstInvalid.focus();
      return;
    }
    if (f("_honey")) return; // bot

    const data = {
      name: f("name").trim(),
      organization: f("organization").trim() || '-',
      email: f("email").trim(),
      message: f("message").trim(),
      _subject: `[Portfolio] ${M('subject')} / ${f("name").trim()}`,
      _replyto: f("email").trim(),
      _template: 'table',
      _captcha: 'false',
    };

    submit.disabled = true;
    setStatus('sending', '');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === 'false') throw new Error(json.message || res.status);
      form.reset();
      setStatus('ok', 'ok');
    } catch (err) {
      setStatus('err', 'err');
      console.error(err);
    } finally {
      submit.disabled = false;
    }
  });
})();
