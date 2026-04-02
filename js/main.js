/* ═══════════════════════════════════════════════
   PARTICLE CANVAS BACKGROUND
═══════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const COUNT = 80;
  const ACCENT = '0,229,255';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 1.6 + 0.4;
    this.vx = (Math.random() - .5) * .4;
    this.vy = (Math.random() - .5) * .4;
    this.a  = Math.random() * .6 + .2;
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  };

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${ACCENT},${(1 - dist / 130) * 0.15})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT},${p.a})`;
      ctx.fill();
      p.update();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();


/* ═══════════════════════════════════════════════
   TYPING EFFECT
═══════════════════════════════════════════════ */
(function () {
  const phrases = [
    'AI Engineer @ neoAI',
    'NVIDIA Student Ambassador',
    'Graduate Researcher (M1)',
    'LLM / Computer Vision',
    'Multimodal AI Developer',
  ];
  const el = document.getElementById('typed-text');
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (deleting) {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 500); return; }
      setTimeout(tick, 60);
    } else {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 90);
    }
  }
  setTimeout(tick, 1400);
})();


/* ═══════════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════════ */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();


/* ═══════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════ */
(function () {
  const btn   = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();


/* ═══════════════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
═══════════════════════════════════════════════ */
(function () {
  const targets = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => obs.observe(t));
})();


/* ═══════════════════════════════════════════════
   SMOOTH ACTIVE NAV LINK HIGHLIGHT
═══════════════════════════════════════════════ */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent)'
        : '';
    });
  }, { passive: true });
})();
