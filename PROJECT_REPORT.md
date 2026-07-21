# MANNMITRA — Team Project Report

> **मन मित्र — "a friend for your mind"**
> A trust-first, tiered mental-health platform for college students.

---

## 1. The Core Idea (Ideology)

**The lightest first step wins.**

Most mental-health platforms fail because **step 1 is heavy** — "book a counselor" or "register with your email." That feels like confessing to a stranger, so students drop off before they even start. **Stigma isn't a counselor-shortage problem; it's a first-step problem.**

MANNMITRA fixes this:

| Heavy approach (old) | MANNMITRA (new) |
|---|---|
| Sign up with email/phone | **Anonymous** — zero PII, no login |
| Book a counselor first | **60-sec mood check-in** first |
| One-shot, no fallback | **4 layers** — AI → Peer → Counselor → Crisis |
| English only | **EN / HI / MR / GU** |
| Desktop-only | **PWA** — mobile, tablet, laptop, offline |

**The funnel:** Light anonymous check-in → Trust builds → Triage routes you to the right help → Nobody hits a dead end.

---

## 2. Architecture Overview

```
User's Browser (HTML/CSS/JS)
       │
       ├─ index.html ─────── Landing / home
       ├─ checkin.html ───── Mood check-in → triage
       ├─ peer.html ──────── Anonymous peer chat
       ├─ counselor.html ─── Book a counselor
       ├─ dashboard.html ─── Streak, badges, mood chart
       ├─ journal.html ───── Private journal
       ├─ breathing.html ─── 4-4-4-4 breathing
       ├─ cbt.html ───────── CBT thought record
       ├─ community.html ─── Anonymous feed
       ├─ resources.html ─── Helplines + articles (4 languages)
       ├─ privacy.html ───── My Data + delete-all
       ├─ admin.html ─────── Admin impact dashboard
       └─ crisis.html ────── All helplines
              │
              ▼
     assets/js/  (5 core JS files)
       ├─ i18n.js      ─── Languages (EN/HI/MR/GU)
       ├─ state.js     ─── Anonymous session + localStorage
       ├─ triage.js    ─── Severity scoring + routing
       ├─ features.js  ─── Mock data: counselors, peers, badges, etc.
       └─ common.js    ─── Nav, theme, SOS, tour, crisis overlay, PWA
              │
              ▼
     localStorage (browser-only storage — no backend)
       ├─ mm_anon_id      ─── Opaque anonymous ID
       ├─ mm_log          ─── Check-in history
       ├─ mm_theme        ─── Dark/light/contrast
       ├─ mm_toured       ─── Tour completed
       ├─ mm_streak       ─── Check-in streak data
       └─ mm_badges       ─── Earned badges
```

**Key principle:** Everything runs **offline** in the browser. No server needed. Zero personal data ever leaves the device.

---

## 3. File Structure — What Each File Does

### HTML Pages (14 files)

| File | What it does | Key elements |
|---|---|---|
| `index.html` | Landing page. Hero, mascot, blobs, "Start anonymously" CTA | `.home-hero`, onboarding tour |
| `checkin.html` | Mood slider + 3 questions → runs triage → shows result + route | `#mood`, `#triageResult` |
| `peer.html` | Anonymous room list + 1:1 listener cards | `.room`, `.peer-card` |
| `counselor.html` | Shared counselor pool + anonymized booking ledger | `.counselor-card`, `#bookingLog` |
| `dashboard.html` | Mood chart, streak 🔥, badges, "lowest on Monday" insight | `#moodChart`, `#streak`, `#badges` |
| `journal.html` | Private journal — add/delete entries | `#journalForm`, `#entries` |
| `breathing.html` | Animated 4-4-4-4 box breathing exercise | `#breathCircle` |
| `cbt.html` | CBT — thought record, gratitude, 5-4-3-2-1 grounding | `#cbtForm`, `.cbt-card` |
| `community.html` | Anonymous posts + kind reactions | `#feed`, `.react-btn` |
| `resources.html` | Articles + helplines in EN/HI/MR/GU | `.resource-card` |
| `privacy.html` | Privacy policy + "My Data" view + delete-all | `#dataBox`, `#deleteAll` |
| `admin.html` | Admin impact metrics (colleges, students reached, funnel) | `.stat`, `.metrics` |
| `crisis.html` | Verified national helplines (Tele-MANAS, iCall, Vandrevala) | `.helpline` |

### JavaScript (5 files)

| File | Purpose | Key exports to `MANNMITRA` |
|---|---|---|
| `i18n.js` | Language strings + switcher (EN/HI/MR/GU) | `.i18n.t()`, `.i18n.getLang()`, `.i18n.setLang()` |
| `state.js` | Anonymous session ID + check-in log CRUD | `.state.id()`, `.state.get()`, `.state.saveScore()` |
| `triage.js` | Rule-based severity scoring + LLM hook | `.triage.score()`, `.triage.routeLabel()`, `.triage.scoreRemote()` |
| `features.js` | Mock data: counselors, peers, ledger, badges, streak, insight | `.data.*` |
| `common.js` | Nav, dark mode, contrast, SOS, tour, crisis overlay, PWA | `.common.*` (15+ methods) |

### Other

| File | Purpose |
|---|---|
| `assets/css/style.css` | All styles — themes, layout, responsive |
| `manifest.json` | PWA manifest (name, icons, start_url) |
| `sw.js` | Service Worker — offline cache + update |
| `assets/img/icon-*.png` | PWA icons (192, 512, maskable, apple-touch) |
| `assets/img/icon.svg` | SVG icon for modern browsers |
| `assets/img/favicon.png` | Browser tab icon |
| `pitch/MANNMITRA.pptx` | 14-slide pitch deck |
| `pitch/build_deck.py` | Python script to regenerate the deck |
| `pitch/gen_shots.py` | Generates product screenshot previews |
| `pitch/demo-script.txt` | 60-second judge walkthrough |
| `README.hi.md` | Hindi project overview |

---

## 4. Data Flow — How Pages Connect

```
               ┌─────────────┐
               │  index.html  │ ← Start (onboarding tour)
               └──────┬──────┘
                      │ "Start anonymously"
                      ▼
               ┌─────────────┐
               │ checkin.html │ ← Mood + 3 questions
               └──────┬──────┘
                      │ score() in triage.js
                      ▼
          ┌─────────────────────────┐
          │    Result: severity +    │
          │         route            │
          └──┬──────┬───────┬───────┘
             │      │       │
       low   │   medium    │  high/crisis
             ▼      ▼       ▼
     ┌─────────┐ ┌────────┐ ┌──────────┐
     │ peer    │ │counsel │ │ crisis   │
     │.html    │ │.html   │ │ overlay  │
     └─────────┘ └────────┘ └──────────┘
             │      │
             ▼      ▼
      ┌──────────────┐
      │ dashboard    │ ← Streak, badges, mood history
      │.html         │
      └──────────────┘
```

**State persistence:**
- Every check-in saves to `localStorage` via `state.js`
- Dashboard reads `localStorage` to compute streak, chart, badges
- Triage severity is saved → if "high", crisis overlay auto-shows on next page load (once per session)
- Theme, language, tour completion all persist in `localStorage`

---

## 5. Feature Deep-Dive

### 5a. Triage Engine (`assets/js/triage.js`)

```js
MANNMITRA.triage.score({ mood: 2, text: "I feel very stressed", answers: {...} })
// Returns → { severity: "medium", score: 5, route: "peer", reasons: [...] }
```

- **Rule-based:** mood value + keyword detection (crisis words → high, worry words → medium/peer, calm → self)
- **Multilingual keywords:** EN + HI + MR + GU crisis words all detected
- **LLM hook:** `scoreRemote()` — replace with a real API call later (unused in demo)
- **Route:** `self` (low) → resources/suggestions; `peer` (medium) → peer.html; `crisis` (high) → crisis overlay + SOS

### 5b. SOS Hold-to-Call

- Floating red SOS button at bottom-right
- **Press and hold** for 1.2 seconds (visual arc fills)
- **Mobile:** auto-dials `tel:14416` (Tele-MANAS)
- **Laptop:** copies number to clipboard + shows toast "Helpline copied: 14416 — dial from your phone"
- Crisis overlay also shows with call button + helpline list

### 5c. Crisis Overlay

- Full-screen modal with helplines + "Call now" + "I'm safe — close"
- Auto-triggered on `checkin.html` if triage returns `severity: "high"`
- Also auto-shows on any page load if last severity was "high" (only **once per session** to avoid blocking nav)
- `z-index: 1000` — covers screen, blocks nav until closed

### 5d. Onboarding Tour

- Shows on first visit (localStorage `mannmitra_toured` not set)
- 3 steps: Welcome → Check-in → Peer/Crisis support
- Next button advances, Skip/Get started closes
- After close, sets localStorage — never shows again (clear to re-test)

### 5e. Theme System

| Mode | `data-theme` | `--bg` | `--text` | Nav icon |
|---|---|---|---|---|
| Light | `"light"` (default) | white | dark | 🌙 |
| Dark | `"dark"` | dark teal | light | ☀️ |
| High contrast | `"contrast"` | black | white | — |

- Persisted in `localStorage` key `mannmitra_theme`

### 5f. Language System (i18n)

- 4 languages: **EN** (English), **HI** (हिंदी), **MR** (मराठी), **GU** (ગુજરાતી)
- All text stored as i18n key-value pairs in `i18n.js`
- HTML elements with `data-i18n="key"` get auto-translated
- Language selector in nav calls `setLang()` → `applyLang()`
- Triage keywords also translated for crisis detection

### 5g. Gamification

- **Streak:** consecutive check-in days → 🔥 flame + count
- **Badges:** "First Step", "Open Up", "Calm 5", "Helpful", "Resilient" — earned at milestones
- **Mood insight:** "You tend to feel lowest on Mondays" — pattern detection from mood history

### 5h. CBT + Journal + Breathing + Community

- **CBT:** Thought record (situation → thought → feeling → reframe), gratitude list, 5-4-3-2-1 grounding
- **Journal:** Private text entries with date — stored in localStorage
- **Breathing:** Animated circle — inhale 4s → hold 4s → exhale 4s → hold 4s
- **Community:** Anonymous posts with emoji reactions — mock data, all local

### 5i. Counselor + Admin

- **Counselor dashboard:** Shared counselor pool across colleges, anon booking ledger (tracks only slot count, no names)
- **Admin:** Funnel metrics — check-ins → peer → counselor → crisis; impact stats (colleges, lives reached); export button

### 5j. Privacy & My Data

- **Zero PII:** Opaque `anon_id` only — no email, phone, name
- **My Data page:** Shows all stored data + **"Delete All"** button (clears localStorage + resets)
- **Admin is blind:** can see aggregate metrics + anon ledger only

### 5k. PWA (Progressive Web App)

- **Installable:** manifest.json + service worker → "Add to Home screen" on mobile/tablet
- **Offline:** sw.js caches all pages + assets → works without internet
- **Update:** when new version pushed → auto-reloads once
- **Install button:** 📲 in nav (appears when browser supports `beforeinstallprompt`)

---

## 6. Theme & i18n — How to Add a New Language

To add a new language (e.g., **Tamil**):

1. In `assets/js/i18n.js`:
   - Add a new key to the `LANG` object (e.g., `"ta"`), copy all strings translated
   - Add `"ta"` to the `langs` array
2. In `assets/js/triage.js`:
   - Add Tamil crisis keywords to the `ENGINE.keywords` array
   - Add a `ta` key to `RESOURCES` with translated helpline text
3. Regenerate the deck (optional): `python pitch/build_deck.py`

---

## 7. Team Testing Checklist

### Must-test flows

| Test | Expected |
|---|---|
| Open `index.html` | Onboarding tour appears (if first visit) |
| Click Next/Skip on tour | Tour advances / closes; nav buttons visible |
| Click 🌙 (dark mode) | Page turns dark; icon changes to ☀️ |
| Click ◐ (contrast) | Page turns black & white |
| Change language (EN→HI→MR→GU) | All text translates immediately |
| Go to checkin → fill mood + text → tap "Check in" | Triage result shows with severity pill + route |
| After high-severity result | Crisis overlay auto-shows (once per session) |
| Click SOS (hold ~1s) | On mobile: dials 14416; on laptop: copies number + toast |
| Visit `dashboard.html` | Streak, badges, mood chart render (data from check-in history) |
| Visit `privacy.html` → "My Data" | Shows stored data; "Delete All" clears everything |
| Install PWA (📲 button or browser menu) | App installs; opens standalone; works offline |
| Close internet → navigate pages | All pages load from SW cache (offline) |

### Debugging commands (DevTools Console)

```js
// Reset tour
localStorage.removeItem("mannmitra_toured")
// Reset theme
localStorage.removeItem("mannmitra_theme")
// Reset crisis shown flag (session)
sessionStorage.removeItem("mm_crisis_shown")
// Nuke SW cache (fresh code load)
navigator.serviceWorker.getRegistrations().then(r => r.forEach(x => x.unregister())).then(() => location.reload())
// Check all stored data
console.table(localStorage)
```

### Common issues

| Symptom | Likely cause | Fix |
|---|---|---|
| Buttons (dark/contrast) don't work | Old SW cached code | Unregister SW or use Incognito |
| Tour won't show | Already completed (`mannmitra_toured`) | `localStorage.removeItem("mannmitra_toured")` |
| Crisis overlay blocks nav | `lastSeverity === "high"` persisted | Close overlay or session.removeItem |
| Language doesn't translate | `i18n.js` not loaded / error | Check console for errors |

---

## 8. 60-Second Demo Script (for Judges)

```
0:00  Open index.html → mascot, "Start anonymously" CTA
      MENTION: "No signup, no PII, installs as an app"

0:10  Checkin → mood 😟 + "exam stress" → triage result "Mild stress → Peer"
      MENTION: "Rule-based triage; LLM slots in later — same interface"

0:20  Peer → anonymous rooms, listener cards
      MENTION: "Trained student listeners; stigma drops with anonymity"

0:30  SOS hold → crisis overlay → 14416
      MENTION: "Safety by design — high-risk never routes around crisis"

0:40  Dashboard → streak 🔥 5 days, badges, "lowest on Monday" insight
      MENTION: "Gamification keeps students coming back"

0:48  Language switch EN→हि→मर→ગુ
      MENTION: "4 languages — stigma is worse in vernacular"

0:55  Privacy → "My Data" → Delete All
      MENTION: "Zero PII, user owns their data, one-click delete"

CLOSE: "Light first step → trust → help scales. Pilot with 3 colleges."
```

---

## 9. Pitch Deck

Location: `pitch/MANNMITRA.pptx` (14 slides)

Generated via: `python pitch/build_deck.py`

Covers:
1. Title slide
2. The Problem (statistics)
3. Insight — first-step problem
4. Solution — 4 trust layers
5. Full feature map (12 features)
6. Product preview (6 screenshots)
7. Demo flow
8. Architecture
9. Privacy & safety
10. Multilingual & accessibility
11. Scalability & business (B2B2C)
12. Impact / demo metrics
13. Credibility (frameworks, helplines)
14. The Ask

---

## 10. How to Run

### For testing (no server needed):
```
double-click index.html
```

### For full PWA/offline features (recommended):
```bash
cd C:\Users\Rudra\Desktop\mannmitra
python -m http.server 8080
# Open → http://localhost:8080
```

### For teammates to access over network:
```bash
# Find your IP
ipconfig | findstr "IPv4"
# Run server
python -m http.server 8080
# Share: http://YOUR_IP:8080
```

### Git
```bash
git pull origin main    # get latest code
git status              # check changes
git add -A; git commit -m "message"; git push origin main
```

---

## 11. Team Roles (Suggested)

| Role | Who | Responsibilities |
|---|---|---|
| **Frontend / UI** | — | HTML structure, CSS styling, responsive, animations |
| **JS / Logic** | — | Triage, state, i18n, features, common.js wiring |
| **PWA / Testing** | — | SW, manifest, icons, cross-browser testing, offline |
| **Pitch / Docs** | — | Slide deck, README, demo script, team coordination |
| **Content / i18n** | — | Language strings, resource articles, helpline data |

---

## 12. Key Links

- **GitHub repo:** `https://github.com/mellowpraful/vistaraz-site`
- **Live demo:** `http://localhost:8080` (after running server)
- **Pitch deck:** `pitch/MANNMITRA.pptx`
- **Demo script:** `pitch/demo-script.txt`
- **This report:** `PROJECT_REPORT.md`

---

> **MANNMITRA — मन मित्र. A friend for your mind.**
> Light first step. Real trust. No dead ends.
> **In crisis: Tele-MANAS 14416 (free, 24×7)**
