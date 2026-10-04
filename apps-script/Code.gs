/**
 * Sherikchilik qo'llanmasi — arizalar va to'lov cheklarini qabul qiluvchi veb-ilova.
 *
 * Saytdan kelgan ma'lumotni:
 *   1) shu Google Sheets jadvaliga yozadi,
 *   2) chek faylini Google Drive'dagi "Sherikchilik cheklari" papkasiga saqlaydi,
 *   3) Telegram'ga (bot orqali) xabar va chekni yuboradi.
 *
 * O'rnatish: apps-script/README.md
 * Script properties (Loyiha sozlamalari → Script properties):
 *   BOT_TOKEN — @BotFather bergan token
 *   CHAT_ID   — xabar boradigan chat yoki guruh ID raqami
 */

var FOLDER_NAME = 'Sherikchilik cheklari';
var MAX_FILE_CHARS = 12 * 1024 * 1024; // base64 ko'rinishida ~9 MB fayl

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = data.type === 'receipt' ? 'receipt' : 'lead';
    var name = clean_(data.name, 100);
    var phone = clean_(data.phone, 20);
    var source = clean_(data.source, 300);
    var time = Utilities.formatDate(new Date(), 'Asia/Tashkent', 'dd.MM.yyyy HH:mm');

    var text = (type === 'receipt' ? '🧾 Yangi to\'lov cheki' : '📝 Yangi ariza') +
      '\n\nIsm: ' + name +
      '\nTelefon: ' + phone +
      '\nVaqt: ' + time +
      '\nSahifa: ' + source;

    var fileUrl = '';
    var blob = null;
    if (type === 'receipt' && data.file && data.file.data && data.file.data.length <= MAX_FILE_CHARS) {
      var mime = /^(image\/(jpeg|png|webp|heic)|application\/pdf)$/.test(data.file.type) ? data.file.type : 'application/octet-stream';
      blob = Utilities.newBlob(Utilities.base64Decode(data.file.data), mime, clean_(data.file.name, 120) || 'chek');
      fileUrl = getFolder_().createFile(blob).getUrl();
    }

    appendRow_([time, type === 'receipt' ? 'Chek' : 'Ariza', name, phone, fileUrl, source]);
    sendTelegram_(text, blob);

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false });
  }
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

function appendRow_(row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return;
  var sheet = ss.getSheetByName('Arizalar') || ss.insertSheet('Arizalar');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Vaqt', 'Turi', 'Ism', 'Telefon', 'Chek fayli', 'Sahifa']);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(row);
}

function getFolder_() {
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

function sendTelegram_(text, blob) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('BOT_TOKEN');
  var chat = props.getProperty('CHAT_ID');
  if (!token || !chat) return;
  var base = 'https://api.telegram.org/bot' + token + '/';
  if (blob) {
    UrlFetchApp.fetch(base + 'sendDocument', {
      method: 'post',
      payload: { chat_id: chat, caption: text, document: blob },
      muteHttpExceptions: true,
    });
  } else {
    UrlFetchApp.fetch(base + 'sendMessage', {
      method: 'post',
      payload: { chat_id: chat, text: text },
      muteHttpExceptions: true,
    });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Sinov: muharrirda shu funksiyani tanlab "Run" bosing — Telegram'ga sinov xabari keladi. */
function testTelegram() {
  sendTelegram_('✅ Sayt ulanishi ishlayapti', null);
}
