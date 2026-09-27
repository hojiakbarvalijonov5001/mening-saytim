"""Tilda uchun bitta HTML kod yig'uvchi skript.

Ishga tushirish: python3 tilda/build.py
Natija: tilda/kodeks-tilda.html — Tilda'dagi "HTML-kod" (T123) blokiga to'liq qo'yiladi.
CSS selektorlari #kodeks bilan cheklanadi (Tilda uslublari bilan to'qnashmasligi uchun),
rasmlar data: URI ko'rinishida kodning ichiga joylanadi.
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCOPE = "#kodeks"


def prefix_selector(sel):
    sel = sel.strip()
    if not sel or sel.startswith(":root") or sel.startswith("html"):
        return sel
    if sel.startswith("body"):
        return SCOPE + sel[4:]
    if sel.startswith("*"):
        return f"{SCOPE} {sel}"
    if sel.startswith(".no-js"):
        return sel
    return f"{SCOPE} {sel}"


def scope_css(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out, i = [], 0
    while i < len(css):
        brace = css.find("{", i)
        if brace == -1:
            out.append(css[i:])
            break
        head = css[i:brace].strip()
        # blok oxirini topish
        depth, j = 1, brace + 1
        while depth:
            if css[j] == "{":
                depth += 1
            elif css[j] == "}":
                depth -= 1
            j += 1
        body = css[brace + 1 : j - 1]
        if head.startswith("@media") or head.startswith("@supports"):
            out.append(f"{head}{{{scope_css(body)}}}")
        elif head.startswith("@"):
            out.append(f"{head}{{{body}}}")
        else:
            sels = ",".join(prefix_selector(s) for s in head.split(","))
            out.append(f"{sels}{{{body}}}")
        i = j
    return "\n".join(out)


def data_uri(path):
    mime = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg"}[path.suffix[1:]]
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


html = (ROOT / "index.html").read_text()
css = (ROOT / "assets/css/style.css").read_text()
js = (ROOT / "assets/js/main.js").read_text()

body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
body = body.replace('<script src="assets/js/main.js"></script>', "")

# Rasmlar: har biri kodda faqat bir marta saqlanadi, JS orqali joylanadi
images = {}
def swap(m):
    rel = m.group(1)
    key = pathlib.Path(rel).stem
    images[key] = data_uri(ROOT / rel)
    return f'src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" data-kimg="{key}"'
body = re.sub(r'src="(assets/img/[^"]+)"', swap, body)

img_js = "const KODEKS_IMAGES = {\n" + ",\n".join(f'  "{k}": "{v}"' for k, v in images.items()) + "\n};\n" \
    "document.querySelectorAll('#kodeks [data-kimg]').forEach((img) => { img.src = KODEKS_IMAGES[img.dataset.kimg]; });\n"

fonts = '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">'

out = f"""<!-- KODEKS sotuv sahifasi — Tilda "HTML-kod" (T123) bloki uchun. Qayta yig'ish: python3 tilda/build.py -->
{fonts}
<style>
{scope_css(css)}
{SCOPE} {{ position: relative; overflow-x: hidden; }}
{SCOPE} :where(h1, h2, h3, h4, p, ul, ol, li, a, span, b, small, label, figure, figcaption, summary) {{ color: inherit; font-family: inherit; }}
</style>
<div id="kodeks">
{body}
</div>
<script>
(function () {{
{img_js}
{js}
}})();
</script>
"""
dest = ROOT / "tilda/kodeks-tilda.html"
dest.write_text(out)
print(dest, f"{len(out) / 1024:.0f} KB")
