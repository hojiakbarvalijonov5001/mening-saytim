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

## To'lov sahifasi

`tolov.html` — ro'yxatdan o'tgandan keyin ochiladi (ism va telefon avtomatik to'ldiriladi). 4 qadam, to'lov usullari, chek yuklash va adminga yozish.

- To'lov havolalari va logotiplari: `assets/js/config.js` → `paymentMethods`.
- Arizalar va cheklar Telegram/Google Sheets'ga borishi uchun: `apps-script/README.md` bo'yicha skriptni joylab, URL'ni `config.js` dagi `formEndpoint` ga qo'ying.
- Tilda: `tilda/tolov-bloklar/` dagi bloklarni alohida sahifaga qo'ying, sahifa manzili `/sherikchiliktolov` bo'lsin.
