/* ═══════════════════════════════════════════════════════════
   VISTARAZ GLOBAL SCRIPTS
   - Scroll reveal animations
   - Theme switcher (Light ↔ Dark) with localStorage persistence
   ═══════════════════════════════════════════════════════════ */

// ── THEME SWITCHER ──────────────────────────────────────────
const VzTheme = (() => {
  const STORAGE_KEY = 'vz-theme';
  const DARK  = 'dark';
  const LIGHT = 'light';

  // Icons for the toggle button
  const ICON_DARK  = '🌙';
  const ICON_LIGHT = '☀️';

  function getCurrent() {
    return localStorage.getItem(STORAGE_KEY) || LIGHT;
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update ALL toggle buttons on the page
    document.querySelectorAll('.theme-toggle, [data-vz-theme-btn]').forEach(btn => {
      btn.textContent = theme === DARK ? ICON_LIGHT : ICON_DARK;
      btn.setAttribute('title', theme === DARK ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', btn.getAttribute('title'));
    });
  }

  function toggle() {
    const next = getCurrent() === DARK ? LIGHT : DARK;
    apply(next);
  }

  // Apply saved theme immediately on page load (prevents FOUC)
  function init() {
    apply(getCurrent());
  }

  return { init, toggle, apply, getCurrent };
})();

// Run immediately (not inside DOMContentLoaded) to avoid flash-of-wrong-theme
VzTheme.init();

// ── SCROLL REVEAL ANIMATIONS ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for .reveal elements
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px', threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Expose toggle globally for inline onclick handlers
  window.vzToggleTheme = VzTheme.toggle.bind(VzTheme);
});
