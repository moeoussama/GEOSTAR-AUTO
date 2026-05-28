/* ============================================================
   GEOSTAR — showroom.js
   Handles the in-stock showroom page independently
   ============================================================ */

/* ── Translations ────────────────────────────────────────── */
var TRANSLATIONS = {
  en: {
    'nav.home':'Home','nav.order':'Order','nav.showroom':'Showroom','nav.contact':'Contact',
    'filter.all':'All','filter.suv':'SUV','filter.hatchback':'Hatchback','filter.sedan':'Sedan',
    'footer.tagline':'Driving Excellence Since 2013',
    'footer.copy':'© 2026 GEOSTAR AUTO Showroom. All rights reserved.',
    'showroom.eyebrow':'Available Now',
    'showroom.title':'In-Stock Showroom Vehicles',
    'showroom.sub':'These cars are physically at our showroom in Blida — ready for immediate viewing, test drive, and purchase today.',
    'showroom.search':'Search stock…',
    'showroom.badge.instock':'In Showroom — Ready Now',
    'showroom.badge.order':'Order Cars → Visit Main Page',
    'showroom.filter.available':'Available',
    'showroom.filter.reserved':'Reserved',
    'showroom.cta.title':'Looking for a car to order?',
    'showroom.cta.sub':'Browse our full catalogue of vehicles available for order with competitive prices.',
    'showroom.cta.btn':'View Order Cars',
    'stock.available':'Available',
    'stock.reserved':'Reserved',
    'stock.sold':'Sold',
    'stock.btn.contact':'Contact Us',
    'stock.btn.reserved':'Reserved',
    'stock.btn.sold':'Sold',
    'stock.btn.details':'View Details',
    'stock.year':'Year',
    'stock.mileage':'Mileage',
    'stock.color':'Color',
    'modal.specs':'Specifications',
    'modal.features':'Key Features',
    'search.noresults':'No vehicles match your search.'
  },
  ar: {
    'nav.home':'الرئيسية','nav.order':'الطلب','nav.showroom':'المعرض','nav.contact':'التواصل',
    'filter.all':'الكل','filter.suv':'دفع رباعي','filter.hatchback':'هاتشباك','filter.sedan':'سيدان',
    'footer.tagline':'نحو التميز في القيادة منذ 2013',
    'footer.copy':'© 2026 معرض جيوستار أوتو. جميع الحقوق محفوظة.',
    'showroom.eyebrow':'متاح الآن',
    'showroom.title':'سيارات المعرض المتاحة',
    'showroom.sub':'هذه السيارات موجودة فعلياً في معرضنا بالبليدة — جاهزة للمعاينة والاختبار والشراء الفوري.',
    'showroom.search':'ابحث في المخزون…',
    'showroom.badge.instock':'في المعرض — متاح الآن',
    'showroom.badge.order':'سيارات للطلب ← الصفحة الرئيسية',
    'showroom.filter.available':'متاح',
    'showroom.filter.reserved':'محجوز',
    'showroom.cta.title':'تبحث عن سيارة للطلب؟',
    'showroom.cta.sub':'تصفح كتالوجنا الكامل من السيارات المتاحة للطلب بأسعار تنافسية.',
    'showroom.cta.btn':'عرض سيارات الطلب',
    'stock.available':'متاح',
    'stock.reserved':'محجوز',
    'stock.sold':'مُباع',
    'stock.btn.contact':'تواصل معنا',
    'stock.btn.reserved':'محجوز',
    'stock.btn.sold':'مُباع',
    'stock.btn.details':'عرض التفاصيل',
    'stock.year':'السنة',
    'stock.mileage':'الكيلومترات',
    'stock.color':'اللون',
    'modal.specs':'المواصفات',
    'modal.features':'المميزات الرئيسية',
    'search.noresults':'لا توجد سيارات تطابق بحثك.'
  }
};

/* ══════════════════════════════════════════════════════════
   STOCK CAR DATA
   Add your real showroom cars here.
   status: 'available' | 'reserved' | 'sold'
   category: 'suv' | 'sedan' | 'hatchback'
   ══════════════════════════════════════════════════════════ */
var STOCK_CARS = [
  {
    id: 101,
    brand: 'Volkswagen',
    name: 'Golf 8.5',
    year: 2024,
    mileage: '0 km',
    color: 'Deep Black',
    price: '7,200,000 DZD',
    category: 'hatchback',
    status: 'available',
    badge: 'New',
    images: ['golf black.jpg', 'golf black 2.jpg', 'golf black 3.jpg'],
    description: 'Brand new Golf 8.5 in Deep Black. Full options, ready for immediate delivery from our showroom.',
    specs: {
      Engine: '1.5 TSI EVO — 150 hp',
      Transmission: '7-speed DSG',
      'Fuel Type': 'Petrol',
      '0–100 km/h': '8.5 seconds',
      'Top Speed': '220 km/h',
      'Fuel Eco': '5.8 L/100km'
    },
    features: ['Digital Cockpit Pro','LED Matrix Headlights','ABS + ESC','Adaptive Cruise Control','Lane Assist','Park Assist','Wireless CarPlay','Heated Seats','Rear-View Camera']
  },
  {
    id: 102,
    brand: 'Volkswagen',
    name: 'Golf 8.5',
    year: 2024,
    mileage: '0 km',
    color: 'Moonstone Grey',
    price: '5,890,000 DZD',
    category: 'hatchback',
    status: 'available',
    badge: null,
    images: ['golf gray (2).jpg', 'golf gray (4).jpg', 'golf gray (3).jpg'],
    description: 'Golf 8.5 in Moonstone Grey. Available for immediate purchase and test drive at our showroom.',
    specs: {
      Engine: '2.0 TSI — 186 hp',
      Transmission: '7-speed DSG (4MOTION)',
      'Fuel Type': 'Petrol',
      '0–100 km/h': '7.8 seconds',
      'Top Speed': '210 km/h',
      'Fuel Eco': '7.2 L/100km'
    },
    features: ['Active Info Display','Discover Pro Navigation','4MOTION AWD','Dynamic Chassis Control','ACC with Stop & Go','Lane Change Assist','Keyless Access','Panoramic Roof','LED Headlights']
  },
  {
    id: 103,
    brand: 'MG',
    name: 'MG 5',
    year: 2024,
    mileage: '0 km',
    color: 'Pearl White',
    price: '4,650,000 DZD',
    category: 'sedan',
    status: 'reserved',
    badge: null,
    images: ['mg5  (1).jpg', 'mg5  (2) - Copy.jpg'],
    description: 'MG 5 in Pearl White. Currently reserved — contact us to join the waiting list.',
    specs: {
      Engine: '1.5 VTi — 112 hp',
      Transmission: '5-speed Manual / CVT',
      'Fuel Type': 'Petrol',
      '0–100 km/h': '11.0 seconds',
      'Top Speed': '185 km/h',
      'Fuel Eco': '6.1 L/100km'
    },
    features: ['10" Touchscreen','Apple CarPlay / Android Auto','ABS + EBD','Front & Rear Sensors','Rear Camera','Keyless Entry','Electric Windows','Bluetooth Audio']
  },
  {
    id: 104,
    brand: 'Geely',
    name: 'Coolray',
    year: 2024,
    mileage: '0 km',
    color: 'Titanium Silver',
    price: '5,380,000 DZD',
    category: 'suv',
    status: 'available',
    badge: 'Hot Deal',
    images: ['colray (2).jpg', 'colray (1).jpg'],
    description: 'Geely Coolray in Titanium Silver. Compact SUV with panoramic sunroof — in stock now.',
    specs: {
      Engine: '1.5T Turbo — 177 hp',
      Transmission: '7-speed DCT',
      'Fuel Type': 'Petrol (Turbo)',
      '0–100 km/h': '8.9 seconds',
      'Top Speed': '185 km/h',
      'Fuel Eco': '6.8 L/100km'
    },
    features: ['Panoramic Sunroof','12" Central Screen','360° Camera','Electric Seats','ABS + ESP','Auto LED Headlights','Voice Control','TPMS']
  },
  {
    id: 105,
    brand: 'Jetta',
    name: 'Jetta VA3',
    year: 2024,
    mileage: '0 km',
    color: 'Crystal White',
    price: '4,100,000 DZD',
    category: 'sedan',
    status: 'available',
    badge: null,
    images: ['photo_1_2026-05-04_11-29-56.jpg', 'photo_3_2026-05-04_11-29-56.jpg', 'photo_2_2026-05-04_11-29-56.jpg'],
    description: 'Jetta VA3 in Crystal White. Modern sedan with advanced safety features — ready for test drive.',
    specs: {
      Engine: '1.5L — 113 hp',
      Transmission: '6-speed Automatic',
      'Fuel Type': 'Petrol',
      '0–100 km/h': '10.5 seconds',
      'Top Speed': '185 km/h',
      'Fuel Eco': '6.2 L/100km'
    },
    features: ['8" Touchscreen','Apple CarPlay / Android Auto','ABS + ESP','Rear Camera','Keyless Entry','LED Headlights','Electronic Parking Brake','Lane Departure Warning']
  },
  {
    id: 106,
    brand: 'Volkswagen',
    name: 'T-Roc',
    year: 2024,
    mileage: '0 km',
    color: 'Atlantic Blue',
    price: '3,700,000 DZD',
    category: 'suv',
    status: 'available',
    badge: 'New Arrival',
    images: ['t roc (2).jpg', 't roc (1).jpg', 't roc (4).jpg'],
    description: 'VW T-Roc in Atlantic Blue. Compact crossover with sporty design — just arrived at our showroom.',
    specs: {
      Engine: '1.5T Turbo — 156 hp',
      Transmission: '7-speed DCT',
      'Fuel Type': 'Petrol (Turbo)',
      '0–100 km/h': '9.5 seconds',
      'Top Speed': '195 km/h',
      'Fuel Eco': '6.5 L/100km'
    },
    features: ['Panoramic Sunroof','12" Central Screen','360° Camera','Electric Seats','ABS + ESP','Hill Descent Control','Auto LED Headlights','Voice Control','TPMS']
  }
];

/* ── State ───────────────────────────────────────────────── */
var currentLang     = 'en';
var activeFilter    = 'all';
var searchQuery     = '';
var modalGalleryIdx = 0;
var stockGallery    = {};

/* ── i18n ────────────────────────────────────────────────── */
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || TRANSLATIONS.en[key] || key;
}

function applyTranslations() {
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.classList.toggle('lang-ar', currentLang === 'ar');
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var v = t(el.getAttribute('data-i18n'));
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var v = t(el.getAttribute('data-i18n-placeholder'));
    if (v) el.setAttribute('placeholder', v);
  });
  renderStock();
}

/* ── Filter ──────────────────────────────────────────────── */
function getFiltered() {
  return STOCK_CARS.filter(function(car) {
    var f = activeFilter;
    var okFilter = f === 'all'
      || f === car.category
      || f === car.status;
    var q = searchQuery.toLowerCase();
    var okQ = !q
      || car.name.toLowerCase().indexOf(q) > -1
      || car.brand.toLowerCase().indexOf(q) > -1
      || car.color.toLowerCase().indexOf(q) > -1
      || car.description.toLowerCase().indexOf(q) > -1;
    return okFilter && okQ;
  });
}

/* ── Status helpers ──────────────────────────────────────── */
function statusLabel(status) {
  if (status === 'available') return t('stock.available');
  if (status === 'reserved')  return t('stock.reserved');
  return t('stock.sold');
}
function statusBadgeClass(status) {
  if (status === 'available') return 'badge-available';
  if (status === 'reserved')  return 'badge-reserved';
  return 'badge-sold';
}
function orderBtnHTML(car) {
  if (car.status === 'available') {
    return '<button class="btn-stock-order" data-id="'+car.id+'">📞 '+t('stock.btn.contact')+'</button>';
  }
  if (car.status === 'reserved') {
    return '<button class="btn-stock-order disabled" disabled>🔒 '+t('stock.btn.reserved')+'</button>';
  }
  return '<button class="btn-stock-order disabled" disabled>✕ '+t('stock.btn.sold')+'</button>';
}

/* ── Card HTML ───────────────────────────────────────────── */
function stockCardHTML(car) {
  var imgs = (car.images && car.images.length) ? car.images.filter(Boolean) : [''];
  var idx  = stockGallery[car.id] || 0;

  var badgeH  = car.badge ? '<div class="stock-badge">'+car.badge+'</div>' : '';
  var arrowH  = imgs.length > 1
    ? '<button class="gallery-arrow gallery-prev" data-car-id="'+car.id+'">&#8249;</button>'
    + '<button class="gallery-arrow gallery-next" data-car-id="'+car.id+'">&#8250;</button>' : '';
  var dotsH   = imgs.length > 1
    ? '<div class="gallery-dots">'+imgs.map(function(_,i){
        return '<span class="gallery-dot'+(i===idx?' active':'')+'"></span>';
      }).join('')+'</div>' : '';

  var soldOverlay = car.status === 'sold'
    ? '<div class="sold-overlay">SOLD</div>' : '';

  return '<article class="stock-card status-'+car.status+' reveal" data-id="'+car.id+'" tabindex="0">'
    +'<div class="stock-image-wrap">'
      +'<img src="'+imgs[idx]+'" alt="'+car.brand+' '+car.name+'" loading="lazy"/>'
      +badgeH
      +'<div class="stock-status-badge '+statusBadgeClass(car.status)+'">'
        +'<span class="status-dot"></span>'
        +statusLabel(car.status)
      +'</div>'
      +arrowH+dotsH+soldOverlay
    +'</div>'
    +'<div class="stock-body">'
      +'<p class="stock-brand">'+car.brand+'</p>'
      +'<h3 class="stock-name">'+car.name+'</h3>'
      +'<div class="stock-year-km">'
        +'<span class="stock-tag"><span class="stock-tag-icon">📅</span>'+car.year+'</span>'
        +'<span class="stock-tag"><span class="stock-tag-icon">⏱</span>'+car.mileage+'</span>'
        +'<span class="stock-tag"><span class="stock-tag-icon">🎨</span>'+car.color+'</span>'
      +'</div>'
      +'<p class="stock-price">'+car.price+'</p>'
      +'<p class="stock-desc">'+car.description+'</p>'
      +'<div class="stock-specs-strip">'
        +'<div class="stock-spec-item"><span class="stock-spec-label">'+t('stock.year')+'</span><span class="stock-spec-value">'+car.year+'</span></div>'
        +'<div class="stock-spec-item"><span class="stock-spec-label">Engine</span><span class="stock-spec-value">'+car.specs.Engine+'</span></div>'
        +'<div class="stock-spec-item"><span class="stock-spec-label">Fuel</span><span class="stock-spec-value">'+car.specs['Fuel Type']+'</span></div>'
      +'</div>'
      +'<div class="stock-actions">'
        +orderBtnHTML(car)
        +'<button class="btn-stock-view" data-id="'+car.id+'">'+t('stock.btn.details')+' →</button>'
      +'</div>'
    +'</div>'
  +'</article>';
}

/* ── Render ──────────────────────────────────────────────── */
function renderStock() {
  var grid    = document.getElementById('stockGrid');
  var noRes   = document.getElementById('stockNoResults');
  if (!grid) return;
  var filtered = getFiltered();
  grid.innerHTML = filtered.map(stockCardHTML).join('');
  if (noRes) { noRes.hidden = filtered.length > 0; if (!noRes.hidden) noRes.textContent = t('search.noresults'); }
  observeReveal();
  bindCardEvents();
}

function bindCardEvents() {
  var grid = document.getElementById('stockGrid');
  if (!grid) return;

  /* Gallery arrows */
  grid.querySelectorAll('.gallery-arrow').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var cid  = parseInt(btn.getAttribute('data-car-id'));
      var car  = STOCK_CARS.filter(function(c){return c.id===cid;})[0];
      if (!car) return;
      var imgs = car.images.filter(Boolean);
      var cur  = stockGallery[cid] || 0;
      var nxt  = btn.classList.contains('gallery-prev') ? cur-1 : cur+1;
      stockGallery[cid] = (nxt + imgs.length) % imgs.length;
      var cardEl = grid.querySelector('.stock-card[data-id="'+cid+'"]');
      if (cardEl) {
        var img  = cardEl.querySelector('img');
        var dots = cardEl.querySelectorAll('.gallery-dot');
        if (img) img.src = imgs[stockGallery[cid]];
        dots.forEach(function(d,i){ d.classList.toggle('active', i===stockGallery[cid]); });
      }
    });
  });

  /* Contact button — scroll to contact or call */
  grid.querySelectorAll('.btn-stock-order').forEach(function(btn) {
    if (btn.disabled) return;
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      /* Direct call on mobile */
      window.location.href = 'tel:+213563117489';
    });
  });

  /* Details button — open modal */
  grid.querySelectorAll('.btn-stock-view').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(parseInt(btn.getAttribute('data-id')));
    });
  });

  /* Click anywhere on card — open modal */
  grid.querySelectorAll('.stock-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.btn-stock-order')||e.target.closest('.btn-stock-view')||e.target.closest('.gallery-arrow')) return;
      openModal(parseInt(card.getAttribute('data-id')));
    });
    card.addEventListener('keydown', function(e) {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); openModal(parseInt(card.getAttribute('data-id'))); }
    });
  });
}

/* ── Modal ───────────────────────────────────────────────── */
function openModal(id) {
  var car = STOCK_CARS.filter(function(c){return c.id===id;})[0];
  if (!car) return;
  var overlay = document.getElementById('modalOverlay');
  var content = document.getElementById('modalContent');
  if (!overlay||!content) return;
  modalGalleryIdx = stockGallery[car.id] || 0;
  content.innerHTML = buildModalHTML(car);
  overlay.setAttribute('aria-hidden','false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  bindModalEvents(car);
}

function buildModalHTML(car) {
  var imgs  = car.images.filter(Boolean);
  var specsH = Object.keys(car.specs).map(function(lbl){
    return '<div class="spec-item"><span class="spec-label">'+lbl+'</span><span class="spec-value">'+car.specs[lbl]+'</span></div>';
  }).join('');
  var featH  = car.features.map(function(f){
    return '<span class="feature-tag">'+f+'</span>';
  }).join('');
  var thumbH = imgs.length > 1 ? imgs.map(function(src,i){
    return '<button class="modal-thumb'+(i===modalGalleryIdx?' active':'')+'" data-thumb="'+i+'"><img src="'+src+'" alt="'+(i+1)+'"/></button>';
  }).join('') : '';
  var arrowH = imgs.length > 1
    ? '<button class="modal-gallery-arrow modal-gallery-prev" id="mgPrev">&#8249;</button>'
    + '<button class="modal-gallery-arrow modal-gallery-next" id="mgNext">&#8250;</button>' : '';

  return '<div class="modal-gallery" id="modalGallery">'
      +'<div class="modal-gallery-main">'
        +'<img class="modal-gallery-img" id="modalGalleryImg" src="'+imgs[modalGalleryIdx]+'" alt="'+car.brand+' '+car.name+'"/>'
        +(car.badge?'<span class="modal-gallery-badge">'+car.badge+'</span>':'')
        +'<div class="stock-status-badge '+statusBadgeClass(car.status)+'" style="position:absolute;bottom:14px;left:14px;z-index:5;">'
          +'<span class="status-dot"></span>'+statusLabel(car.status)
        +'</div>'
        +'<div class="modal-gallery-counter"><span id="mgCurrent">'+(modalGalleryIdx+1)+'</span> / <span>'+imgs.length+'</span></div>'
        +arrowH
      +'</div>'
      +(imgs.length>1?'<div class="modal-thumbs">'+thumbH+'</div>':'')
    +'</div>'
    +'<div class="modal-body">'
      +'<div class="modal-header">'
        +'<p class="modal-brand">'+car.brand+'</p>'
        +'<h2 class="modal-title">'+car.name+' <span style="font-size:1rem;color:var(--text-muted);font-weight:400;">'+car.year+'</span></h2>'
        +'<p class="modal-desc-text">'+car.description+'</p>'
      +'</div>'
      +'<p class="modal-section-label">'+t('modal.specs')+'</p>'
      +'<div class="specs-grid">'+specsH+'</div>'
      +'<p class="modal-section-label">'+t('modal.features')+'</p>'
      +'<div class="features-list">'+featH+'</div>'
      +'<div class="modal-order-bar">'
        +'<div class="modal-order-price-block">'
          +'<span class="modal-order-price-label">Price</span>'
          +'<span class="modal-order-price-value">'+car.price+'</span>'
        +'</div>'
        +(car.status==='available'
          ? '<button class="modal-order-btn" id="modalCallBtn">📞 '+t('stock.btn.contact')+'</button>'
          : '<button class="modal-order-btn" style="background:var(--bg-3);color:var(--text-dim);cursor:not-allowed;" disabled>'+statusLabel(car.status)+'</button>')
      +'</div>'
    +'</div>';
}

function bindModalEvents(car) {
  var imgs = car.images.filter(Boolean);
  function goTo(idx) {
    modalGalleryIdx = (idx+imgs.length)%imgs.length;
    stockGallery[car.id] = modalGalleryIdx;
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
  var callBtn = document.getElementById('modalCallBtn');
  if (callBtn) callBtn.addEventListener('click', function(){ window.location.href='tel:+213563117489'; });
}

function closeModal() {
  var o = document.getElementById('modalOverlay');
  if (!o) return;
  o.classList.remove('open');
  o.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

/* ── Filters ─────────────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('[data-stock-filter]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-stock-filter]').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-stock-filter');
      renderStock();
    });
  });
  var inp = document.getElementById('stockSearch');
  if (inp) {
    var timer;
    inp.addEventListener('input', function(e) {
      clearTimeout(timer);
      timer = setTimeout(function(){ searchQuery=e.target.value; renderStock(); }, 220);
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
    applyTranslations();
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
  if (!navbar||!navLinks) return;
  window.addEventListener('scroll', function(){ navbar.classList.toggle('scrolled',window.scrollY>40); },{passive:true});
  if (hamburger) {
    hamburger.addEventListener('click', function(){
      hamburger.classList.toggle('open'); navLinks.classList.toggle('open');
    });
  }
  navLinks.querySelectorAll('.nav-link').forEach(function(link){
    link.addEventListener('click', function(){
      navLinks.querySelectorAll('.nav-link').forEach(function(l){l.classList.remove('active');});
      link.classList.add('active');
      if(hamburger) hamburger.classList.remove('open'); navLinks.classList.remove('open');
    });
  });
}

/* ── Modal close ─────────────────────────────────────────── */
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

/* ── Boot ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  try{ renderStock();      }catch(e){ console.error('renderStock:',e); }
  try{ initFilters();      }catch(e){ console.error('initFilters:',e); }
  try{ initThemeToggle();  }catch(e){ console.error('initTheme:',e); }
  try{ initLangToggle();   }catch(e){ console.error('initLang:',e); }
  try{ initNavbar();       }catch(e){ console.error('initNavbar:',e); }
  try{ initModal();        }catch(e){ console.error('initModal:',e); }
  try{ observeReveal();    }catch(e){ console.error('reveal:',e); }
});