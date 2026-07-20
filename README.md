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
- **Demo (this repo):** plain HTML/CSS/JS, runs fully offline. Zero PII — anonymous `anon_id` in `localStorage`.
- **AI triage:** `assets/js/triage.js` is a pure function `score({mood, text, answers}) → {severity, route}`. Rule-based now, **pluggable** so a real LLM (FastAPI + Gemini) drops in behind the same interface later.
- **Privacy:** opaque `anon_id`, blind counselor booking, TTL auto-delete of hashed logs, consent-gated identities, TLS + encryption at rest in production.
- **Product layer (mock, no backend):** `assets/js/features.js` simulates the shared counselor pool, peer network, and anonymized admin ledger that a real backend would serve.

## Features
- 🤖 **AI triage** — mood slider + 3 questions → severity scoring & routing (rule engine + pluggable LLM hook)
- 🤝 **Peer support** — anonymous username, topic rooms, 1:1 listener, simulated chat
- 🩺 **Counselor dashboard** — shared counselor pool across colleges + anonymized booking ledger
- 📊 **Dashboard** — mood-history chart, avg mood, journal count, **day streak**, **badges**, **mood insights**
- 🏆 **Gamification** — achievement badges + streak flame (localStorage)
- 💡 **Mood insight** — "you tend to feel lowest on Mondays" pattern detection
- 🧠 **CBT mini-modules** — thought record, gratitude, 5-4-3-2-1 grounding
- 💬 **Community feed** — anonymous, supportive posts + reactions
- 🆘 **SOS hold-to-call** — press & hold the floating button → crisis overlay
- 📝 **Journal** — private on-device reflection entries
- 🫁 **Breathing** — animated 4-4-4-4 box-breathing exercise
- 🌐 **i18n** — English / Hindi / Marathi / Gujarati language switcher
- 🌙 **Dark mode + high-contrast** — toggles persisted in localStorage
- 📱 **Mobile bottom-nav** + onboarding tour + page transitions
- 🛡 **Privacy page** + **My Data** view (delete-all) + 🆘 **Crisis page** with verified national helplines
- 🧑‍💼 **Counselor dashboard** & 👩‍💻 **Admin panel** — shared pool, funnel metrics, impact numbers (colleges, lives reached)

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
| `index.html` | Landing — mascot, blobs, stigma stats + "Start anonymously" CTA |
| `checkin.html` | Mood slider + 3 questions → triage & routing (LLM-ready) |
| `peer.html` | Anonymous username + topic rooms |
| `counselor.html` | Counselor dashboard (shared pool + anon ledger) |
| `dashboard.html` | Personal progress (chart, streak, badges, insight) |
| `journal.html` | Private journaling |
| `breathing.html` | Animated breathing exercise |
| `cbt.html` | CBT self-help mini-modules |
| `community.html` | Anonymous community feed |
| `resources.html` | Hindi / English / Marathi / Gujarati content |
| `privacy.html` | Privacy + "My Data" (delete-all) |
| `admin.html` | Admin panel — funnel + impact metrics |
| `crisis.html` | One-tap verified helplines |

Core JS: `triage.js` (severity + LLM hook), `state.js` (anonymous session), `i18n.js` (languages), `features.js` (mock data + gamification/insights), `common.js` (nav, dark/contrast, SOS, tour, crisis).

## 60-second live demo script (for the round)
1. Open **index.html** → mascot + blobs, "Anonymous · No signup", onboarding tour, dark-mode + contrast + language switches.
2. **Check-in** → low mood → severity pill + recommended route (peer). Mention LLM hook for production.
3. **Peer** → join a room, type a risk phrase → crisis overlay auto-triggers. Then show **SOS hold-to-call** button.
4. **Dashboard** → mood chart, streak flame, badges, and the "lowest on Monday" insight.
5. **CBT** → thought record; **Community** → anonymous post + react; **Journal / Breathing** → self-care depth.
6. **Counselor dashboard** → shared pool + anonymized ledger (only anon IDs).
7. **Admin panel** → funnel metrics + impact (colleges, lives reached). Close on **privacy.html** → "My Data" delete-all.

## Business / scalability (B2B2C)
- Sell to colleges as a subscription — cheaper than hiring 5 in-house counselors each.
- **Shared counselor pool** across colleges → one network serves many campuses, solving shortage directly.
- **Peer volunteers** self-replenish each academic batch → near-free, compounding supply.
- CSR / wellness-fund subsidies for low-income campuses.

## Pitch deck
`pitch/MANNMITRA.pptx` — 10 slides. Regenerate with `python pitch/build_deck.py`.
