/*
 * MANNMITRA — Anonymous Session State
 * -----------------------------------
 * Zero PII. The user is identified only by an opaque anon_id stored in
 * localStorage. No name, email, or phone is ever required to use L1/L2.
 * This mirrors the production privacy architecture: anonymous-by-design.
 */
(function (global) {
  "use strict";

  const KEY = "mannmitra_session_v1";

  function genId() {
    const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
    const rnd2 = Math.random().toString(36).slice(2, 6).toUpperCase();
    return "MM-" + rnd + "-" + rnd2;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const fresh = { anonId: genId(), checkins: [], lastSeverity: null, createdAt: Date.now() };
    save(fresh);
    return fresh;
  }

  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  const api = {
    get() { return load(); },
    id() { return load().anonId; },
    setSeverity(sev) { const s = load(); s.lastSeverity = sev; save(s); return s; },
    pushCheckin(c) { const s = load(); s.checkins.push(c); save(s); return s; },
    reset() { localStorage.removeItem(KEY); return load(); }
  };

  global.MANNMITRA = global.MANNMITRA || {};
  global.MANNMITRA.state = api;
})(window);
