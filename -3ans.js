/* ============================================================
   GEOSTAR — used-cars.js
   Used cars page — loads section='used' from Supabase
   ============================================================ */

/* ── Supabase ────────────────────────────────────────────── */
var SUPABASE_URL = 'https://xzsddfwilsavipjfnoah.supabase.co';
var SUPABASE_KEY = 'sb_publishable_bQum6u1FgRS3Vsg_Nh8n0Q_Eb7raDug';
var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ── Translations ────────────────────────────────────────── */
var TRANSLATIONS = {
  en: {
    'nav.home':'Home','nav.order':'Order','nav.showroom':'Showroom',
    'nav.used':'Used Cars','nav.contact':'Contact',
    'filter.all':'All','filter.suv':'SUV','filter.hatchback':'Hatchback','filter.sedan':'Sedan',
    'showroom.filter.available':'Available','showroom.filter.reserved':'Reserved',
    'footer.tagline':'Driving Excellence Since 2013',
    'footer.copy':'© 2026 GEOSTAR AUTO Showroom. All rights reserved.',
    'used.eyebrow':'Certified Pre-Owned',
    'used.title':'Véhicules d\'Occasion',
    'used.sub':'Sélection de véhicules de moins de 3 ans, inspectés et garantis. Qualité premium à prix compétitif — disponibles immédiatement à notre showroom.',
    'used.search':'Search vehicles…',
    'used.stat1.num':'–3 ans','used.stat1.label':'Max age',
    'used.stat2.num':'100%','used.stat2.label':'Inspected',
    'used.stat3.num':'Stock','used.stat3.label':'Available now',
    'used.cta.title':'Looking for a new car to order?',
    'used.cta.sub':'Browse our full catalogue of new vehicles available for order with competitive prices.',
    'used.cta.btn':'View New Cars',
    'used.available':'Available','used.reserved':'Reserved','used.sold':'Sold',
    'used.btn.contact':'Contact Us','used.btn.reserved':'Reserved',
    'used.btn.sold':'Sold','used.btn.details':'Details',
    'modal.specs':'Specifications','modal.features':'Key Features',
    'search.noresults':'No vehicles match your search.'
  },
  ar: {
    'nav.home':'الرئيسية','nav.order':'الطلب','nav.showroom':'المعرض',
    'nav.used':'سيارات مستعملة','nav.contact':'التواصل',
    'filter.all':'الكل','filter.suv':'دفع رباعي','filter.hatchback':'هاتشباك','filter.sedan':'سيدان',
    'showroom.filter.available':'متاح','showroom.filter.reserved':'محجوز',
    'footer.tagline':'نحو التميز في القيادة منذ 2013',
    'footer.copy':'© 2026 معرض جيوستار أوتو. جميع الحقوق محفوظة.',
    'used.eyebrow':'سيارات معتمدة مستعملة',
    'used.title':'سيارات مستعملة',
    'used.sub':'مجموعة مختارة من السيارات التي عمرها أقل من 3 سنوات، مفحوصة ومضمونة. جودة عالية بسعر تنافسي — متوفرة الآن في معرضنا.',
    'used.search':'ابحث عن سيارة…',
    'used.stat1.num':'أقل من 3','used.stat1.label':'سنوات',
    'used.stat2.num':'100%','used.stat2.label':'مفحوصة',
    'used.stat3.num':'مخزون','used.stat3.label':'متوفر الآن',
    'used.cta.title':'تبحث عن سيارة جديدة للطلب؟',
    'used.cta.sub':'تصفح كتالوجنا الكامل من السيارات الجديدة المتاحة للطلب بأسعار تنافسية.',
    'used.cta.btn':'عرض السيارات الجديدة',
    'used.available':'متاح','used.reserved':'محجوز','used.sold':'مُباع',
    'used.btn.contact':'تواصل معنا','used.btn.reserved':'محجوز',
    'used.btn.sold':'مُباع','used.btn.details':'التفاصيل',
    'modal.specs':'المواصفات','modal.features':'المميزات الرئيسية',
    'search.noresults':'لا توجد سيارات تطابق بحثك.'
  }
};

/* ── State ───────────────────────────────────────────────── */
var USED_CARS      = [];
var currentLang    = 'en';
var activeFilter   = 'all';
var searchQuery    = '';
var modalIdx       = 0;
var galleryState   = {};

/* ── Helpers ─────────────────────────────────────────────── */
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || TRANSLATIONS.en[key] || key;
}
function parseField(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch(e) { return []; }
}
function parseSpecs(val) {
  if (!val) return {};
  if (typeof val === 'object' && !Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch(e) { return {}; }
}

/* ── i18n ────────────────────────────────────────────────── */
function applyTranslations() {
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.classList.toggle('lang-ar', currentLang === 'ar');
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var v = t(el.getAttribute('data-i18n')); if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var v = t(el.getAttribute('data-i18n-placeholder')); if (v) el.setAttribute('placeholder', v);
  });
  renderUsed();
}

/* ── Filter ──────────────────────────────────────────────── */
function getFiltered() {
  return USED_CARS.filter(function(car) {
    var f = activeFilter;
    var okF = f === 'all'
      || f === (car.status||'').toLowerCase()
      || f === (car.category||'').toLowerCase();
    var q = searchQuery.toLowerCase();
    var okQ = !q
      || (car.name||'').toLowerCase().indexOf(q) > -1
      || (car.brand||'').toLowerCase().indexOf(q) > -1
      || (car.color||'').toLowerCase().indexOf(q) > -1
      || (car.description||'').toLowerCase().indexOf(q) > -1;
    return okF && okQ;
  });
}

/* ── Status helpers — NO green badge ────────────────────── */
function statusLabel(status) {
  if (status === 'available') return t('used.available');
  if (status === 'reserved')  return t('used.reserved');
  return t('used.sold');
}
function statusTextClass(status) {
  if (status === 'available') return 'status-text-available';
  if (status === 'reserved')  return 'status-text-reserved';
  return 'status-text-sold';
}
function contactBtnHTML(car) {
  if (car.status === 'available') {
    return '<button class="btn-used-contact" data-id="'+car.id+'">📞 '+t('used.btn.contact')+'</button>';
  }
  if (car.status === 'reserved') {
    return '<button class="btn-used-contact disabled" disabled>🔒 '+t('used.btn.reserved')+'</button>';
  }
  return '<button class="btn-used-contact disabled" disabled>'+t('used.btn.sold')+'</button>';
}

/* ── Card HTML ───────────────────────────────────────────── */
function cardHTML(car) {
  var imgs  = (car.images && car.images.length) ? car.images.filter(Boolean) : [''];
  var idx   = galleryState[car.id] || 0;
  var specs = car.specs || {};

  var badgeH = car.badge
    ? '<div class="used-car-badge">'+car.badge+'</div>' : '';

  var yearPill = car.year
    ? '<div class="used-year-pill"><span class="used-year-pill-icon">📅</span>'+car.year+'</div>' : '';

  var arrowH = imgs.length > 1
    ? '<button class="gallery-arrow gallery-prev" data-car-id="'+car.id+'">&#8249;</button>'
    + '<button class="gallery-arrow gallery-next" data-car-id="'+car.id+'">&#8250;</button>' : '';

  var dotsH = imgs.length > 1
    ? '<div class="gallery-dots">'+imgs.map(function(_,i){
        return '<span class="gallery-dot'+(i===idx?' active':'')+'"></span>';
      }).join('')+'</div>' : '';

  return '<article class="used-card status-'+(car.status||'available')+' reveal" data-id="'+car.id+'" tabindex="0">'
    +'<div class="used-image-wrap">'
      +'<img src="'+imgs[idx]+'" alt="'+car.brand+' '+car.name+'" loading="lazy"/>'
      +badgeH+yearPill+arrowH+dotsH
    +'</div>'
    +'<div class="used-body">'
      +'<p class="used-brand">'+(car.brand||'')+'</p>'
      +'<h3 class="used-name">'+(car.name||'')+'</h3>'
      +'<div class="used-tags">'
        +(car.year?'<span class="used-tag"><span class="used-tag-icon">📅</span>'+car.year+'</span>':'')
        +(car.mileage?'<span class="used-tag"><span class="used-tag-icon">⏱</span>'+car.mileage+'</span>':'')
        +(car.color?'<span class="used-tag"><span class="used-tag-icon">🎨</span>'+car.color+'</span>':'')
      +'</div>'
      +'<p class="used-price">'+(car.price||'')+'</p>'
      +'<p class="used-desc">'+(car.description||'')+'</p>'
      +'<div class="used-specs-strip">'
        +(specs.Engine?'<div class="used-spec-item"><span class="used-spec-label">Engine</span><span class="used-spec-value">'+specs.Engine+'</span></div>':'')
        +(specs['Fuel Type']?'<div class="used-spec-item"><span class="used-spec-label">Fuel</span><span class="used-spec-value">'+specs['Fuel Type']+'</span></div>':'')
        +(specs.Transmission?'<div class="used-spec-item"><span class="used-spec-label">Gearbox</span><span class="used-spec-value">'+specs.Transmission+'</span></div>':'')
      +'</div>'
      +'<div class="used-card-footer">'
        +'<span class="used-status-text '+statusTextClass(car.status||'available')+'">'+statusLabel(car.status||'available')+'</span>'
        +'<div class="used-actions">'
          +contactBtnHTML(car)
          +'<button class="btn-used-view" data-id="'+car.id+'">'+t('used.btn.details')+' →</button>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'</article>';
}

/* ── Render ──────────────────────────────────────────────── */
function renderUsed() {
  var grid  = document.getElementById('usedGrid');
  var noRes = document.getElementById('usedNoResults');
  if (!grid) return;
  var filtered = getFiltered();
  grid.innerHTML = filtered.map(cardHTML).join('');
  if (noRes) { noRes.hidden = filtered.length > 0; if (!noRes.hidden) noRes.textContent = t('search.noresults'); }
  observeReveal();
  bindCardEvents();
}

function bindCardEvents() {
  var grid = document.getElementById('usedGrid');
  if (!grid) return;

  grid.querySelectorAll('.gallery-arrow').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var cid = btn.getAttribute('data-car-id');
      var car = USED_CARS.filter(function(c){ return String(c.id)===String(cid); })[0];
      if (!car) return;
      var imgs = car.images.filter(Boolean);
      var cur  = galleryState[car.id] || 0;
      var nxt  = btn.classList.contains('gallery-prev') ? cur-1 : cur+1;
      galleryState[car.id] = (nxt+imgs.length)%imgs.length;
      var cardEl = grid.querySelector('.used-card[data-id="'+car.id+'"]');
      if (cardEl) {
        var img  = cardEl.querySelector('img');
        var dots = cardEl.querySelectorAll('.gallery-dot');
        if (img) img.src = imgs[galleryState[car.id]];
        dots.forEach(function(d,i){ d.classList.toggle('active',i===galleryState[car.id]); });
      }
    });
  });

  grid.querySelectorAll('.btn-used-contact').forEach(function(btn) {
    if (btn.disabled) return;
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      window.location.href = 'tel:+213563117489';
    });
  });

  grid.querySelectorAll('.btn-used-view').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(btn.getAttribute('data-id'));
    });
  });

  grid.querySelectorAll('.used-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.btn-used-contact')||e.target.closest('.btn-used-view')||e.target.closest('.gallery-arrow')) return;
      openModal(card.getAttribute('data-id'));
    });
    card.addEventListener('keydown', function(e) {
      if (e.key==='Enter'||e.key===' ') { e.preventDefault(); openModal(card.getAttribute('data-id')); }
    });
  });
}

/* ── Modal ───────────────────────────────────────────────── */
function openModal(id) {
  var car = USED_CARS.filter(function(c){ return String(c.id)===String(id); })[0];
  if (!car) return;
  var overlay = document.getElementById('modalOverlay');
  var content = document.getElementById('modalContent');
  if (!overlay||!content) return;
  modalIdx = galleryState[car.id] || 0;
  content.innerHTML = buildModalHTML(car);
  overlay.setAttribute('aria-hidden','false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  bindModalEvents(car);
}

function buildModalHTML(car) {
  var imgs  = car.images.filter(Boolean);
  var specs = car.specs || {};
  var specsH = Object.keys(specs).map(function(lbl){
    return '<div class="spec-item"><span class="spec-label">'+lbl+'</span><span class="spec-value">'+specs[lbl]+'</span></div>';
  }).join('');
  var featH = (car.features||[]).map(function(f){
    return '<span class="feature-tag">'+f+'</span>';
  }).join('');
  var thumbH = imgs.length > 1 ? imgs.map(function(src,i){
    return '<button class="modal-thumb'+(i===modalIdx?' active':'')+'" data-thumb="'+i+'"><img src="'+src+'" alt="'+(i+1)+'"/></button>';
  }).join('') : '';
  var arrowH = imgs.length > 1
    ? '<button class="modal-gallery-arrow modal-gallery-prev" id="mgPrev">&#8249;</button>'
    + '<button class="modal-gallery-arrow modal-gallery-next" id="mgNext">&#8250;</button>' : '';

  return '<div class="modal-gallery" id="modalGallery">'
      +'<div class="modal-gallery-main">'
        +'<img class="modal-gallery-img" id="modalGalleryImg" src="'+imgs[modalIdx]+'" alt="'+car.brand+' '+car.name+'"/>'
        +(car.badge?'<span class="modal-gallery-badge">'+car.badge+'</span>':'')
        +'<div class="modal-gallery-counter"><span id="mgCurrent">'+(modalIdx+1)+'</span> / <span>'+imgs.length+'</span></div>'
        +arrowH
      +'</div>'
      +(imgs.length>1?'<div class="modal-thumbs">'+thumbH+'</div>':'')
    +'</div>'
    +'<div class="modal-body">'
      +'<div class="modal-header">'
        +'<p class="modal-brand">'+car.brand+'</p>'
        +'<h2 class="modal-title">'+car.name+(car.year?' <span style="font-size:1rem;color:var(--text-muted);font-weight:400;">'+car.year+'</span>':'')+'</h2>'
        +'<p class="modal-desc-text">'+(car.description||'')+'</p>'
      +'</div>'
      +'<p class="modal-section-label">'+t('modal.specs')+'</p>'
      +'<div class="specs-grid">'+specsH+'</div>'
      +(featH?'<p class="modal-section-label">'+t('modal.features')+'</p><div class="features-list">'+featH+'</div>':'')
      +'<div class="modal-order-bar">'
        +'<div class="modal-order-price-block">'
          +'<span class="modal-order-price-label">Price</span>'
          +'<span class="modal-order-price-value">'+car.price+'</span>'
        +'</div>'
        +(car.status==='available'
          ?'<button class="modal-order-btn" id="modalCallBtn">📞 '+t('used.btn.contact')+'</button>'
          :'<button class="modal-order-btn" style="background:var(--bg-3);color:var(--text-dim);cursor:not-allowed;" disabled>'+statusLabel(car.status)+'</button>')
      +'</div>'
    +'</div>';
}

function bindModalEvents(car) {
  var imgs = car.images.filter(Boolean);
  function goTo(idx) {
    modalIdx = (idx+imgs.length)%imgs.length;
    galleryState[car.id] = modalIdx;
    var img = document.getElementById('modalGalleryImg');
    var ctr = document.getElementById('mgCurrent');
    if(img){img.style.opacity='0';setTimeout(function(){img.src=imgs[modalIdx];img.style.opacity='1';},150);}
    if(ctr) ctr.textContent=modalIdx+1;
    document.querySelectorAll('.modal-thumb').forEach(function(th,i){th.classList.toggle('active',i===modalIdx);});
  }
  var prev=document.getElementById('mgPrev');
  var next=document.getElementById('mgNext');
  if(prev) prev.addEventListener('click',function(){goTo(modalIdx-1);});
  if(next) next.addEventListener('click',function(){goTo(modalIdx+1);});
  document.querySelectorAll('.modal-thumb').forEach(function(btn){
    btn.addEventListener('click',function(){goTo(parseInt(btn.getAttribute('data-thumb')));});
  });
  var gallery=document.getElementById('modalGallery');
  if(gallery){
    var tx=0;
    gallery.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
    gallery.addEventListener('touchend',function(e){
      var dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>40) goTo(modalIdx+(dx<0?1:-1));
    },{passive:true});
  }
  var callBtn=document.getElementById('modalCallBtn');
  if(callBtn) callBtn.addEventListener('click',function(){window.location.href='tel:+213563117489';});
}

function closeModal() {
  var o=document.getElementById('modalOverlay');
  if(!o) return;
  o.classList.remove('open');
  o.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

/* ── Filters ─────────────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('[data-used-filter]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-used-filter]').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-used-filter');
      renderUsed();
    });
  });
  var inp = document.getElementById('usedSearch');
  if (inp) {
    var timer;
    inp.addEventListener('input', function(e) {
      clearTimeout(timer);
      timer = setTimeout(function(){searchQuery=e.target.value;renderUsed();},220);
    });
  }
}

/* ── Theme ───────────────────────────────────────────────── */
function initThemeToggle() {
  var btn=document.getElementById('themeToggle');
  if(!btn) return;
  var icon=btn.querySelector('.theme-icon');
  var root=document.documentElement;
  var saved=localStorage.getItem('geostar-theme');
  if(saved){root.setAttribute('data-theme',saved);if(icon)icon.textContent=saved==='light'?'☾':'☽';}
  btn.addEventListener('click',function(){
    var next=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    if(icon)icon.textContent=next==='light'?'☾':'☽';
    localStorage.setItem('geostar-theme',next);
  });
}

/* ── Language ────────────────────────────────────────────── */
function initLangToggle() {
  var btn=document.getElementById('langToggle');
  if(!btn) return;
  var icon=btn.querySelector('.lang-icon');
  var saved=localStorage.getItem('geostar-lang');
  if(saved&&saved!==currentLang){
    currentLang=saved;
    if(icon)icon.textContent=currentLang==='ar'?'AR':'EN';
  }
  btn.addEventListener('click',function(){
    currentLang=currentLang==='en'?'ar':'en';
    if(icon)icon.textContent=currentLang==='ar'?'AR':'EN';
    localStorage.setItem('geostar-lang',currentLang);
    applyTranslations();
  });
}

/* ── Navbar ──────────────────────────────────────────────── */
function initNavbar() {
  var navbar=document.getElementById('navbar');
  var hamburger=document.getElementById('hamburger');
  var navLinks=document.getElementById('navLinks');
  if(!navbar||!navLinks) return;
  window.addEventListener('scroll',function(){navbar.classList.toggle('scrolled',window.scrollY>40);},{passive:true});
  if(hamburger){
    hamburger.addEventListener('click',function(){hamburger.classList.toggle('open');navLinks.classList.toggle('open');});
  }
  navLinks.querySelectorAll('.nav-link').forEach(function(link){
    link.addEventListener('click',function(){
      navLinks.querySelectorAll('.nav-link').forEach(function(l){l.classList.remove('active');});
      link.classList.add('active');
      if(hamburger)hamburger.classList.remove('open');navLinks.classList.remove('open');
    });
  });
}

/* ── Modal close ─────────────────────────────────────────── */
function initModal() {
  var closeBtn=document.getElementById('modalClose');
  var overlay=document.getElementById('modalOverlay');
  if(closeBtn) closeBtn.addEventListener('click',closeModal);
  if(overlay)  overlay.addEventListener('click',function(e){if(e.target===e.currentTarget)closeModal();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
}

/* ── Reveal ──────────────────────────────────────────────── */
function observeReveal() {
  if(typeof IntersectionObserver==='undefined'){
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');}); return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry,i){
      if(entry.isIntersecting){setTimeout(function(){entry.target.classList.add('visible');},i*80);io.unobserve(entry.target);}
    });
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
}

/* ── Boot ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  var savedLang = localStorage.getItem('geostar-lang');
  if (savedLang) currentLang = savedLang;

  var grid = document.getElementById('usedGrid');
  if (grid) grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)">Loading cars…</div>';

  sb.from('cars')
    .select('*')
    .eq('section', 'used')
    .order('created_at', { ascending: false })
    .then(function(res) {
      if (res.error) {
        console.error('Supabase error:', res.error);
        if (grid) grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#e05c5c">Failed to load. Check console.</div>';
        return;
      }
      USED_CARS = (res.data || []).map(function(car) {
        car.images   = parseField(car.images);
        car.features = parseField(car.features);
        car.specs    = parseSpecs(car.specs);
        return car;
      });
      try{ renderUsed();     }catch(e){ console.error(e); }
      try{ initFilters();    }catch(e){ console.error(e); }
      try{ initThemeToggle();}catch(e){ console.error(e); }
      try{ initLangToggle(); }catch(e){ console.error(e); }
      try{ initNavbar();     }catch(e){ console.error(e); }
      try{ initModal();      }catch(e){ console.error(e); }
      try{ observeReveal();  }catch(e){ console.error(e); }
    });
});