/* ════════════════════════════════════════════════════════════
   FIG. 1 — the fox point cloud
   65,000 vertices sampled from a mesh generated with instant-ngp.
   Points converge on load, drag to orbit, optional floater overlay.
   Mounted on every canvas.fox-canvas (Fig. 1 hero, Fig. 2 floaters).
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const canvases = document.querySelectorAll('canvas.fox-canvas');
  if (!canvases.length) return;
  let shared = null;
  const root = document.documentElement;
  canvases.forEach(cv => mount(cv));

  function mount(canvas) {
  const fig = canvas.closest('figure');
  const status = fig ? fig.querySelector('.fig-status') : null;
  const withScroll = canvas.dataset.scroll === '1';
  const startFloaters = canvas.dataset.floaters === '1' ? 1 : 0;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let gl = null;
  try { gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false }); } catch (e) { gl = null; }
  if (!gl) { if (status) status.textContent = 'WebGL is not available in this browser'; return; }

  /* ---------- math ---------- */
  const mul = (a, b) => {
    const o = new Float32Array(16);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
    return o;
  };
  const rotX = t => { const c = Math.cos(t), s = Math.sin(t); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]); };
  const rotY = t => { const c = Math.cos(t), s = Math.sin(t); return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]); };
  const rotZ = t => { const c = Math.cos(t), s = Math.sin(t); return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); };
  const persp = (fovy, asp, n, f) => { const t = 1 / Math.tan(fovy / 2), nf = 1 / (n - f); return new Float32Array([t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) * nf, -1, 0, 0, 2 * f * n * nf, 0]); };
  const translate = (x, y, z) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);

  /* base orientation: makes the instant-ngp fox upright and facing the viewer */
  let DIST = parseFloat(canvas.dataset.dist || '5.0'), OFFY = parseFloat(canvas.dataset.offy || '0');
  const BASE = {
    x: parseFloat(canvas.dataset.rx || '0'), y: parseFloat(canvas.dataset.ry || '0'), z: parseFloat(canvas.dataset.rz || '0'),
  };

  /* ---------- shaders ---------- */
  const VS = `
    precision highp float;
    attribute vec3 aPos; attribute vec3 aCol; attribute vec4 aStart;
    uniform mat4 uMVP; uniform float uBuild; uniform float uSize; uniform float uPR;
    varying vec3 vCol; varying float vE;
    void main() {
      float p = clamp((uBuild - aStart.w * 0.5) / 0.5, 0.0, 1.0);
      float e = 1.0 - pow(1.0 - p, 3.0);
      vec3 pos = mix(aPos + aStart.xyz, aPos, e);
      vec4 c = uMVP * vec4(pos, 1.0);
      gl_Position = c;
      gl_PointSize = max(1.0, uSize * uPR * (5.0 / c.w));
      float depth = clamp((c.w - 4.2) / 1.6, 0.0, 1.0);
      vCol = aCol * mix(1.0, 0.72, depth);
      vE = e;
    }`;
  const FS = `
    precision mediump float;
    varying vec3 vCol; varying float vE;
    uniform vec3 uPaper;
    void main() {
      vec2 d = gl_PointCoord - 0.5;
      if (dot(d, d) > 0.25) discard;
      gl_FragColor = vec4(mix(uPaper * 0.7, vCol, 0.25 + 0.75 * vE), 1.0);
    }`;
  const VS_F = `
    precision highp float;
    attribute vec4 aF;
    uniform mat4 uMVP; uniform float uShow; uniform float uTime; uniform float uSize; uniform float uPR;
    varying float vA;
    void main() {
      float v = clamp((uShow - fract(aF.w * 7.13) * 0.5) / 0.5, 0.0, 1.0);
      vec3 p = aF.xyz + 0.012 * vec3(sin(uTime * 0.9 + aF.w * 40.0), cos(uTime * 0.7 + aF.w * 23.0), sin(uTime * 0.8 + aF.w * 11.0));
      vec4 c = uMVP * vec4(p, 1.0);
      gl_Position = c;
      gl_PointSize = v <= 0.0 ? 0.0 : max(1.0, uSize * 1.75 * uPR * (5.0 / c.w));
      vA = v;
    }`;
  const FS_F = `
    precision mediump float;
    varying float vA;
    uniform vec3 uAcc; uniform vec3 uRim;
    void main() {
      vec2 d = gl_PointCoord - 0.5;
      float r = dot(d, d);
      if (r > 0.25) discard;
      gl_FragColor = vec4(r > 0.165 ? uRim : uAcc, vA);
    }`;
  function prog(vs, fs) {
    const mk = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh)); return sh; };
    const p = gl.createProgram(); gl.attachShader(p, mk(gl.VERTEX_SHADER, vs)); gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    return p;
  }
  const P = prog(VS, FS), PF = prog(VS_F, FS_F);
  const L = {
    aPos: gl.getAttribLocation(P, 'aPos'), aCol: gl.getAttribLocation(P, 'aCol'), aStart: gl.getAttribLocation(P, 'aStart'),
    uMVP: gl.getUniformLocation(P, 'uMVP'), uBuild: gl.getUniformLocation(P, 'uBuild'), uSize: gl.getUniformLocation(P, 'uSize'),
    uPR: gl.getUniformLocation(P, 'uPR'), uPaper: gl.getUniformLocation(P, 'uPaper'),
  };
  const LF = {
    aF: gl.getAttribLocation(PF, 'aF'), uMVP: gl.getUniformLocation(PF, 'uMVP'), uShow: gl.getUniformLocation(PF, 'uShow'),
    uTime: gl.getUniformLocation(PF, 'uTime'), uSize: gl.getUniformLocation(PF, 'uSize'), uPR: gl.getUniformLocation(PF, 'uPR'),
    uAcc: gl.getUniformLocation(PF, 'uAcc'), uRim: gl.getUniformLocation(PF, 'uRim'),
  };
  /* colours follow the CSS custom properties (--accent, --paper-2) */
  const parseCol = v => {
    v = (v || '').trim();
    let m = v.match(/^#([0-9a-f]{6})$/i);
    if (m) { const n = parseInt(m[1], 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }
    m = v.match(/rgba?\(([^)]+)\)/);
    if (m) { const p = m[1].split(',').map(parseFloat); return [p[0] / 255, p[1] / 255, p[2] / 255]; }
    return null;
  };
  let ACC = [0.5, 0.86, 0.96], RIM = [0.04, 0.05, 0.06], STAGE = [0.06, 0.07, 0.075];
  const readCols = () => {
    const cs = getComputedStyle(document.documentElement);
    ACC = parseCol(cs.getPropertyValue('--floater')) || parseCol(cs.getPropertyValue('--accent')) || ACC;
    STAGE = parseCol(cs.getPropertyValue('--paper-2')) || STAGE;
    RIM = parseCol(cs.getPropertyValue('--floater-rim')) || RIM;
  };
  readCols();
  window.addEventListener('palette:change', () => { readCols(); schedule(); });

  /* ---------- state ---------- */
  let count = 0, bufPos, bufCol, bufStart, bufF, nF = 0;
  let W = 0, H = 0, dpr = 1, proj;
  let build = reduce ? 1 : 0, buildT0 = -1;
  let show = startFloaters, showTarget = startFloaters;
  let yaw = -0.55, pitch = 0.1, vYaw = 0, dragging = false, lx = 0, ly = 0, mx = 0, tmx = 0;
  let visible = withScroll, running = false, ready = false, scrollRot = 0;
  const t0 = performance.now();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    proj = persp(28 * Math.PI / 180, W / Math.max(1, H), 0.1, 20);
  }

  function load() {
    if (!shared) shared = fetchFox();
    return shared;
  }
  async function fetchFox() {
    const res = await fetch('assets/fox.bin');
    const total = +res.headers.get('content-length') || 585008;
    let buf;
    if (res.body && res.body.getReader) {
      const reader = res.body.getReader(); const chunks = []; let got = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value); got += value.length;
        document.querySelectorAll('.fig-status').forEach(el => { if (!el.classList.contains('is-done')) el.textContent = Math.min(99, Math.round(got / total * 100)) + '%'; });
      }
      const u8 = new Uint8Array(got); let o = 0; for (const c of chunks) { u8.set(c, o); o += c.length; }
      buf = u8.buffer;
    } else buf = await res.arrayBuffer();
    return buf;
  }

  function setup(buf) {
    const dv = new DataView(buf);
    count = dv.getUint32(4, true);
    const pos = new Int16Array(buf, 8, count * 3);
    const col = new Uint8Array(buf, 8 + count * 6, count * 3);
    // start offsets: points begin scattered and converge (like an optimisation settling)
    const start = new Float32Array(count * 4);
    let s = 7;
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    for (let i = 0; i < count; i++) {
      const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = 0.35 + rnd() * 0.9;
      const q = Math.sqrt(1 - u * u);
      start[i * 4] = q * Math.cos(th) * r; start[i * 4 + 1] = u * r; start[i * 4 + 2] = q * Math.sin(th) * r;
      start[i * 4 + 3] = rnd();
    }
    bufPos = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufPos); gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    bufCol = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufCol); gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);
    bufStart = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufStart); gl.bufferData(gl.ARRAY_BUFFER, start, gl.STATIC_DRAW);
    // floaters: small elongated clumps hovering around the subject (illustration)
    const fl = []; const clumps = 46;
    for (let k = 0; k < clumps; k++) {
      const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = 0.55 + rnd() * 0.5;
      const q = Math.sqrt(1 - u * u);
      const cx = q * Math.cos(th) * r, cy = u * r * 0.8, cz = q * Math.sin(th) * r;
      const dx = rnd() - 0.5, dy = rnd() - 0.5, dz = rnd() - 0.5, sig = 0.015 + rnd() * 0.03, len = 0.04 + rnd() * 0.08;
      const n = 18 + Math.floor(rnd() * 24);
      for (let i = 0; i < n; i++) {
        const g = () => (rnd() + rnd() + rnd() - 1.5) * sig;
        const t = (rnd() - 0.5) * len;
        fl.push(cx + g() + dx * t * 4, cy + g() + dy * t * 4, cz + g() + dz * t * 4, rnd());
      }
    }
    nF = fl.length / 4;
    bufF = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufF); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fl), gl.STATIC_DRAW);
    ready = true;
    if (status) { status.textContent = count.toLocaleString('en-US') + ' points'; setTimeout(() => status.classList.add('is-done'), 2600); }
  }

  function frame(now) {
    running = false;
    if (!ready) return;
    const t = (now - t0) / 1000;
    if (buildT0 < 0) buildT0 = now;
    if (build < 1) build = Math.min(1, (now - buildT0) / 1900);
    show += (showTarget - show) * (reduce ? 1 : 0.06);
    mx += (tmx - mx) * 0.06;
    if (!dragging) { yaw += vYaw; vYaw *= 0.94; if (!reduce) yaw += 0.0016; }
    const model = mul(rotZ(BASE.z), mul(rotY(BASE.y), rotX(BASE.x)));
    const sp = Math.min(1.2, Math.max(0, window.scrollY / Math.max(1, innerHeight)));
    scrollRot += ((reduce || !withScroll ? 0 : sp * 1.4) - scrollRot) * 0.08;
    const view = mul(translate(0, OFFY, -DIST), mul(rotX(pitch + scrollRot * 0.12), rotY(yaw + mx * 0.35 + scrollRot)));
    const mvp = mul(proj, mul(view, model));
    const mvpF = mul(proj, view);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.useProgram(P);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPos); gl.enableVertexAttribArray(L.aPos); gl.vertexAttribPointer(L.aPos, 3, gl.SHORT, true, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufCol); gl.enableVertexAttribArray(L.aCol); gl.vertexAttribPointer(L.aCol, 3, gl.UNSIGNED_BYTE, true, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufStart); gl.enableVertexAttribArray(L.aStart); gl.vertexAttribPointer(L.aStart, 4, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(L.uMVP, false, mvp);
    gl.uniform1f(L.uBuild, build); gl.uniform1f(L.uPR, dpr);
    gl.uniform1f(L.uSize, Math.max(1.7, Math.min(2.9, W / 250)));
    gl.uniform3f(L.uPaper, STAGE[0], STAGE[1], STAGE[2]);
    gl.drawArrays(gl.POINTS, 0, count);
    gl.disableVertexAttribArray(L.aPos); gl.disableVertexAttribArray(L.aCol); gl.disableVertexAttribArray(L.aStart);

    if (show > 0.002) {
      gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(PF);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufF); gl.enableVertexAttribArray(LF.aF); gl.vertexAttribPointer(LF.aF, 4, gl.FLOAT, false, 0, 0);
      gl.uniformMatrix4fv(LF.uMVP, false, mvpF);
      gl.uniform1f(LF.uShow, show); gl.uniform1f(LF.uTime, t); gl.uniform1f(LF.uPR, dpr); gl.uniform3f(LF.uAcc, ACC[0], ACC[1], ACC[2]); gl.uniform3f(LF.uRim, RIM[0], RIM[1], RIM[2]);
      gl.uniform1f(LF.uSize, Math.max(1.5, Math.min(2.6, W / 300)));
      gl.drawArrays(gl.POINTS, 0, nF);
      gl.disableVertexAttribArray(LF.aF);
    }
    schedule();
  }
  function schedule() { if (running || !visible || document.hidden || !ready) return; running = true; requestAnimationFrame(frame); }

  /* ---------- input ---------- */
  canvas.addEventListener('pointerdown', e => { dragging = true; lx = e.clientX; ly = e.clientY; vYaw = 0; root.classList.add('is-dragging'); schedule(); });
  window.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    tmx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / innerWidth));
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    yaw += dx * 0.008; vYaw = dx * 0.008;
    pitch = Math.max(-0.5, Math.min(0.7, pitch + dy * 0.006));
    lx = e.clientX; ly = e.clientY;
  }, { passive: true });
  const end = () => { dragging = false; root.classList.remove('is-dragging'); };
  window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end);

  /* ---------- mode toggle ---------- */
  const btns = fig ? fig.querySelectorAll('.seg [data-mode]') : [];
  btns.forEach(b => b.addEventListener('click', () => {
    const m = b.dataset.mode;
    btns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    showTarget = m === 'floaters' ? 1 : 0;
    schedule();
  }));

  resize();
  window.addEventListener('resize', () => { resize(); schedule(); });
  window.addEventListener('scroll', schedule, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; schedule(); }).observe(canvas);
  document.addEventListener('visibilitychange', schedule);
  load().then(buf => { setup(buf); schedule(); }).catch(err => { console.error(err); if (status) status.textContent = 'Failed to load the point cloud'; });
  }
})();
