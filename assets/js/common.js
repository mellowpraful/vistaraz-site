/*
 * MANNMITRA — Common UI (nav + crisis overlay)
 * Injects the shared top nav and the global crisis modal into every page,
 * and listens for high-severity events to auto-trigger the overlay.
 */
(function (global) {
  "use strict";

  const NAV_ITEMS = [
    ["index.html", "Home"],
    ["checkin.html", "Check-in"],
    ["peer.html", "Peer Support"],
    ["counselor.html", "Counselor"],
    ["resources.html", "Resources"],
    ["privacy.html", "Privacy"]
  ];

  function currentPage() {
    const p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function navHtml() {
    const id = (global.MANNMITRA && global.MANNMITRA.state) ? global.MANNMITRA.state.id() : "MM-DEMO";
    const links = NAV_ITEMS.map(([href, label]) =>
      `<a href="${href}" ${href === currentPage() ? 'style="color:var(--teal-700)"' : ""}>${label}</a>`
    ).join("");
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
      <div class="nav-links">
        ${links}
        <span class="anon-id" title="Your anonymous ID — no personal data stored">${id}</span>
      </div>
    </nav>`;
  }

  function overlayHtml() {
    return `
    <div id="crisis-overlay" role="dialog" aria-modal="true">
      <div class="crisis-modal">
        <h2>We're here for you</h2>
        <p style="color:var(--muted)">You matter. If you're in distress, please reach out now — these
        services are free, confidential, and available 24/7.</p>
        <div class="helpline"><div><strong>Tele-MANAS (Govt. of India)</strong><div class="meta">24x7 multilingual</div></div><div class="num">14416</div></div>
        <div class="helpline"><div><strong>iCall (TISS)</strong><div class="meta">Free counseling</div></div><div class="num">9152987821</div></div>
        <div class="helpline"><div><strong>Vandrevala Foundation</strong><div class="meta">24x7 helpline</div></div><div class="num">1860 266 2345</div></div>
        <button class="btn btn-primary" style="margin-top:16px" onclick="MANNMITRA.common.closeCrisis()">I'm safe — close</button>
        <a class="btn btn-ghost" href="crisis.html" style="margin-top:16px">View all helplines</a>
      </div>
    </div>`;
  }

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2600);
  }

  function triggerCrisis() {
    const ov = document.getElementById("crisis-overlay");
    if (ov) ov.classList.add("show");
  }
  function closeCrisis() {
    const ov = document.getElementById("crisis-overlay");
    if (ov) ov.classList.remove("show");
  }

  function mount() {
    document.body.insertAdjacentHTML("afterbegin", navHtml());
    document.body.insertAdjacentHTML("beforeend", overlayHtml());

    // Auto-trigger if last severity was high (survives navigation).
    try {
      const sev = global.MANNMITRA.state.get().lastSeverity;
      if (sev === "high") {
        setTimeout(triggerCrisis, 600);
      }
    } catch (e) {}

    // Allow pages to broadcast a high-severity event.
    global.MANNMITRA.common = {
      triggerCrisis, closeCrisis, toast,
      helplines: [
        { name: "Tele-MANAS (Govt. of India)", meta: "24x7 multilingual", num: "14416" },
        { name: "iCall (TISS)", meta: "Free counseling", num: "9152987821" },
        { name: "Vandrevala Foundation", meta: "24x7 helpline", num: "1860 266 2345" }
      ]
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})(window);
