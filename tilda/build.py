"""Saytni Tilda'ning T123 («HTML-код») bloki uchun bitta faylga yigʻadi.

Ishlatish:  python3 tilda/build.py
Natija:     tilda/tilda-blok.html
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "assets/css/style.css").read_text(encoding="utf-8")
js = (ROOT / "assets/js/main.js").read_text(encoding="utf-8")

# <body> ichidagi kontent (skript tegisiz)
body = re.search(r"<body>(.*?)<script src=", html, re.S).group(1).strip()

# Rasmlar: manzili bitta joydan (IMAGES) qoʻyiladi
placeholder = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
for name, file in (("kitob", "kitob.webp"), ("muallif", "muallif.jpg")):
    body = body.replace(f'src="assets/img/{file}"', f'src="{placeholder}" data-img="{name}"')
assert "assets/img/" not in body, "yoʻli almashtirilmagan rasm qoldi"

# Tilda'ga yuklangan rasmlar. Retina ekranlarda tiniq chiqishi uchun 2x oʻlchamda.
TILDA_IMAGES = {
    "kitob": "https://optim.tildacdn.net/tild3763-3131-4039-a332-646662653965/-/resize/800x/-/format/webp/sherkchilik_new.png.webp",
    "muallif": "https://optim.tildacdn.net/tild3461-3937-4762-b539-643962353530/-/resize/880x/-/format/webp/DSC00007.JPG.webp",
}

fonts = re.search(r'<link href="https://fonts.googleapis.com[^>]+>', html).group(0)

images_js = """/* =========================================================
   RASMLAR — Tilda'ga yuklangan rasmlar havolasi (tilda/build.py dagi TILDA_IMAGES)
   ========================================================= */
const IMAGES = {
  kitob: '%(kitob)s',
  muallif: '%(muallif)s',
};
document.querySelectorAll('[data-img]').forEach((img) => {
  const url = IMAGES[img.dataset.img];
  if (url) img.src = url;
});
""" % TILDA_IMAGES

# Ixchamlashtirish: Tilda muharririga qoʻyish oson boʻlsin
css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
css = re.sub(r"\s+", " ", css)
css = re.sub(r"\s*([{};,>])\s*", r"\1", css).replace(";}", "}").strip()
body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
body = re.sub(r">\s+<", "> <", body)
body = re.sub(r"\n\s*", "\n", body)

out = f"""<!-- Sherikchilik qoʻllanmasi — Tilda T123 bloki uchun. tilda/build.py orqali yaratilgan -->
{fonts}
<style>
{css}
</style>

{body}

<script>
{images_js}
{js}
</script>
"""

dest = ROOT / "tilda/tilda-blok.html"
dest.write_text(out, encoding="utf-8")
print(f"{dest.relative_to(ROOT)}: {len(out.encode()) // 1024} KB")

# ---------------------------------------------------------------
# Tilda T123 bloki hajmi cheklangan — kodni bir nechta kichik bloklarga boʻlamiz.
# Har bir blok oʻz-oʻzidan toʻgʻri HTML (teglar yopilgan).
# ---------------------------------------------------------------
LIMIT = 11000  # bitta blokdagi belgilar soni (xavfsiz chegara)


def split_css(text, limit):
    """CSS ni faqat yuqori darajadagi qoidalar orasidan boʻladi."""
    parts, start, depth, last_cut = [], 0, 0, 0
    for i, ch in enumerate(text):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                if i + 1 - start > limit and last_cut > start:
                    parts.append(text[start:last_cut])
                    start = last_cut
                last_cut = i + 1
    parts.append(text[start:])
    return [p for p in parts if p.strip()]


def split_html(text, limit):
    """HTML ni yuqori darajadagi bloklar (header/section/footer/div) orasidan boʻladi."""
    cuts = [m.start() for m in re.finditer(r'<(?:header|section|footer)\b|<div class="(?:sticky-cta|modal)"', text)]
    cuts = [c for c in cuts if c > 0] + [len(text)]
    parts, start, prev = [], 0, 0
    for c in cuts:
        if c - start > limit and prev > start:
            parts.append(text[start:prev])
            start = prev
        prev = c
    parts.append(text[start:])
    return [p.strip() for p in parts if p.strip()]


# Tilda muharriri JS ichidagi "<" ni HTML teg deb oʻylab, kodni shu joyda kesib qoʻyadi
assert not re.search(r"<(?![a-zA-Z/!])", js), "main.js da '<' bor — uni '>' bilan almashtiring (a < b  ->  b > a)"

js_min = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
js_min = "\n".join(l.strip() for l in js_min.splitlines() if l.strip() and not l.strip().startswith("//"))
body_split = body.replace("<main>", "").replace("</main>", "")

blocks = [f"<style>{c}</style>" for c in split_css(css, LIMIT)]
blocks += split_html(body_split, LIMIT)
blocks.append(f"{fonts}\n<script>\n{images_js}\n{js_min}\n</script>")

out_dir = ROOT / "tilda/bloklar"
out_dir.mkdir(exist_ok=True)
for old in out_dir.glob("*.txt"):
    old.unlink()
for n, b in enumerate(blocks, 1):
    (out_dir / f"{n}-blok.txt").write_text(b + "\n", encoding="utf-8")
    print(f"  bloklar/{n}-blok.txt: {len(b)} belgi")
