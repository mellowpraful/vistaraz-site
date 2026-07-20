#!/usr/bin/env python3
"""Generate MANNMITRA PWA icons (PNG) from the brand droplet logo."""
from PIL import Image, ImageDraw
import math

TEAL = (15, 155, 134)
TEAL_D = (11, 125, 108)
WHITE = (255, 255, 255)
BG = (253, 248, 241)

def rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)

def draw_logo(draw, cx, cy, scale, fill):
    """Draw the brand droplet: a teal rounded 'leaf/drop' with two white eyes + smile."""
    # droplet body (teal) — a circle-ish drop
    r = int(34 * scale)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)
    # white eyes
    eye = int(5 * scale)
    draw.ellipse([cx - int(12*scale) - eye, cy - int(6*scale) - eye,
                  cx - int(12*scale) + eye, cy - int(6*scale) + eye], fill=WHITE)
    draw.ellipse([cx + int(12*scale) - eye, cy - int(6*scale) - eye,
                  cx + int(12*scale) + eye, cy - int(6*scale) + eye], fill=WHITE)
    # smile (white arc)
    draw.arc([cx - int(12*scale), cy + int(2*scale),
              cx + int(12*scale), cy + int(20*scale)],
             start=20, end=160, fill=WHITE, width=max(2, int(4*scale)))

def make_icon(size, maskable=False):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        # full-bleed background, content in safe zone (center 80%)
        d.rectangle([0, 0, size, size], fill=TEAL)
        s = size * 0.62
        cx = cy = size // 2
    else:
        # rounded-square teal tile with margin
        m = int(size * 0.10)
        rounded_rect(d, [m, m, size - m, size - m], radius=int(size*0.22), fill=TEAL)
        s = size * 0.5
        cx = cy = size // 2
    draw_logo(d, cx, cy, s / 68.0, TEAL_D if maskable else TEAL_D)
    # redraw body slightly lighter over to keep droplet visible on maskable teal bg
    return img

for name, size, mask in [("icon-192.png", 192, False),
                         ("icon-512.png", 512, False),
                         ("icon-maskable-512.png", 512, True),
                         ("apple-touch-icon.png", 180, False),
                         ("favicon.png", 64, False)]:
    img = make_icon(size, mask)
    img.save(f"assets/img/{name}")
    print("wrote", name)

# SVG icon (for any-size / fallback)
svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="26" fill="#0f9b86"/>
<circle cx="60" cy="60" r="34" fill="#0b7d6c"/>
<circle cx="48" cy="54" r="5" fill="#fff"/><circle cx="72" cy="54" r="5" fill="#fff"/>
<path d="M48 70c4 5 20 5 24 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>'''
with open("assets/img/icon.svg", "w", encoding="utf-8") as f:
    f.write(svg)
print("wrote icon.svg")
