/* ============================================================
   AutoElite Car Showroom — script.js
   Handles: car data, rendering, modal, filters, dark mode, nav
   ============================================================ */

'use strict';

// ── Car Data ─────────────────────────────────────────────────
const CARS = [
  {
    id: 1,
    brand: 'Volkswagen',
    name: 'Golf 8',
    price: '3,890,000 DZD',
    category: 'hatchback',
    badge: 'Best Seller',
    image: 'golf 8.jpg',
    description: 'The iconic hatchback reimagined. The Golf 8 combines refined style with the latest digital cockpit and driver assistance systems.',
    specs: {
      Engine:       '1.5 TSI EVO — 150 hp',
      Transmission: '7-speed DSG',
      'Fuel Type':  'Petrol',
      '0–100 km/h': '8.5 seconds',
      'Top Speed':  '220 km/h',
      'Fuel Eco':   '5.8 L/100km',
    },
    features: [
      'Digital Cockpit Pro',
      'LED Matrix Headlights',
      'ABS + ESC',
      'Adaptive Cruise Control',
      'Lane Assist',
      'Park Assist',
      'Wireless CarPlay',
      'Heated Seats',
      'Rear-View Camera',
      'Travel Assist',
    ],
  },
  {
    id: 2,
    brand: 'MG',
    name: 'MG 5',
    price: '2,650,000 DZD',
    category: 'sedan',
    badge: 'Value Pick',
    image: 'mg.jpg',
    description: 'Modern sedan with sporty lines and a tech-forward interior. The MG 5 delivers impressive value without compromising on comfort.',
    specs: {
      Engine:       '1.5 VTi — 112 hp',
      Transmission: '5-speed Manual / CVT',
      'Fuel Type':  'Petrol',
      '0–100 km/h': '11.0 seconds',
      'Top Speed':  '185 km/h',
      'Fuel Eco':   '6.1 L/100km',
    },
    features: [
      '10" Touchscreen',
      'Apple CarPlay / Android Auto',
      'ABS + EBD',
      'Front & Rear Sensors',
      'Rear Camera',
      'Keyless Entry',
      'Multi-function Steering Wheel',
      'Electric Windows',
      'Bluetooth Audio',
    ],
  },
  {
    id: 3,
    brand: 'Livan',
    name: 'GX3 Pro',
    price: '2,290,000 DZD',
    category: 'suv',
    badge: 'New Arrival',
    image: 'livan.jpg',
    description: 'A compact crossover that punches above its weight. The Livan GX3 Pro features a bold exterior design and a feature-rich cabin.',
    specs: {
      Engine:       '1.5T Turbo — 156 hp',
      Transmission: '7-speed DCT',
      'Fuel Type':  'Petrol (Turbo)',
      '0–100 km/h': '9.5 seconds',
      'Top Speed':  '195 km/h',
      'Fuel Eco':   '6.5 L/100km',
    },
    features: [
      'Panoramic Sunroof',
      '12" Central Screen',
      '360° Camera',
      'Electric Seats',
      'ABS + ESP',
      'Hill Descent Control',
      'Auto LED Headlights',
      'Voice Control',
      'TPMS',
    ],
  },
  {
    id: 4,
    brand: 'Škoda',
    name: 'Kamiq',
    price: '3,450,000 DZD',
    category: 'suv',
    badge: null,
    image: 'kamique.jpg',
    description: 'Czech precision meets urban versatility. The Kamiq is a city-friendly SUV with a spacious interior and premium build quality.',
    specs: {
      Engine:       '1.0 TSI — 115 hp',
      Transmission: '6-speed Manual / 7-speed DSG',
      'Fuel Type':  'Petrol',
      '0–100 km/h': '10.2 seconds',
      'Top Speed':  '195 km/h',
      'Fuel Eco':   '5.4 L/100km',
    },
    features: [
      'Virtual Cockpit',
      'Amundsen Navigation',
      'ABS + ESC + TCS',
      'Blind Spot Detection',
      'Front Assist (Emergency Braking)',
      'Simply Clever Storage',
      'Climatronic 2-Zone',
      'LED Ambient Lighting',
      'Wireless Charging',
    ],
  },
  {
    id: 5,
    brand: 'Volkswagen',
    name: 'Tharu',
    price: '3,990,000 DZD',
    category: 'suv',
    badge: 'Popular',
    image: 'tharu.jpg',
    description: 'The Tharu is Volkswagen\'s dynamic mid-size SUV — bold, comfortable and loaded with the tech that defines modern driving.',
    specs: {
      Engine:       '2.0 TSI — 186 hp',
      Transmission: '7-speed DSG (4MOTION)',
      'Fuel Type':  'Petrol',
      '0–100 km/h': '7.8 seconds',
      'Top Speed':  '210 km/h',
      'Fuel Eco':   '7.2 L/100km',
    },
    features: [
      'Active Info Display',
      'Discover Pro Navigation',
      '4MOTION AWD',
      'Dynamic Chassis Control',
      'ACC with Stop & Go',
      'Lane Change Assist',
      'Area View (360°)',
      'Keyless Access',
      'Panoramic Roof',
      'LED Headlights',
    ],
  },
  {
    id: 6,
    brand: 'Opel',
    name: 'Mokka',
    price: '3,180,000 DZD',
    category: 'suv',
    badge: null,
    image: 'moka2.jpg',
    description: 'Bold design language and a futuristic "Pure Panel" cockpit set the Mokka apart as one of the most striking compact SUVs available today.',
    specs: {
      Engine:       '1.2 PureTech Turbo — 130 hp',
      Transmission: '8-speed Automatic',
      'Fuel Type':  'Petrol',
      '0–100 km/h': '9.2 seconds',
      'Top Speed':  '198 km/h',
      'Fuel Eco':   '5.9 L/100km',
    },
    features: [
      'Pure Panel Digital Cockpit',
      'IntelliLux LED Matrix',
      'ABS + ESP + Hill Assist',
      'Rear Camera + Sensors',
      'Ergonomic AGR Seats',
      'Wireless Smartphone Integration',
      'Traffic Sign Recognition',
      'Driver Attention Alert',
      'Heated Steering Wheel',
    ],
  },
];

// ── State ─────────────────────────────────────────────────────
let activeFilter = 'all';
let searchQuery  = '';

// ── Helpers ───────────────────────────────────────────────────

/**
 * Returns filtered car list based on current state.
 */
function getFilteredCars() {
  return CARS.filter(car => {
    const matchesCat = activeFilter === 'all' || car.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      car.name.toLowerCase().includes(q) ||
      car.brand.toLowerCase().includes(q) ||
      car.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });
}

/**
 * Builds HTML string for a single car card.
 */
function buildCardHTML(car) {
  const badge = car.badge
    ? `<div class="car-badge">${car.badge}</div>`
    : '';

  return `
    <article class="car-card reveal" data-id="${car.id}" role="button" tabindex="0" aria-label="View details for ${car.brand} ${car.name}">
      <div class="car-image-wrap">
        <img src="${car.image}" alt="${car.brand} ${car.name}" loading="lazy" />
        ${badge}
      </div>
      <div class="car-body">
        <p class="car-brand">${car.brand}</p>
        <h3 class="car-name">${car.name}</h3>
        <p class="car-price">${car.price}</p>
        <p class="car-desc">${car.description}</p>
        <div class="car-meta">
          <span class="car-meta-item"><span>⛽</span> ${car.specs['Fuel Type']}</span>
          <span class="car-meta-item"><span>⚙️</span> ${car.specs.Transmission}</span>
        </div>
        <button class="btn-view" data-id="${car.id}">
          View Details <span class="arrow">→</span>
        </button>
      </div>
    </article>`;
}

/**
 * Renders all filtered cars into the grid.
 */
function renderCars() {
  const grid     = document.getElementById('carsGrid');
  const noResult = document.getElementById('noResults');
  const filtered = getFilteredCars();

  grid.innerHTML = filtered.map(buildCardHTML).join('');
  noResult.hidden = filtered.length > 0;

  // Trigger reveal animations via IntersectionObserver
  observeReveal();

  // Attach click/keyboard events to each card & button
  grid.querySelectorAll('[data-id]').forEach(el => {
    el.addEventListener('click', e => {
      const id = +el.dataset.id;
      if (id) openModal(id);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(+el.dataset.id);
      }
    });
  });
}

// ── Modal ─────────────────────────────────────────────────────

function buildModalHTML(car) {
  const specsHTML = Object.entries(car.specs)
    .map(([label, value]) => `
      <div class="spec-item">
        <span class="spec-label">${label}</span>
        <span class="spec-value">${value}</span>
      </div>`)
    .join('');

  const featuresHTML = car.features
    .map(f => `<span class="feature-tag">${f}</span>`)
    .join('');

  return `
    <div class="modal-image-wrap">
      <img src="${car.image}" alt="${car.brand} ${car.name}" />
    </div>
    <div class="modal-body">
      <div class="modal-header">
        <div>
          <p class="modal-brand">${car.brand}</p>
          <h2 class="modal-title">${car.name}</h2>
        </div>
        <div class="modal-price">${car.price}</div>
      </div>

      <p class="modal-section-label">Specifications</p>
      <div class="specs-grid">${specsHTML}</div>

      <p class="modal-section-label">Key Features</p>
      <div class="features-list">${featuresHTML}</div>
    </div>`;
}

function openModal(id) {
  const car = CARS.find(c => c.id === id);
  if (!car) return;

  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');

  content.innerHTML = buildModalHTML(car);
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus close button for accessibility
  document.getElementById('modalClose').focus();
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ── Filter & Search ───────────────────────────────────────────

function initFilters() {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCars();
    });
  });

  // Search input (debounced)
  let debounceTimer;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value;
      renderCars();
    }, 220);
  });
}

// ── Dark Mode ─────────────────────────────────────────────────

function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = btn.querySelector('.theme-icon');
  const root = document.documentElement;

  // Restore saved preference
  const saved = localStorage.getItem('autoelite-theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
    icon.textContent = saved === 'light' ? '☾' : '☽';
  }

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    icon.textContent = next === 'light' ? '☾' : '☽';
    localStorage.setItem('autoelite-theme', next);
  });
}

// ── Navbar ────────────────────────────────────────────────────

function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = navLinks.querySelectorAll('.nav-link');

  // Scroll: add .scrolled class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Active link on click
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Highlight nav based on scroll position
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

// ── Reveal on Scroll ──────────────────────────────────────────

function observeReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each card slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ── Contact Form ──────────────────────────────────────────────

function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Simple validation
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    // Simulate form send
    const btn = form.querySelector('.btn-primary');
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    setTimeout(() => {
      success.hidden  = false;
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled    = false;
      setTimeout(() => { success.hidden = true; }, 5000);
    }, 900);
  });
}

// ── Modal Close Events ────────────────────────────────────────

function initModal() {
  // Close button
  document.getElementById('modalClose').addEventListener('click', closeModal);

  // Click backdrop
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ── Smooth scroll for anchor links ───────────────────────────

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Bootstrap ─────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderCars();
  initFilters();
  initThemeToggle();
  initNavbar();
  initModal();
  initContactForm();
  initSmoothScroll();

  // Initial reveal for non-card elements
  observeReveal();
});