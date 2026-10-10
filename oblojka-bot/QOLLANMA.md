# Oblojka bot: o'rnatish bo'yicha qo'llanma

Bu bot videoga siz tanlagan oblojkani qo'yib beradi. Video sifati **umuman o'zgarmaydi**:
bot videoni qayta ishlamaydi, faqat unga yangi muqova biriktiradi.

Dasturlashni bilish shart emas. Hammasi brauzerda qilinadi, **bepul**, taxminan 10 daqiqa ketadi.
Bot **Cloudflare Workers**'da ishlaydi: kompyuteringiz o'chiq bo'lsa ham bot kecha-kunduz ishlayveradi.

---

## 1-qadam. Telegramda bot yaratish

1. Telegramda **@BotFather** ni oching va `/newbot` deb yozing.
2. Botga nom bering (masalan: `Oblojka Bot`).
3. Keyin username bering. U `bot` bilan tugashi kerak (masalan: `mening_oblojka_bot`).
4. BotFather sizga **token** beradi. U shunga o'xshaydi:
   `7123456789:AAH...xyz`
   Uni nusxalab qo'ying. **Tokenni hech kimga bermang!**

## 2-qadam. Cloudflare'da ro'yxatdan o'tish

1. https://dash.cloudflare.com/sign-up saytiga kiring.
2. Email va parol bilan ro'yxatdan o'ting (karta talab qilinmaydi).

## 3-qadam. Botning kodini joylash

1. Chap menyudan **Compute (Workers)** → **Workers & Pages** bo'limini oching.
2. **Create** tugmasini bosing, keyin **Start with Hello World!** ni tanlang.
3. Nomiga masalan `oblojka-bot` deb yozing va **Deploy** ni bosing.
4. **Edit code** tugmasini bosing.
5. Chapdagi `worker.js` faylidagi hamma narsani o'chiring.
6. Shu papkadagi [`worker.js`](worker.js) faylini oching, **butun matnini** nusxalab, o'sha joyga qo'ying.
7. O'ng yuqoridagi **Deploy** tugmasini bosing.

## 4-qadam. Sozlamalar

Worker sahifasiga qayting (yuqoridagi `oblojka-bot` nomini bosing).

**a) Tokenni qo'shish**
1. **Settings** → **Variables and Secrets** → **Add** ni bosing.
2. Type: **Secret**
3. Variable name: `BOT_TOKEN`
4. Value: 1-qadamda olgan tokeningiz.
5. **Deploy** ni bosing.

**b) Xotirani qo'shish** (bot siz yuborgan videoni eslab qolishi uchun)
1. Chap menyudan **Storage & Databases** → **Workers KV** ni oching.
2. **Create instance** ni bosing, nomiga `oblojka-xotira` deb yozib, **Create** ni bosing.
3. Yana Worker sahifangizga qayting: **Bindings** → **Add binding** → **KV namespace**.
4. Variable name: `XOTIRA` (aynan shunday, katta harflarda).
5. KV namespace: `oblojka-xotira` ni tanlang.
6. **Add binding** / **Deploy** ni bosing.

## 5-qadam. Botni ishga tushirish

Worker sahifasida botingiz manzili ko'rsatilgan bo'ladi, masalan:
`https://oblojka-bot.sizning-nomingiz.workers.dev`

Brauzerda shu manzilning oxiriga `/setup` qo'shib oching:

```
https://oblojka-bot.sizning-nomingiz.workers.dev/setup
```

Quyidagi yozuv chiqsa, hammasi tayyor:

```
✅ Bot ishga tushdi! Telegramda botga /start yozing.
✅ XOTIRA ulangan
```

---

## Botdan foydalanish

1. Botga **video** yuboring.
2. Keyin oblojka uchun **rasm** yuboring.
3. Bot videoni sizning oblojkangiz bilan qaytarib yuboradi. Video ostidagi yozuv (caption) ham saqlanib qoladi.

Boshqa usul: istalgan videoga rasm bilan **javob (reply)** qilsangiz ham, bot o'sha videoga oblojka qo'yadi.

### ⚠️ Sifat bo'yicha muhim maslahat

Bot video sifatini o'zgartirmaydi. Lekin **Telegram ilovasining o'zi** videoni botga yuborayotganda
siqib qo'yishi mumkin. Shunga e'tibor bering:

- **Telefonda:** videoni tanlaganda pastdagi sifat belgisini bosib, **eng yuqori sifatni** tanlang.
- **Kompyuterda (Telegram Desktop):** "Compress" (siqish) belgisi o'chiq bo'lsin.
- Videoni **fayl (document)** qilib yubormang, oddiy video qilib yuboring. Aks holda bot uni qabul qilmaydi.

### Bilib qo'ying

- Oblojka **Telegram ichida** ko'rinadi: chatda, kanalga forward qilganda va hokazo.
  Videoni telefonga yuklab olsangiz, galereyada boshqa kadr ko'rinishi mumkin.
- Bot videoni yuklab olmaydi, shuning uchun video hajmi qancha katta bo'lsa ham ishlayveradi.

## Muammo bo'lsa

| Belgisi | Yechimi |
|---|---|
| `/setup` da "BOT_TOKEN sozlanmagan" chiqyapti | 4a-qadamni qayta tekshiring, nomi aynan `BOT_TOKEN` bo'lsin |
| `/setup` da "Unauthorized" chiqyapti | Token noto'g'ri nusxalangan. BotFather'dan qayta nusxalang |
| "XOTIRA ulanmagan" chiqyapti | 4b-qadamni bajaring, nomi aynan `XOTIRA` bo'lsin |
| Bot javob bermayapti | `/setup` manzilini yana bir marta oching |
