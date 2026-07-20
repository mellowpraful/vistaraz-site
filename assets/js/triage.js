/*
 * MANNMITRA — Triage Engine (mock AI, rule-based)
 * -------------------------------------------------
 * Public interface:  MANNMITRA.triage.score(input) -> { severity, score, reasons, route }
 *
 * `severity` is one of: "low" | "medium" | "high"
 * `route`    is one of: "self" | "peer" | "counselor" | "crisis"
 *
 * This is intentionally a pure function with NO external dependencies so the
 * demo runs fully offline. The same `score()` signature is what a real LLM
 * backend would implement later (see architecture: swap rule engine -> FastAPI+Gemini).
 */

(function (global) {
  "use strict";

  // High-risk language — direct crisis indicators.
  const CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end my life", "end it all", "want to die",
    "better off dead", "no reason to live", "self harm", "self-harm",
    "hurt myself", "take my life", "can't go on", "cant go on",
    "marna", "खत्म", "आत्महत्या", "मरना"
  ];

  // Medium-risk language — distress, isolation, overwhelm.
  const DISTRESS_KEYWORDS = [
    "hopeless", "worthless", "alone", "lonely", "overwhelmed", "can't cope",
    "cant cope", "anxious", "panic", "depressed", "cry", "tired of everything",
    "no one cares", "failed", "failure", "breakdown", "अकेला", "तनाव", "डर",
    "चिंता", "अकेलापन"
  ];

  const RESOURCE_KEYWORDS = [
    "sleep", "exam", "study", "relationship", "fight", "parents", "breakup",
    "friend", "stress", "परीक्षा", "परिवार", "दोस्त"
  ];

  function countHits(text, list) {
    const t = " " + text.toLowerCase() + " ";
    let n = 0;
    const found = [];
    for (const k of list) {
      if (t.includes(k.toLowerCase())) {
        n++;
        found.push(k);
      }
    }
    return { n, found };
  }

  function score(input) {
    const mood = Number(input.mood) || 5;            // 1 (worst) .. 10 (best)
    const text = (input.text || "").toString();
    const answers = Array.isArray(input.answers) ? input.answers : [];

    const crisis = countHits(text, CRISIS_KEYWORDS);
    const distress = countHits(text, DISTRESS_KEYWORDS);
    const resource = countHits(text, RESOURCE_KEYWORDS);

    // Map mood (1..10) to a 0..100 "low-mood" pressure.
    const moodPressure = Math.max(0, (10 - mood) / 9) * 40; // up to 40 pts
    const crisisPts = crisis.n * 50;
    const distressPts = distress.n * 18;
    const answerPts = answers.filter(a => a === "yes" || a === true).length * 6;

    let total = moodPressure + crisisPts + distressPts + answerPts;
    total = Math.min(100, Math.round(total));

    let severity, route, reasons = [];

    if (crisis.n > 0 || total >= 80) {
      severity = "high";
      route = "crisis";
      reasons.push("High-risk language or critical score detected");
    } else if (total >= 45 || distress.n > 0) {
      severity = "medium";
      route = "peer";
      reasons.push("Distress signals detected — peer support recommended");
    } else if (total >= 20 || resource.n > 0) {
      severity = "low";
      route = "self";
      reasons.push("Mild stress — self-care & resources suggested");
    } else {
      severity = "low";
      route = "self";
      reasons.push("Stable check-in");
    }

    // Everyone can still reach a counselor; we just change the *recommended* path.
    return {
      severity,
      score: total,
      route,
      reasons,
      hits: { crisis: crisis.found, distress: distress.found, resource: resource.found }
    };
  }

  // Suggested next step label for UI.
  function routeLabel(route) {
    return {
      self: "Self-care & resources",
      peer: "Anonymous peer listener",
      counselor: "Licensed counselor",
      crisis: "Immediate crisis support"
    }[route] || "Support";
  }

  /*
   * Pluggable LLM hook (optional, production).
   * If a backend endpoint is configured, send the same `input` and expect
   * { severity, route, reasons }. Falls back to the local rule engine offline.
   * Example (commented): fetch('/api/triage', { method:'POST', body: JSON.stringify(input) })
   */
  async function scoreRemote(input) {
    const ENDPOINT = global.MANNMITRA && global.MANNMITRA.config && global.MANNMITRA.config.triageEndpoint;
    if (!ENDPOINT) return null; // no backend -> use local
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      if (!r.ok) return null;
      return await r.json();
    } catch (e) { return null; }
  }

  global.MANNMITRA = global.MANNMITRA || {};
  global.MANNMITRA.triage = { score, routeLabel, scoreRemote };
})(window);
