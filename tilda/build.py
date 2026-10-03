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

fonts = re.search(r'<link href="https://fonts.googleapis.com[^>]+>', html).group(0)

images_js = """/* =========================================================
   RASMLAR — Tilda'ga yuklagan rasmlaringiz havolasini shu yerga qoʻying
   ========================================================= */
const IMAGES = {
  kitob: 'BU_YERGA_KITOB_RASMI_HAVOLASI',
  muallif: 'BU_YERGA_MUALLIF_RASMI_HAVOLASI',
};
document.querySelectorAll('[data-img]').forEach((img) => {
  const url = IMAGES[img.dataset.img];
  if (url && !url.startsWith('BU_YERGA')) img.src = url;
});
"""

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
