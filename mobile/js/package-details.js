// ================================
// PACKAGE DETAILS V2.3.1
// Fixes: related-package scroll-to-top, dynamic rating bars
// ================================

const today = new Date();
today.setHours(0, 0, 0, 0);

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;
let selectedDateData = null;


// ================================
// LOAD PACKAGE DATA
// ================================
function loadPackageData(packageId) {
  const id = packageId || sessionStorage.getItem('currentPackageId') || 'seoul-city-explorer';
  const packageData = getPackageById(id);
  if (!packageData) {
    alert('Package not found. Returning to previous page...');
    if (typeof goBackFromPackageDetails === 'function') goBackFromPackageDetails();
    return;
  }
  currentPackageData = packageData;
  populatePackageDetails(packageData);
  renderCalendar(packageData);
  renderReviews(packageData);
  renderRatingBreakdown(packageData);
  renderRelatedPackages(packageData);
  sessionStorage.setItem('currentPackageData', JSON.stringify(packageData));
  checkFavoriteStatus(id);
}
window.loadPackageData = loadPackageData;

// ================================
// POPULATE UI
// ================================
function populatePackageDetails(data) {
  safeSetAttribute('heroImage', 'src', data.images.hero);
  safeSetAttribute('heroImage', 'alt', data.title);
  safeSetText('packageTitle', data.title);
  safeSetText('packageSubtitle', data.subtitle);
  safeSetText('packageDuration', data.duration.description);
  safeSetText('packageRating', `${data.rating.average} (${data.rating.total} reviews)`);

  const badge = safeGetElement('packageBadge');
  if (badge) {
    if (data.featured) {
      badge.style.display = 'inline-block';
      badge.textContent = 'Featured';
      badge.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-hover))';
    } else if (data.status === 'coming-soon') {
      badge.style.display = 'inline-block';
      badge.textContent = 'Coming Soon';
      badge.style.background = 'linear-gradient(135deg, #f59e0b, #f97316)';
    } else {
      badge.style.display = 'none';
    }
  }

  safeSetText('infoDuration', data.duration.description);
  safeSetText('infoGroupSize', `${data.requirements.minPeople}–${data.requirements.maxPeople} people`);
  safeSetText('infoLocation', `${data.city}, ${data.country}`);
  safeSetText('overviewText', data.overview.description);

  safeSetHTML('highlightsList', data.overview.highlights.map(h =>
    `<li><i class="fas fa-check-circle"></i> ${h}</li>`
  ).join(''));

  safeSetHTML('itineraryList', data.itinerary.map(day => `
    <div class="itinerary-day">
      <div class="day-header">
        <div class="day-number">Day ${day.day}</div>
        <h3>${day.title}</h3>
      </div>
      <ul class="day-activities">
        ${day.activities.map(a => `<li>${a}</li>`).join('')}
      </ul>
      <div class="day-footer">
        <span class="day-meals"><i class="fas fa-utensils"></i> ${day.meals.join(', ')}</span>
        ${day.accommodation ? `<span class="day-accommodation"><i class="fas fa-bed"></i> ${day.accommodation}</span>` : ''}
      </div>
    </div>
  `).join(''));

  safeSetHTML('inclusionsList', data.inclusions.map(i => `<li>${i}</li>`).join(''));
  safeSetHTML('exclusionsList', data.exclusions.map(i => `<li>${i}</li>`).join(''));

  safeSetText('ratingScore', data.rating.average);
  safeSetText('ratingCount', `Based on ${data.rating.total} reviews`);

  document.querySelectorAll('.price-amount').forEach(el => {
    el.textContent = `₱${data.price.amount.toLocaleString()}`;
  });

  safeSetText('minDeparture', `${data.requirements.minPeople}`);
  safeSetText('maxGroup', `${data.requirements.maxPeople}`);
}

// ================================
// DYNAMIC RATING BREAKDOWN
// ================================
function renderRatingBreakdown(data) {
  const container = document.querySelector('.rating-breakdown');
  if (!container || !data.rating.breakdown) return;
  const total = data.rating.total;
  container.innerHTML = [5, 4, 3, 2, 1].map(star => {
    const count = data.rating.breakdown[star] || 0;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return `
      <div class="rating-bar-item">
        <span>${star}★</span>
        <div class="rating-bar">
          <div class="rating-bar-fill" style="width:${pct}%"></div>
        </div>
        <span>${count}</span>
      </div>`;
  }).join('');
}

// ================================
// SAFE DOM HELPERS
// ================================
function safeGetElement(id) { const el = document.getElementById(id); if (!el) console.warn(`⚠️ #${id} not found`); return el; }
function safeSetText(id, text) { const el = safeGetElement(id); if (el) el.textContent = text; }
function safeSetHTML(id, html) { const el = safeGetElement(id); if (el) el.innerHTML = html; }
function safeSetAttribute(id, attr, val) { const el = safeGetElement(id); if (el) el.setAttribute(attr, val); }

// ================================
// CALENDAR
// ================================
function renderCalendar(packageData) {
  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];

  document.querySelectorAll('.calendar-month').forEach(el => {
    el.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  document.querySelectorAll('.calendar-grid').forEach(grid => {
    const headers = Array.from(grid.querySelectorAll('.calendar-day-header'));
    grid.innerHTML = '';
    headers.forEach(h => grid.appendChild(h));

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.classList.add('calendar-day', 'disabled');
      grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const cellDate = new Date(currentYear, currentMonth, day);
      cellDate.setHours(0, 0, 0, 0);

      const isPast = cellDate < today;
      const isToday = cellDate.getTime() === today.getTime();
      const avail = packageData.availability[dateStr];

      const el = document.createElement('div');
      el.classList.add('calendar-day');
      if (isToday) el.classList.add('today');

      if (isPast) {
        el.classList.add('past-date');
        el.innerHTML = `<div class="calendar-day-number">${day}</div>`;
      } else if (avail && avail.available) {
        el.innerHTML = `<div class="calendar-day-number">${day}</div>`;
        el.addEventListener('click', () => selectDate(dateStr, avail, packageData));
        el.setAttribute('title', `Available — ₱${avail.price.toLocaleString()}`);
      } else {
        el.classList.add('sold-out');
        el.innerHTML = `<div class="calendar-day-number">${day}</div><div class="calendar-day-label" style="font-size:.55rem">Sold</div>`;
      }

      grid.appendChild(el);
    }
  });
}

function selectDate(dateStr, avail, packageData) {
  selectedDate = dateStr;
  selectedDateData = avail;

  document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
  document.querySelectorAll('.calendar-grid').forEach(grid => {
    grid.querySelectorAll('.calendar-day').forEach(d => {
      const num = d.querySelector('.calendar-day-number');
      if (num && num.textContent === String(parseInt(dateStr.split('-')[2]))) {
        if (!d.classList.contains('past-date') && !d.classList.contains('sold-out') && !d.classList.contains('disabled')) {
          d.classList.add('selected');
        }
      }
    });
  });

  document.querySelectorAll('.selected-date-info').forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.booking-slots, #bookingSlots').forEach(el => {
    el.textContent = `${avail.slots} slots remaining`;
  });

  const date = new Date(dateStr + 'T00:00:00');
  const returnDate = new Date(date);
  returnDate.setDate(returnDate.getDate() + packageData.duration.days);
  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  document.querySelectorAll('#departureDate').forEach(el => {
    el.textContent = `${fmt(date)} — ${avail.departureTime} (${avail.flightNumber})`;
  });
  document.querySelectorAll('#returnDate').forEach(el => {
    el.textContent = `${fmt(returnDate)} — Return Flight`;
  });

  if (avail.price) {
    document.querySelectorAll('.price-amount').forEach(el => {
      el.textContent = `₱${avail.price.toLocaleString()}`;
    });
  }

  document.querySelectorAll('.btn-book-now').forEach(btn => {
    btn.disabled = false;
    btn.innerHTML = '<span>Book Now</span><i class="fas fa-arrow-right"></i>';
  });

  sessionStorage.setItem('selectedBookingDate', JSON.stringify({ date: dateStr, availability: avail, packageId: packageData.id }));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#prevMonth, .calendar-nav-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      if (currentPackageData) renderCalendar(currentPackageData);
    });
  });
  document.querySelectorAll('#nextMonth, .calendar-nav-next').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      if (currentPackageData) renderCalendar(currentPackageData);
    });
  });
});

// ================================
// REVIEWS
// ================================
function renderReviews(data) {
  const list = safeGetElement('reviewsList');
  if (!list) return;
  list.innerHTML = data.reviews.slice(0, 3).map(r => `
    <div class="review-card">
      <div class="review-header">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(r.userName)}&background=4f46e5&color=fff"
             alt="${r.userName}" class="review-avatar">
        <div class="review-user-info">
          <h4>${r.userName}${r.verified ? ' <i class="fas fa-check-circle verified"></i>' : ''}</h4>
          <div class="review-stars">${generateStarsHTML(r.rating)}</div>
        </div>
        <span class="review-date">${formatDate(r.date)}</span>
      </div>
      <h5 class="review-title">${r.title}</h5>
      <p class="review-text">${r.comment}</p>
      <div class="review-footer">
        <button class="review-helpful-btn"><i class="far fa-thumbs-up"></i> Helpful (${r.helpful})</button>
      </div>
    </div>
  `).join('');
}

function generateStarsHTML(rating) {
  const full = Math.floor(rating), half = rating % 1 !== 0;
  let s = '';
  for (let i = 0; i < full; i++) s += '<i class="fas fa-star"></i>';
  if (half) s += '<i class="fas fa-star-half-alt"></i>';
  for (let i = 0; i < 5 - Math.ceil(rating); i++) s += '<i class="far fa-star"></i>';
  return s;
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ================================
// RELATED PACKAGES — scroll to top on click
// ================================
function renderRelatedPackages(data) {
  const grid = safeGetElement('relatedPackages');
  if (!grid) return;

  const related = data.relatedPackages.map(id => getPackageById(id)).filter(Boolean);

  grid.innerHTML = related.map(pkg => `
    <div class="related-package-card" data-pkg-id="${pkg.id}" role="button" tabindex="0">
      <img src="${pkg.images.thumbnail}" alt="${pkg.title}">
      <div class="related-package-info">
        <h4>${pkg.title}</h4>
        <div class="related-package-meta">
          <span><i class="far fa-clock"></i> ${pkg.duration.description}</span>
          <span class="related-package-price">₱${pkg.price.amount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.related-package-card').forEach(card => {
    const handler = () => viewPackage(card.dataset.pkgId);
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });

  initRelatedPackagesSlider();
}

// viewPackage — always scroll to top
function viewPackage(packageId) {
  console.log('🔄 viewPackage:', packageId);
  sessionStorage.setItem('currentPackageId', packageId);
  if (typeof loadPackageData === 'function') loadPackageData(packageId);
  // Scroll page to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const page = document.getElementById('packageDetailsPage');
  if (page) page.scrollTop = 0;
}
window.viewPackage = viewPackage;

function initRelatedPackagesSlider() {
  const wrapper = document.querySelector('.related-packages-wrapper');
  if (!wrapper || window.innerWidth < 1024) return;
  if (wrapper.querySelector('.slider-arrow')) return;
  const grid = wrapper.querySelector('.related-packages-grid');
  if (!grid) return;

  const left = document.createElement('button');
  left.className = 'slider-arrow slider-arrow-left';
  left.innerHTML = '<i class="fas fa-chevron-left"></i>';
  left.setAttribute('aria-label', 'Previous');

  const right = document.createElement('button');
  right.className = 'slider-arrow slider-arrow-right';
  right.innerHTML = '<i class="fas fa-chevron-right"></i>';
  right.setAttribute('aria-label', 'Next');

  wrapper.insertBefore(left, grid);
  wrapper.insertBefore(right, grid);

  left.addEventListener('click', () => grid.scrollBy({ left: -grid.clientWidth / 3, behavior: 'smooth' }));
  right.addEventListener('click', () => grid.scrollBy({ left: grid.clientWidth / 3, behavior: 'smooth' }));
}

window.addEventListener('resize', () => {
  const wrapper = document.querySelector('.related-packages-wrapper');
  if (!wrapper) return;
  const arrows = wrapper.querySelectorAll('.slider-arrow');
  if (window.innerWidth >= 1024 && !arrows.length) initRelatedPackagesSlider();
  else if (window.innerWidth < 1024 && arrows.length) arrows.forEach(a => a.remove());
});

// ================================
// FAVORITE TOGGLE
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const btn = safeGetElement('packageFavoriteBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    this.classList.toggle('active');
    if (!currentPackageData) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const id = currentPackageData.id;
    if (this.classList.contains('active')) { if (!favorites.includes(id)) favorites.push(id); }
    else { const i = favorites.indexOf(id); if (i > -1) favorites.splice(i, 1); }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});

function checkFavoriteStatus(packageId) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const btn = safeGetElement('packageFavoriteBtn');
  if (btn) btn.classList.toggle('active', favorites.includes(packageId));
}

// ================================
// BOOK NOW
// ================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-book-now').forEach(btn => btn.addEventListener('click', handleBookNow));
});

function handleBookNow() {
  if (!selectedDate) {
    alert('Please select a date from the calendar first');
    document.querySelector('.calendar-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (!currentPackageData) return;

  const bookingData = {
    packageId: currentPackageData.id,
    packageTitle: currentPackageData.title,
    packagePrice: selectedDateData.price || currentPackageData.price.amount,
    departureDate: selectedDate,
    dateInfo: selectedDateData,
    duration: currentPackageData.duration,
    timestamp: new Date().toISOString()
  };

  sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

  if (typeof switchPage === 'function') switchPage('booking');
  else window.location.href = `pages/booking.php?package=${currentPackageData.id}&date=${selectedDate}`;
}

// ================================
// BACK NAVIGATION
// ================================
function goBackFromPackageDetails() {
  const returnPage = sessionStorage.getItem('previousPage') || 'home';
  sessionStorage.removeItem('currentPackageId');
  if (typeof switchPage === 'function') switchPage(returnPage);
  else window.location.href = '/';
}
window.goBackFromPackageDetails = goBackFromPackageDetails;

console.log('📦 Package Details V2.3.1 loaded');