# TZ: KODEKS sayti — yetishmayotgan sotuv vositalarini qo'shish

## Kontekst
- Repozitoriy: `hojiakbarvalijonov5001/mening-saytim`
- KODEKS sayti branchi: `claude/gifted-shannon-1y9jvl` (oxirgi commit `cffd944`). Shu branchda ishlang.
- Sayt: `index.html`, `assets/css/style.css`, `assets/js/main.js`, rasmlar `assets/img/`.
- Tilda'ga ulanish: `tilda/build.py` → `tilda/dist/kodeks.css` + `tilda/dist/kodeks.js`, Tilda'dagi T123 blokida jsDelivr havolalari (`tilda/TILDA-KOD.txt`, commit hash bilan).
- Namuna sifatida: branch `claude/nice-feynman-jb692z` (Sherikchilik qo'llanmasi sayti) — u yerda quyidagi vositalarning tayyor va sinalgan versiyasi bor: `assets/js/config.js`, `assets/js/tolov.js`, `tolov.html`, `assets/css/tolov.css`, `assets/img/pay/*.webp`, `apps-script/Code.gs`, `apps-script/README.md`. Kerakli fayllarni `git show origin/claude/nice-feynman-jb692z:<yo'l>` bilan oling.

## Umumiy talablar
- Dizayn KODEKS'ning o'zida qoladi: ranglar va shriftlar `:root` dagi o'zgaruvchilardan (`--bg`, `--navy`, `--accent` havorang, `--grad-gold` oltin CTA, `--font-display` Bebas Neue, `--font-body` Manrope). Yangi elementlar ham shu tokenlardan foydalansin, yangi rang qo'shilmasin.
- Matnlarda tutuq belgisi faqat oddiy `'` (masalan: qo'llanma, bo'yicha, ma'lumot). `ʻ`, `ʼ`, `’` ishlatilmasin.
- 100% pul qaytarish kafolati QO'SHILMASIN (atayin olib tashlangan).
- Telefon (390px) va kompyuterda (1440px) gorizontal skrol bo'lmasin.

## 1. Narx
- `CONFIG.price` — narx shu yerdan boshqariladi. **Narxni foydalanuvchidan so'rang**; javob kelguncha bo'sh qoldiring (bo'sh bo'lsa narx elementlari yashirin qoladi — hozirgi mantiq saqlansin).
- Narx ko'rinadigan joylar: bosh qismdagi chiplar yonida yoki CTA ostida, "Sotib olish uchun ro'yxatdan o'ting" bloki, buyurtma oynasining "To'lov" qadami ("To'lov summasi"), mobil pastki panel (5-band).

## 2. To'lov usullari (4 ta)
- Buyurtma oynasining **"To'lov" qadamidagi** bitta "To'lov qilish" tugmasi va "To'lov havolasi shu yerda bo'ladi" yozuvi o'rniga 4 ta to'lov kartochkasi (2×2 to'r, telefonda ham 2×2):
  | id | Nomi | Havola |
  |---|---|---|
  | paynet | Paynet | `https://app.paynet.uz/?m=36600` |
  | payme | Payme | `https://payme.uz/fallback/merchant/?id=665970bcb23b231bab8f0283` |
  | click | Click | `https://my.click.uz/services/pay?service_id=34273&merchant_id=21954` |
  | beepul | Beepul | `https://beepul.uz/actions/payment?qr=2&bT04NjU0JmNyPTg2MA==х` (oxiridagi kirillcha `х` havolaning bir qismi — o'chirmang) |
- Havolalar `CONFIG.paymentMethods = { paynet, payme, click, beepul }` da saqlansin (`CONFIG.paymentUrl` olib tashlansin). Havola bo'sh bo'lsa kartochka xira va bosilmaydigan bo'lsin.
- Ikonkalar: `assets/img/pay/{paynet,payme,click,beepul}.webp` (namuna branchidan ko'chiring). Kartochka: ikonka (64–80px, yumaloq burchak), nomi, "… orqali to'lash →" (telefonda faqat "To'lash →"). Havola yangi oynada ochilsin (`target="_blank" rel="noopener"`).

## 3. To'lovni 4 qadamda tushuntirish
"To'lov" qadamida kartochkalar ustida qisqa raqamli ro'yxat:
1. To'lov uchun o'zingizga qulay ilovani tanlang.
2. {narx} to'lov qiling va chekni skrinshot qiling.
3. Chekni saytga yuklang.
4. Adminga to'lov qilganingiz haqida xabar yuboring yoki biz siz bilan tez orada o'zimiz bog'lanamiz.

Narx `CONFIG.price` dan olinadi; narx bo'sh bo'lsa 2-qadam "To'lovni amalga oshiring va chekni skrinshot qiling." bo'lsin.

## 4. Arizalar va cheklarni qabul qilish
- Namuna branchidagi `apps-script/Code.gs` va `apps-script/README.md` ni KODEKS branchiga ko'chiring va moslang:
  - qo'shimcha maydonlar: `address` (Manzil), `staff` (Xodimlar soni), `activity` (Faoliyat) — Google Sheets ustunlari va Telegram xabari matniga qo'shilsin;
  - xabar sarlavhalari: "📝 KODEKS: yangi ariza" / "🧾 KODEKS: to'lov cheki"; Drive papkasi: "KODEKS cheklari"; Sheets varag'i: "KODEKS".
- `main.js` dagi yuborish mantiqini Apps Script'ga moslang: `multipart/form-data` emas, `fetch(CONFIG.orderEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(...) })`.
  - 1-qadam ("Keyingi qadam") bosilganda: `{ type: 'lead', name, phone, address, staff, activity, source, date }` yuborilsin — mijoz to'lov qilmasa ham ariza saqlanib qolsin.
  - Chek yuborilganda: `{ type: 'receipt', ...shu maydonlar, file: { name, type, data(base64) } }`. Rasm yuborishdan oldin canvas bilan 1600px gacha kichraytirilib JPEG 0.85 qilinsin (namuna: `tolov.js` → `compressImage`), PDF ham qabul qilinsin, 8 MB limit.
- `CONFIG.orderEndpoint` bo'sh bo'lsa: "Tabriklaymiz" ko'rsatilMASIN; o'rniga "Chekni yuklash hali sozlanmagan. Iltimos, chekni adminga Telegram orqali yuboring." xabari va admin Telegrami ochilsin.
- Foydalanuvchiga Apps Script'ni o'rnatish yo'riqnomasini (README) va oxirida Web app URL'ni yuborishini ayting; URL kelgach `CONFIG.orderEndpoint` ga qo'yiladi.

## 5. Admin Telegrami
- `CONFIG.telegram = 'https://t.me/insansupport'`. Saytdagi barcha `[data-telegram]` havolalari (Telegram bloki, buyurtma oynasidagi "Admin bilan bog'lanish", footer) shu manzilga olib borsin.

## 6. Mobil pastki "Buyurtma berish" paneli
- Faqat ≤820px da: ekran pastida doim ko'rinadigan panel — chapda "Narxi" + `CONFIG.price` (narx bo'sh bo'lsa faqat tugma), o'ngda oltin "Buyurtma berish" tugmasi (mavjud `--grad-gold` uslubi). Tugma buyurtma oynasini ochadi.
- Fon: yarim shaffof qora + blur, yupqa havorang chegara, `border-radius: var(--r-md)`.
- Joylashuv: `bottom: calc(10px + env(safe-area-inset-bottom, 0px) + var(--toolbar, 0px))`. Telegram/Instagram/Facebook ichki brauzerida (`window.TelegramWebviewProxy || window.TelegramWebview || /Telegram|Instagram|FBAN|FBAV|FB_IAB/i.test(navigator.userAgent)`) `html` ga `in-app` klassi qo'shilib, `--toolbar: 12px` bo'lsin.
- Buyurtma oynasi ochiq paytda panel yashirilsin. Footer pastki paddingi panel balandligicha oshirilsin (oxirgi matn yopilib qolmasin).

## 9. Footer: rekvizitlar va ogohlantirish
Hozirgi "© Biznes Javon" qatoridan keyin (kichik, `--muted` rangda):

> «INSAN ACADEMY GROUP» MChJ. Andijon viloyati, Andijon shahri, Mustaqillik shoh ko'chasi, 85-uy.
> H/R: 2020 8000 9056 2077 4001 · STIR: 309 253 192 · MFO: 440 · OKED: 70 220
>
> Ushbu sayt yoki mahsulot Facebook va Google kompaniyalarining bir qismi emas hamda ular tomonidan hech qanday shaklda tasdiqlanmagan. FACEBOOK — Meta Platforms, Inc. kompaniyasining savdo belgisi. YOUTUBE va GOOGLE — Alphabet, Inc. kompaniyasining savdo belgilari.

(Rekvizitlar KODEKS uchun ham shu kompaniyaga tegishli ekanini foydalanuvchidan tasdiqlatib oling.)

## Tekshirish va topshirish
1. Playwright bilan (Chromium `/opt/pw-browsers`): 390px va 1440px skrinshotlar; buyurtma oynasining 3 qadami; 4 ta to'lov havolasi to'g'ri; `orderEndpoint` ni sinov URL'iga yo'naltirib (route mock) `lead` va `receipt` yuborilishini va maydonlarni tekshiring; Telegram user-agent bilan `in-app` klassi va panel joylashuvi.
2. `python3 tilda/build.py` bilan `tilda/dist/*` ni qayta yig'ing.
3. Commit + push (`claude/gifted-shannon-1y9jvl`), so'ng `tilda/TILDA-KOD.txt` dagi jsDelivr havolalaridagi commit hash'ni yangi commit'ga almashtirib, yana commit + push. Foydalanuvchiga Tilda'ga qo'yiladigan yangi 4 qatorlik kodni yuboring (jsDelivr commit bo'yicha keshlanadi — hash albatta yangilansin).
4. Foydalanuvchiga: nima qo'shilgani, narx va Apps Script URL'i kerakligi haqida qisqa xabar.
