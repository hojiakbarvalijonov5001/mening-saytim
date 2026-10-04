# Arizalar va cheklarni qabul qilish (Google Apps Script)

Saytdagi forma (ism + telefon) va to'lov sahifasidagi chek shu skript orqali:
- **Google Sheets** jadvaliga yoziladi,
- chek fayli **Google Drive**'dagi «Sherikchilik cheklari» papkasiga saqlanadi,
- **Telegram**'ga xabar + chek bo'lib keladi.

Hammasi bepul. Taxminan 10 daqiqa.

## 1. Telegram bot

1. Telegram'da **@BotFather** ga yozing → `/newbot` → botga nom bering.
2. BotFather bergan **tokenni** saqlab qo'ying (`123456:ABC...` ko'rinishida).
3. Xabarlar keladigan guruh oching (yoki shaxsiy chat), botni guruhga qo'shing va guruhga biror xabar yozing.
4. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates` — javobdagi `"chat":{"id": ... }` raqami — bu **CHAT_ID** (guruhlarda minus bilan boshlanadi).

## 2. Google Sheets va skript

1. Yangi Google Sheets jadval yarating (masalan, «Sherikchilik arizalari»).
2. **Kengaytmalar → Apps Script** ni oching.
3. Ochilgan oynadagi kodni o'chirib, `Code.gs` faylidagi kodni to'liq qo'ying va saqlang.
4. Chapdagi **⚙ Loyiha sozlamalari → Script properties → Add script property**:
   - `BOT_TOKEN` = botingiz tokeni
   - `CHAT_ID` = chat ID raqami
5. Yuqorida funksiyalardan `testTelegram` ni tanlab **Run** bosing, ruxsat bering. Telegram'ga «✅ Sayt ulanishi ishlayapti» xabari kelishi kerak.

## 3. Veb-ilova sifatida joylash

1. **Deploy → New deployment** → turi: **Web app**.
2. *Execute as*: **Me**, *Who has access*: **Anyone**.
3. **Deploy** → berilgan **Web app URL** ni (`https://script.google.com/macros/s/.../exec`) nusxalang.
4. Shu URL'ni dasturchiga yuboring — u `assets/js/config.js` dagi `formEndpoint` ga qo'yiladi.

> Kodni keyin o'zgartirsangiz: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy** (URL o'zgarmaydi).
