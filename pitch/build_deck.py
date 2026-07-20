#!/usr/bin/env python3
"""Generate MANNMITRA.pptx pitch deck."""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# Palette
TEAL = RGBColor(0x0F, 0x9B, 0x86)
TEAL_D = RGBColor(0x0B, 0x7D, 0x6C)
SAND = RGBColor(0xFD, 0xF8, 0xF1)
INK = RGBColor(0x1F, 0x2A, 0x2E)
MUTED = RGBColor(0x5B, 0x6B, 0x6E)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
DANGER = RGBColor(0xD6, 0x45, 0x5B)
WARN = RGBColor(0xE0, 0x89, 0x2B)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
SW, SH = prs.slide_width, prs.slide_height
BLANK = prs.slide_layouts[6]

def slide():
    return prs.slides.add_slide(BLANK)

def rect(s, x, y, w, h, color):
    from pptx.enum.shapes import MSO_SHAPE
    shp = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    shp.fill.solid(); shp.fill.fore_color.rgb = color
    shp.line.fill.background()
    shp.shadow.inherit = False
    return shp

def txt(s, x, y, w, h, text, size=18, color=INK, bold=False, align=PP_ALIGN.LEFT,
        anchor=MSO_ANCHOR.TOP, font="Calibri"):
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame; tf.word_wrap = True
    tf.vertical_anchor = anchor
    p = tf.paragraphs[0]; p.alignment = align
    r = p.add_run(); r.text = text
    r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = color
    r.font.name = font
    return tb

def bullets(s, x, y, w, h, items, size=16, color=INK, gap=6):
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame; tf.word_wrap = True
    for i, (txt_, lvl) in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.level = lvl
        p.space_after = Pt(gap)
        r = p.add_run(); r.text = ("• " if lvl == 0 else "– ") + txt_
        r.font.size = Pt(size); r.font.color.rgb = color; r.font.name = "Calibri"
    return tb

def bg(s, color):
    rect(s, 0, 0, SW, SH, color)

def title_bar(s, title, kicker=None):
    bg(s, WHITE)
    bar = rect(s, 0, 0, SW, Inches(1.15), TEAL)
    txt(s, Inches(0.5), Inches(0.18), Inches(12), Inches(0.8), title,
        size=30, color=WHITE, bold=True, anchor=MSO_ANCHOR.MIDDLE)
    if kicker:
        txt(s, Inches(0.5), Inches(1.25), Inches(12), Inches(0.4), kicker,
            size=14, color=MUTED, bold=True)

# ---------- Slide 1: Title ----------
s = slide(); bg(s, TEAL)
rect(s, 0, Inches(5.4), SW, Inches(2.1), TEAL_D)
txt(s, Inches(0.8), Inches(1.6), Inches(11.7), Inches(1.2),
    "MANNMITRA", size=64, color=WHITE, bold=True)
txt(s, Inches(0.8), Inches(2.9), Inches(11.7), Inches(0.6),
    "मन मित्र — a friend for your mind", size=22, color=SAND)
txt(s, Inches(0.8), Inches(3.6), Inches(11.7), Inches(1.4),
    "A trust-first, tiered mental-health platform for college students.\n"
    "The first step to feeling better shouldn't feel heavy.",
    size=18, color=WHITE)
txt(s, Inches(0.8), Inches(5.7), Inches(11.7), Inches(0.5),
    "Tiered support:  AI → Peer → Counselor → Crisis   |   Anonymous · No signup · 24×7",
    size=15, color=WHITE, bold=True)
txt(s, Inches(0.8), Inches(6.6), Inches(11.7), Inches(0.4),
    "College Hackathon Round — Pitch Deck", size=13, color=SAND)

# ---------- Slide 2: Problem ----------
s = slide(); title_bar(s, "The Problem", "WHY EXISTING SYSTEMS FAIL")
bullets(s, Inches(0.6), Inches(1.9), Inches(6.0), Inches(4.8), [
    ("Step 1 today is 'book a counselor' — feels heavy, like confessing.", 0),
    ("Students delay or never seek help because of stigma.", 0),
    ("~15% of Indian students show depression symptoms (NIMHANS).", 0),
    ("Campus counselor shortage is real — can't be hired away.", 0),
    ("One-size-fits-all portals ignore the trust gap.", 0),
], size=18)
# stat cards on right
for i, (num, lab) in enumerate([("~15%","show depression symptoms"),
                                 ("1 in 4","delay help due to stigma"),
                                 ("Few","campus counselors per 1000")]):
    y = Inches(1.9 + i*1.45)
    rect(s, Inches(7.0), y, Inches(5.7), Inches(1.25), TEAL if i==0 else SAND)
    txt(s, Inches(7.2), y+Inches(0.12), Inches(2.2), Inches(1.0), num,
        size=30, color=WHITE if i==0 else TEAL_D, bold=True, anchor=MSO_ANCHOR.MIDDLE)
    txt(s, Inches(9.4), y+Inches(0.12), Inches(3.2), Inches(1.0), lab,
        size=15, color=WHITE if i==0 else INK, anchor=MSO_ANCHOR.MIDDLE)

# ---------- Slide 3: Insight ----------
s = slide(); bg(s, SAND)
rect(s, 0, 0, SW, SH, SAND)
rect(s, Inches(0.8), Inches(1.4), Inches(11.7), Inches(0.12), TEAL)
txt(s, Inches(0.8), Inches(1.7), Inches(11.7), Inches(2.2),
    "Insight: Stigma isn't a counselor-shortage problem.\nIt's a FIRST-STEP problem.",
    size=34, color=TEAL_D, bold=True)
txt(s, Inches(0.8), Inches(3.8), Inches(11.7), Inches(1.6),
    "Lower the first step to a 2-minute anonymous mood check-in — no login, no stranger.\n"
    "Everything else (peer, counselor, crisis) builds from that moment of trust.",
    size=18, color=INK)
rect(s, Inches(0.8), Inches(5.6), Inches(11.7), Inches(1.1), TEAL)
txt(s, Inches(1.0), Inches(5.75), Inches(11.3), Inches(0.8),
    "Heavy first step  →  nobody comes.   Light first step  →  trust  →  help scales.",
    size=18, color=WHITE, bold=True, anchor=MSO_ANCHOR.MIDDLE)

# ---------- Slide 4: 4 Layers ----------
s = slide(); title_bar(s, "The Solution — 4 Trust Layers", "NOBODY HITS A DEAD END")
layers = [
    ("1 · AI Companion", "Anonymous 24/7. Mood check-ins, journaling, breathing. Detects severity, routes.", TEAL),
    ("2 · Peer Support", "Trained senior students ('Peer Listeners', NIMHANS/iCall module). Anonymous rooms.", TEAL_D),
    ("3 · Counselor", "Book with only an anonymous ID to admin. Shared pool across colleges fixes shortage.", WARN),
    ("4 · Crisis", "One-tap helplines (iCall, Vandrevala, Tele-MANAS 14416). Auto-triggered on risk.", DANGER),
]
for i, (h, d, c) in enumerate(layers):
    x = Inches(0.6 + i*3.15)
    rect(s, x, Inches(2.0), Inches(2.95), Inches(4.4), c)
    txt(s, x+Inches(0.15), Inches(2.2), Inches(2.65), Inches(1.0), h,
        size=17, color=WHITE, bold=True)
    txt(s, x+Inches(0.15), Inches(3.3), Inches(2.65), Inches(3.0), d,
        size=14, color=WHITE)
    if i < 3:
        txt(s, x+Inches(2.95), Inches(4.0), Inches(0.25), Inches(0.5), "→",
            size=20, color=MUTED, bold=True, align=PP_ALIGN.CENTER)

# ---------- Slide 5: Demo flow ----------
s = slide(); title_bar(s, "Live Demo Flow", "60-SECOND CLICKABLE STORY")
steps = [
    "Landing → 'Start anonymously' (no signup)",
    "Mood slider + 3 questions → rule-based triage",
    "Low/medium → routed to Peer Support room",
    "Type a risk phrase → Crisis overlay auto-triggers",
    "Crisis page → one-tap Tele-MANAS / iCall / Vandrevala",
    "Privacy page → anonymous ID, zero faculty/parent view",
]
bullets(s, Inches(0.7), Inches(2.0), Inches(7.2), Inches(5.0),
        [(st, 0) for st in steps], size=18, gap=12)
rect(s, Inches(8.4), Inches(2.0), Inches(4.3), Inches(4.6), SAND)
txt(s, Inches(8.6), Inches(2.2), Inches(3.9), Inches(0.5), "Try it live:",
    size=16, color=TEAL_D, bold=True)
txt(s, Inches(8.6), Inches(2.8), Inches(3.9), Inches(3.6),
    "Open index.html → checkin.html\n\nThe triage engine (triage.js) is a pure function:\n\n"
    "score({mood, text, answers})\n  → severity: low | medium | high\n  → route: self | peer | crisis\n\n"
    "Same interface a real LLM slots into later.",
    size=13, color=INK)

# ---------- Slide 6: Architecture ----------
s = slide(); title_bar(s, "Architecture", "FROM DEMO TO PRODUCTION")
bullets(s, Inches(0.6), Inches(1.9), Inches(6.0), Inches(5.0), [
    ("Client: HTML/JS pages + global Crisis Overlay", 0),
    ("Anonymous session store — zero PII (opaque anon_id)", 0),
    ("4 services: Triage · Peer Match · Booking · Crisis", 0),
    ("Demo: rule-based triage + localStorage", 1),
    ("Prod: FastAPI + LLM (Gemini) behind score()", 1),
    ("Data: hashed logs, TTL auto-delete, encrypted", 0),
    ("Helpline registry: iCall / Vandrevala / Tele-MANAS", 0),
], size=15, gap=8)
# simple diagram box
rect(s, Inches(7.0), Inches(2.0), Inches(5.7), Inches(4.4), SAND)
txt(s, Inches(7.2), Inches(2.15), Inches(5.3), Inches(0.4), "Trust Funnel", size=16, color=TEAL_D, bold=True)
for i, l in enumerate(["Browser (anon)", "API / BFF", "Triage · Peer · Booking · Crisis", "Encrypted Data Layer"]):
    y = Inches(2.7 + i*0.95)
    rect(s, Inches(7.3), y, Inches(5.1), Inches(0.75), TEAL if i%2==0 else TEAL_D)
    txt(s, Inches(7.5), y, Inches(4.7), Inches(0.75), l, size=14, color=WHITE,
        anchor=MSO_ANCHOR.MIDDLE, bold=True)

# ---------- Slide 7: Privacy ----------
s = slide(); title_bar(s, "Privacy by Design", "JUDGES ASK — WE SHOW")
cards = [
    ("Anonymous ID", "No name/email/phone. Opaque anon_id only."),
    ("Blind booking", "Admin sees ID + slot. No faculty/parent view."),
    ("Local-first demo", "Check-in state stays on device."),
    ("Auto-purge", "Hashed logs, short TTL in production."),
    ("Consent-gated", "Identities revealed only by you."),
    ("Encrypted", "TLS + column-level encryption at rest."),
]
for i, (h, d) in enumerate(cards):
    col = i % 3; row = i // 3
    x = Inches(0.6 + col*4.1); y = Inches(2.0 + row*2.2)
    rect(s, x, y, Inches(3.85), Inches(1.95), SAND)
    txt(s, x+Inches(0.2), y+Inches(0.15), Inches(3.5), Inches(0.5), h, size=16, color=TEAL_D, bold=True)
    txt(s, x+Inches(0.2), y+Inches(0.7), Inches(3.5), Inches(1.1), d, size=13, color=INK)

# ---------- Slide 8: Scalability / Business ----------
s = slide(); title_bar(s, "Scalability & Business", "B2B2C MODEL")
bullets(s, Inches(0.6), Inches(1.9), Inches(6.1), Inches(5.0), [
    ("Sell to colleges as a subscription", 0),
    ("Cheaper than hiring 5 in-house counselors each", 1),
    ("Shared counselor pool across colleges", 0),
    ("One network serves many campuses → solves shortage", 1),
    ("Peer volunteers self-replenish each batch", 0),
    ("Near-free, compounding supply of listeners", 1),
    ("CSR / wellness-fund subsidies for low-income camps", 0),
], size=17, gap=10)
rect(s, Inches(7.0), Inches(2.0), Inches(5.7), Inches(4.4), TEAL)
txt(s, Inches(7.2), Inches(2.2), Inches(5.3), Inches(0.5), "Unit economics", size=18, color=WHITE, bold=True)
bullets(s, Inches(7.2), Inches(2.9), Inches(5.3), Inches(3.4), [
    ("College pays per-student/yr subscription", 0),
    ("Counselor cost amortized across N colleges", 0),
    ("Peer layer = ~0 marginal cost", 0),
    ("Retention via trust, not forced signup", 0),
], size=15, color=WHITE, gap=10)

# ---------- Slide 9: Credibility ----------
s = slide(); title_bar(s, "Why It's Credible", "FRAMEWORKS & TRUST ANCHORS")
bullets(s, Inches(0.6), Inches(2.0), Inches(11.5), Inches(4.8), [
    ("Peer Listener certification aligned with NIMHANS & iCall training frameworks", 0),
    ("Crisis routing uses verified national helplines: Tele-MANAS 14416, iCall (TISS), Vandrevala", 0),
    ("Anonymous-first mirrors global best practice (7 Cups, Crisis Text Line) adapted for India", 0),
    ("Resource library in Hindi + English — targets worse stigma in vernacular/non-metro contexts", 0),
    ("Safety built-in: high-risk language auto-escalates, never routes around crisis", 0),
], size=18, gap=14)

# ---------- Slide 10: Ask / Team ----------
s = slide(); bg(s, TEAL)
txt(s, Inches(0.8), Inches(0.8), Inches(11.7), Inches(0.8), "The Ask", size=34, color=WHITE, bold=True)
bullets(s, Inches(0.8), Inches(1.9), Inches(11.5), Inches(2.6), [
    ("Pilot with 3 colleges next semester — measure check-in → counselor conversion", 0),
    ("Partnership intro to a telehealth/counselor network for the shared pool", 0),
    ("Mentorship on campus wellness-fund / CSR funding path", 0),
], size=18, color=WHITE, gap=12)
rect(s, Inches(0.8), Inches(4.8), Inches(11.7), Inches(1.6), TEAL_D)
txt(s, Inches(1.0), Inches(4.95), Inches(11.3), Inches(1.3),
    "MANNMITRA — मन मित्र. A friend for your mind.\n"
    "Light first step. Real trust. No dead ends.",
    size=20, color=WHITE, bold=True, anchor=MSO_ANCHOR.MIDDLE)
txt(s, Inches(0.8), Inches(6.7), Inches(11.7), Inches(0.5),
    "Demo: mannmitra/index.html   ·   In crisis: 14416 (Tele-MANAS)", size=14, color=SAND)

prs.save(r"C:\Users\Rudra\Desktop\mannmitra\pitch\MANNMITRA.pptx")
print("Saved MANNMITRA.pptx with", len(prs.slides.__iter__.__self__._sldIdLst), "slides")
