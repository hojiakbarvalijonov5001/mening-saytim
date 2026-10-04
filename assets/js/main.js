/* =========================================================
   Sayt sozlamalari — shu yerni to'ldiring
   ========================================================= */
const CONFIG = {
  // Kitob narxi, masalan: "990 000 so'm". Bo'sh qolsa narx elementlari ko'rinmaydi.
  price: "",
  // Admin Telegrami — saytdagi barcha [data-telegram] havolalari
  telegram: "https://t.me/insansupport",
  // To'lov havolalari (buyurtma oynasining "To'lov" qadamidagi 4 ta kartochka).
  // Havola bo'sh bo'lsa, kartochka xira va bosilmaydigan bo'ladi.
  paymentMethods: {
    paynet: "https://app.paynet.uz/?m=36600",
    payme: "https://payme.uz/fallback/merchant/?id=665970bcb23b231bab8f0283",
    click: "https://my.click.uz/services/pay?service_id=34273&merchant_id=21954",
    beepul: "https://beepul.uz/actions/payment?qr=2&bT04NjU0JmNyPTg2MA==х",
  },
  // Arizalar va cheklar yuboriladigan Google Apps Script veb-ilova URL'i (apps-script/Code.gs).
  // Bo'sh bo'lsa, ma'lumotlar hech qayerga yuborilmaydi va chekni Telegram orqali yuborish so'raladi.
  orderEndpoint: "",
};

/* Telegram / Instagram / Facebook ichki brauzeri: pastki panelni biroz yuqoriga ko'taramiz */
if (window.TelegramWebviewProxy || window.TelegramWebview || /Telegram|Instagram|FBAN|FBAV|FB_IAB/i.test(navigator.userAgent)) {
  document.documentElement.classList.add("in-app");
}

document.documentElement.classList.remove("no-js");


/* ---------- Reveal animatsiyalari ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const siblings = [...e.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
        const idx = Math.max(0, siblings.indexOf(e.target));
        e.target.style.transitionDelay = `${Math.min(idx, 5) * 80}ms`;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Raqamlarni sanash ---------- */
const counters = document.querySelectorAll("[data-count]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = Number(el.dataset.count);
      const start = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => cio.observe(c));
}

/* ---------- Narx va Telegram ---------- */
if (CONFIG.price) {
  document.querySelectorAll("[data-price]").forEach((el) => (el.textContent = CONFIG.price));
  document.querySelectorAll("[data-price-wrap]").forEach((el) => (el.hidden = false));
  document.querySelectorAll("[data-pay-step2]").forEach((el) => (el.textContent = CONFIG.price + " to'lov qiling va chekni skrinshot qiling."));
}
document.querySelectorAll("[data-telegram]").forEach((a) => (a.href = CONFIG.telegram));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---------- To'lov usullari ---------- */
document.querySelectorAll("[data-pay]").forEach((card) => {
  const url = CONFIG.paymentMethods[card.dataset.pay];
  if (url) {
    card.href = url;
  } else {
    card.classList.add("is-empty");
    card.removeAttribute("href");
    card.setAttribute("aria-disabled", "true");
  }
});

/* ---------- Apps Script'ga yuborish ---------- */
const sendToSheet = (payload) =>
  fetch(CONFIG.orderEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

/* Katta rasmni yuborishdan oldin kichraytiramiz (1600px, JPEG 0.85) */
const compressImage = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const max = 1600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
      resolve({ name: file.name.replace(/\.[^.]+$/, "") + ".jpg", type: "image/jpeg", data });
    };
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });
const readFile = (file) =>
  new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve({ name: file.name, type: file.type, data: String(r.result).split(",")[1] });
    r.onerror = () => resolve(null);
    r.readAsDataURL(file);
  });

/* ---------- Buyurtma oynasi ---------- */
const modal = document.getElementById("orderModal");
const infoForm = document.getElementById("stepInfo");
const checkForm = document.getElementById("stepCheck");
const order = {};

const showStep = (n) => {
  modal.querySelectorAll("[data-step]").forEach((el) => (el.hidden = el.dataset.step !== String(n)));
  modal.querySelectorAll("[data-step-dot]").forEach((el) => {
    const d = Number(el.dataset.stepDot);
    el.classList.toggle("is-active", d === n);
    el.classList.toggle("is-done", d < n || n === 4);
  });
  modal.querySelector(".modal__box").scrollTop = 0;
};

const openModal = () => {
  if (!modal.open) modal.showModal();
  document.documentElement.classList.add("modal-open");
  if (modal.dataset.finished) { showStep(1); delete modal.dataset.finished; }
  setTimeout(() => modal.querySelector("[data-step]:not([hidden]) input")?.focus(), 50);
};

document.querySelectorAll('a[href="#buyurtma"]').forEach((a) =>
  a.addEventListener("click", (e) => { e.preventDefault(); openModal(); })
);
modal.querySelectorAll("[data-modal-close]").forEach((b) => b.addEventListener("click", () => modal.close()));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener("close", () => document.documentElement.classList.remove("modal-open"));
modal.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => showStep(Number(b.dataset.go))));

/* Telefon maskasi */
const phone = document.getElementById("o-phone");
const formatPhone = (value) => {
  // "+998" prefiksini kursor qayerda bo'lishidan qat'i nazar olib tashlaymiz
  const i = value.indexOf("+998");
  const raw = i >= 0 ? value.slice(0, i) + value.slice(i + 4) : value;
  let d = raw.replace(/\D/g, "");
  if (d.length > 9 && d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return "+998" + (parts.length ? " " + parts.join(" ") : "");
};
const caretToEnd = () => { const n = phone.value.length; phone.setSelectionRange(n, n); };
phone.addEventListener("focus", () => { if (!phone.value) phone.value = "+998 "; setTimeout(caretToEnd, 0); });
phone.addEventListener("input", () => { phone.value = formatPhone(phone.value); caretToEnd(); });
phone.addEventListener("blur", () => { if (phone.value.trim() === "+998") phone.value = ""; });

const setMsg = (form, text, ok) => {
  const msg = form.querySelector(".form__msg");
  msg.textContent = text;
  msg.classList.toggle("is-ok", !!ok);
  msg.classList.toggle("is-err", !ok);
};

/* 1-bosqich: savollar */
infoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = infoForm.elements;
  const checks = [
    [f.namedItem("name"), (v) => v.trim().length >= 2],
    [f.namedItem("phone"), (v) => v.replace(/\D/g, "").length === 12],
    [f.namedItem("address"), (v) => v.trim().length >= 3],
    [f.namedItem("staff"), (v) => v !== "" && Number(v) >= 0],
    [f.namedItem("activity"), (v) => v.trim().length >= 2],
  ];
  let ok = true;
  checks.forEach(([input, test]) => {
    const valid = test(input.value);
    input.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    setMsg(infoForm, "Iltimos, barcha savollarga javob bering. Telefon raqami to'liq bo'lsin.", false);
    return;
  }
  setMsg(infoForm, "", true);
  ["name", "address", "staff", "activity"].forEach((k) => (order[k] = f.namedItem(k).value.trim()));
  order.phone = "+" + f.namedItem("phone").value.replace(/\D/g, "");
  order.source = location.href;
  // To'lov qilinmasa ham ariza saqlanib qolsin
  if (CONFIG.orderEndpoint) {
    sendToSheet({ type: "lead", ...order, date: new Date().toISOString() }).catch(() => {});
  }
  showStep(2);
});

/* 3-bosqich: chek */
const fileInput = document.getElementById("o-check");
const uploadText = modal.querySelector("[data-upload-text]");
const uploadPreview = modal.querySelector("[data-upload-preview]");
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  uploadText.textContent = file.name;
  fileInput.closest(".upload").classList.remove("is-invalid");
  if (file.type.startsWith("image/")) {
    uploadPreview.src = URL.createObjectURL(file);
    uploadPreview.hidden = false;
  } else {
    uploadPreview.hidden = true;
  }
});

const MAX_MB = 8;
checkForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  const upload = fileInput.closest(".upload");
  if (!file) {
    upload.classList.add("is-invalid");
    setMsg(checkForm, "Iltimos, to'lov chekini yuklang.", false);
    return;
  }
  if (!/^image\//.test(file.type) && file.type !== "application/pdf") {
    upload.classList.add("is-invalid");
    setMsg(checkForm, "Chek rasm yoki PDF fayl bo'lishi kerak.", false);
    return;
  }
  if (file.size > MAX_MB * 1024 * 1024) {
    upload.classList.add("is-invalid");
    setMsg(checkForm, "Fayl hajmi " + MAX_MB + " MB dan oshmasligi kerak.", false);
    return;
  }

  if (!CONFIG.orderEndpoint) {
    setMsg(checkForm, "Chekni yuklash hali sozlanmagan. Iltimos, chekni adminga Telegram orqali yuboring.", false);
    setTimeout(() => window.open(CONFIG.telegram, "_blank", "noopener"), 900);
    return;
  }

  const btn = checkForm.querySelector("button[type=submit]");
  btn.disabled = true;
  setMsg(checkForm, "Yuborilmoqda…", true);

  try {
    const packed = file.type.startsWith("image/") ? await compressImage(file) : await readFile(file);
    if (!packed) throw new Error("read");
    await sendToSheet({ type: "receipt", ...order, date: new Date().toISOString(), file: packed });
    setMsg(checkForm, "", true);
    modal.dataset.finished = "1";
    infoForm.reset();
    checkForm.reset();
    uploadText.textContent = "Chekni tanlash uchun bosing";
    uploadPreview.hidden = true;
    showStep(4);
  } catch (err) {
    setMsg(checkForm, "Chekni yuborib bo'lmadi. Qayta urinib ko'ring yoki chekni adminga Telegram orqali yuboring.", false);
  } finally {
    btn.disabled = false;
  }
});
