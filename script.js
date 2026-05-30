/* ============================================================
   GEOSTAR Car Showroom — script.js
   Connected to Supabase — cars load from database
   ============================================================ */

/* ── Supabase Config ─────────────────────────────────────── */
var SUPABASE_URL = 'https://xzsddfwilsavipjfnoah.supabase.co';
var SUPABASE_KEY = 'sb_publishable_bQum6u1FgRS3Vsg_Nh8n0Q_Eb7raDug';
var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ── Translations ────────────────────────────────────────── */
var TRANSLATIONS = {
  en: {
    'nav.home':'Home','nav.order':'Order','nav.showroom':'Showroom','nav.contact':'Contact',
    'hero.eyebrow':'Geostar is the best choice',
    'hero.sub':'The first Algerian website for Chinese car prices in Algeria with competitive prices including shipping costs without customs duties.',
    'hero.cta.fleet':'Explore Fleet','hero.cta.visit':'Book a Visit','hero.scroll':'Scroll',
    'stats.models':'Premium Models','stats.years':'Years in Business','stats.clients':'Happy Clients','stats.rating':'Customer Rating',
    'cars.eyebrow':'Our Fleet','cars.title':'AVAILABLE CHINESE VEHICLES','cars.desc':'Handpicked models offering comfort, performance, and style.',
    'filter.all':'All','filter.suv':'SUV','filter.hatchback':'Hatchback','filter.sedan':'Sedan',
    'search.placeholder':'Search by name or description…','search.noresults':'No cars match your search.',
    'card.viewdetails':'View Car','card.order':'Commander',
    'modal.specs':'Specifications','modal.features':'Key Features','modal.order':'Commander',
    'contact.eyebrow':'Get in Touch','contact.title':'Visit the Showroom',
    'contact.desc':'Our team is ready to guide you through every model, arrange a test drive, or help you configure your perfect vehicle.',
    'contact.location.label':'Location','contact.location.value':'GEOSTAR BLIDA',
    'contact.phone.label':'Phone','contact.hours.label':'Hours','contact.hours.value':'Sat – Thu: 9:00 AM – 5:00 PM',
    'form.firstname.label':'First Name','form.firstname.placeholder':'Ahmed',
    'form.lastname.label':'Last Name','form.lastname.placeholder':'Benali',
    'form.wilaya.label':'Wilaya of Residence','form.wilaya.placeholder':'Select your wilaya…',
    'form.phone.label':'Phone Number','form.phone.placeholder':'05XX XX XX XX',
    'form.submit':'Send Message','form.success':'✓ Message sent! We\'ll be in touch shortly.',
    'footer.tagline':'Driving Excellence Since 2013','footer.copy':'© 2026 GEOSTAR AUTO Showroom. All rights reserved.',
    'spec.engine':'Engine','spec.transmission':'Transmission','spec.fuel':'Fuel Type',
    'spec.acceleration':'0–100 km/h','spec.topspeed':'Top Speed','spec.economy':'Fuel Eco',
    'nav.showroom':'Showroom','nav.order':'Order'
  },
  ar: {
    'nav.home':'الرئيسية','nav.order':'الطلب','nav.showroom':'المعرض','nav.contact':'التواصل',
    'hero.eyebrow':'جيوستار احسن اختيار',
    'hero.sub':'اول موقع جزائري لاسعار السيارات الصينيه في الجزائر بأسعار تنافسية شاملة لتكاليف الشحن بدون جمركة.',
    'hero.cta.fleet':'استعرض الأسطول','hero.cta.visit':'احجز زيارة','hero.scroll':'مرر',
    'stats.models':'موديلات فاخرة','stats.years':'سنوات في الخدمة','stats.clients':'عميل سعيد','stats.rating':'تقييم العملاء',
    'cars.eyebrow':'أسطولنا','cars.title':'المركبات الصينية المتاحة','cars.desc':'موديلات مختارة بعناية توفر الراحة والأداء والأناقة.',
    'filter.all':'الكل','filter.suv':'دفع رباعي','filter.hatchback':'هاتشباك','filter.sedan':'سيدان',
    'search.placeholder':'ابحث بالاسم أو الوصف…','search.noresults':'لا توجد سيارات تطابق بحثك.',
    'card.viewdetails':'عرض السيارة','card.order':'اطلب الآن',
    'modal.specs':'المواصفات','modal.features':'المميزات الرئيسية','modal.order':'اطلب الآن',
    'contact.eyebrow':'تواصل معنا','contact.title':'زر المعرض',
    'contact.desc':'فريقنا جاهز لإرشادك عبر كل موديل وترتيب تجربة قيادة.',
    'contact.location.label':'الموقع','contact.location.value':'جيوستار البليدة',
    'contact.phone.label':'الهاتف','contact.hours.label':'ساعات العمل','contact.hours.value':'السبت – الخميس: 9:00 ص – 5:00 م',
    'form.firstname.label':'الاسم','form.firstname.placeholder':'أحمد',
    'form.lastname.label':'اللقب','form.lastname.placeholder':'بن علي',
    'form.wilaya.label':'ولاية الإقامة','form.wilaya.placeholder':'اختر ولايتك…',
    'form.phone.label':'رقم الهاتف','form.phone.placeholder':'05XX XX XX XX',
    'form.submit':'إرسال الرسالة','form.success':'✓ تم إرسال رسالتك! سنتواصل معك قريباً.',
    'footer.tagline':'نحو التميز في القيادة منذ 2013','footer.copy':'© 2026 معرض جيوستار أوتو. جميع الحقوق محفوظة.',
    'spec.engine':'المحرك','spec.transmission':'ناقل الحركة','spec.fuel':'نوع الوقود',
    'spec.acceleration':'0–100 كم/س','spec.topspeed':'السرعة القصوى','spec.economy':'استهلاك الوقود',
    'nav.showroom':'المعرض','nav.order':'الطلب'
  }
};

var CAR_AR = {
  badges:{'Best Seller':'الأكثر مبيعاً','Value Pick':'أفضل قيمة','New Arrival':'وصل حديثاً','Popular':'الأكثر شعبية'},
  specs:{
    'Petrol':'بنزين','Petrol (Turbo)':'بنزين (توربو)','7-speed DSG':'ناقل 7 سرعات DSG',
    '5-speed Manual / CVT':'5 سرعات يدوي / CVT','7-speed DCT':'ناقل 7 سرعات DCT',
    '6-speed Manual / 7-speed DSG':'6 يدوي / 7 DSG','7-speed DSG (4MOTION)':'7 DSG رباعي الدفع',
    '8-speed Automatic':'أوتوماتيك 8 سرعات'
  },
  features:{
    'Digital Cockpit Pro':'كوكبيت رقمي برو','LED Matrix Headlights':'مصابيح LED ماتريكس',
    'ABS + ESC':'ABS + ESC','Adaptive Cruise Control':'مثبت سرعة تكيفي',
    'Lane Assist':'مساعد الحارة','Park Assist':'مساعد الوقوف',
    'Wireless CarPlay':'CarPlay لاسلكي','Heated Seats':'مقاعد مدفأة',
    'Rear-View Camera':'كاميرا خلفية','Travel Assist':'مساعد السفر',
    '10" Touchscreen':'شاشة لمس 10 بوصة','Apple CarPlay / Android Auto':'CarPlay / Android Auto',
    'ABS + EBD':'ABS + EBD','Front & Rear Sensors':'حساسات أمامية وخلفية',
    'Rear Camera':'كاميرا خلفية','Keyless Entry':'دخول بدون مفتاح',
    'Multi-function Steering Wheel':'عجلة قيادة متعددة الوظائف',
    'Electric Windows':'نوافذ كهربائية','Bluetooth Audio':'صوت بلوتوث',
    'Panoramic Sunroof':'سقف بانورامي','12" Central Screen':'شاشة مركزية 12 بوصة',
    '360° Camera':'كاميرا 360 درجة','Electric Seats':'مقاعد كهربائية',
    'ABS + ESP':'ABS + ESP','Hill Descent Control':'تحكم في النزول',
    'Auto LED Headlights':'مصابيح LED أوتوماتيك','Voice Control':'تحكم صوتي',
    'TPMS':'مراقبة ضغط الإطارات','Virtual Cockpit':'كوكبيت افتراضي',
    'Amundsen Navigation':'ملاحة أموندسن','ABS + ESC + TCS':'ABS + ESC + TCS',
    'Blind Spot Detection':'كشف النقطة العمياء',
    'Front Assist (Emergency Braking)':'مساعد أمامي (فرمل طارئ)',
    'Simply Clever Storage':'تخزين ذكي','Climatronic 2-Zone':'تكييف منطقتين',
    'LED Ambient Lighting':'إضاءة محيطية LED','Wireless Charging':'شحن لاسلكي',
    'Active Info Display':'شاشة معلومات نشطة','Discover Pro Navigation':'ملاحة Discover Pro',
    '4MOTION AWD':'دفع رباعي 4MOTION','Dynamic Chassis Control':'تحكم ديناميكي بالهيكل',
    'ACC with Stop & Go':'ACC مع إيقاف وتشغيل','Lane Change Assist':'مساعد تغيير الحارة',
    'Area View (360°)':'عرض منطقة 360 درجة','Keyless Access':'وصول بدون مفتاح',
    'Panoramic Roof':'سقف بانورامي','LED Headlights':'مصابيح LED',
    'Pure Panel Digital Cockpit':'كوكبيت رقمي Pure Panel',
    'IntelliLux LED Matrix':'LED Matrix إنتيلوكس',
    'ABS + ESP + Hill Assist':'ABS + ESP + مساعد تلة',
    'Rear Camera + Sensors':'كاميرا + حساسات خلفية',
    'Ergonomic AGR Seats':'مقاعد أرغونومية AGR',
    'Wireless Smartphone Integration':'تكامل هاتف لاسلكي',
    'Traffic Sign Recognition':'التعرف على لافتات المرور',
    'Driver Attention Alert':'تنبيه انتباه السائق','Heated Steering Wheel':'عجلة قيادة مدفأة'
  }
};

var BRANDS = [
  {key:'all',label:'All',labelAr:'الكل'},
  {key:'volkswagen',label:'Volkswagen',labelAr:'فولكس واغن'},
  {key:'mg',label:'MG',labelAr:'MG'},
  {key:'livan',label:'Livan',labelAr:'ليفان'},
  {key:'skoda',label:'Skoda',labelAr:'سكودا'},
  {key:'opel',label:'Opel',labelAr:'أوبل'},
  {key:'geely',label:'Geely',labelAr:'جيلي'},
  {key:'jetour',label:'Jetour',labelAr:'جيتور'},
  {key:'kia',label:'Kia',labelAr:'كيا'},
  {key:'changan',label:'Changan',labelAr:'شانجان'},
  {key:'roewe',label:'Roewe',labelAr:'رووي'},
  {key:'jetta',label:'Jetta',labelAr:'جيتا'}
];

/* ── Cars loaded from Supabase ───────────────────────────── */
var CARS = [];

/* ── State ───────────────────────────────────────────────── */
var activeFilter    = 'all';
var activeBrand     = 'all';
var searchQuery     = '';
var currentLang     = 'en';
var modalGalleryIdx = 0;
var galleryState    = {};
var selectedCarName = '';

/* ── Parse helper for JSON fields from DB ────────────────── */
function parseField(val) {
  if (!val) return [];
  if (typeof val === 'object') return val;
  try { return JSON.parse(val); } catch(e) { return []; }
}
function parseSpecs(val) {
  if (!val) return {};
  if (typeof val === 'object' && !Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch(e) { return {}; }
}

/* ── i18n ────────────────────────────────────────────────── */
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || TRANSLATIONS.en[key] || key;
}
function applyTranslations() {
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.classList.toggle('lang-ar', currentLang === 'ar');
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var v = t(el.getAttribute('data-i18n')); if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var v = t(el.getAttribute('data-i18n-placeholder')); if (v) el.setAttribute('placeholder', v);
  });
  renderBrandFilters();
  renderCars();
}

/* ── Translation helpers ─────────────────────────────────── */
function tBadge(b)  { return b ? (currentLang==='ar' ? (CAR_AR.badges[b]||b) : b) : null; }
function tDesc(car) { return car.description || ''; }
function tSpec(v)   { return currentLang==='ar' ? (CAR_AR.specs[v]||v) : v; }
function tFeat(f)   { return currentLang==='ar' ? (CAR_AR.features[f]||f) : f; }
function localSpecs(car) {
  var s = car.specs || {};
  if (currentLang === 'en') return s;
  var o = {};
  o[t('spec.engine')]       = s.Engine        || s.engine        || '';
  o[t('spec.transmission')] = tSpec(s.Transmission || s.transmission || '');
  o[t('spec.fuel')]         = tSpec(s['Fuel Type'] || s.fuel_type || '');
  o[t('spec.acceleration')] = s['0–100 km/h'] || s.acceleration  || '';
  o[t('spec.topspeed')]     = s['Top Speed']  || s.top_speed     || '';
  o[t('spec.economy')]      = s['Fuel Eco']   || s.fuel_eco      || '';
  return o;
}

/* ── Filter — FIXED: case-insensitive brand comparison ────── */
function getFiltered() {
  return CARS.filter(function(car) {
    var okCat   = activeFilter === 'all' || (car.category||'').toLowerCase() === activeFilter.toLowerCase();
    var okBrand = activeBrand  === 'all' || (car.brand||'').toLowerCase()    === activeBrand.toLowerCase();
    var q       = searchQuery.toLowerCase();
    var okQ     = !q || (car.name||'').toLowerCase().indexOf(q) > -1
                     || (car.brand||'').toLowerCase().indexOf(q) > -1
                     || (car.description||'').toLowerCase().indexOf(q) > -1;
    return okCat && okBrand && okQ;
  });
}

/* ── Card HTML ───────────────────────────────────────────── */
function cardHTML(car) {
  var imgs  = (car.images && car.images.length) ? car.images.filter(Boolean) : [''];
  var idx   = galleryState[car.id] || 0;
  var badge = tBadge(car.badge);

  var badgeH = badge ? '<div class="car-badge">'+badge+'</div>' : '';
  var arrowH = imgs.length > 1
    ? '<button class="gallery-arrow gallery-prev" data-car-id="'+car.id+'">&#8249;</button>'
    + '<button class="gallery-arrow gallery-next" data-car-id="'+car.id+'">&#8250;</button>' : '';
  var dotsH = imgs.length > 1
    ? '<div class="gallery-dots">'+imgs.map(function(_,i){
        return '<span class="gallery-dot'+(i===idx?' active':'')+'"></span>';
      }).join('')+'</div>' : '';

  var specs = car.specs || {};
  var fuelType = specs['Fuel Type'] || specs.fuel_type || '';
  var trans    = specs.Transmission || specs.transmission || '';

  return '<article class="car-card reveal" data-id="'+car.id+'" tabindex="0">'
    +'<div class="car-image-wrap">'
      +'<img class="car-gallery-img" src="'+imgs[idx]+'" alt="'+car.brand+' '+car.name+'" loading="lazy"/>'
      +badgeH+arrowH+dotsH
    +'</div>'
    +'<div class="car-body">'
      +'<p class="car-brand">'+car.brand+'</p>'
      +'<h3 class="car-name">'+car.name+'</h3>'
      +'<p class="car-price">'+car.price+'</p>'
      +'<p class="car-desc">'+tDesc(car)+'</p>'
      +'<div class="car-meta">'
        +'<span class="car-meta-item">&#9981; '+tSpec(fuelType)+'</span>'
        +'<span class="car-meta-item">&#9881; '+tSpec(trans)+'</span>'
      +'</div>'
      +'<div class="card-actions">'
        +'<button class="btn-order" data-id="'+car.id+'">'+t('card.order')+'</button>'
        +'<button class="btn-view"  data-id="'+car.id+'">'+t('card.viewdetails')+' &rarr;</button>'
      +'</div>'
    +'</div>'
  +'</article>';
}

/* ── Render cars ─────────────────────────────────────────── */
function renderCars() {
  var grid = document.getElementById('carsGrid');
  if (!grid) return;
  var noRes    = document.getElementById('noResults');
  var filtered = getFiltered();
  grid.innerHTML = filtered.map(cardHTML).join('');
  if (noRes) { noRes.hidden = filtered.length > 0; if (!noRes.hidden) noRes.textContent = t('search.noresults'); }
  observeReveal();

  grid.querySelectorAll('.gallery-arrow').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var cid = btn.getAttribute('data-car-id');
      var car = CARS.filter(function(c){ return String(c.id)===String(cid); })[0];
      if (!car) return;
      var imgs = (car.images && car.images.length) ? car.images.filter(Boolean) : [''];
      var cur  = galleryState[car.id] || 0;
      var nxt  = btn.classList.contains('gallery-prev') ? cur-1 : cur+1;
      galleryState[car.id] = (nxt + imgs.length) % imgs.length;
      var cardEl = grid.querySelector('.car-card[data-id="'+car.id+'"]');
      if (cardEl) {
        var img  = cardEl.querySelector('.car-gallery-img');
        var dots = cardEl.querySelectorAll('.gallery-dot');
        if (img) img.src = imgs[galleryState[car.id]];
        dots.forEach(function(d,i){ d.classList.toggle('active', i===galleryState[car.id]); });
      }
    });
  });

  grid.querySelectorAll('.btn-view').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(btn.getAttribute('data-id'));
    });
  });

  grid.querySelectorAll('.btn-order').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var car = CARS.filter(function(c){ return String(c.id)===String(btn.getAttribute('data-id')); })[0];
      if (car) scrollToOrder(car.brand+' '+car.name);
    });
  });

  grid.querySelectorAll('.car-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.btn-view')||e.target.closest('.btn-order')||e.target.closest('.gallery-arrow')) return;
      openModal(card.getAttribute('data-id'));
    });
    card.addEventListener('keydown', function(e) {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); openModal(card.getAttribute('data-id')); }
    });
  });
}

/* ── Brand filters — FIXED: case-insensitive ─────────────── */
function renderBrandFilters() {
  var c = document.getElementById('brandFilters');
  if (!c) return;
  var avail = {};
  CARS.forEach(function(car){ avail[(car.brand||'').toLowerCase()]=true; });
  c.innerHTML = BRANDS.filter(function(b){ return b.key==='all'||avail[b.key.toLowerCase()]; })
    .map(function(b){
      return '<button class="brand-btn'+(activeBrand.toLowerCase()===b.key.toLowerCase()?' active':'')
        +'" data-brand="'+b.key+'">'+(currentLang==='ar'?b.labelAr:b.label)+'</button>';
    }).join('');
  c.querySelectorAll('.brand-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      activeBrand = (btn.getAttribute('data-brand') || 'all').toLowerCase();
      c.querySelectorAll('.brand-btn').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      syncLogoGrid();
      renderCars();
    });
  });
}

/* ── Sync logo grid — FIXED: case-insensitive ────────────── */
function syncLogoGrid() {
  var grid = document.getElementById('brandLogoGrid');
  if (!grid) return;
  grid.querySelectorAll('.brand-logo-card').forEach(function(card) {
    var brand = (card.getAttribute('data-filter-brand') || 'all').toLowerCase();
    card.classList.toggle('active', brand === activeBrand.toLowerCase());
  });
}

/* ── Brand Logo Grid — FIXED: case-insensitive ───────────── */
function initBrandLogoGrid() {
  var grid = document.getElementById('brandLogoGrid');
  if (!grid) return;
  grid.querySelectorAll('.brand-logo-card').forEach(function(card) {
    card.addEventListener('click', function() {
      grid.querySelectorAll('.brand-logo-card').forEach(function(c){ c.classList.remove('active'); });
      card.classList.add('active');

      /* Store activeBrand as lowercase so comparison always works */
      activeBrand = (card.getAttribute('data-filter-brand') || 'all').toLowerCase();

      /* Sync the text filter buttons */
      var brandBtns = document.querySelectorAll('#brandFilters .brand-btn');
      brandBtns.forEach(function(b){
        b.classList.toggle('active', (b.getAttribute('data-brand')||'all').toLowerCase() === activeBrand);
      });

      renderCars();

      var sec = document.getElementById('cars');
      if (sec) setTimeout(function(){ sec.scrollIntoView({behavior:'smooth',block:'start'}); }, 80);
    });
  });
}

/* ── Modal ───────────────────────────────────────────────── */
function openModal(id) {
  var car = CARS.filter(function(c){ return String(c.id)===String(id); })[0];
  if (!car) return;
  var overlay = document.getElementById('modalOverlay');
  var content = document.getElementById('modalContent');
  if (!overlay||!content) return;
  modalGalleryIdx = galleryState[car.id] || 0;
  content.innerHTML = buildModalHTML(car);
  overlay.setAttribute('aria-hidden','false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  bindModalEvents(car);
}

function buildModalHTML(car) {
  var imgs  = (car.images && car.images.length) ? car.images.filter(Boolean) : [''];
  var specs = localSpecs(car);
  var badge = tBadge(car.badge);

  var specsH = Object.keys(specs).map(function(lbl){
    return '<div class="spec-item"><span class="spec-label">'+lbl+'</span><span class="spec-value">'+specs[lbl]+'</span></div>';
  }).join('');

  var featH = (car.features||[]).map(function(f){
    return '<span class="feature-tag">'+tFeat(f)+'</span>';
  }).join('');

  var thumbH = imgs.length > 1 ? imgs.map(function(src,i){
    return '<button class="modal-thumb'+(i===modalGalleryIdx?' active':'')+'" data-thumb="'+i+'"><img src="'+src+'" alt="'+(i+1)+'"/></button>';
  }).join('') : '';

  var arrowH = imgs.length > 1
    ? '<button class="modal-gallery-arrow modal-gallery-prev" id="mgPrev">&#8249;</button>'
    + '<button class="modal-gallery-arrow modal-gallery-next" id="mgNext">&#8250;</button>' : '';

  var priceLabel = currentLang==='ar' ? 'السعر' : 'Price';

  return '<div class="modal-gallery" id="modalGallery">'
      +'<div class="modal-gallery-main">'
        +'<img class="modal-gallery-img" id="modalGalleryImg" src="'+imgs[modalGalleryIdx]+'" alt="'+car.brand+' '+car.name+'"/>'
        +(badge?'<span class="modal-gallery-badge">'+badge+'</span>':'')
        +'<div class="modal-gallery-counter"><span id="mgCurrent">'+(modalGalleryIdx+1)+'</span> / <span>'+imgs.length+'</span></div>'
        +arrowH
      +'</div>'
      +(imgs.length>1?'<div class="modal-thumbs" id="modalThumbs">'+thumbH+'</div>':'')
    +'</div>'
    +'<div class="modal-body">'
      +'<div class="modal-header">'
        +'<p class="modal-brand">'+car.brand+'</p>'
        +'<h2 class="modal-title">'+car.name+'</h2>'
        +'<p class="modal-desc-text">'+tDesc(car)+'</p>'
      +'</div>'
      +'<p class="modal-section-label">'+t('modal.specs')+'</p>'
      +'<div class="specs-grid">'+specsH+'</div>'
      +'<p class="modal-section-label">'+t('modal.features')+'</p>'
      +'<div class="features-list">'+featH+'</div>'
      +'<div class="modal-order-bar">'
        +'<div class="modal-order-price-block">'
          +'<span class="modal-order-price-label">'+priceLabel+'</span>'
          +'<span class="modal-order-price-value">'+car.price+'</span>'
        +'</div>'
        +'<button class="modal-order-btn" id="modalOrderBtn">'+t('modal.order')+'</button>'
      +'</div>'
    +'</div>';
}

function bindModalEvents(car) {
  var imgs = (car.images && car.images.length) ? car.images.filter(Boolean) : [''];
  function goTo(idx) {
    modalGalleryIdx = (idx+imgs.length)%imgs.length;
    galleryState[car.id] = modalGalleryIdx;
    var img = document.getElementById('modalGalleryImg');
    var ctr = document.getElementById('mgCurrent');
    if (img) { img.style.opacity='0'; setTimeout(function(){ img.src=imgs[modalGalleryIdx]; img.style.opacity='1'; },150); }
    if (ctr) ctr.textContent = modalGalleryIdx+1;
    document.querySelectorAll('.modal-thumb').forEach(function(th,i){ th.classList.toggle('active',i===modalGalleryIdx); });
  }
  var prev = document.getElementById('mgPrev');
  var next = document.getElementById('mgNext');
  if (prev) prev.addEventListener('click', function(){ goTo(modalGalleryIdx-1); });
  if (next) next.addEventListener('click', function(){ goTo(modalGalleryIdx+1); });
  document.querySelectorAll('.modal-thumb').forEach(function(btn){
    btn.addEventListener('click', function(){ goTo(parseInt(btn.getAttribute('data-thumb'))); });
  });
  var gallery = document.getElementById('modalGallery');
  if (gallery) {
    var tx=0;
    gallery.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
    gallery.addEventListener('touchend',function(e){
      var dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>40) goTo(modalGalleryIdx+(dx<0?1:-1));
    },{passive:true});
  }
  var ob = document.getElementById('modalOrderBtn');
  if (ob) ob.addEventListener('click', function(){ closeModal(); scrollToOrder(car.brand+' '+car.name); });
}

function closeModal() {
  var o = document.getElementById('modalOverlay');
  if (!o) return;
  o.classList.remove('open');
  o.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

/* ── Order scroll ────────────────────────────────────────── */
function scrollToOrder(name) {
  selectedCarName = name;
  var s = document.getElementById('contact');
  if (s) s.scrollIntoView({behavior:'smooth',block:'start'});
  var noteEl   = document.getElementById('orderNote');
  var noteText = document.getElementById('orderNoteText');
  if (noteEl && noteText && name) {
    noteText.textContent = (currentLang==='ar'?'طلب: ':'Ordering: ')+name;
    noteEl.hidden = false;
  }
}

/* ── Filters & search ────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderCars();
    });
  });
  var inp = document.getElementById('searchInput');
  if (inp) {
    var timer;
    inp.addEventListener('input', function(e) {
      clearTimeout(timer);
      timer = setTimeout(function(){ searchQuery=e.target.value; renderCars(); }, 220);
    });
  }
}

/* ── Theme ───────────────────────────────────────────────── */
function initThemeToggle() {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  var icon = btn.querySelector('.theme-icon');
  var root = document.documentElement;
  var saved = localStorage.getItem('geostar-theme');
  if (saved) { root.setAttribute('data-theme',saved); if(icon) icon.textContent=saved==='light'?'☾':'☽'; }
  btn.addEventListener('click', function() {
    var next = root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    if(icon) icon.textContent=next==='light'?'☾':'☽';
    localStorage.setItem('geostar-theme',next);
  });
}

/* ── Language ────────────────────────────────────────────── */
function initLangToggle() {
  var btn = document.getElementById('langToggle');
  if (!btn) return;
  var icon = btn.querySelector('.lang-icon');
  var saved = localStorage.getItem('geostar-lang');
  if (saved && saved !== currentLang) {
    currentLang = saved;
    if(icon) icon.textContent = currentLang==='ar'?'AR':'EN';
  }
  btn.addEventListener('click', function() {
    currentLang = currentLang==='en'?'ar':'en';
    if(icon) icon.textContent = currentLang==='ar'?'AR':'EN';
    localStorage.setItem('geostar-lang', currentLang);
    applyTranslations();
  });
}

/* ── Navbar ──────────────────────────────────────────────── */
function initNavbar() {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (!navbar || !navLinks) return;
  var links = navLinks.querySelectorAll('.nav-link');
  window.addEventListener('scroll', function(){ navbar.classList.toggle('scrolled',window.scrollY>40); },{passive:true});
  if (hamburger) {
    hamburger.addEventListener('click', function(){
      hamburger.classList.toggle('open'); navLinks.classList.toggle('open');
    });
  }
  links.forEach(function(link){
    link.addEventListener('click', function(){
      links.forEach(function(l){l.classList.remove('active');}); link.classList.add('active');
      if(hamburger) hamburger.classList.remove('open'); navLinks.classList.remove('open');
    });
  });
  if (typeof IntersectionObserver !== 'undefined') {
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var id=entry.target.getAttribute('id');
          links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+id);});
        }
      });
    },{threshold:0.35});
    document.querySelectorAll('section[id]').forEach(function(s){obs.observe(s);});
  }
}

/* ── Modal init ──────────────────────────────────────────── */
function initModal() {
  var closeBtn = document.getElementById('modalClose');
  var overlay  = document.getElementById('modalOverlay');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay)  overlay.addEventListener('click', function(e){ if(e.target===e.currentTarget) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });
}

/* ── Reveal on scroll ────────────────────────────────────── */
function observeReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');}); return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry,i){
      if(entry.isIntersecting){ setTimeout(function(){entry.target.classList.add('visible');},i*80); io.unobserve(entry.target); }
    });
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
}

/* ── Contact form ────────────────────────────────────────── */
function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var success = document.getElementById('formSuccess');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var fn = document.getElementById('ffirstname');
    var ln = document.getElementById('flastname');
    var wi = document.getElementById('fwilaya');
    var ph = document.getElementById('fphone');
    if (!fn.value.trim() || !ln.value.trim() || !wi.value || !ph.value.trim()) {
      alert(currentLang === 'ar' ? 'يرجى ملء جميع الحقول.' : 'Please fill in all fields.');
      return;
    }
    var sbtn = form.querySelector('button[type="submit"]');
    if (sbtn) { sbtn.textContent = currentLang==='ar'?'جارٍ الإرسال…':'Sending…'; sbtn.disabled=true; }
    var selectedCar = selectedCarName || 'No car selected';
    var data = {
      name: fn.value.trim()+' '+ln.value.trim(),
      number: ph.value.trim(),
      message: 'Wilaya: '+wi.value+' | Car: '+selectedCar
    };
    fetch('https://vercel-api-eight-orcin.vercel.app/book-ticket', {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
    })
    .then(function(r){ if(!r.ok) return r.json().then(function(err){throw new Error(err.error||'Failed');}); return r.json(); })
    .then(function(res){
      console.log(res);
      if(success){success.textContent=t('form.success');success.hidden=false;}
      form.reset();
      var note=document.getElementById('orderNote'); if(note) note.hidden=true;
      selectedCarName='';
      if(sbtn){sbtn.textContent=t('form.submit');sbtn.disabled=false;}
      setTimeout(function(){if(success)success.hidden=true;},5000);
    })
    .catch(function(err){
      console.error(err);
      alert(currentLang==='ar'?'حدث خطأ: '+err.message:'Error: '+err.message);
      if(sbtn){sbtn.textContent=t('form.submit');sbtn.disabled=false;}
    });
  });
}

/* ── Smooth scroll ───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(a.getAttribute('href'));
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });
}

/* ── Boot ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  var savedLang = localStorage.getItem('geostar-lang');
  if (savedLang) currentLang = savedLang;

  var grid = document.getElementById('carsGrid');
  if (grid) grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)">Loading cars…</div>';

  sb.from('cars')
    .select('*')
    .eq('section', 'order')
    .order('created_at', { ascending: false })
    .then(function(res) {
      if (res.error) {
        console.error('Supabase error:', res.error);
        if (grid) grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#e05c5c">Failed to load cars. Check console.</div>';
        return;
      }
      CARS = (res.data || []).map(function(car) {
        car.images   = parseField(car.images);
        car.features = parseField(car.features);
        car.specs    = parseSpecs(car.specs);
        return car;
      });
      try{ initBrandLogoGrid(); }catch(e){ console.error(e); }
      try{ renderBrandFilters();}catch(e){ console.error(e); }
      try{ renderCars();        }catch(e){ console.error(e); }
      try{ initFilters();       }catch(e){ console.error(e); }
      try{ initThemeToggle();   }catch(e){ console.error(e); }
      try{ initLangToggle();    }catch(e){ console.error(e); }
      try{ initNavbar();        }catch(e){ console.error(e); }
      try{ initModal();         }catch(e){ console.error(e); }
      try{ initContactForm();   }catch(e){ console.error(e); }
      try{ initSmoothScroll();  }catch(e){ console.error(e); }
      try{ observeReveal();     }catch(e){ console.error(e); }
    });
});