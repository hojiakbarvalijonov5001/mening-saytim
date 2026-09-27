/* KODEKS — Tilda uchun yig'ilgan fayl. Qo'lda o'zgartirmang: python3 tilda/build.py */
(function () {
var root = document.getElementById('kodeks');
if (!root) return;
root.innerHTML = "<main id=\"top\">\n\n    <!-- ============ 1. HERO ============ -->\n    <section class=\"hero\">\n      <div class=\"hero__glow\" aria-hidden=\"true\"></div>\n      <div class=\"hero__stars\" aria-hidden=\"true\"></div>\n      <div class=\"container hero__grid\">\n        <div class=\"hero__content\">\n          <div class=\"chips reveal\">\n            <div class=\"chip\">\n              <span class=\"chip__icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M9 11l3 3 8-8\"/><path d=\"M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9\"/></svg></span>\n              <span><small>Tayyor qoidalar</small><b>700 ga yaqin</b></span>\n            </div>\n            <div class=\"chip\">\n              <span class=\"chip__icon\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg></span>\n              <span><small>Tejaladigan vaqt</small><b>5 yil</b></span>\n            </div>\n            <div class=\"chip\">\n              <span class=\"chip__icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M3 7h11v9H3z\"/><path d=\"M14 10h4l3 3v3h-7\"/><circle cx=\"7\" cy=\"18\" r=\"2\"/><circle cx=\"17\" cy=\"18\" r=\"2\"/></svg></span>\n              <span><small>Yetkazib berish</small><b>Bepul</b></span>\n            </div>\n          </div>\n\n          <h1 class=\"hero__title reveal\">\n            Biznesni <span class=\"accent\">KODEKS</span> bilan qiyinchiliklarsiz tizimlashtiring!\n          </h1>\n          <p class=\"hero__lead reveal\">5 yillik tajriba asosida yozilgan tayyor qoidalar to'plami — kitob shaklida.</p>\n\n          <div class=\"author reveal\">\n            <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/bobur-musaboyev-avatar.jpg\" alt=\"Bobur Musaboyev\" class=\"author__avatar\" width=\"200\" height=\"200\">\n            <span>\n              <b>Bobur Musaboyev</b>\n              <small>Qo'llanma muallifi</small>\n            </span>\n          </div>\n\n          <div class=\"hero__actions reveal\">\n            <a href=\"#buyurtma\" class=\"btn btn--gold btn--lg\">Buyurtma berish</a>\n          </div>\n        </div>\n\n        <div class=\"hero__visual reveal\">\n          <div class=\"book-stage\">\n            <div class=\"book-stage__ring\" aria-hidden=\"true\"></div>\n            <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/kodeks-book.webp\" alt=\"KODEKS — biznesni tizimlash uchun kompleks qo'llanma kitobi\" class=\"book-stage__img\" width=\"627\" height=\"1000\">\n            <div class=\"float-badge float-badge--top\">\n              <b>700+</b><span>yozilgan qoida</span>\n            </div>\n            <div class=\"float-badge float-badge--bottom\">\n              <b>30+</b><span>jarayonga aniq yechim</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 2. MUAMMOLAR ============ -->\n    <section class=\"section section--light\" id=\"muammolar\">\n      <div class=\"container\">\n        <div class=\"panel\">\n          <h2 class=\"title title--md title--center reveal\">\n            Biznesimda <span class=\"accent\">KODEKS</span> bo'lishidan avval quyidagi muammolar menda ham kuzatilar edi\n          </h2>\n\n          <div class=\"problems\">\n            <article class=\"problem problem--gold reveal\">\n              <span class=\"problem__num\">01</span>\n              <p>Xodimlar mas'uliyat his qilmas edi.</p>\n            </article>\n            <article class=\"problem problem--dark reveal\">\n              <span class=\"problem__num\">02</span>\n              <p>Ishdan ketib qolish holatlari juda ham ko'p kuzatilar edi.</p>\n            </article>\n            <article class=\"problem problem--dark reveal\">\n              <span class=\"problem__num\">03</span>\n              <p>Agar safarga borsam yoki boshqa sababga ko'ra bir hafta biznesdan uzoqlashsam, qaytgunimga qadar xodimlar bilan uchraydigan muammolar to'planib qolgan bo'lar edi.</p>\n            </article>\n            <article class=\"problem problem--light reveal\">\n              <span class=\"problem__num\">04</span>\n              <p>Doim og'zaki dakkilar berib va qayta-qayta gapirib charchar edim.</p>\n            </article>\n          </div>\n\n          <div class=\"center reveal\">\n            <a href=\"#buyurtma\" class=\"btn btn--dark\">Buyurtma berish</a>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 3. MUALLIF HIKOYASI ============ -->\n    <section class=\"section section--dark story\" id=\"hikoya\">\n      <div class=\"container story__grid\">\n        <div class=\"story__head\">\n          <h2 class=\"title reveal\">Ushbu qo'llanmani <span class=\"accent\">nima sababdan</span> va qanday yozdim?</h2>\n          <figure class=\"author-card reveal\">\n            <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/bobur-musaboyev.jpg\" alt=\"Bobur Musaboyev KODEKS kitobi bilan\" width=\"640\" height=\"640\" loading=\"lazy\">\n            <figcaption>\n              <b>Bobur Musaboyev</b>\n              <span>Qo'llanma muallifi</span>\n            </figcaption>\n          </figure>\n        </div>\n\n        <div class=\"story__body\">\n          <ol class=\"timeline\">\n            <li class=\"reveal\">\n              <span class=\"timeline__dot\"></span>\n              <p>Biznesda olgan bilimlarimni amalda qo'llash qiyin bo'lar edi. Lekin ba'zi ustozlarim sababli <b>xodimlarni og'zaki gaplar bilan emas, yozilgan qoidalar bilan boshqarish</b> kerakligini o'rgandim va amalda qo'llab ko'rdim.</p>\n            </li>\n            <li class=\"reveal\">\n              <span class=\"timeline__dot\"></span>\n              <p>Xodimlar bilan qanday muammo bo'lsa, o'sha muammoni bartaraf qilish uchun qoidalar yozib bordim va bu usul <b>juda ham ta'sirli va manfaatli natija</b> berishni boshladi.</p>\n            </li>\n            <li class=\"reveal\">\n              <span class=\"timeline__dot\"></span>\n              <p>Oradan 4–5 yil o'tganidan so'ng yozilgan qoidalar soni <b>700 ga yaqinlashdi</b> va bularning aksariyati barcha biznesga mos keladigan qoidalar edi. Bu qoidalarni yana kimdir o'z biznesiga yozib chiqishi uchun kamida 5 yil vaqt sarflashi kerak bo'lar edi.</p>\n            </li>\n            <li class=\"reveal\">\n              <span class=\"timeline__dot\"></span>\n              <p>Men esa tadbirkorlarning vaqtini tejab qolish maqsadida ushbu qo'llanmani ulashishni niyat qildim. Ammo ushbu qo'llanmaning natijasi bebaho bo'lganligi sababli, bepul yoki arzon bo'lsa qadrsiz bo'lib natijasiz holatda qolmasin degan niyatda <b>o'z qiymatiga yarasha baho</b> bilan sotuvga qo'ydim.</p>\n              <span class=\"signature\">— Bobur Musaboyev</span>\n            </li>\n          </ol>\n          <div class=\"stats reveal\">\n            <div class=\"stat\"><b data-count=\"700\">700</b><span>ga yaqin qoida</span></div>\n            <div class=\"stat\"><b>4–5</b><span>yil davomida yozilgan</span></div>\n            <div class=\"stat\"><b data-count=\"5\">5</b><span>yil vaqtingizni tejaydi</span></div>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 4. NIMA BERADI ============ -->\n    <section class=\"section section--dark\" id=\"foyda\">\n      <div class=\"container\">\n        <h2 class=\"title title--center reveal\">Qo'llanma sizga <span class=\"accent\">nima beradi?</span></h2>\n\n        <div class=\"benefits\">\n          <article class=\"benefit reveal\">\n            <div class=\"benefit__media benefit__media--blue\">\n              <span class=\"benefit__icon\"><svg viewBox=\"0 0 24 24\"><circle cx=\"9\" cy=\"8\" r=\"4\"/><path d=\"M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7\"/><path d=\"M19 8v6M16 11h6\"/></svg></span>\n            </div>\n            <h3>Xodim olishda qayta-qayta qiynalmaysiz</h3>\n            <p>Xodimni ishga olishda o'rgatilishi kerak bo'lgan qoidalarning barchasini qo'llanmada topasiz va yangi xodimlarni ishga moslashtirish osonlashadi.</p>\n          </article>\n          <article class=\"benefit reveal\">\n            <div class=\"benefit__media benefit__media--gold\">\n              <span class=\"benefit__icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg></span>\n            </div>\n            <h3>Nazoratni osonlashtiradi</h3>\n            <p>Agar qoidalar yozilmagan bo'lsa, rahbardan boshqa odam nazorat qila olmaydi va bu holat rahbarning energiyasini tamom qiladi. Qo'llanma esa nazoratni oddiy xodim ham qila olishini osonlashtiradi. Bu esa xodimlarda doimiy mas'uliyat bilan ishlash ehtimolini oshiradi.</p>\n          </article>\n          <article class=\"benefit reveal\">\n            <div class=\"benefit__media benefit__media--light\">\n              <span class=\"benefit__icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M3 12h4l3-8 4 16 3-8h4\"/></svg></span>\n            </div>\n            <h3>Biznes egasi qatnashuvini kamaytiradi</h3>\n            <p>Bu qo'llanmadagi qoidalar ish boshqaruvchilar (direktor, HR va bo'lim rahbarlari) kabi top xodimlarning ishlashini osonlashtiradi va bu rahbarning ko'proq oilaga, sayohatga va strategiyaga vaqt ajrata olishiga imkon beradi.</p>\n          </article>\n        </div>\n\n        <div class=\"center reveal\">\n          <a href=\"#buyurtma\" class=\"btn btn--gold btn--lg\">Buyurtma berish</a>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 5. QAYSI SAVOLLARGA JAVOB BERADI ============ -->\n    <section class=\"section section--light\" id=\"savollar\">\n      <div class=\"container\">\n        <h2 class=\"title title--center reveal\"><span class=\"accent\">Qo'llanma</span> qaysi savollarga javob beradi?</h2>\n\n        <div class=\"toc panel panel--soft reveal\">\n          <ul class=\"plus-list\">\n            <li>Direktor qanday tartibda ishlashi kerak?</li>\n            <li>HR bo'limi qanday ishlashi kerak?</li>\n            <li>Xodimlarni ishga olishda qanday qoidalar bilan qay tartibda tanishtirilishi kerak?</li>\n            <li>Mijozlar bilan qanday muomalada bo'lishi kerak?</li>\n            <li>Sotuv bo'limi qanday tartibda ishlashi kerak?</li>\n            <li>Ichki madaniyat qoidalariga kim qanday amal qilishi kerak?</li>\n            <li>Xodimlarning itoati va punktualligi qay tartibda bo'lishi kerak?</li>\n          </ul>\n          <aside class=\"toc__card\">\n            <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/kodeks-book.webp\" alt=\"\" class=\"toc__book\" width=\"627\" height=\"1000\" loading=\"lazy\">\n            <p class=\"toc__card-text\">Shu va shu kabi savollarga qo'llanmada <b>to'liq javob</b> olasiz.</p>\n            <a href=\"#buyurtma\" class=\"btn btn--dark btn--block\">Buyurtma berish</a>\n          </aside>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 6. KIMLAR UCHUN ============ -->\n    <section class=\"section section--dark\" id=\"kimlar\">\n      <div class=\"container\">\n        <h2 class=\"title title--center reveal\">KODEKS qo'llanmasi kimlarga <span class=\"accent\">100% yordam</span> beradi?</h2>\n\n        <div class=\"audience\">\n          <div class=\"audience__card audience__card--yes reveal\">\n            <ul class=\"check-list\">\n              <li>Biznesni tartibli yuritmoqchi bo'lgan katta-yu kichik tadbirkorlarga</li>\n              <li>Nazoratni osonlashtirib, biznesini kengaytirmoqchi bo'lgan tadbirkorlarga</li>\n              <li>Xodimlar boshqaruvida qiyinchilik ko'rayotgan har qanday rahbarlarga</li>\n              <li>Tizim qurib, keyinchalik xotirjam biznes qilmoqchi bo'lgan biznes egalariga</li>\n            </ul>\n          </div>\n          <div class=\"audience__card audience__card--no reveal\">\n            <h3>Qo'llanma kimlar uchun <span>emas!</span></h3>\n            <ul class=\"cross-list\">\n              <li>O'zim hamma narsani bilaman deb o'ylaydiganlar</li>\n              <li>Jamiyat uchun zararli bizneslar</li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 7. NATIJALAR ============ -->\n    <section class=\"section section--light\" id=\"natijalar\">\n      <div class=\"container\">\n        <h2 class=\"title title--center reveal\">Qo'llanmani olgandan so'ng <span class=\"accent\">quyidagi natijalarga</span> erishasiz!</h2>\n\n        <div class=\"results\">\n          <article class=\"result reveal\">\n            <span class=\"result__num\">1</span>\n            <p>Qoidalar orqali o'z boshqaruv usulingizga ega bo'lasiz. Dehqonchasiga boshqarishni bas qilasiz.</p>\n          </article>\n          <article class=\"result result--accent reveal\">\n            <span class=\"result__num\">2</span>\n            <p>5 yil davomida eng muhim jarayonlarda yozilgan qoidalarni qaytadan yozishga vaqt sarflamaysiz va eng kamida 5 yil umringizni tejab qolasiz.</p>\n          </article>\n          <article class=\"result reveal\">\n            <span class=\"result__num\">3</span>\n            <p>Korxonani masofadan boshqara oladigan tizim imkoniyati sizda bo'ladi. Kodeks, ya'ni qoidalarsiz biznes tizimli bo'lmaydi.</p>\n          </article>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 8. IKKI YO'L ============ -->\n    <section class=\"section section--dark\" id=\"yol\">\n      <div class=\"container\">\n        <h2 class=\"title title--center reveal\">Sizda <span class=\"accent\">2 ta yo'l</span> bor</h2>\n\n        <div class=\"paths\">\n          <div class=\"path path--old reveal\">\n            <span class=\"path__tag\">1-yo'l</span>\n            <p>Boshqaruvni eskicha va dehqoncha usulda davom ettirasiz. Biznes esa tartibsiz holda davom etadi.</p>\n          </div>\n          <div class=\"path path--new reveal\">\n            <span class=\"path__tag\">2-yo'l</span>\n            <p>Ushbu qo'llanmani xarid qilasiz va millionlab pullaringizni hamda salomatligingizni tejab qolasiz.</p>\n            <a href=\"#buyurtma\" class=\"btn btn--dark btn--block\">Buyurtma berish</a>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 9. BAHONALAR ============ -->\n    <section class=\"section section--dark section--tight\" id=\"bahonalar\">\n      <div class=\"container\">\n        <h2 class=\"title title--center reveal\">Sizdagi <span class=\"accent\">bahonalar</span></h2>\n\n        <div class=\"excuses\">\n          <article class=\"excuse reveal\">\n            <div class=\"excuse__q\">\n              <span class=\"excuse__label\">Bahona</span>\n              <p>\"Keyinroq olaman, yaxshi qo'llanma ekan.\"</p>\n            </div>\n            <div class=\"excuse__a\">\n              <span class=\"excuse__label excuse__label--gold\">Bizning tavsiyamiz</span>\n              <p>Keyinga surilgan ish doim qolib ketadi va shuncha ilmdan uzoqlashasiz, chegirma va sovg'alarimiz ham keyin berilmasligi mumkin.</p>\n            </div>\n          </article>\n          <article class=\"excuse reveal\">\n            <div class=\"excuse__q\">\n              <span class=\"excuse__label\">Bahona</span>\n              <p>\"O'zim ham bilaman.\"</p>\n            </div>\n            <div class=\"excuse__a\">\n              <span class=\"excuse__label excuse__label--gold\">Bizning tavsiyamiz</span>\n              <p>Ishoning, siz bilmagan va muhim ma'lumotlar ushbu qo'llanmada topiladi.</p>\n            </div>\n          </article>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 10. KAFOLAT ============ -->\n    <section class=\"section section--light section--tight\">\n      <div class=\"container\">\n        <div class=\"guarantee reveal\">\n          <div class=\"guarantee__text\">\n            <p>KODEKSni biznesingizga to'g'ri qo'llasangiz</p>\n            <h2>Biznesingiz 100% tizimlashadi!</h2>\n          </div>\n          <div class=\"ticket\" aria-hidden=\"true\">\n            <div class=\"ticket__main\">\n              <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/kodeks-book.webp\" alt=\"\" width=\"627\" height=\"1000\" loading=\"lazy\">\n              <div>\n                <b>100%</b>\n                <span>Kafolat</span>\n              </div>\n            </div>\n            <div class=\"ticket__stub\">\n              <span class=\"ticket__barcode\"></span>\n              <small>KODEKS · Biznes Javon</small>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 11. BUYURTMA ============ -->\n    <section class=\"section section--dark order\" id=\"buyurtma\">\n      <div class=\"hero__glow hero__glow--order\" aria-hidden=\"true\"></div>\n      <div class=\"container order__grid\">\n        <div class=\"order__visual reveal\">\n          <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/kodeks-book.webp\" alt=\"KODEKS kitobi\" width=\"627\" height=\"1000\" loading=\"lazy\">\n        </div>\n\n        <div class=\"order__card reveal\">\n          <h2 class=\"title\">Sotib olish uchun <span class=\"accent\">hoziroq ro'yxatdan o'ting</span></h2>\n          <ul class=\"order__perks\">\n            <li>Qo'llanma kitob shaklida uyingizgacha <b>BEPUL</b> yetkazib beriladi</li>\n            <li>1 ish kuni ichida siz bilan aloqaga chiqamiz</li>\n          </ul>\n\n          <div class=\"order__price\" data-price-wrap hidden>\n            <span>Narxi:</span>\n            <b data-price></b>\n          </div>\n\n          <a href=\"#buyurtma\" class=\"btn btn--gold btn--lg btn--block order__cta\">Buyurtma berish</a>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 12. FAQ ============ -->\n    <section class=\"section section--light\" id=\"faq\">\n      <div class=\"container container--narrow\">\n        <h2 class=\"title title--center reveal\">Ko'p beriladigan <span class=\"accent\">savollar</span></h2>\n\n        <div class=\"faq\">\n          <details class=\"faq__item reveal\" open>\n            <summary>Qo'llanmani qanday sotib olaman?</summary>\n            <p>Shu saytning o'zida sotib olish tugmasini bosing va to'lov qismiga o'tib to'lovni amalga oshiring! Biz esa sizga 1 ish kuni ichida aloqaga chiqamiz, yetkazib berish bo'yicha ma'lumotlar olamiz va qo'llanmani sizning manzilingizgacha <b>BEPUL</b> yetkazib beramiz.</p>\n          </details>\n          <details class=\"faq__item reveal\">\n            <summary>Qo'llanma PDF shaklidami yoki kitob shaklida?</summary>\n            <p>Qo'llanmamiz kitob shaklida sizning uyingizgacha yetkazib beriladi.</p>\n          </details>\n          <details class=\"faq__item reveal\">\n            <summary>Chegirma bormi?</summary>\n            <p>Qo'llanmaga juda muhim sabab bo'lmasa chegirma berilmaydi, chunki bu qo'llanmaning borligi o'zi katta muammolarga yechim bo'ladi.</p>\n          </details>\n        </div>\n      </div>\n    </section>\n\n    <!-- ============ 13. ALOQA ============ -->\n    <section class=\"section section--dark section--tight\">\n      <div class=\"container\">\n        <div class=\"contact reveal\">\n          <div>\n            <h2 class=\"title\">Savollaringiz <span class=\"accent\">qoldimi?</span></h2>\n            <p>Administrator telegrami</p>\n          </div>\n          <a href=\"#\" class=\"btn btn--blue btn--lg\" data-telegram target=\"_blank\" rel=\"noopener\">\n            <svg viewBox=\"0 0 24 24\" class=\"btn__icon\"><path d=\"M21.5 4.5L2.9 11.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.6z\"/></svg>\n            Murojaat qiling!\n          </a>\n        </div>\n      </div>\n    </section>\n  </main>\n\n  <footer class=\"footer\">\n    <div class=\"container footer__inner\">\n      <a href=\"#top\" class=\"logo\">\n        <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/biznes-javon-logo.png\" alt=\"\" class=\"logo__img\" width=\"256\" height=\"194\">\n        <span class=\"logo__text\">Biznes <b>Javon</b></span>\n      </a>\n      <p>© <span data-year>2026</span> Biznes Javon. Biznes kitoblari loyihasi.</p>\n    </div>\n  </footer>\n\n  <!-- ============ BUYURTMA OYNASI ============ -->\n  <dialog class=\"modal\" id=\"orderModal\" aria-labelledby=\"modalTitle\">\n    <div class=\"modal__box\">\n      <button type=\"button\" class=\"modal__close\" data-modal-close aria-label=\"Yopish\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg>\n      </button>\n\n      <ol class=\"steps\" aria-label=\"Buyurtma bosqichlari\">\n        <li class=\"steps__item is-active\" data-step-dot=\"1\"><span>1</span>Ma'lumotlar</li>\n        <li class=\"steps__item\" data-step-dot=\"2\"><span>2</span>To'lov</li>\n        <li class=\"steps__item\" data-step-dot=\"3\"><span>3</span>Chek</li>\n      </ol>\n\n      <!-- 1-bosqich: savollar -->\n      <form class=\"modal__step form\" data-step=\"1\" id=\"stepInfo\" novalidate>\n        <h2 class=\"modal__title\" id=\"modalTitle\">Buyurtma berish</h2>\n        <p class=\"modal__lead\">Quyidagi savollarga javob bering.</p>\n\n        <label class=\"field\" for=\"o-name\">\n          <span>Ismingiz?</span>\n          <input type=\"text\" id=\"o-name\" name=\"name\" placeholder=\"Ismingiz\" autocomplete=\"name\" required>\n        </label>\n        <label class=\"field\" for=\"o-phone\">\n          <span>Telefon raqamingiz?</span>\n          <input type=\"tel\" id=\"o-phone\" name=\"phone\" placeholder=\"+998 __ ___ __ __\" autocomplete=\"tel\" inputmode=\"tel\" required>\n        </label>\n        <label class=\"field\" for=\"o-address\">\n          <span>Manzilingiz?</span>\n          <input type=\"text\" id=\"o-address\" name=\"address\" placeholder=\"Viloyat, shahar/tuman, ko'cha, uy\" autocomplete=\"street-address\" required>\n        </label>\n        <div class=\"field-row\">\n          <label class=\"field\" for=\"o-staff\">\n            <span>Xodimlaringiz soni?</span>\n            <input type=\"number\" id=\"o-staff\" name=\"staff\" placeholder=\"Masalan: 12\" min=\"0\" inputmode=\"numeric\" required>\n          </label>\n          <label class=\"field\" for=\"o-activity\">\n            <span>Faoliyatingiz?</span>\n            <input type=\"text\" id=\"o-activity\" name=\"activity\" placeholder=\"Masalan: savdo, ishlab chiqarish\" required>\n          </label>\n        </div>\n\n        <p class=\"form__msg\" role=\"status\" aria-live=\"polite\"></p>\n        <button type=\"submit\" class=\"btn btn--gold btn--lg btn--block\">Keyingi qadam</button>\n      </form>\n\n      <!-- 2-bosqich: to'lov -->\n      <div class=\"modal__step\" data-step=\"2\" hidden>\n        <h2 class=\"modal__title\">To'lov</h2>\n        <p class=\"modal__lead\">Quyidagi havola orqali to'lovni amalga oshiring, so'ng chekni yuklang.</p>\n\n        <div class=\"pay-price\" data-price-wrap hidden>\n          <span>To'lov summasi:</span>\n          <b data-price></b>\n        </div>\n\n        <div class=\"pay-slot\" data-pay-slot>\n          <!-- To'lov havolasi CONFIG.paymentUrl orqali qo'shiladi -->\n          <a href=\"#\" class=\"btn btn--blue btn--lg btn--block\" data-pay-link target=\"_blank\" rel=\"noopener\" hidden>To'lov qilish</a>\n          <p class=\"pay-slot__empty\" data-pay-empty>To'lov havolasi shu yerda bo'ladi</p>\n        </div>\n\n        <button type=\"button\" class=\"btn btn--gold btn--lg btn--block\" data-go=\"3\">To'lov qildim — chekni yuklash</button>\n        <button type=\"button\" class=\"modal__back\" data-go=\"1\">← Ma'lumotlarni o'zgartirish</button>\n\n        <a href=\"#\" class=\"admin-link\" data-telegram target=\"_blank\" rel=\"noopener\">\n          <svg viewBox=\"0 0 24 24\" class=\"btn__icon\"><path d=\"M21.5 4.5L2.9 11.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.6z\"/></svg>\n          <span>Savol bo'lsa, admin bilan bog'lanish</span>\n        </a>\n      </div>\n\n      <!-- 3-bosqich: chek yuklash -->\n      <form class=\"modal__step form\" data-step=\"3\" id=\"stepCheck\" novalidate hidden>\n        <h2 class=\"modal__title\">Chekni yuklang</h2>\n        <p class=\"modal__lead\">To'lov chekining rasmi yoki skrinshotini yuklang.</p>\n\n        <label class=\"upload\" for=\"o-check\">\n          <input type=\"file\" id=\"o-check\" name=\"check\" accept=\"image/*,application/pdf\" required>\n          <span class=\"upload__icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 16V4M7 9l5-5 5 5\"/><path d=\"M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3\"/></svg></span>\n          <span class=\"upload__text\" data-upload-text>Chekni tanlash uchun bosing</span>\n          <img class=\"upload__preview\" data-upload-preview alt=\"\" hidden>\n        </label>\n\n        <p class=\"form__msg\" role=\"status\" aria-live=\"polite\"></p>\n        <button type=\"submit\" class=\"btn btn--gold btn--lg btn--block\">Chekni yuborish</button>\n        <button type=\"button\" class=\"modal__back\" data-go=\"2\">← To'lov sahifasiga qaytish</button>\n\n        <a href=\"#\" class=\"admin-link\" data-telegram target=\"_blank\" rel=\"noopener\">\n          <svg viewBox=\"0 0 24 24\" class=\"btn__icon\"><path d=\"M21.5 4.5L2.9 11.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.6z\"/></svg>\n          <span>Admin bilan bog'lanish</span>\n        </a>\n      </form>\n\n      <!-- 4: yakun -->\n      <div class=\"modal__step modal__done\" data-step=\"4\" hidden>\n        <span class=\"done__icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M5 12.5l4.5 4.5L19 7.5\"/></svg></span>\n        <h2 class=\"modal__title\">Tabriklaymiz!</h2>\n        <p class=\"modal__lead\">Chekingiz qabul qilindi. Siz KODEKS qo'llanmasi egasiga aylandingiz. 1 ish kuni ichida siz bilan bog'lanib, qo'llanmani manzilingizga yetkazib berish bo'yicha ma'lumotlarni aniqlashtiramiz.</p>\n        <button type=\"button\" class=\"btn btn--gold btn--lg btn--block\" data-modal-close>Yopish</button>\n        <a href=\"#\" class=\"admin-link\" data-telegram target=\"_blank\" rel=\"noopener\">\n          <svg viewBox=\"0 0 24 24\" class=\"btn__icon\"><path d=\"M21.5 4.5L2.9 11.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.6z\"/></svg>\n          <span>Admin bilan bog'lanish</span>\n        </a>\n      </div>\n    </div>\n  </dialog>\n\n  <!-- ============ PASTKI PANEL ============ -->\n  <div class=\"bottom-bar\" id=\"top-bar\">\n    <div class=\"container bottom-bar__inner\">\n      <a href=\"#top\" class=\"logo\" aria-label=\"Biznes Javon\">\n        <img src=\"https://cdn.jsdelivr.net/gh/hojiakbarvalijonov5001/mening-saytim@62019b56eb29c6bde076250113494773b192748e/assets/img/biznes-javon-logo.png\" alt=\"\" class=\"logo__img\" width=\"256\" height=\"194\">\n        <span class=\"logo__text\">Biznes <b>Javon</b></span>\n      </a>\n      <a href=\"#buyurtma\" class=\"btn btn--gold btn--sm\">Buyurtma berish</a>\n    </div>\n  </div>";
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

})();
