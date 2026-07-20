# MANNMITRA — मन मित्र ("a friend for your mind")

> A trust-first, tiered mental-health platform for college students. The first step
> to feeling better shouldn't feel heavy.

---

## The one-line pitch
Most campus mental-health systems fail because **step 1 is heavy** — "book a counselor."
That feels like confessing to a stranger, so students don't do it. **Stigma isn't a
counselor-shortage problem; it's a first-step problem.** MANNMITRA lowers that first step
to a 2-minute anonymous mood check-in, then routes students through 4 layers so nobody
hits a dead end.

## The 4-layer trust funnel
1. **AI Companion (24/7, anonymous)** — mood check-ins, journaling, breathing; detects severity, routes.
2. **Peer Support** — trained senior students ("Peer Listeners", NIMHANS/iCall-aligned module) in anonymous 1:1 or topic rooms.
3. **Licensed Counselor** — booking shows admin only an anonymous ID + slot (faculty/parents can't see); shared pool across colleges fixes shortage.
4. **Crisis Escalation** — one-tap helplines (iCall, Vandrevala, Tele-MANAS 14416), auto-triggered on high-risk language.

## Architecture (end-to-end)
```
Browser (anonymous) → API/BFF → Triage · Peer Match · Booking · Crisis → Encrypted Data Layer
```
- **Demo (this repo):** plain HTML/CSS/JS, Tailwind-style CSS, `localStorage` for anonymous session. Zero PII leaves the device.
- **AI triage:** `assets/js/triage.js` is a pure function `score({mood, text, answers}) → {severity, route}`. Rule-based now, **pluggable** so a real LLM (FastAPI + Gemini) drops in behind the same interface later.
- **Privacy:** opaque `anon_id`, blind counselor booking, TTL auto-delete of hashed logs, consent-gated identities, TLS + encryption at rest in production.

## How to run
No install, no server. Just open the file:
```
mannmitra/index.html
```
Or, for reliable relative paths:
```
cd mannmitra
python -m http.server 8000
# visit http://localhost:8000
```

## Pages
| File | Purpose |
|---|---|
| `index.html` | Landing — stigma stats + "Start anonymously" CTA |
| `checkin.html` | Mood slider + 3 questions → rule-based triage & routing |
| `peer.html` | Anonymous username + topic rooms (exam/relationship/loneliness) |
| `counselor.html` | Calendar booking with anonymous-ID system |
| `resources.html` | Hindi + English content (language toggle) |
| `privacy.html` | "How we protect your privacy" (judges' favorite) |
| `crisis.html` | One-tap verified helplines |

Core JS: `assets/js/triage.js` (severity engine), `assets/js/state.js` (anonymous session), `assets/js/common.js` (nav + global crisis overlay).

## 60-second live demo script (for the round)
1. Open **index.html** → point at the "Anonymous · No signup" badge. "Step 1 is weightless."
2. Click **Start anonymously** → **checkin.html**. Drag the mood slider low, answer "no" to support. Hit **See my path**.
3. Show the severity pill + recommended route (peer). "The AI triages and routes — no counselor forced on day one."
4. Open **peer.html** → join a room / request a listener. Type a risk phrase (e.g. "I can't go on").
5. The **crisis overlay auto-triggers** with Tele-MANAS / iCall / Vandrevala. "Safety is the one thing we never route around."
6. Open **counselor.html** → show the anonymous ID the admin sees (no name). Then **privacy.html** to close.

## Business / scalability (B2B2C)
- Sell to colleges as a subscription — cheaper than hiring 5 in-house counselors each.
- **Shared counselor pool** across colleges → one network serves many campuses, solving shortage directly.
- **Peer volunteers** self-replenish each academic batch → near-free, compounding supply.
- CSR / wellness-fund subsidies for low-income campuses.

## Pitch deck
`pitch/MANNMITRA.pptx` — 10 slides: Problem → Insight → 4 Layers → Demo flow → Architecture → Privacy → Scalability → Credibility → Ask.
(Regenerate with `python pitch/build_deck.py` if you edit the script.)

---
*Demo build for a college hackathon round. Not a substitute for emergency care.*
