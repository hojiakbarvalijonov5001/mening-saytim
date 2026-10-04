/* =========================================================
   SOZLAMALAR — ikkala sahifa (asosiy va to'lov) uchun umumiy
   ========================================================= */
const CONFIG = {
  // Aksiya tugash sanasi (Toshkent vaqti, UTC+5)
  deadline: '2026-12-31T23:59:59+05:00',

  // Arizalar va cheklar yuboriladigan manzil — Google Apps Script veb-ilova URL'i
  // (apps-script/Code.gs). Bo'sh qolsa, ma'lumotlar hech qayerga saqlanmaydi.
  formEndpoint: '',

  // Admin Telegrami — saytdagi barcha "adminga yozish" havolalari
  telegramAdmin: 'https://t.me/insansupport',

  // Ro'yxatdan o'tgandan keyin ochiladigan to'lov sahifasi
  paymentPage: 'tolov.html',

  // To'lov usullari: url — to'lov havolasi, logo — rasm havolasi (bo'sh bo'lsa nomi yoziladi)
  paymentMethods: {
    payme: { url: '', logo: '' },
    paynet: { url: '', logo: '' },
    click: { url: '', logo: '' },
    uzum: { url: '', logo: '' },
    alif: { url: '', logo: '' },
  },
};

/* Telefon maskasi: +998 (XX) XXX-XX-XX — ikkala sahifada ishlatiladi */
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

/* Admin havolalari bitta joydan */
document.querySelectorAll('[data-admin-link]').forEach((a) => {
  a.href = CONFIG.telegramAdmin;
  if (a.hasAttribute('data-admin-text')) a.textContent = CONFIG.telegramAdmin.replace('https://', '');
});
