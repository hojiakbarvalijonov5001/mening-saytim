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
- `telegram` — administrator Telegram havolasi
- `paymentUrl` — to'lov havolasi (buyurtma oynasining 2-bosqichida "To'lov qilish" tugmasi)
- `orderEndpoint` — buyurtma va chek yuboriladigan manzil. Bo'sh bo'lsa, ma'lumotlar hech qayerga yuborilmaydi.

## Buyurtma jarayoni
"Buyurtma berish" tugmasi oyna ochadi: 1) ism, telefon, manzil, xodimlar soni, faoliyat;
2) to'lov havolasi va admin bilan bog'lanish; 3) chekni yuklash; 4) tabrik xabari.

Sahifani ko'rish uchun `index.html` ni brauzerda oching.

## Tilda'ga joylash
`tilda/kodeks-tilda.html` — butun sahifa bitta kodda (CSS, JS va rasmlar ichida).
Tilda'da yangi sahifa → "Другое / Boshqa" → **HTML-kod (T123)** bloki → shu fayl ichidagi hamma kodni qo'ying.
Saytni o'zgartirgandan keyin faylni qayta yig'ing: `python3 tilda/build.py`.
