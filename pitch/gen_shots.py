"""Generate branded mock product screenshots (phone-framed previews) for the pitch deck."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), "shots")
os.makedirs(OUT, exist_ok=True)

W, H = 380, 760
RADIUS = 36

# Palette
INDIGO = (79, 70, 229)
PINK = (236, 72, 153)
VIOLET = (139, 92, 246)
INK = (30, 27, 75)
MUTED = (100, 100, 130)
CARD = (255, 255, 255)
SOFT = (238, 242, 255)
BG_TOP = (245, 246, 255)
BG_BOT = (255, 240, 249)
WHITE = (255, 255, 255)
GREEN = (16, 185, 129)
RED = (239, 68, 68)
AMBER = (245, 158, 11)


def font(size, bold=False):
    paths = [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def round_rect(d, box, r, fill):
    d.rounded_rectangle(box, radius=r, fill=fill)


def linear_bg(w, h, top, bot):
    base = Image.new("RGB", (w, h), top)
    d = ImageDraw.Draw(base)
    for y in range(h):
        t = y / h
        c = tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3))
        d.line([(0, y), (w, y)], fill=c)
    return base


def phone(screen):
    """Wrap a screen image in a phone frame."""
    pad = 26
    fw, fh = W + pad * 2, H + pad * 2
    frame = Image.new("RGB", (fw, fh), (20, 20, 30))
    d = ImageDraw.Draw(frame)
    d.rounded_rectangle([0, 0, fw - 1, fh - 1], radius=RADIUS + 8, fill=(28, 28, 40))
    frame.paste(screen, (pad, pad))
    # notch
    d.rounded_rectangle([fw // 2 - 40, pad - 2, fw // 2 + 40, pad + 14], radius=8, fill=(28, 28, 40))
    return frame


def header(d, title, sub=None):
    d.text((22, 26), "MANNMITRA", font=font(20, True), fill=WHITE)
    d.rounded_rectangle([W - 70, 22, W - 22, 46], radius=12, fill=(255, 255, 255, 60))
    d.text((W - 60, 27), "🙂", font=font(16), fill=WHITE)
    d.text((22, 64), title, font=font(26, True), fill=WHITE)
    if sub:
        d.text((22, 98), sub, font=font(14), fill=(235, 235, 255))


def card(d, y, h, fill=CARD, title=None, lines=None, accent=None):
    round_rect(d, [18, y, W - 18, y + h], 18, fill)
    if accent:
        d.rounded_rectangle([18, y, 34, y + h], radius=18, fill=accent)
    if title:
        d.text((title[1], y + 14), title[0], font=font(16, True), fill=INK)
    if lines:
        yy = y + (40 if title else 16)
        for ln in lines:
            d.text((44 if accent else 36, yy), ln, font=font(13), fill=MUTED)
            yy += 20


def button(d, y, label, fill=INDIGO, tcolor=WHITE):
    round_rect(d, [18, y, W - 18, y + 46], 23, fill)
    d.text((W // 2 - len(label) * 7, y + 14), label, font=font(16, True), fill=tcolor)


def make_home():
    img = linear_bg(W, H, BG_TOP, BG_BOT)
    d = ImageDraw.Draw(img)
    # hero blob
    d.ellipse([-40, 120, 200, 320], fill=(INDIGO[0], INDIGO[1], INDIGO[2], 40))
    d.ellipse([220, 60, 440, 280], fill=(PINK[0], PINK[1], PINK[2], 40))
    header(d, "")
    d.text((22, 70), "MANNMITRA", font=font(30, True), fill=INDIGO)
    d.text((22, 110), "मन मित्र · your mind's friend", font=font(15), fill=MUTED)
    d.text((22, 150), "Mental health support", font=font(22, True), fill=INK)
    d.text((22, 180), "that meets you where you are.", font=font(22, True), fill=INK)
    # quick cards
    card(d, 220, 92, accent=INDIGO, title=("Quick Anonymous Check-in", 60),
         lines=["60-sec mood + worry check", "No sign-up · No PII"])
    card(d, 324, 92, accent=PINK, title=("Talk to a Peer", 60),
         lines=["Trained student listeners", "24×7, judgment-free"])
    card(d, 428, 92, accent=VIOLET, title=("Crisis? Tap SOS", 60),
         lines=["Reach Tele-MANAS 14416", "Hold the button to call"])
    button(d, 540, "Start check-in", INDIGO)
    button(d, 596, "I need help now", RED)
    d.text((22, 660), "EN  हि  मर  ગુ", font=font(14, True), fill=MUTED)
    return phone(img)


def make_checkin():
    img = linear_bg(W, H, BG_TOP, BG_BOT)
    d = ImageDraw.Draw(img)
    header(d, "Check-in", "anonymous · 60 seconds")
    d.text((22, 120), "How are you feeling?", font=font(18, True), fill=INK)
    moods = ["😞", "😟", "😐", "🙂", "😄"]
    x = 24
    for m in moods:
        d.rounded_rectangle([x, 150, x + 56, 206], radius=16, fill=WHITE)
        d.text((x + 16, 162), m, font=font(24), fill=INK)
        x += 64
    d.text((22, 240), "What's on your mind?", font=font(18, True), fill=INK)
    round_rect(d, [22, 270, W - 22, 360], 14, WHITE)
    d.text((34, 282), "stress about exams…", font=font(13), fill=MUTED)
    d.text((22, 390), "Triage result", font=font(18, True), fill=INK)
    card(d, 420, 70, accent=AMBER, title=("Mild stress detected", 60),
         lines=["We'll suggest a peer chat"])
    button(d, 510, "See my path", INDIGO)
    button(d, 566, "Talk to someone", PINK)
    return phone(img)


def make_dashboard():
    img = linear_bg(W, H, BG_TOP, BG_BOT)
    d = ImageDraw.Draw(img)
    header(d, "Dashboard", "your private space")
    # streak
    round_rect(d, [18, 120, W - 18, 188], 18, INDIGO)
    d.text((40, 138), "🔥 5-day streak", font=font(18, True), fill=WHITE)
    d.text((40, 166), "You've checked in 14 times", font=font(13), fill=(235, 235, 255))
    card(d, 204, 96, title=("Mood this week", 36),
         lines=["Mostly steady ↗", "Better after breathing"])
    card(d, 312, 96, title=("Badges", 36),
         lines=["🌱 First Step   🤝 Open Up", "🧘 Calm 5"])
    card(d, 420, 96, title=("Quick tools", 36),
         lines=["Breathing · CBT · Journal", "Community · Resources"])
    button(d, 530, "Open journal", VIOLET)
    button(d, 586, "My data & privacy", MUTED)
    return phone(img)


def make_peer():
    img = linear_bg(W, H, BG_TOP, BG_BOT)
    d = ImageDraw.Draw(img)
    header(d, "Peer Connect", "trained listeners")
    card(d, 120, 84, accent=PINK, title=("Aarav · Peer", 60),
         lines=["Online now · Hindi/English", "⭐ 4.9 · 120 sessions"])
    card(d, 216, 84, accent=VIOLET, title=("Sara · Peer", 60),
         lines=["Online · Marathi/English", "⭐ 4.8 · 90 sessions"])
    d.text((22, 320), "What to expect", font=font(18, True), fill=INK)
    card(d, 348, 110, lines=["● Anonymous nicknames", "● No phone / email needed",
                              "● Escalates to counselor if needed"])
    button(d, 476, "Start chat with Aarav", INDIGO)
    button(d, 532, "Request a counselor", VIOLET)
    d.text((22, 610), "All chats are end-to-end local", font=font(12), fill=MUTED)
    return phone(img)


def make_crisis():
    img = linear_bg(W, H, (255, 235, 238), (255, 245, 238))
    d = ImageDraw.Draw(img)
    d.ellipse([-30, 100, 220, 300], fill=(RED[0], RED[1], RED[2], 40))
    header(d, "You're not alone", "crisis support")
    round_rect(d, [18, 130, W - 18, 250], 18, RED)
    d.text((40, 160), "🆘 SOS", font=font(24, True), fill=WHITE)
    d.text((40, 200), "Hold to call Tele-MANAS", font=font(16, True), fill=WHITE)
    d.text((40, 226), "14416 · free, 24×7", font=font(13), fill=(255, 230, 230))
    card(d, 266, 70, accent=RED, title=("Call 14416 now", 60), lines=["Tap to dial on mobile"])
    card(d, 346, 70, accent=AMBER, title=("Text / chat support", 60), lines=["Find a local helpline"])
    card(d, 426, 70, accent=VIOLET, title=("Calm me down", 60), lines=["Guided breathing"])
    button(d, 516, "I'm safe now", GREEN)
    return phone(img)


def make_admin():
    img = linear_bg(W, H, BG_TOP, BG_BOT)
    d = ImageDraw.Draw(img)
    header(d, "Campus Admin", "anonymous insights")
    round_rect(d, [18, 120, W - 18, 188], 18, INDIGO)
    d.text((40, 138), "📊 1,240 students reached", font=font(16, True), fill=WHITE)
    d.text((40, 166), "Zero PII · aggregate only", font=font(13), fill=(235, 235, 255))
    card(d, 204, 96, title=("Sentiment trend", 36),
         lines=["Stress ↓ 12% this month", "Peaks around exams"])
    card(d, 312, 96, title=("Routing", 36),
         lines=["62% peer · 28% counselor", "10% crisis escalations"])
    card(d, 420, 96, title=("Impact", 36),
         lines=["Avg. first response < 2 min", "CSAT 4.7 / 5"])
    button(d, 530, "Export report", VIOLET)
    return phone(img)


SHOTS = {
    "home.png": ("Home", make_home),
    "checkin.png": ("Check-in", make_checkin),
    "dashboard.png": ("Dashboard", make_dashboard),
    "peer.png": ("Peer Connect", make_peer),
    "crisis.png": ("Crisis / SOS", make_crisis),
    "admin.png": ("Campus Admin", make_admin),
}


def composite():
    cols, rows = 6, 1
    cell_w, cell_h = 360, 812
    pad_x, pad_y = 24, 24
    gap = 18
    label_h = 34
    Wc = cols * cell_w + (cols - 1) * gap + pad_x * 2
    Hc = rows * cell_h + (rows - 1) * gap + pad_y * 2 + label_h + 6
    canvas = Image.new("RGB", (Wc, Hc), WHITE)
    d = ImageDraw.Draw(canvas)
    order = [("home.png", "Home"), ("checkin.png", "Check-in"), ("dashboard.png", "Dashboard"),
             ("peer.png", "Peer Connect"), ("crisis.png", "Crisis / SOS"), ("admin.png", "Campus Admin")]
    imgs = {}
    for name, _, in [(n, None) for n, _ in order]:
        imgs[name] = Image.open(os.path.join(OUT, name))
    for idx, (name, label) in enumerate(order):
        r, c = divmod(idx, cols)
        x = pad_x + c * (cell_w + gap)
        y = pad_y + r * (cell_h + gap)
        im = imgs[name].resize((cell_w, cell_h), Image.LANCZOS)
        canvas.paste(im, (x, y))
        d.text((x + cell_w // 2 - len(label) * 5, y + cell_h + 6), label, font=font(18, True), fill=INK)
    canvas.save(os.path.join(OUT, "preview.png"))
    print("saved preview.png", canvas.size)


if __name__ == "__main__":
    for name, (label, fn) in SHOTS.items():
        im = fn()
        im.save(os.path.join(OUT, name))
        print("saved", name, im.size)
    composite()
