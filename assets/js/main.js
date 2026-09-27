/* =========================================================
   Sayt sozlamalari — shu yerni to'ldiring
   ========================================================= */
const CONFIG = {
  // Kitob narxi, masalan: "990 000 so'm". Bo'sh qolsa narx bloki ko'rinmaydi.
  price: "",
  // Administrator Telegram havolasi, masalan: "https://t.me/biznesjavon_admin"
  telegram: "https://t.me/",
  // Buyurtmalar yuboriladigan manzil (Telegram bot, Google Sheets webhook va h.k.).
  // Bo'sh bo'lsa, buyurtma ma'lumotlari Telegram orqali adminga yuborishga taklif qilinadi.
  orderEndpoint: "",
  // To'lov sahifasi (Click / Payme havolasi). To'ldirilsa, buyurtmadan so'ng shu sahifaga o'tiladi.
  paymentUrl: "",
};

document.documentElement.classList.remove("no-js");

/* ---------- Header soyasi ---------- */
const header = document.querySelector(".header");
const mobileCta = document.querySelector("[data-mobile-cta]");
const orderSection = document.getElementById("buyurtma");

const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 20);

  if (mobileCta && orderSection) {
    const r = orderSection.getBoundingClientRect();
    const orderInView = r.top < window.innerHeight && r.bottom > 0;
    mobileCta.classList.toggle("is-visible", y > 600 && !orderInView);
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

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
  const wrap = document.querySelector("[data-price-wrap]");
  document.querySelector("[data-price]").textContent = CONFIG.price;
  wrap.hidden = false;
}
document.querySelectorAll("[data-telegram]").forEach((a) => (a.href = CONFIG.telegram));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---------- Telefon maskasi ---------- */
const phone = document.querySelector('input[name="phone"]');
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

/* ---------- Buyurtma formasi ---------- */
const form = document.getElementById("orderForm");
const msg = form.querySelector(".form__msg");
const nameInput = form.elements.namedItem("name");
const phoneInput = form.elements.namedItem("phone");

const setMsg = (text, ok) => {
  msg.textContent = text;
  msg.classList.toggle("is-ok", ok);
  msg.classList.toggle("is-err", !ok);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const tel = phoneInput.value.replace(/\D/g, "");

  nameInput.classList.toggle("is-invalid", name.length < 2);
  phoneInput.classList.toggle("is-invalid", tel.length !== 12);
  if (name.length < 2 || tel.length !== 12) {
    setMsg("Iltimos, ismingiz va telefon raqamingizni to'liq kiriting.", false);
    return;
  }

  const data = { name, phone: "+" + tel, product: "KODEKS qo'llanmasi", page: location.href, date: new Date().toISOString() };
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;

  try {
    if (CONFIG.orderEndpoint) {
      const res = await fetch(CONFIG.orderEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);
    }

    if (CONFIG.paymentUrl) {
      setMsg("Rahmat! To'lov sahifasiga o'tmoqdasiz…", true);
      setTimeout(() => (location.href = CONFIG.paymentUrl), 800);
      return;
    }

    if (!CONFIG.orderEndpoint) {
      // Backend ulanmagan bo'lsa — buyurtmani Telegram orqali adminga yuborish
      const text = `Assalomu alaykum! KODEKS qo'llanmasiga buyurtma bermoqchiman.\nIsm: ${data.name}\nTelefon: ${data.phone}`;
      navigator.clipboard?.writeText(text).catch(() => {});
      setMsg("Rahmat! Buyurtma matni nusxalandi — Telegram'da adminga yuboring.", true);
      window.open(CONFIG.telegram, "_blank", "noopener");
    } else {
      setMsg("Rahmat! Buyurtmangiz qabul qilindi. 1 ish kuni ichida siz bilan bog'lanamiz.", true);
    }
    form.reset();
  } catch (err) {
    setMsg("Xatolik yuz berdi. Iltimos, Telegram orqali murojaat qiling.", false);
  } finally {
    btn.disabled = false;
  }
});
