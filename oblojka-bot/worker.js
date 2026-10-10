// Oblojka bot — videoga sifatini o'zgartirmasdan muqova (oblojka) qo'yadi.
// Cloudflare Workers'da ishlaydi. Sozlash: QOLLANMA.md faylini o'qing.
//
// Kerakli sozlamalar (Cloudflare panelida):
//   BOT_TOKEN — @BotFather bergan token (Secret sifatida)
//   XOTIRA    — KV namespace bog'lanishi (oxirgi videoni eslab qolish uchun)

const MATN = {
  start:
    "Assalomu alaykum! 👋\n\n" +
    "1️⃣ Menga video yuboring\n" +
    "2️⃣ Keyin oblojka uchun rasm yuboring\n\n" +
    "Men videoni sizning oblojkangiz bilan qaytarib yuboraman. Video sifati o'zgarmaydi.",
  videoOlindi: "✅ Video qabul qilindi. Endi oblojka uchun rasm yuboring.",
  avvalVideo: "Avval video yuboring, keyin rasm. 🙂",
  faylEmas:
    "Videoni fayl (document) sifatida emas, oddiy video qilib yuboring. " +
    "Sifat pasaymasligi uchun yuborishda eng yuqori sifatni tanlang.",
  rasmFayl: "Oblojkani fayl sifatida emas, oddiy rasm qilib yuboring.",
  xato: "❌ Xatolik yuz berdi: ",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!env.BOT_TOKEN) {
      return new Response("BOT_TOKEN sozlanmagan. QOLLANMA.md ni qarang.", { status: 500 });
    }

    // Bir marta ochiladi: Telegramga botning manzilini aytadi.
    if (url.pathname === "/setup") {
      const javob = await telegram(env, "setWebhook", {
        url: `${url.origin}/webhook`,
        secret_token: await maxfiyKalit(env.BOT_TOKEN),
        allowed_updates: ["message"],
        drop_pending_updates: true,
      });
      const kv = env.XOTIRA ? "✅ XOTIRA ulangan" : "⚠️ XOTIRA (KV) ulanmagan — QOLLANMA.md 4-qadamni qarang";
      return new Response(
        (javob.ok ? "✅ Bot ishga tushdi! Telegramda botga /start yozing." : "❌ " + javob.description) + "\n" + kv,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }

    if (url.pathname === "/webhook" && request.method === "POST") {
      const kalit = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
      if (kalit !== (await maxfiyKalit(env.BOT_TOKEN))) {
        return new Response("ruxsat yo'q", { status: 403 });
      }
      const update = await request.json();
      if (update.message) {
        try {
          await xabarniIshla(env, update.message);
        } catch (e) {
          await yoz(env, update.message.chat.id, MATN.xato + e.message);
        }
      }
      return new Response("ok");
    }

    return new Response("Oblojka bot ishlayapti. Sozlash uchun /setup manzilini oching.", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};

async function xabarniIshla(env, msg) {
  const chatId = msg.chat.id;

  if (msg.text && msg.text.startsWith("/start")) {
    return yoz(env, chatId, MATN.start);
  }

  if (msg.video) {
    const video = { file_id: msg.video.file_id, caption: msg.caption, caption_entities: msg.caption_entities };
    if (env.XOTIRA) {
      await env.XOTIRA.put(`video:${chatId}`, JSON.stringify(video), { expirationTtl: 86400 });
    }
    return yoz(env, chatId, MATN.videoOlindi, msg.message_id);
  }

  if (msg.document) {
    const turi = msg.document.mime_type || "";
    if (turi.startsWith("video/")) return yoz(env, chatId, MATN.faylEmas);
    if (turi.startsWith("image/")) return yoz(env, chatId, MATN.rasmFayl);
  }

  if (msg.photo) {
    // Rasm videoga "javob" (reply) qilib yuborilgan bo'lsa — o'sha video olinadi,
    // aks holda oxirgi yuborilgan video.
    let video = null;
    const r = msg.reply_to_message;
    if (r && r.video) {
      video = { file_id: r.video.file_id, caption: r.caption, caption_entities: r.caption_entities };
    } else if (env.XOTIRA) {
      const saqlangan = await env.XOTIRA.get(`video:${chatId}`);
      if (saqlangan) video = JSON.parse(saqlangan);
    }
    if (!video) return yoz(env, chatId, MATN.avvalVideo);

    const oblojka = msg.photo[msg.photo.length - 1].file_id; // eng katta o'lcham
    const javob = await telegram(env, "sendVideo", {
      chat_id: chatId,
      video: video.file_id,
      cover: oblojka,
      caption: video.caption,
      caption_entities: video.caption_entities,
      supports_streaming: true,
    });
    if (!javob.ok) return yoz(env, chatId, MATN.xato + javob.description);
    return;
  }

  return yoz(env, chatId, MATN.avvalVideo);
}

function yoz(env, chatId, text, replyTo) {
  return telegram(env, "sendMessage", {
    chat_id: chatId,
    text,
    ...(replyTo ? { reply_parameters: { message_id: replyTo, allow_sending_without_reply: true } } : {}),
  });
}

async function telegram(env, metod, malumot) {
  const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${metod}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(malumot),
  });
  return res.json();
}

// Webhook so'rovlari faqat Telegramdan kelishini tekshirish uchun tokendan kalit yasaladi.
async function maxfiyKalit(token) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 48);
}
