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
    counselors: COUNSELORS.length
  };

  global.MANNMITRA = global.MANNMITRA || {};
  global.MANNMITRA.data = { COUNSELORS, PEERS, LEDGER, METRICS };
})(window);
