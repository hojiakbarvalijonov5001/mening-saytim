/* =========================================================
   SOZLAMALAR — shu yerdan oʻzgartiring
   ========================================================= */
const CONFIG = {
  // Aksiya tugash sanasi (Toshkent vaqti, UTC+5)
  deadline: '2026-12-31T23:59:59+05:00',

  // Formadagi maʼlumotlar yuboriladigan manzil (POST, JSON).
  // Masalan: Google Apps Script veb-ilova URL'i yoki oʻz serveringiz.
  // Boʻsh qolsa, foydalanuvchi administrator Telegramiga yoʻnaltiriladi.
  formEndpoint: '',

  telegramAdmin: 'https://t.me/biznesplanet_admin',
};

/* ---------- Teskari sanoq ---------- */
(function countdown() {
  const end = new Date(CONFIG.deadline).getTime();
  const els = {};
  document.querySelectorAll('[data-cd]').forEach((el) => (els[el.dataset.cd] = el));

  const d = new Date(CONFIG.deadline);
  const pad = (n) => String(n).padStart(2, '0');
  const dateText = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  document.querySelectorAll('.js-deadline-text').forEach((el) => (el.textContent = dateText));

  function tick() {
    let diff = Math.max(0, end - Date.now());
    const days = Math.floor(diff / 864e5); diff -= days * 864e5;
    const hours = Math.floor(diff / 36e5); diff -= hours * 36e5;
    const mins = Math.floor(diff / 6e4); diff -= mins * 6e4;
    const secs = Math.floor(diff / 1e3);
    if (els.d) els.d.textContent = pad(days);
    if (els.h) els.h.textContent = pad(hours);
    if (els.m) els.m.textContent = pad(mins);
    if (els.s) els.s.textContent = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
})();

/* ---------- SHERIK va CHILIK soʻzlarini bir xil kenglikka keltirish ---------- */
(function equalizeHeroWords() {
  const words = [...document.querySelectorAll('.hero__word-text')];
  if (words.length !== 2) return;
  function fit() {
    words.forEach((w) => { w.style.letterSpacing = ''; w.style.marginRight = ''; });
    const [a, b] = words;
    const diff = a.getBoundingClientRect().width - b.getBoundingClientRect().width;
    const narrow = diff > 0 ? b : a;
    const gaps = narrow.textContent.length;
    const base = parseFloat(getComputedStyle(narrow).letterSpacing) || 0;
    narrow.style.letterSpacing = base + Math.abs(diff) / gaps + 'px';
    // oxirgi harfdan keyingi boʻshliq soʻzni siljitmasin
    narrow.style.marginRight = -(Math.abs(diff) / gaps) + 'px';
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('resize', fit);
})();

/* ---------- Popup ---------- */
const modal = document.getElementById('modal');
let lastFocus = null;

function openModal() {
  lastFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  setTimeout(() => modal.querySelector('input')?.focus(), 150);
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  lastFocus?.focus();
}
document.querySelectorAll('[data-open-modal]').forEach((b) => b.addEventListener('click', openModal));
document.querySelectorAll('[data-close-modal]').forEach((b) => b.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
if (location.hash === '#popup:sherikchilik' || location.hash === '#buyurtma') openModal();

/* ---------- Telefon maskasi: +998 (XX) XXX-XX-XX ---------- */
function formatPhone(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('998')) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  let out = '+998';
  if (digits.length) out += ' (' + digits.slice(0, 2);
  if (digits.length >= 2) out += ')';
  if (digits.length > 2) out += ' ' + digits.slice(2, 5);
  if (digits.length > 5) out += '-' + digits.slice(5, 7);
  if (digits.length > 7) out += '-' + digits.slice(7, 9);
  return { text: out, digits };
}
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener('focus', () => { if (!input.value) input.value = '+998 '; });
  input.addEventListener('input', () => { input.value = formatPhone(input.value).text; });
  input.addEventListener('blur', () => { if (formatPhone(input.value).digits.length === 0) input.value = ''; });
});

/* ---------- Forma yuborish ---------- */
document.querySelectorAll('.js-lead-form').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = form.querySelector('.form__msg');
    const nameEl = form.elements.name;
    const phoneEl = form.elements.phone;
    const name = nameEl.value.trim();
    const phone = formatPhone(phoneEl.value);

    nameEl.classList.toggle('invalid', name.length < 2);
    phoneEl.classList.toggle('invalid', phone.digits.length !== 9);
    msg.className = 'form__msg';

    if (name.length < 2 || phone.digits.length !== 9) {
      msg.classList.add('err');
      msg.textContent = 'Iltimos, ismingiz va telefon raqamingizni toʻliq kiriting.';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    const payload = {
      name,
      phone: '+998' + phone.digits,
      source: location.href,
      date: new Date().toISOString(),
    };

    try {
      if (CONFIG.formEndpoint) {
        await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        msg.classList.add('ok');
        msg.textContent = 'Rahmat! Arizangiz qabul qilindi. 1 ish kuni ichida siz bilan bogʻlanamiz.';
        form.reset();
      } else {
        msg.classList.add('ok');
        msg.textContent = 'Rahmat! Buyurtmani yakunlash uchun administratorga yozing…';
        setTimeout(() => window.open(CONFIG.telegramAdmin, '_blank', 'noopener'), 700);
      }
    } catch (err) {
      msg.classList.add('err');
      msg.textContent = 'Xatolik yuz berdi. Iltimos, Telegram orqali murojaat qiling.';
    } finally {
      btn.disabled = false;
    }
  });
});

/* ---------- Mobil pastki tugma ---------- */
const sticky = document.querySelector('.sticky-cta');
const hero = document.querySelector('.hero');
const leadSection = document.getElementById('royxat');
if (sticky && 'IntersectionObserver' in window) {
  let heroVisible = true, leadVisible = false;
  const update = () => sticky.classList.toggle('show', !heroVisible && !leadVisible);
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; update(); }).observe(hero);
  new IntersectionObserver(([e]) => { leadVisible = e.isIntersecting; update(); }).observe(leadSection);
}

/* ---------- Paydo boʻlish animatsiyasi ---------- */
if ('IntersectionObserver' in window) {
  const targets = document.querySelectorAll(
    '.ncard, .give__item, .quote, .qlist li, .wcard, .notfor, .grid6__item, .fcard, .money, .module, .banner, .bcard, .offer, .way, .excuses, .lead-box, .faq details, .contact'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(el);
  });
}
