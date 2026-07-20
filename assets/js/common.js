/*
 * MANNMITRA — Common UI (nav + dark mode + i18n + crisis + SOS + tour + a11y)
 */
(function (global) {
  "use strict";

  const NAV = [
    ["index.html", "nav.home", "🏠"],
    ["checkin.html", "nav.checkin", "📝"],
    ["peer.html", "nav.peer", "🤝"],
    ["dashboard.html", "nav.dashboard", "📊"],
    ["journal.html", "nav.journal", "📓"],
    ["resources.html", "nav.resources", "📚"],
    ["privacy.html", "nav.privacy", "🛡"]
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
  function toggleContrast() {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "contrast" ? "light" : "contrast";
    document.documentElement.setAttribute("data-theme", next);
    MANNMITRA.common.toast(next === "contrast" ? "High contrast on" : "High contrast off");
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
        <button class="icon-btn" id="contrastBtn" title="High contrast" onclick="MANNMITRA.common.toggleContrast()">◐</button>
        <button class="icon-btn" id="installBtn" title="Install app" onclick="MANNMITRA.common.installApp()" style="display:none">📲</button>
        <button class="icon-btn" id="themeBtn" title="Toggle theme" onclick="MANNMITRA.common.toggleTheme()">🌙</button>
        <span class="anon-id" title="Anonymous ID — no personal data" id="navAnonId">${id}</span>
      </div>
    </nav>
    <nav class="bottom-nav" aria-label="Primary">
      ${NAV.map(([href, key, ico]) =>
        `<a href="${href}" class="${href === currentPage() ? "active" : ""}"><span class="bi">${ico}</span>${global.MANNMITRA.i18n.t(key)}</a>`
      ).join("")}
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
        <a class="btn btn-danger" style="margin-top:16px; width:100%; justify-content:center" href="tel:14416" onclick="MANNMITRA.common.callHelpline('14416'); return true;">📞 Call Tele-MANAS (14416) now</a>
        <button class="btn btn-primary" style="margin-top:12px" onclick="MANNMITRA.common.closeCrisis()">I'm safe — close</button>
        <a class="btn btn-ghost" href="crisis.html" style="margin-top:12px">All helplines</a>
      </div>
    </div>`;
  }

  function sosHtml() {
    return `
    <button id="sos-fab" aria-label="Emergency SOS">SOS</button>
    <svg id="sos-ring" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="none" stroke="var(--danger)" stroke-width="4" stroke-dasharray="188" stroke-dashoffset="188" id="sosArc"/></svg>`;
  }

  function tourHtml() {
    return `
    <div id="tour-overlay">
      <div class="tour-card">
        <div style="font-size:40px;margin-bottom:8px" id="tourEmo">👋</div>
        <h2 id="tourTitle" style="margin:0 0 8px">Welcome to MANNMITRA</h2>
        <p id="tourBody" style="color:var(--text-muted)">A safe, anonymous space for your mind. Let's take a 30-second tour.</p>
        <div style="margin:16px 0"><span class="step-dot on"></span><span class="step-dot"></span><span class="step-dot"></span></div>
        <button class="btn btn-primary" id="tourNext" onclick="MANNMITRA.common.tourNext()">Next</button>
        <button class="btn btn-ghost" onclick="MANNMITRA.common.endTour()">Skip</button>
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

  // --- SOS hold-to-call ---
  function setupSOS() {
    const fab = document.getElementById("sos-fab");
    const arc = document.getElementById("sosArc");
    if (!fab || !arc) return;
    let hold = null, start = 0, raf = null;
    const CIRC = 188;
    function down(e){
      e.preventDefault();
      fab.classList.add("holding");
      start = Date.now();
      const tick = () => {
        const p = Math.min(1, (Date.now()-start)/1200);
        arc.style.strokeDashoffset = CIRC * (1 - p);
        if(p >= 1){ clearInterval(hold); cancelAnimationFrame(raf); triggerCrisis(); callHelpline("14416"); fab.classList.remove("holding"); return; }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    function callHelpline(num){
      const isMobile = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);
      if (isMobile) {
        // Real dialer on phones.
        try { window.location.href = "tel:" + num; } catch (e) {}
      } else {
        // Laptop/desktop: no dialer — copy number and show it so it visibly works.
        try { navigator.clipboard && navigator.clipboard.writeText(num); } catch (e) {}
        toast("📞 Helpline copied: " + num + " — dial from your phone");
      }
    }
    function up(){ clearInterval(hold); cancelAnimationFrame(raf); fab.classList.remove("holding"); arc.style.strokeDashoffset = CIRC; }
    fab.addEventListener("mousedown", down); fab.addEventListener("touchstart", down, {passive:false});
    fab.addEventListener("mouseup", up); fab.addEventListener("mouseleave", up); fab.addEventListener("touchend", up);
  }

  // --- Onboarding tour ---
  const TOUR = [
    { emo:"👋", t:"Welcome to MANNMITRA", b:"A safe, anonymous space for your mind. No signup, no judgment." },
    { emo:"📝", t:"Start with a check-in", b:"A 2-minute mood check-in routes you to the right support — no heavy first step." },
    { emo:"🤝", t:"You're never alone", b:"Peer listeners, counselors, and 24x7 helplines are one tap away. Hold the SOS button in crisis." }
  ];
  let tourStep = 0;
  function tourNext(){
    tourStep++;
    if(tourStep >= TOUR.length){ endTour(); return; }
    showTourStep();
  }
  function showTourStep(){
    const s = TOUR[tourStep];
    document.getElementById("tourEmo").textContent = s.emo;
    document.getElementById("tourTitle").textContent = s.t;
    document.getElementById("tourBody").textContent = s.b;
    const dots = document.querySelectorAll("#tour-overlay .step-dot");
    dots.forEach((d,i)=> d.classList.toggle("on", i===tourStep));
    document.getElementById("tourNext").textContent = tourStep===TOUR.length-1 ? "Get started" : "Next";
  }
  function endTour(){
    const o = document.getElementById("tour-overlay");
    if(o) o.classList.remove("show");
    try { localStorage.setItem("mannmitra_toured","1"); } catch(e){}
  }
  function maybeTour(){
    let seen = "0";
    try { seen = localStorage.getItem("mannmitra_toured") || "0"; } catch(e){}
    if(seen !== "1"){
      const o = document.getElementById("tour-overlay");
      if(o){ o.classList.add("show"); showTourStep(); }
    }
  }

  function mount() {
    document.body.insertAdjacentHTML("afterbegin", navHtml());
    document.body.insertAdjacentHTML("beforeend", overlayHtml() + sosHtml() + tourHtml());
    applyTheme(); applyLang();
    setupSOS();

    // Expose common API BEFORE maybeTour() so tour buttons work immediately.
    global.MANNMITRA.common = {
      toggleTheme, toggleContrast, triggerCrisis, closeCrisis, toast,
      callHelpline, applyLang, applyTheme, tourNext, endTour, setupSOS, maybeTour,
      installApp
    };

    maybeTour();
    pwaInit();

    const sel = document.getElementById("langSel");
    if (sel) sel.addEventListener("change", e => {
      global.MANNMITRA.i18n.setLang(e.target.value); applyLang();
      global.MANNMITRA.common.toast("Language: " + e.target.value.toUpperCase());
    });

    try {
      const sev = global.MANNMITRA.state.get().lastSeverity;
      if (sev === "high") setTimeout(triggerCrisis, 600);
    } catch (e) {}
  }

  // --- PWA: manifest, theme-color, apple-touch-icon, service worker ---
  function pwaInit() {
    const head = document.head;
    if (head && !document.querySelector('link[rel="manifest"]')) {
      const m = document.createElement("link");
      m.rel = "manifest"; m.href = "manifest.json"; head.appendChild(m);
    }
    if (head && !document.querySelector('meta[name="theme-color"]')) {
      const t = document.createElement("meta");
      t.name = "theme-color"; t.content = "#0f9b86"; head.appendChild(t);
    }
    if (head && !document.querySelector('link[rel="apple-touch-icon"]')) {
      const a = document.createElement("link");
      a.rel = "apple-touch-icon"; a.href = "assets/img/apple-touch-icon.png"; head.appendChild(a);
    }
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
      });
      // New version available -> offer reload.
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (sessionStorage.getItem("mm_sw_update")) return;
        sessionStorage.setItem("mm_sw_update", "1");
        toast("New version available — reloading…");
        setTimeout(() => location.reload(), 1200);
      });
    }

    // Offline / online indicator.
    window.addEventListener("offline", () => toast("📴 You're offline — MANNMITRA still works"));
    window.addEventListener("online", () => toast("🟢 Back online"));
    if (navigator.onLine === false) setTimeout(() => toast("📴 Offline mode — app works offline"), 800);

    // Install prompt (PWA).
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const b = document.getElementById("installBtn");
      if (b) b.style.display = "grid";
    });
    window.addEventListener("appinstalled", () => {
      const b = document.getElementById("installBtn");
      if (b) b.style.display = "none";
      toast("✅ MANNMITRA installed — thanks!");
    });
  }

  let deferredPrompt = null;
  function installApp() {
    const b = document.getElementById("installBtn");
    if (!deferredPrompt) { toast("Use your browser's 'Add to Home screen' / Install"); return; }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; if (b) b.style.display = "none"; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})(window);
