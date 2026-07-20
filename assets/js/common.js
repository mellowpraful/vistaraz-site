/*
 * MANNMITRA — Common UI (nav + dark mode + i18n + crisis overlay)
 */
(function (global) {
  "use strict";

  const NAV = [
    ["index.html", "nav.home"],
    ["checkin.html", "nav.checkin"],
    ["peer.html", "nav.peer"],
    ["counselor.html", "nav.counselor"],
    ["dashboard.html", "nav.dashboard"],
    ["journal.html", "nav.journal"],
    ["resources.html", "nav.resources"],
    ["privacy.html", "nav.privacy"]
  ];

  function currentPage() {
    const p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function applyTheme() {
    let t = "light";
    try { t = localStorage.getItem("mannmitra_theme") || "light"; } catch (e) {}
    document.documentElement.setAttribute("data-theme", t);
    const btn = document.getElementById("themeBtn");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("mannmitra_theme", next); } catch (e) {}
    const btn = document.getElementById("themeBtn");
    if (btn) btn.textContent = next === "dark" ? "☀️" : "🌙";
  }

  function applyLang() {
    const l = global.MANNMITRA.i18n.getLang();
    const sel = document.getElementById("langSel");
    if (sel) sel.value = l;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = global.MANNMITRA.i18n.t(el.getAttribute("data-i18n"));
    });
  }

  function navHtml() {
    const id = (global.MANNMITRA && global.MANNMITRA.state) ? global.MANNMITRA.state.id() : "MM-DEMO";
    const links = NAV.map(([href, key]) =>
      `<a href="${href}" ${href === currentPage() ? 'style="color:var(--teal-700)"' : ""}>${global.MANNMITRA.i18n.t(key)}</a>`
    ).join("");
    const opts = global.MANNMITRA.i18n.langs.map(l =>
      `<option value="${l}">${l.toUpperCase()}</option>`).join("");
    return `
    <nav class="nav">
      <a class="brand" href="index.html">
        <svg class="logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" stroke="var(--teal-600)" stroke-width="2"/>
          <path d="M16 8c-4 0-7 3-7 7 0 4 7 9 7 9s7-5 7-9c0-4-3-7-7-7z" fill="var(--teal-400)"/>
          <circle cx="16" cy="15" r="2.6" fill="#fff"/>
        </svg>
        MANNMITRA
      </a>
      <div class="nav-links">${links}</div>
      <div class="nav-actions">
        <select class="lang" id="langSel" title="Language">${opts}</select>
        <button class="icon-btn" id="themeBtn" title="Toggle theme" onclick="MANNMITRA.common.toggleTheme()">🌙</button>
        <span class="anon-id" title="Anonymous ID — no personal data" id="navAnonId">${id}</span>
      </div>
    </nav>`;
  }

  function overlayHtml() {
    return `
    <div id="crisis-overlay" role="dialog" aria-modal="true">
      <div class="crisis-modal">
        <h2 data-i18n="crisis.line">In crisis?</h2>
        <p style="color:var(--text-muted)">You matter. These services are free, confidential, 24/7.</p>
        <div class="helpline"><div><strong>Tele-MANAS</strong><div class="meta">Govt. of India · 24x7</div></div><div class="num">14416</div></div>
        <div class="helpline"><div><strong>iCall (TISS)</strong><div class="meta">Free counseling</div></div><div class="num">9152987821</div></div>
        <div class="helpline"><div><strong>Vandrevala</strong><div class="meta">24x7 helpline</div></div><div class="num">1860 266 2345</div></div>
        <button class="btn btn-primary" style="margin-top:16px" onclick="MANNMITRA.common.closeCrisis()">I'm safe — close</button>
        <a class="btn btn-ghost" href="crisis.html" style="margin-top:16px">All helplines</a>
      </div>
    </div>`;
  }

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2600);
  }
  function triggerCrisis() { const ov = document.getElementById("crisis-overlay"); if (ov) ov.classList.add("show"); }
  function closeCrisis() { const ov = document.getElementById("crisis-overlay"); if (ov) ov.classList.remove("show"); }

  function mount() {
    document.body.insertAdjacentHTML("afterbegin", navHtml());
    document.body.insertAdjacentHTML("beforeend", overlayHtml());
    applyTheme(); applyLang();

    const sel = document.getElementById("langSel");
    if (sel) sel.addEventListener("change", e => {
      global.MANNMITRA.i18n.setLang(e.target.value); applyLang();
      global.MANNMITRA.common.toast("Language: " + e.target.value.toUpperCase());
    });

    try {
      const sev = global.MANNMITRA.state.get().lastSeverity;
      if (sev === "high") setTimeout(triggerCrisis, 600);
    } catch (e) {}

    global.MANNMITRA.common = {
      toggleTheme, triggerCrisis, closeCrisis, toast, applyLang, applyTheme,
      helplines: [
        { name: "Tele-MANAS", meta: "24x7", num: "14416" },
        { name: "iCall (TISS)", meta: "Free", num: "9152987821" },
        { name: "Vandrevala", meta: "24x7", num: "1860 266 2345" }
      ]
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})(window);
