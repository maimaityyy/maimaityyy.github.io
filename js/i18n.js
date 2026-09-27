/* ═══════════════════════════════════════════════
   JA / EN LANGUAGE SWITCH
   - Japanese text lives in the HTML (default).
   - English text lives in EN below, keyed by data-i18n.
═══════════════════════════════════════════════ */
(function () {
  const EN = {
    'hero.desc': 'Researching computer vision, with a focus on novel view synthesis and 3D reconstruction<br />Bridging research and real-world deployment through AI transformation (AIX) work for enterprises',

    'ro.chip': 'Graduating Mar 2028',
    'ro.nameL': 'Name',
    'ro.name': 'Maito Sasaki<span>佐々木 舞人</span>',
    'ro.schoolL': 'School',
    'ro.school': 'Tokyo University of Technology<span>Graduate School of Bionics, Computer and Media Sciences — Master’s Program in Computer Science, 1st year</span>',
    'ro.labL': 'Lab',
    'ro.lab': 'Multimedia Data Modeling Laboratory',
    'ro.researchL': 'Research',
    'ro.research': 'Computer Vision<span>Novel view synthesis &amp; 3D reconstruction</span>',
    'ro.workL': 'Work',
    'ro.work': 'AI Engineer, neoAI Inc.<span>Jun 2024 –</span>',
    'ro.actL': 'Activity',
    'ro.act': 'NVIDIA Student Ambassador<span>Apr 2026 –</span>',
    'ro.intL': 'Interests',

    'tm.yearL': 'YEAR',
    'tm.year': 'Graduating Mar 2028',
    'tm.resL': 'RESEARCH',
    'tm.res': 'Novel view synthesis / 3D',
    'tm.workL': 'WORK',
    'tm.work': 'AI Engineer @ neoAI',
    'tm.actL': 'ACTIVITY',
    'tm.act': 'Student Ambassador',
    'tm.awardL': 'AWARD',
    'tm.awardV': "Dean's Award",
    'tm.award': 'Image-generation Slackbot',

    'about.p1': 'First-year master’s student, Computer Science Program, Graduate School of Bionics, Computer and Media Sciences, Tokyo University of Technology<br />Member of the Multimedia Data Modeling Laboratory',
    'about.p2': 'AI Engineer at <strong>neoAI Inc.</strong>, supporting enterprise AI transformation (AIX)<br />Research focus: computer vision, particularly novel view synthesis and 3D reconstruction',
    'about.p3': '<strong>NVIDIA Student Ambassador</strong> since April 2026<br />Learning advanced technologies under the guidance of NVIDIA researchers and presenting at student workshops<br />Committed to taking on unfamiliar technologies and roles, creating value through both research and product development',

    'id.edu': 'Tokyo University of Technology, Graduate School of Bionics, Computer and Media Sciences — M.S. in Computer Science, 1st year',
    'id.lab': 'Multimedia Data Modeling Laboratory',
    'id.work': 'AI Engineer @ neoAI Inc.',
    'id.nv': 'NVIDIA Student Ambassador (Apr 2026 –)',

    'exp.nv.t': 'NVIDIA Student Ambassador',
    'exp.nv.o': 'NVIDIA Student Ambassador Program (AI Course)',
    'exp.nv.d': '<li>Selected for NVIDIA’s competitive talent-development program for university students in Japan</li><li>Learning AI, data science and digital-twin technologies under direct technical guidance from NVIDIA researchers</li><li>Presented “Mesh Generation with instant-ngp” at the workshop held at Tokyo University of Technology, Hachioji Campus (August 2026)</li>',
    'exp.nv.link': 'Featured on the Tokyo University of Technology website (Japanese)',
    'exp.neo.t': 'AI Engineer / Sub Project Manager',
    'exp.neo.o': 'neoAI Inc. (a startup from the Matsuo Lab, The University of Tokyo)',
    'exp.neo.d': '<li>Supporting enterprise AI transformation (AIX) end to end, from consulting such as problem definition and AI strategy to developing and deploying AI systems that streamline operations</li><li>Led one research theme for about a year in the longest project of my tenure, a joint R&amp;D project in image-generation AI with an entertainment company</li><li>Handled client communication and project management in addition to technical development; the client rated the results as far exceeding other vendors in quality</li><li>Managed GPU cloud infrastructure on GCP and Vast.ai for the project</li>',
    'exp.ms.t': 'Master’s Program (1st year)',
    'exp.ms.o': 'Tokyo University of Technology, Graduate School of Bionics, Computer and Media Sciences — Computer Science Program, Multimedia Data Modeling Laboratory',
    'exp.ms.d': '<li>Researching computer vision, with a focus on novel view synthesis and 3D reconstruction</li><li>Developing a method to reduce floaters (noise artifacts) in FrugalNeRF, which reconstructs 3D scenes from only a few input images</li><li>Preparing a paper for submission to an international conference</li>',
    'exp.bs.t': 'Bachelor’s Program (School of Computer Science)',
    'exp.bs.o': 'Tokyo University of Technology, School of Computer Science — Artificial Intelligence Program',
    'exp.bs.d': '<li>Researched NeRF-based 3D reconstruction at the Multimedia Data Modeling Laboratory</li><li>Built an image-generation Slackbot with Stable Diffusion and cut generation time from several minutes to about 20 seconds through Metal GPU optimization on Apple M2</li><li>Received the Dean’s Award for this work</li>',

    'ws.cap': 'NVIDIA Student Ambassador Workshop (Tokyo University of Technology, Hachioji Campus)',
    'ws.lead': 'Presented in the AI Session of the NVIDIA Student Ambassador Workshop at Tokyo University of Technology, Hachioji Campus, on August 29, 2026<br />Talk title: <strong>Mesh Generation with instant-ngp</strong><br />Introduced a method for generating 3D meshes from images using instant-ngp, NVIDIA’s fast implementation of NeRF',
    'ws.n1': 'Introduced techniques for recovering 3D shape from images, such as instant-ngp and NeRF, with a practical workflow',
    'ws.n2': 'Structured the talk to be accessible to attendees new to the field',
    'ws.n3': 'Contributed to a workshop planned and run by student ambassadors selected from universities across Japan',
    'ws.srcL': 'Tokyo University of Technology',
    'ws.src': 'Read the workshop report (Japanese)',

    'pj.1.t': 'Improving FrugalNeRF',
    'pj.1.d': '<li>Developing a method to reduce floaters (artifacts floating in mid-air) based on FrugalNeRF, which reconstructs 3D scenes from only a few images</li><li>Preparing a paper for submission to an international conference</li>',
    'pj.2.award': "Dean's Award",
    'pj.2.d': '<li>Built an image-generation Slackbot powered by Stable Diffusion</li><li>Reduced generation time from several minutes to about 20 seconds through inference optimized for the Metal GPU on Apple M2</li><li>Received the Dean’s Award</li>',
    'pj.3.chip': 'Hackathon',
    'pj.3.d': '<li>Android app developed at a hackathon</li><li>Sets alarms automatically based on Google Calendar events</li><li>Reads out the day’s schedule with text-to-speech</li>',

    'cf.chip': 'Inquiry',
    'cf.name': 'Your name',
    'cf.namePh': 'Taro Yamada',
    'cf.org': 'Organization (optional)',
    'cf.orgPh': 'Company / University',
    'cf.email': 'Reply-to address',
    'cf.msg': 'Your message',
    'cf.msgPh': 'Enter your message',
    'cf.lead': 'Inquiries are accepted via the form<br />A reply will be sent to the email address provided',
  };

  const MSG = {
    ja: {
      idle: '必要事項を入力のうえ送信',
      invalid: '未入力または形式が不正な項目あり',
      sending: '送信中',
      ok: '送信完了',
      err: '送信失敗 時間をおいて再度送信',
      subject: 'お問い合わせ',
      typed: ['Graduate Researcher / Computer Vision', 'Novel View Synthesis x 3D', 'NVIDIA Student Ambassador', 'AI Engineer @ neoAI'],
      title: 'MAITO SASAKI // ポートフォリオ',
    },
    en: {
      idle: 'Complete the form and press SEND',
      invalid: 'Required fields are missing or invalid',
      sending: 'Sending...',
      ok: 'Message sent. Thank you for your inquiry',
      err: 'Sending failed. Please try again later',
      subject: 'Inquiry',
      typed: ['Graduate Researcher / Computer Vision', 'Novel View Synthesis x 3D', 'NVIDIA Student Ambassador', 'AI Engineer @ neoAI'],
      title: 'MAITO SASAKI // Portfolio',
    },
  };

  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const phNodes = [...document.querySelectorAll('[data-i18n-ph]')];
  nodes.forEach(n => { n.dataset.ja = n.innerHTML; });
  phNodes.forEach(n => { n.dataset.jaPh = n.getAttribute('placeholder') || ''; });

  const listeners = [];
  const buttons = document.querySelectorAll('.lang-switch button');

  function apply(lang) {
    nodes.forEach(n => {
      const key = n.dataset.i18n;
      n.innerHTML = lang === 'en' && EN[key] != null ? EN[key] : n.dataset.ja;
    });
    phNodes.forEach(n => {
      const key = n.dataset.i18nPh;
      n.setAttribute('placeholder', lang === 'en' && EN[key] != null ? EN[key] : n.dataset.jaPh);
    });
    document.documentElement.lang = lang;
    document.title = MSG[lang].title;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    window.I18N.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    listeners.forEach(fn => fn(lang));
  }

  const saved = (() => { try { return localStorage.getItem('lang'); } catch (e) { return null; } })();
  const fromUrl = new URLSearchParams(location.search).get('lang');
  const initial = fromUrl || saved || ((navigator.language || 'ja').toLowerCase().startsWith('ja') ? 'ja' : 'en');

  window.I18N = {
    lang: 'ja',
    msg: key => MSG[window.I18N.lang][key],
    onChange: fn => listeners.push(fn),
    set: apply,
  };

  buttons.forEach(b => b.addEventListener('click', () => apply(b.dataset.lang)));
  document.addEventListener('DOMContentLoaded', () => apply(initial === 'en' ? 'en' : 'ja'));
})();
