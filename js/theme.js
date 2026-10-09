/* Light / dark theme toggle. Initial theme is set inline in <head> (OS setting or saved choice). */
(function () {
  'use strict';
  const root = document.documentElement;
  const btn = document.getElementById('theme-btn');
  const meta = document.querySelector('meta[name="theme-color"]');
  const COLORS = { dark: '#16181a', light: '#f4f5f5' };
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const saved = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
  function apply(t, animate) {
    if (animate) { root.classList.add('theme-anim'); clearTimeout(apply._t); apply._t = setTimeout(() => root.classList.remove('theme-anim'), 500); }
    root.setAttribute('data-theme', t);
    if (meta) meta.content = COLORS[t];
    if (btn) {
      const ja = root.lang !== 'en';
      const label = t === 'dark' ? (ja ? 'ライトモードに切り替え' : 'Switch to light mode') : (ja ? 'ダークモードに切り替え' : 'Switch to dark mode');
      btn.setAttribute('aria-label', label); btn.title = label;
      btn.setAttribute('aria-pressed', String(t === 'dark'));
    }
    window.dispatchEvent(new Event('palette:change'));
  }
  apply(root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light'), false);
  if (btn) btn.addEventListener('click', () => {
    const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', t); } catch (e) {}
    apply(t, true);
  });
  mq.addEventListener && mq.addEventListener('change', e => { if (!saved()) apply(e.matches ? 'dark' : 'light', true); });
  if (window.I18N && window.I18N.onChange) window.I18N.onChange(() => apply(root.getAttribute('data-theme'), false));
})();
