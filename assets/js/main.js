/* =========================================================
   Sayt sozlamalari — shu yerni to'ldiring
   ========================================================= */
const CONFIG = {
  // Kitob narxi, masalan: "990 000 so'm". Bo'sh qolsa narx ko'rsatilmaydi.
  price: "",
  // Administrator Telegram havolasi, masalan: "https://t.me/biznesjavon_admin"
  telegram: "https://t.me/",
  // To'lov havolasi (Click / Payme). Buyurtma oynasining 2-bosqichida "To'lov qilish" tugmasi bo'ladi.
  paymentUrl: "",
  // Buyurtma va chek yuboriladigan manzil (Telegram bot, Google Sheets webhook va h.k.).
  // multipart/form-data ko'rinishida POST qilinadi: name, phone, address, staff, activity, check (fayl).
  orderEndpoint: "",
};

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
}
document.querySelectorAll("[data-telegram]").forEach((a) => (a.href = CONFIG.telegram));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

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
  if (modal.dataset.finished) { showStep(1); delete modal.dataset.finished; }
  setTimeout(() => modal.querySelector("[data-step]:not([hidden]) input")?.focus(), 50);
};

document.querySelectorAll('a[href="#buyurtma"]').forEach((a) =>
  a.addEventListener("click", (e) => { e.preventDefault(); openModal(); })
);
modal.querySelectorAll("[data-modal-close]").forEach((b) => b.addEventListener("click", () => modal.close()));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
modal.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => showStep(Number(b.dataset.go))));

/* To'lov havolasi */
const payLink = modal.querySelector("[data-pay-link]");
if (CONFIG.paymentUrl) {
  payLink.href = CONFIG.paymentUrl;
  payLink.hidden = false;
  modal.querySelector("[data-pay-empty]").hidden = true;
  modal.querySelector("[data-pay-slot]").classList.add("is-filled");
}

/* Telefon maskasi */
const phone = document.getElementById("o-phone");
const formatPhone = (value) => {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return "+998" + (parts.length ? " " + parts.join(" ") : "");
};
phone.addEventListener("focus", () => { if (!phone.value) phone.value = "+998 "; });
phone.addEventListener("input", () => { phone.value = formatPhone(phone.value); });
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
  ["name", "phone", "address", "staff", "activity"].forEach((k) => (order[k] = f.namedItem(k).value.trim()));
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

checkForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) {
    fileInput.closest(".upload").classList.add("is-invalid");
    setMsg(checkForm, "Iltimos, to'lov chekini yuklang.", false);
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    setMsg(checkForm, "Fayl hajmi 10 MB dan oshmasligi kerak.", false);
    return;
  }

  const btn = checkForm.querySelector("button[type=submit]");
  btn.disabled = true;
  setMsg(checkForm, "Yuborilmoqda…", true);

  try {
    if (CONFIG.orderEndpoint) {
      const fd = new FormData();
      Object.entries(order).forEach(([k, v]) => fd.append(k, v));
      fd.append("product", "KODEKS qo'llanmasi");
      fd.append("check", file, file.name);
      const res = await fetch(CONFIG.orderEndpoint, { method: "POST", body: fd });
      if (!res.ok) throw new Error(res.status);
    }
    setMsg(checkForm, "", true);
    modal.dataset.finished = "1";
    infoForm.reset();
    checkForm.reset();
    uploadText.textContent = "Chekni tanlash uchun bosing";
    uploadPreview.hidden = true;
    showStep(4);
  } catch (err) {
    setMsg(checkForm, "Chekni yuborib bo'lmadi. Qayta urinib ko'ring yoki admin bilan bog'laning.", false);
  } finally {
    btn.disabled = false;
  }
});
