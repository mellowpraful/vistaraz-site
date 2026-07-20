/*
 * MANNMITRA — Mock data layer for product-ready dashboards (no backend).
 * Represents the shared counselor pool, peer network, and anonymized admin ledger.
 */
(function (global) {
  "use strict";

  // Shared counselor pool across colleges (solves shortage by amortizing supply).
  const COUNSELORS = [
    { id: "C-101", name: "Dr. A. Rao", lang: ["en", "hi"], load: 6, college: "Pool" },
    { id: "C-102", name: "Dr. S. Iyer", lang: ["en", "mr"], load: 4, college: "Pool" },
    { id: "C-103", name: "Ms. K. Nair", lang: ["en", "hi"], load: 8, college: "Pool" },
    { id: "C-104", name: "Dr. R. Verma", lang: ["en", "hi", "mr"], load: 3, college: "Pool" }
  ];

  // Trained peer listeners (self-replenishing each batch).
  const PEERS = [
    { id: "P-21", name: "PeerListener_Quiet", room: "Exam Stress", cert: "NIMHANS-mod1", online: true },
    { id: "P-22", name: "PeerListener_Calm", room: "Loneliness", cert: "iCall-mod1", online: true },
    { id: "P-23", name: "PeerListener_Hope", room: "Relationships", cert: "NIMHANS-mod1", online: false },
    { id: "P-24", name: "PeerListener_Asha", room: "Family Pressure", cert: "iCall-mod1", online: true }
  ];

  // Anonymized admin ledger — only anon_id + slot, never student identity.
  const LEDGER = [
    { anonId: "MM-7F2A-9C", slot: "Mon 10:00", counselor: "C-101", severity: "medium" },
    { anonId: "MM-3B8E-21", slot: "Tue 14:30", counselor: "C-103", severity: "low" },
    { anonId: "MM-9D4C-55", slot: "Wed 11:30", counselor: "C-102", severity: "high" },
    { anonId: "MM-1A6F-88", slot: "Thu 16:00", counselor: "C-104", severity: "medium" },
    { anonId: "MM-5E2B-13", slot: "Fri 13:00", counselor: "C-101", severity: "low" }
  ];

  // Aggregate funnel metrics (would come from analytics in prod).
  const METRICS = {
    checkins: 1284,
    routedPeer: 612,
    routedCounselor: 298,
    crisisEscalations: 41,
    peerListeners: PEERS.length,
    counselors: COUNSELORS.length,
    colleges: 14,
    livesReached: 38200
  };

  // Gamification badges — unlocked based on local activity.
  const BADGES = [
    { id: "first", emoji: "🌱", label: "First step", test: s => s.checkins.length >= 1 },
    { id: "week", emoji: "🔥", label: "7-day streak", test: s => computeStreak(s) >= 7 },
    { id: "journal", emoji: "📝", label: "Reflector (5 entries)", test: s => s.journal.length >= 5 },
    { id: "peer", emoji: "🤝", label: "Connected", test: s => s.checkins.some(c => c.severity === "medium") },
    { id: "brave", emoji: "🛡", label: "Reached out", test: s => s.checkins.some(c => c.severity === "high") }
  ];

  function computeStreak(s) {
    const days = new Set((s.checkins || []).map(c => new Date(c.ts).toDateString()));
    let streak = 0; const d = new Date();
    for (let i = 0; i < 400; i++) {
      if (days.has(d.toDateString())) { streak++; d.setDate(d.getDate() - 1); }
      else if (i === 0) { d.setDate(d.getDate() - 1); } else break;
    }
    return streak;
  }

  // Mood insight: which weekday user tends to feel lowest.
  function moodInsight(s) {
    const byDay = {};
    (s.checkins || []).forEach(c => {
      if (!c.mood) return;
      const day = new Date(c.ts).getDay(); // 0 Sun..6 Sat
      (byDay[day] = byDay[day] || []).push(c.mood);
    });
    const names = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let worst = null, worstAvg = 11;
    Object.keys(byDay).forEach(d => {
      const avg = byDay[d].reduce((a,b)=>a+b,0) / byDay[d].length;
      if (avg < worstAvg) { worstAvg = avg; worst = +d; }
    });
    return worst === null ? null : { day: names[worst], avg: worstAvg.toFixed(1) };
  }

  global.MANNMITRA = global.MANNMITRA || {};
  global.MANNMITRA.data = { COUNSELORS, PEERS, LEDGER, METRICS, BADGES, computeStreak, moodInsight };
})(window);
