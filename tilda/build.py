"""Tilda uchun bitta HTML kod yig'uvchi skript.

Ishga tushirish: python3 tilda/build.py
Natija: tilda/dist/kodeks.css va tilda/dist/kodeks.js. Ular jsDelivr orqali GitHub'dan
yuklanadi, Tilda'ning "HTML-kod" (T123) blokiga esa faqat qisqa ulash kodi qo'yiladi
(tilda/TILDA-KOD.txt). CSS selektorlari #kodeks bilan cheklanadi.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCOPE = "#kodeks"


HTML_CLASSES = (".modal-open", ".in-app", ".no-js")


def prefix_selector(sel):
    sel = sel.strip()
    for cls in HTML_CLASSES:
        # <html> ga qo'yiladigan klasslar: "#kodeks" undan keyin keladi
        if sel.startswith(cls):
            rest = sel[len(cls):]
            return sel if not rest.strip() else f"{cls} {SCOPE}{rest}"
    if not sel or sel.startswith(":root") or sel.startswith("html"):
        return sel
    if sel.startswith("body"):
        return SCOPE + sel[4:]
    if sel.startswith("*"):
        return f"{SCOPE} {sel}"
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


CDN = "https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@{ref}/"
# Rasmlar joylashgan commit (rasmlar o'zgarsa, shu yerni yangi commit bilan yangilang)
IMG_REF = "0955b404826a75e37c0176df166b0bc02f9b0d20"

html = (ROOT / "index.html").read_text()
css = (ROOT / "assets/css/style.css").read_text()
js = (ROOT / "assets/js/main.js").read_text()

body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
body = body.replace('<script src="assets/js/main.js"></script>', "").strip()
body = body.replace('src="assets/img/', 'src="' + CDN.format(ref=IMG_REF) + "assets/img/")

scoped = scope_css(css) + f"""
{SCOPE} {{ position: relative; overflow-x: hidden; }}
{SCOPE} :where(h1, h2, h3, h4, p, ul, ol, li, a, span, b, small, label, figure, figcaption, summary) {{ color: inherit; font-family: inherit; }}
"""

bundle = (
    "/* KODEKS — Tilda uchun yig'ilgan fayl. Qo'lda o'zgartirmang: python3 tilda/build.py */\n"
    "(function () {\n"
    "var root = document.getElementById('kodeks');\n"
    "if (!root) return;\n"
    f"root.innerHTML = {json.dumps(body, ensure_ascii=False)};\n"
    f"{js}\n"
    "})();\n"
)

dist = ROOT / "tilda/dist"
dist.mkdir(exist_ok=True)
(dist / "kodeks.css").write_text(scoped)
(dist / "kodeks.js").write_text(bundle)
old = ROOT / "tilda/kodeks-tilda.html"
if old.exists():
    old.unlink()
print("kodeks.css", f"{len(scoped) / 1024:.0f} KB", "| kodeks.js", f"{len(bundle) / 1024:.0f} KB")
