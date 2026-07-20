/*
 * MANNMITRA — Anonymous Session State (extended)
 * Zero PII. Opaque anon_id; all data in localStorage. No backend.
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
    const fresh = {
      anonId: genId(), checkins: [], journal: [], bookings: [],
      lastSeverity: null, createdAt: Date.now()
    };
    save(fresh);
    return fresh;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  const api = {
    get() { return load(); },
    id() { return load().anonId; },
    setSeverity(sev) { const s = load(); s.lastSeverity = sev; save(s); return s; },
    pushCheckin(c) { const s = load(); s.checkins.push(c); save(s); return s; },
    addJournal(entry) { const s = load(); s.journal.push(entry); save(s); return s; },
    addBooking(b) { const s = load(); s.bookings.push(b); save(s); return s; },
    reset() { localStorage.removeItem(KEY); return load(); }
  };

  global.MANNMITRA = global.MANNMITRA || {};
  global.MANNMITRA.state = api;
})(window);
