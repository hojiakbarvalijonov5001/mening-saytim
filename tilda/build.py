"""Saytni Tilda'ning T123 («HTML-код») bloklari uchun yigʻadi.

Ishlatish:  python3 tilda/build.py
Natija:
    tilda/bloklar/N-blok.txt        — asosiy sahifa (index.html)
    tilda/tolov-bloklar/N-blok.txt  — toʻlov sahifasi (tolov.html)
    tilda/tilda-blok.html, tilda/tolov-blok.html — har bir sahifa bitta faylda (sinov uchun)
"""
import base64
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Tilda'ga yuklangan rasmlar. Retina ekranlarda tiniq chiqishi uchun 2x oʻlchamda.
TILDA_IMAGES = {
    "kitob": "https://optim.tildacdn.net/tild3763-3131-4039-a332-646662653965/-/resize/800x/-/format/webp/sherkchilik_new.png.webp",
    "muallif": "https://optim.tildacdn.net/tild6537-6562-4661-b030-363466623236/-/resize/880x/-/format/webp/muallif.jpg.webp",
}
LOCAL_IMAGES = {"kitob": "kitob.webp", "muallif": "muallif.jpg"}

# Tilda'dagi toʻlov sahifasining manzili (Tilda: Настройки страницы → Адрес страницы)
TILDA_PAYMENT_PAGE = "/sherikchiliktolov"

LIMIT = 11000  # bitta T123 blokidagi belgilar soni (xavfsiz chegara)

PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def minify_css(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    return re.sub(r"\s*([{};,>])\s*", r"\1", css).replace(";}", "}").strip()


def minify_js(js):
    js = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
    return "\n".join(l.strip() for l in js.splitlines() if l.strip() and not l.strip().startswith("//"))


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


def build(page, css_files, js_files, single_out, blocks_dir):
    html = read(page)
    css = minify_css("\n".join(read(f) for f in css_files))
    # Kichik rasmlarni (to'lov ikonkalari) CSS ichiga joylaymiz — Tilda'ga alohida yuklash shart emas
    css = re.sub(r"url\(\.\./img/([^)]+)\)", lambda m: "url(data:image/webp;base64,%s)" % base64.b64encode(
        (ROOT / "assets/img" / m.group(1)).read_bytes()).decode(), css)
    js = "\n".join(read(f) for f in js_files)

    # Tilda muharriri JS ichidagi "<" ni HTML teg deb oʻylab, kodni shu joyda kesib qoʻyadi
    bad = re.search(r"<(?![a-zA-Z/!])", js)
    assert not bad, f"JS da '<' bor ({js[bad.start() - 40:bad.start() + 20]!r}) — uni '>' bilan almashtiring"

    js = js.replace("paymentPage: 'tolov.html'", f"paymentPage: '{TILDA_PAYMENT_PAGE}'")
    fonts = re.search(r'<link href="https://fonts.googleapis.com[^>]+>', html).group(0)

    body = re.search(r"<body>(.*?)<script src=", html, re.S).group(1).strip()
    for name, file in LOCAL_IMAGES.items():
        body = body.replace(f'src="assets/img/{file}"', f'src="{PLACEHOLDER}" data-img="{name}"')
    assert "assets/img/" not in body, "yoʻli almashtirilmagan rasm qoldi"
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    body = re.sub(r">\s+<", "> <", body)
    body = re.sub(r"\n\s*", "\n", body)

    images_js = (
        "const IMAGES = %s;\n"
        "document.querySelectorAll('[data-img]').forEach((img) => {\n"
        "  const url = IMAGES[img.dataset.img];\n"
        "  if (url) img.src = url;\n"
        "});\n" % ("{" + ", ".join(f"{k}: '{v}'" for k, v in TILDA_IMAGES.items()) + "}")
    )
    script = f"<script>\n{images_js}\n{minify_js(js)}\n</script>"

    single = f"{fonts}\n<style>{css}</style>\n{body}\n{script}\n"
    (ROOT / single_out).write_text(single, encoding="utf-8")
    print(f"{single_out}: {len(single.encode()) // 1024} KB")

    blocks = [f"<style>{c}</style>" for c in split_css(css, LIMIT)]
    blocks += split_html(body.replace("<main>", "").replace("</main>", ""), LIMIT)
    blocks.append(f"{fonts}\n{script}")

    out_dir = ROOT / blocks_dir
    out_dir.mkdir(exist_ok=True)
    for old in out_dir.glob("*.txt"):
        old.unlink()
    for n, b in enumerate(blocks, 1):
        (out_dir / f"{n}-blok.txt").write_text(b + "\n", encoding="utf-8")
        print(f"  {blocks_dir}/{n}-blok.txt: {len(b)} belgi")


build("index.html", ["assets/css/style.css"], ["assets/js/config.js", "assets/js/main.js"],
      "tilda/tilda-blok.html", "tilda/bloklar")
build("tolov.html", ["assets/css/tolov.css"], ["assets/js/config.js", "assets/js/tolov.js"],
      "tilda/tolov-blok.html", "tilda/tolov-bloklar")
