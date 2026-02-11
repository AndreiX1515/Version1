// ================================
// PACKAGE DETAILS V2.3 - ENHANCED
// Smart back navigation + Today indicator + Improved calendar
// ================================

// ================================
// STATE
// ================================
const today = new Date();
today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;
let selectedDateData = null;


// ================================
// LOAD PACKAGE DATA
// ================================
function loadPackageData(packageId) {
  const id = packageId || sessionStorage.getItem('currentPackageId') || 'seoul-city-explorer';
  
  console.log('📦 Loading package:', id);
  
  const packageData = getPackageById(id);
  
  if (!packageData) {
    console.error('❌ Package not found:', id);
    alert('Package not found. Returning to previous page...');
    if (typeof goBackFromPackageDetails === 'function') {
      goBackFromPackageDetails();
    }
    return;
  }
  
  console.log('✅ Package loaded:', packageData.title);
  
  currentPackageData = packageData;
  
  populatePackageDetails(packageData);
  renderCalendar(packageData);
  renderReviews(packageData);
  renderRelatedPackages(packageData);
  
  sessionStorage.setItem('currentPackageData', JSON.stringify(packageData));
  
  checkFavoriteStatus(id);
}

window.loadPackageData = loadPackageData;

// ================================
// POPULATE UI
// ================================
function populatePackageDetails(data) {
  console.log('🎨 Populating UI...');
  
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
  safeSetText('infoGroupSize', `${data.requirements.minPeople}-${data.requirements.maxPeople} people`);
  safeSetText('infoLocation', `${data.city}, ${data.country.toUpperCase()}`);
  
  safeSetText('overviewText', data.overview.description);
  
  safeSetHTML('highlightsList', data.overview.highlights.map(highlight => 
    `<li><i class="fas fa-check-circle"></i> ${highlight}</li>`
  ).join(''));
  
  safeSetHTML('itineraryList', data.itinerary.map(day => `
    <div class="itinerary-day">
      <div class="day-header">
        <div class="day-number">Day ${day.day}</div>
        <h3>${day.title}</h3>
      </div>
      <ul class="day-activities">
        ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
      </ul>
      <div class="day-footer">
        <span class="day-meals"><i class="fas fa-utensils"></i> ${day.meals.join(', ')}</span>
        ${day.accommodation ? `<span class="day-accommodation"><i class="fas fa-bed"></i> ${day.accommodation}</span>` : ''}
      </div>
    </div>
  `).join(''));
  
  safeSetHTML('inclusionsList', data.inclusions.map(item => `<li>${item}</li>`).join(''));
  safeSetHTML('exclusionsList', data.exclusions.map(item => `<li>${item}</li>`).join(''));
  
  safeSetText('ratingScore', data.rating.average);
  safeSetText('ratingCount', `Based on ${data.rating.total} reviews`);
  
  // Set price in both mobile and desktop locations
  const priceElements = document.querySelectorAll('.price-amount');
  priceElements.forEach(el => {
    el.textContent = `₱${data.price.amount.toLocaleString()}`;
  });
  
  safeSetText('minDeparture', `${data.requirements.minPeople}`);
  safeSetText('maxGroup', `${data.requirements.maxPeople}`);
  
  console.log('✅ UI populated');
}

// ================================
// SAFE DOM HELPERS
// ================================
function safeGetElement(id) {
  const element = document.getElementById(id);
  if (!element) console.warn(`⚠️ Element not found: ${id}`);
  return element;
}

function safeSetText(id, text) {
  const el = safeGetElement(id);
  if (el) el.textContent = text;
}

function safeSetHTML(id, html) {
  const el = safeGetElement(id);
  if (el) el.innerHTML = html;
}

function safeSetAttribute(id, attr, value) {
  const el = safeGetElement(id);
  if (el) el.setAttribute(attr, value);
}

// ================================
// CALENDAR FUNCTIONALITY - ENHANCED
// ================================
function renderCalendar(packageData) {
  console.log('📅 Rendering calendar for', currentMonth + 1, currentYear);
  
  const calendarGrids = document.querySelectorAll('.calendar-grid');
  if (!calendarGrids.length) {
    console.warn('⚠️ Calendar grid not found');
    return;
  }
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Update month display in all calendar instances
  const monthElements = document.querySelectorAll('.calendar-month');
  monthElements.forEach(el => {
    el.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  });
  
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Render each calendar instance (mobile section + desktop sidebar)
  calendarGrids.forEach(calendarGrid => {
    // Keep headers
    const dayHeaders = Array.from(calendarGrid.querySelectorAll('.calendar-day-header'));
    calendarGrid.innerHTML = '';
    dayHeaders.forEach(header => calendarGrid.appendChild(header));
    
    // Add empty cells
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('calendar-day', 'disabled');
      calendarGrid.appendChild(emptyDay);
    }
    
    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const cellDate = new Date(currentYear, currentMonth, day);
      cellDate.setHours(0, 0, 0, 0);
      
      const isPast = cellDate < today;
      const isToday = cellDate.getTime() === today.getTime();
      const availability = packageData.availability[dateStr];
      
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day');
      
      // Mark today
      if (isToday) {
        dayElement.classList.add('today');
      }
      
      // Check if date is in the past
      if (isPast) {
        dayElement.classList.add('past-date');
        dayElement.innerHTML = `<div class="calendar-day-number">${day}</div>`;
      } else if (availability && availability.available) {
        // Available date
        dayElement.innerHTML = `<div class="calendar-day-number">${day}</div>`;
        dayElement.addEventListener('click', () => selectDate(dateStr, availability, packageData));
        dayElement.setAttribute('title', `Available - ₱${availability.price.toLocaleString()}`);
      } else {
        // Sold out
        dayElement.classList.add('sold-out');
        dayElement.innerHTML = `
          <div class="calendar-day-number">${day}</div>
          <div class="calendar-day-label" style="font-size: 0.55rem;">Sold</div>
        `;
        dayElement.setAttribute('title', 'Sold out');
      }
      
      calendarGrid.appendChild(dayElement);
    }
  });
  
  console.log('✅ Calendar rendered');
}

function selectDate(dateStr, availability, packageData) {
  selectedDate = dateStr;
  selectedDateData = availability;
  
  console.log('📅 Date selected:', dateStr, availability);
  
  // Update UI in all calendar instances
  document.querySelectorAll('.calendar-day').forEach(day => {
    day.classList.remove('selected');
  });
  
  // Find and mark selected day in all calendars
  document.querySelectorAll('.calendar-grid').forEach(grid => {
    const dayElements = grid.querySelectorAll('.calendar-day');
    dayElements.forEach(day => {
      if (day.querySelector('.calendar-day-number')?.textContent === dateStr.split('-')[2].replace(/^0/, '')) {
        if (!day.classList.contains('past-date') && !day.classList.contains('sold-out') && !day.classList.contains('disabled')) {
          day.classList.add('selected');
        }
      }
    });
  });
  
  // Show booking info
  const selectedDateInfos = document.querySelectorAll('.selected-date-info');
  selectedDateInfos.forEach(info => {
    info.classList.add('visible');
  });
  
  // Update booking slots
  const bookingSlots = document.querySelectorAll('.booking-slots, #bookingSlots');
  bookingSlots.forEach(el => {
    el.textContent = `${availability.slots} slots remaining`;
  });
  
  // Format dates
  const date = new Date(dateStr);
  const returnDate = new Date(date);
  returnDate.setDate(returnDate.getDate() + packageData.duration.days);
  
  const departureDateEls = document.querySelectorAll('#departureDate');
  departureDateEls.forEach(el => {
    el.textContent = `${date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - ${availability.departureTime} (${availability.flightNumber})`;
  });
  
  const returnDateEls = document.querySelectorAll('#returnDate');
  returnDateEls.forEach(el => {
    el.textContent = `${returnDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - Return Flight`;
  });
  
  // Update price if it varies by date
  if (availability.price && availability.price !== packageData.price.amount) {
    const priceElements = document.querySelectorAll('.price-amount');
    priceElements.forEach(el => {
      el.textContent = `₱${availability.price.toLocaleString()}`;
    });
  }
  
  // Enable book now buttons
  const bookNowBtns = document.querySelectorAll('.btn-book-now');
  bookNowBtns.forEach(btn => {
    btn.disabled = false;
    btn.innerHTML = '<span>Book Now</span><i class="fas fa-arrow-right"></i>';
  });
  
  sessionStorage.setItem('selectedBookingDate', JSON.stringify({
    date: dateStr,
    availability: availability,
    packageId: packageData.id
  }));
}

// ================================
// CALENDAR NAVIGATION
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const prevMonthBtns = document.querySelectorAll('#prevMonth, .calendar-nav-prev');
  prevMonthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      if (currentPackageData) {
        renderCalendar(currentPackageData);
      }
    });
  });

  const nextMonthBtns = document.querySelectorAll('#nextMonth, .calendar-nav-next');
  nextMonthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      if (currentPackageData) {
        renderCalendar(currentPackageData);
      }
    });
  });
});

// ================================
// REVIEWS
// ================================
function renderReviews(data) {
  console.log('⭐ Rendering reviews...');
  
  const reviewsList = safeGetElement('reviewsList');
  if (!reviewsList) return;
  
  const reviewsToShow = data.reviews.slice(0, 3);
  reviewsList.innerHTML = reviewsToShow.map(review => `
    <div class="review-card">
      <div class="review-header">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=4f46e5&color=fff" 
             alt="${review.userName}" 
             class="review-avatar">
        <div class="review-user-info">
          <h4>
            ${review.userName} 
            ${review.verified ? '<i class="fas fa-check-circle verified"></i>' : ''}
          </h4>
          <div class="review-stars">
            ${generateStars(review.rating)}
          </div>
        </div>
        <span class="review-date">${formatDate(review.date)}</span>
      </div>
      <h5 class="review-title">${review.title}</h5>
      <p class="review-text">${review.comment}</p>
      <div class="review-footer">
        <button class="review-helpful-btn">
          <i class="far fa-thumbs-up"></i>
          Helpful (${review.helpful})
        </button>
      </div>
    </div>
  `).join('');
  
  console.log('✅ Reviews rendered');
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ================================
// RELATED PACKAGES SLIDER
// ================================
function renderRelatedPackages(data) {
  console.log('🔗 Rendering related packages...');
  
  const relatedGrid = safeGetElement('relatedPackages');
  if (!relatedGrid) return;
  
  const relatedPackagesData = data.relatedPackages
    .map(id => getPackageById(id))
    .filter(pkg => pkg);
  
  relatedGrid.innerHTML = relatedPackagesData.map(pkg => `
    <div class="related-package-card" onclick="viewPackage('${pkg.id}')">
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
  
  initRelatedPackagesSlider();
  
  console.log('✅ Related packages rendered');
}



function initRelatedPackagesSlider() {
  const wrapper = document.querySelector('.related-packages-wrapper');
  if (!wrapper) return;

  const grid = wrapper.querySelector('.related-packages-grid');
  if (!grid) return;

  if (window.innerWidth < 1024) return;
  if (wrapper.querySelector('.slider-arrow')) return;

  const leftArrow = document.createElement('button');
  leftArrow.className = 'slider-arrow slider-arrow-left';
  leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
  leftArrow.setAttribute('aria-label', 'Previous');

  const rightArrow = document.createElement('button');
  rightArrow.className = 'slider-arrow slider-arrow-right';
  rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
  rightArrow.setAttribute('aria-label', 'Next');

  /* 🔑 INSERT BEFORE GRID */
  wrapper.insertBefore(leftArrow, grid);
  wrapper.insertBefore(rightArrow, grid);

  leftArrow.addEventListener('click', () => {
    grid.scrollBy({
      left: -grid.clientWidth / 3,
      behavior: 'smooth'
    });
  });

  rightArrow.addEventListener('click', () => {
    grid.scrollBy({
      left: grid.clientWidth / 3,
      behavior: 'smooth'
    });
  });
}



window.addEventListener('resize', () => {
  const wrapper = document.querySelector('.related-packages-wrapper');
  if (!wrapper) return;
  
  const arrows = wrapper.querySelectorAll('.slider-arrow');
  
  if (window.innerWidth >= 1024 && arrows.length === 0) {
    initRelatedPackagesSlider();
  } else if (window.innerWidth < 1024 && arrows.length > 0) {
    arrows.forEach(arrow => arrow.remove());
  }
});

function viewPackage(packageId) {
  console.log('🔄 Switching to package:', packageId);
  
  if (typeof showPackageDetails === 'function') {
    showPackageDetails(packageId);
  } else {
    console.error('❌ showPackageDetails not found');
  }
}

window.viewPackage = viewPackage;

// ================================
// FAVORITE TOGGLE
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const favoriteBtn = safeGetElement('packageFavoriteBtn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      
      if (!currentPackageData) return;
      
      const packageId = currentPackageData.id;
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (this.classList.contains('active')) {
        if (!favorites.includes(packageId)) {
          favorites.push(packageId);
        }
      } else {
        const index = favorites.indexOf(packageId);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('❤️ Favorites updated:', favorites);
    });
  }
});

function checkFavoriteStatus(packageId) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (favorites.includes(packageId)) {
    const btn = safeGetElement('packageFavoriteBtn');
    if (btn) btn.classList.add('active');
  }
}

// ================================
// BOOK NOW BUTTON
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const bookNowBtns = document.querySelectorAll('.btn-book-now');
  bookNowBtns.forEach(btn => {
    btn.addEventListener('click', handleBookNow);
  });
});

function handleBookNow() {
  if (!selectedDate) {
    alert('Please select a date from the calendar first');
    const calendar = document.querySelector('.calendar-grid');
    if (calendar) {
      calendar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  if (!currentPackageData) {
    console.error('❌ No package data');
    return;
  }
  
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
  
  console.log('📝 Proceeding to booking:', bookingData);
  
  if (typeof switchPage === 'function') {
    switchPage('booking');
  } else {
    window.location.href = `pages/booking.php?package=${currentPackageData.id}&date=${selectedDate}`;
  }
}

// ================================
// SMART BACK NAVIGATION
// ================================
function goBackFromPackageDetails() {
  console.log('⬅️ Going back from package details');
  
  // Get stored previous page from sessionStorage
  const returnPage = sessionStorage.getItem('previousPage');
  
  console.log('📍 Previous page stored:', returnPage);
  
  // Clear package state
  sessionStorage.removeItem('currentPackageId');
  
  // If we have a stored previous page, go there
  if (returnPage && typeof switchPage === 'function') {
    console.log('✅ Returning to:', returnPage);
    switchPage(returnPage);
  } else {
    // Fallback to home
    console.log('⚠️ No previous page stored, going to home');
    if (typeof switchPage === 'function') {
      switchPage('home');
    } else {
      window.location.href = '/';
    }
  }
}

// Make globally available
window.goBackFromPackageDetails = goBackFromPackageDetails;

// ================================
// INITIALIZATION
// ================================
console.log('📦 Package Details V2.3 (Enhanced) Script Loaded');