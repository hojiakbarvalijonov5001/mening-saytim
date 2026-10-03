# Sherikchilik qoʻllanmasi — sayt

Bobur Musaboyevning «Sherikchilik kitobi + shartnoma tuzish boʻyicha tayyor qoʻllanma» uchun bir sahifali sotuv sayti.

## Tuzilma

- `index.html` — sahifa
- `assets/css/style.css` — dizayn (qora fon, yashil urgʻu, telefon uchun moslashgan)
- `assets/js/main.js` — taymer, popup, telefon maskasi, forma
- `assets/img/` — kitob va muallif rasmlari

## Sozlamalar (`assets/js/main.js` boshida)

- `deadline` — aksiya tugash sanasi (taymer va matndagi sana shundan olinadi)
- `formEndpoint` — forma maʼlumotlari yuboriladigan manzil (masalan, Google Apps Script). Boʻsh boʻlsa, foydalanuvchi Telegram administratoriga yoʻnaltiriladi.
- `telegramAdmin` — administrator Telegram havolasi

`#popup:sherikchilik` yoki `#buyurtma` havolasi bilan ochilsa, buyurtma oynasi avtomatik chiqadi.

## Ishga tushirish

Statik sayt — istalgan hostingga (GitHub Pages, Netlify, Vercel) fayllarni yuklash kifoya.
Lokal koʻrish: `python3 -m http.server` va `http://localhost:8000`.

## Tilda

`python3 tilda/build.py` quyidagilarni yaratadi:

- `tilda/bloklar/1-blok.txt … N-blok.txt` — Tilda T123 bloki hajmi cheklangani uchun kod bir nechta kichik bloklarga boʻlingan. Har birini alohida T123 blokiga **tartib bilan** qoʻying (avval CSS, keyin bo'limlar, oxirida skript).
- `tilda/tilda-blok.html` — hammasi bitta faylda (sinov uchun).

Rasm havolalari `tilda/build.py` dagi `TILDA_IMAGES` da.
