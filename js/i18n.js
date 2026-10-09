/* ════════════════════════════════════════════════════════════
   JA / EN — Japanese lives in the HTML, English below
════════════════════════════════════════════════════════════ */
(function () {
  const EN = {
    'hero.kicker': 'M.S. student, Tokyo University of Technology / Graduating March 2028',
    'hero.desc': 'Researching computer vision, with a focus on novel view synthesis and 3D reconstruction<br />Bridging research and real-world deployment through AI transformation (AIX) work for enterprises',
    'f.res': 'Research', 'f.resV': 'Novel view synthesis / 3D reconstruction',
    'f.work': 'Work', 'f.workV': 'AI Engineer, neoAI Inc.',
    'f.act': 'Activity', 'f.actV': 'NVIDIA Student Ambassador',
    'hero.cta1': 'View projects', 'hero.cta2': 'Contact',
    'fig1.cap': 'A fox reconstructed and meshed with instant-ngp (official instant-ngp sample data)',
    'fig1.hint': 'Drag to rotate',
    'fig1.m1': 'Reconstruction', 'fig1.m2': 'Floater example',
    'fig1.n1': '65,000 points sampled from the vertices of the mesh',
    'fig1.n2': 'The cyan points illustrate floaters, noise that tends to appear in mid-air when reconstructing from only a few images; my research focuses on reducing it',

    'about.p1': 'First-year master’s student, Computer Science Program, Graduate School of Bionics, Computer and Media Sciences, Tokyo University of Technology<br />Member of the Multimedia Data Modeling Laboratory',
    'about.p2': 'AI Engineer at <strong>neoAI Inc.</strong>, supporting enterprise AI transformation (AIX)<br />Research focus: computer vision, particularly novel view synthesis and 3D reconstruction',
    'about.p3': '<strong>NVIDIA Student Ambassador</strong> since April 2026<br />Learning advanced technologies under the guidance of NVIDIA researchers and presenting at student workshops<br />Committed to taking on unfamiliar technologies and roles, creating value through both research and product development',
    'ro.nameL': 'Name', 'ro.name': 'Maito Sasaki<span>佐々木 舞人</span>',
    'ro.schoolL': 'School', 'ro.school': 'Tokyo University of Technology<span>Graduate School of Bionics, Computer and Media Sciences, Master’s Program in Computer Science, 1st year</span>',
    'ro.labL': 'Lab', 'ro.lab': 'Multimedia Data Modeling Laboratory',
    'ro.researchL': 'Research', 'ro.research': 'Computer Vision<span>Novel view synthesis &amp; 3D reconstruction</span>',
    'ro.workL': 'Work', 'ro.work': 'AI Engineer, neoAI Inc.<span>Jun 2024 –</span>',
    'ro.actL': 'Activity', 'ro.act': 'NVIDIA Student Ambassador<span>Apr 2026 –</span>',
    'ro.intL': 'Interests',
    'now': 'Now',

    'exp.nv.t': 'NVIDIA Student Ambassador',
    'exp.nv.o': 'NVIDIA Student Ambassador Program (AI Course)',
    'exp.nv.d': '<li>Selected for NVIDIA’s competitive talent-development program for university students in Japan</li><li>Learning AI, data science and digital-twin technologies under direct technical guidance from NVIDIA researchers</li><li>Presented “Mesh Generation with <span class="nw">instant-ngp</span>” at the workshop held at Tokyo University of Technology, Hachioji Campus (August 2026)</li>',
    'exp.nv.link': 'Featured on the Tokyo University of Technology website (Japanese)',
    'exp.neo.t': 'AI Engineer / Sub Project Manager',
    'exp.neo.o': 'neoAI Inc. (a startup from the Matsuo Lab, The University of Tokyo)',
    'exp.neo.d': '<li>Supporting enterprise AI transformation (AIX) end to end, from consulting such as problem definition and AI strategy to developing and deploying AI systems that streamline operations</li><li>Led one research theme for about a year in the longest project of my tenure, a joint R&amp;D project in image-generation AI with an entertainment company</li><li>Handled client communication and project management in addition to technical development; the client rated the results as far exceeding other vendors in quality</li><li>Managed GPU cloud infrastructure on GCP and Vast.ai for the project</li>',
    'exp.ms.t': 'Master’s Program (1st year)',
    'exp.ms.o': 'Tokyo University of Technology, Graduate School of Bionics, Computer and Media Sciences, Computer Science Program, Multimedia Data Modeling Laboratory',
    'exp.ms.d': '<li>Researching computer vision, with a focus on novel view synthesis and 3D reconstruction</li><li>Developing a method to reduce floaters (noise artifacts) in FrugalNeRF, which reconstructs 3D scenes from only a few input images</li><li>Preparing a paper for submission to an international conference</li>',
    'exp.bs.t': 'Bachelor’s Program (School of Computer Science)',
    'exp.bs.o': 'Tokyo University of Technology, School of Computer Science, Artificial Intelligence Program',
    'exp.bs.d': '<li>Researched NeRF-based 3D reconstruction at the Multimedia Data Modeling Laboratory</li><li>Built an image-generation Slackbot with Stable Diffusion and cut generation time from several minutes to about 20 seconds through Metal GPU optimization on Apple M2</li><li>Received the Dean’s Award for this work</li>',

    'ws.venue': 'Tokyo University of Technology, Hachioji Campus',
    'ws.event': 'NVIDIA Student Ambassador Workshop, AI Session',
    'ws.title': 'Mesh Generation with instant-ngp',
    'ws.cap': 'NVIDIA Student Ambassador Workshop (Tokyo University of Technology, Hachioji Campus)',
    'ws.lead': 'Presented in the AI Session of the NVIDIA Student Ambassador Workshop at Tokyo University of Technology, Hachioji Campus, on August 29, 2026<br />Talk title: <strong>Mesh Generation with instant-ngp</strong><br />Introduced a method for generating 3D meshes from images using <span class="nw">instant-ngp</span>, NVIDIA’s fast implementation of NeRF',
    'ws.h1': 'Technology', 'ws.n1': 'Introduced techniques for recovering 3D shape from images, such as <span class="nw">instant-ngp</span> and NeRF, with a practical workflow',
    'ws.h2': 'Communication', 'ws.n2': 'Structured the talk to be accessible to attendees new to the field',
    'ws.h3': 'Community', 'ws.n3': 'Contributed to a workshop planned and run by student ambassadors selected from universities across Japan',
    'ws.ref': 'The point cloud in', 'ws.ref2': 'at the top of this page is an example of a mesh generated with instant-ngp',
    'ws.src': 'Read the workshop report on the Tokyo University of Technology website (Japanese)',

    'pj.1.fig': 'Floater example: the vermilion points illustrate floaters, noise that tends to appear in mid-air when reconstructing from only a few images; my research focuses on reducing it',
    'pj.1.m1': 'With floaters', 'pj.1.m2': 'Without floaters',
    'pj.1.kind': 'Research', 'pj.1.st': 'In progress',
    'pj.1.t': 'Improving FrugalNeRF',
    'pj.1.d': '<li>Developing a method to reduce floaters (artifacts floating in mid-air) based on FrugalNeRF, which reconstructs 3D scenes from only a few images</li><li>Preparing a paper for submission to an international conference</li>',
    'pj.2.fig': 'Illustration of the denoising process in image generation (20 steps)',
    'pj.2.kind': 'Tool', 'pj.2.award': 'Dean’s Award',
    'pj.2.d': '<li>Built an image-generation Slackbot powered by Stable Diffusion</li><li>Reduced generation time from several minutes to about 20 seconds through inference optimized for the Metal GPU on Apple M2</li><li>Received the Dean’s Award</li>',
    'pj.3.fig': 'From calendar events to the alarm and spoken schedule',
    'pj.3.kind': 'App', 'pj.3.chip': 'Hackathon',
    'pj.3.d': '<li>Android app developed at a hackathon</li><li>Sets alarms automatically based on Google Calendar events</li><li>Reads out the day’s schedule with text-to-speech</li>',

    'cf.name': 'Name', 'cf.namePh': 'Taro Yamada',
    'cf.org': 'Organization', 'cf.orgPh': 'Company / University',
    'cf.email': 'Reply-to email', 'cf.msg': 'Message', 'cf.msgPh': 'Write your message',
    'cf.req': 'Required', 'cf.opt': 'Optional', 'cf.send': 'Send',
    'cf.lead': 'Inquiries are accepted via the form<br />A reply will be sent to the email address provided',
    'top': 'Back to top ↑',
  };
  const MSG = {
    ja: { idle: '必要事項を入力のうえ送信', invalid: '未入力または形式が不正な項目あり', sending: '送信中', ok: '送信完了', err: '送信失敗 時間をおいて再度送信', subject: 'お問い合わせ', title: '佐々木 舞人 Maito Sasaki | Portfolio' },
    en: { idle: 'Fill in the form and press Send', invalid: 'Some required fields are missing or invalid', sending: 'Sending…', ok: 'Sent. Thank you', err: 'Sending failed. Please try again later', subject: 'Inquiry', title: 'Maito Sasaki | Portfolio' },
  };
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const ph = [...document.querySelectorAll('[data-i18n-ph]')];
  nodes.forEach(n => { n.dataset.ja = n.innerHTML; });
  ph.forEach(n => { n.dataset.jaPh = n.getAttribute('placeholder') || ''; });
  const listeners = [];
  const btns = document.querySelectorAll('.lang button');
  function apply(lang) {
    nodes.forEach(n => { const k = n.dataset.i18n; n.innerHTML = lang === 'en' && EN[k] != null ? EN[k] : n.dataset.ja; });
    ph.forEach(n => { const k = n.dataset.i18nPh; n.setAttribute('placeholder', lang === 'en' && EN[k] != null ? EN[k] : n.dataset.jaPh); });
    document.documentElement.lang = lang;
    document.title = MSG[lang].title;
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    window.I18N.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    listeners.forEach(fn => fn(lang));
  }
  const saved = (() => { try { return localStorage.getItem('lang'); } catch (e) { return null; } })();
  const fromUrl = new URLSearchParams(location.search).get('lang');
  const initial = fromUrl || saved || ((navigator.language || 'ja').toLowerCase().startsWith('ja') ? 'ja' : 'en');
  window.I18N = { lang: 'ja', msg: k => MSG[window.I18N.lang][k], onChange: fn => listeners.push(fn), set: apply };
  btns.forEach(b => b.addEventListener('click', () => { if (window.I18N.lang !== b.dataset.lang) apply(b.dataset.lang); }));
  document.addEventListener('DOMContentLoaded', () => { if (initial === 'en') apply('en'); });
})();
