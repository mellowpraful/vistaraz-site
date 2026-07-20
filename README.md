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
- 🤖 **AI triage** — mood slider + 3 questions → severity scoring & routing
- 🤝 **Peer support** — anonymous username, topic rooms, 1:1 listener, simulated chat
- 🩺 **Counselor booking** — calendar + slots, anonymous-ID system (admin-blind)
- 📊 **Dashboard** — mood-history chart, avg mood, journal count, day streak (from your local data)
- 📝 **Journal** — private on-device reflection entries
- 🫁 **Breathing** — animated 4-4-4-4 box-breathing exercise
- 🌐 **i18n** — English / Hindi / Marathi language switcher
- 🌙 **Dark mode** — toggle persisted in localStorage
- 🛡 **Privacy page** + 🆘 **Crisis page** with verified national helplines
- 🧑‍💼 **Counselor dashboard** & 👩‍💻 **Admin panel** — shared pool + anonymized ledger (mock)

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
| `peer.html` | Anonymous username + topic rooms |
| `counselor.html` | Counselor dashboard (shared pool + anon ledger) |
| `dashboard.html` | Personal progress (mood chart, streak) |
| `journal.html` | Private journaling |
| `breathing.html` | Animated breathing exercise |
| `resources.html` | Hindi / English / Marathi content |
| `privacy.html` | "How we protect your privacy" |
| `admin.html` | Admin panel — funnel + anonymized ledger |
| `crisis.html` | One-tap verified helplines |

Core JS: `triage.js` (severity), `state.js` (anonymous session), `i18n.js` (languages), `features.js` (mock product data), `common.js` (nav + dark mode + crisis overlay).

## 60-second live demo script (for the round)
1. Open **index.html** → point at "Anonymous · No signup" + dark-mode toggle + language switch.
2. **Check-in** → low mood → severity pill + recommended route (peer).
3. **Peer** → join a room, type a risk phrase → crisis overlay auto-triggers.
4. **Dashboard** → show mood chart populated from your check-in.
5. **Journal / Breathing** → show self-care depth.
6. **Counselor dashboard** → shared pool + anonymized ledger (only anon IDs).
7. **Admin panel** → funnel metrics, peer network. Close with **privacy.html**.

## Business / scalability (B2B2C)
- Sell to colleges as a subscription — cheaper than hiring 5 in-house counselors each.
- **Shared counselor pool** across colleges → one network serves many campuses, solving shortage directly.
- **Peer volunteers** self-replenish each academic batch → near-free, compounding supply.
- CSR / wellness-fund subsidies for low-income campuses.

## Pitch deck
`pitch/MANNMITRA.pptx` — 10 slides. Regenerate with `python pitch/build_deck.py`.
