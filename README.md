# KODEKS — Biznes Javon

"Biznesni tizimlashtirish uchun KODEKS" qo'llanmasining sotuv sahifasi (landing).

## Tuzilishi
- `index.html` — sahifa
- `assets/css/style.css` — dizayn (ranglar `:root` ichida)
- `assets/js/main.js` — animatsiyalar, forma va **sozlamalar**
- `assets/img/` — kitob rasmlari

## Ishga tushirishdan oldin
`assets/js/main.js` faylining boshidagi `CONFIG` ni to'ldiring:
- `price` — kitob narxi (bo'sh bo'lsa narx ko'rsatilmaydi)
- `telegram` — admin Telegrami (hozir `https://t.me/insansupport`)
- `paymentMethods` — Paynet, Payme, Click, Beepul havolalari (to'lov qadamidagi 4 ta kartochka)
- `orderEndpoint` — Google Apps Script veb-ilova URL'i (`apps-script/README.md`). Bo'sh bo'lsa, ma'lumotlar yuborilmaydi va chekni Telegram orqali yuborish so'raladi.

## Buyurtma jarayoni
"Buyurtma berish" tugmasi oyna ochadi: 1) ism, telefon, manzil, xodimlar soni, faoliyat;
2) to'lov havolasi va admin bilan bog'lanish; 3) chekni yuklash; 4) tabrik xabari.

Sahifani ko'rish uchun `index.html` ni brauzerda oching.

## Tilda'ga joylash
Tilda'ning **HTML-kod (T123)** blokiga `tilda/TILDA-KOD.txt` ichidagi 4 qator qo'yiladi.
Asosiy fayllar (`tilda/dist/kodeks.css`, `tilda/dist/kodeks.js`) jsDelivr orqali shu repozitoriyadan yuklanadi.
Saytni o'zgartirgandan keyin: `python3 tilda/build.py`, commit qiling va `TILDA-KOD.txt` dagi commit kodini yangilang.
