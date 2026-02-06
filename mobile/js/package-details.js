// ================================
// PACKAGE DETAILS - SPA VERSION
// ================================
// Adapted to work within landing.php SPA

// ================================
// STATE
// ================================
let currentMonth = 4; // May (0-indexed)
let currentYear = 2026;
let selectedDate = null;
let selectedDateData = null;
let currentPackageData = null;

// ================================
// LOAD PACKAGE DATA
// ================================
function loadPackageData(packageId) {
  // Use passed packageId or get from session
  const id = packageId || sessionStorage.getItem('currentPackageId') || 'seoul-city-explorer';
  
  console.log('📦 Loading package:', id);
  
  // Get package from KOREA_PACKAGES
  const packageData = getPackageById(id);
  
  if (!packageData) {
    console.error('❌ Package not found:', id);
    alert('Package not found. Returning to home...');
    if (typeof goBackFromPackageDetails === 'function') {
      goBackFromPackageDetails();
    }
    return;
  }
  
  console.log('✅ Package loaded:', packageData.title);
  
  // Store globally
  currentPackageData = packageData;
  
  // Populate page with package data
  populatePackageDetails(packageData);
  renderCalendar(packageData);
  renderReviews(packageData);
  renderRelatedPackages(packageData);
  
  // Store full package data for booking page
  sessionStorage.setItem('currentPackageData', JSON.stringify(packageData));
  
  // Check favorite status
  checkFavoriteStatus(id);
}

// Make globally available
window.loadPackageData = loadPackageData;

// ================================
// POPULATE UI
// ================================
function populatePackageDetails(data) {
  console.log('🎨 Populating UI...');
  
  // Hero section
  safeSetAttribute('heroImage', 'src', data.images.hero);
  safeSetAttribute('heroImage', 'alt', data.title);
  safeSetText('packageTitle', data.title);
  safeSetText('packageSubtitle', data.subtitle);
  safeSetText('packageDuration', data.duration.description);
  safeSetText('packageRating', `${data.rating.average} (${data.rating.total} reviews)`);
  
  // Badge
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
  
  // Quick info cards
  safeSetText('infoDuration', data.duration.description);
  safeSetText('infoGroupSize', `${data.requirements.minPeople}-${data.requirements.maxPeople} people`);
  safeSetText('infoLocation', `${data.city}, ${data.country.toUpperCase()}`);
  
  // Overview
  safeSetText('overviewText', data.overview.description);
  
  // Highlights
  safeSetHTML('highlightsList', data.overview.highlights.map(highlight => 
    `<li><i class="fas fa-check-circle"></i> ${highlight}</li>`
  ).join(''));
  
  // Itinerary
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
  
  // Inclusions
  safeSetHTML('inclusionsList', data.inclusions.map(item => `<li>${item}</li>`).join(''));
  
  // Exclusions
  safeSetHTML('exclusionsList', data.exclusions.map(item => `<li>${item}</li>`).join(''));
  
  // Rating summary
  safeSetText('ratingScore', data.rating.average);
  safeSetText('ratingCount', `Based on ${data.rating.total} reviews`);
  
  // Sticky price
  safeSetText('stickyPrice', `₱${data.price.amount.toLocaleString()}`);
  
  // Booking summary
  safeSetText('minDeparture', `${data.requirements.minPeople} people`);
  
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
// CALENDAR FUNCTIONALITY
// ================================
function renderCalendar(packageData) {
  console.log('📅 Rendering calendar...');
  
  const calendarGrid = document.querySelector('#packageDetailsPage .calendar-grid');
  if (!calendarGrid) {
    console.warn('⚠️ Calendar grid not found');
    return;
  }
  
  // Update month display
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  safeSetText('calendarMonth', `${monthNames[currentMonth]} ${currentYear}`);
  
  // Keep headers
  const dayHeaders = Array.from(calendarGrid.querySelectorAll('.calendar-day-header'));
  calendarGrid.innerHTML = '';
  dayHeaders.forEach(header => calendarGrid.appendChild(header));
  
  // Get calendar data
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Add empty cells
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('calendar-day', 'disabled');
    calendarGrid.appendChild(emptyDay);
  }
  
  // Add days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const availability = packageData.availability[dateStr];
    
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    
    if (availability && availability.available) {
      dayElement.innerHTML = `
        <div class="calendar-day-number">${day}</div>
        <div class="calendar-day-price">₱${(availability.price / 1000).toFixed(0)}K</div>
      `;
      dayElement.addEventListener('click', () => selectDate(dateStr, availability, packageData));
    } else {
      dayElement.classList.add('sold-out');
      dayElement.innerHTML = `
        <div class="calendar-day-number">${day}</div>
        <div class="calendar-day-label">Sold Out</div>
      `;
    }
    
    calendarGrid.appendChild(dayElement);
  }
  
  console.log('✅ Calendar rendered');
}

function selectDate(dateStr, availability, packageData) {
  selectedDate = dateStr;
  selectedDateData = availability;
  
  console.log('📅 Date selected:', dateStr, availability);
  
  // Update UI
  document.querySelectorAll('#packageDetailsPage .calendar-day').forEach(day => {
    day.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
  
  // Update booking slots
  safeSetText('bookingSlots', availability.slots);
  
  // Show selected date info
  const selectedDateInfo = safeGetElement('selectedDateInfo');
  if (selectedDateInfo) {
    selectedDateInfo.style.display = 'block';
  }
  
  // Format dates
  const date = new Date(dateStr);
  const returnDate = new Date(date);
  returnDate.setDate(returnDate.getDate() + packageData.duration.days);
  
  safeSetText('departureDate', 
    `${availability.departureTime} - ${availability.flightNumber} (${availability.route})`
  );
  safeSetText('returnDate', 
    `${returnDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} - Return Flight (${availability.route.split('→').reverse().join('→')})`
  );
  
  // Store selected booking data
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
  const prevMonthBtn = safeGetElement('prevMonth');
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      if (currentPackageData) {
        renderCalendar(currentPackageData);
      }
    });
  }

  const nextMonthBtn = safeGetElement('nextMonth');
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      if (currentPackageData) {
        renderCalendar(currentPackageData);
      }
    });
  }
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
// RELATED PACKAGES
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
  
  console.log('✅ Related packages rendered');
}

function viewPackage(packageId) {
  console.log('🔄 Switching to package:', packageId);
  
  // Use SPA navigation instead of page reload
  if (typeof showPackageDetails === 'function') {
    showPackageDetails(packageId);
  } else {
    console.error('❌ showPackageDetails not found');
  }
}

// Make globally available
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
  // Main book now button
  const bookNowBtn = safeGetElement('bookNowBtn');
  if (bookNowBtn) {
    bookNowBtn.addEventListener('click', handleBookNow);
  }
  
  // Sticky book now button
  const stickyBookNowBtn = safeGetElement('stickyBookNowBtn');
  if (stickyBookNowBtn) {
    stickyBookNowBtn.addEventListener('click', handleBookNow);
  }
});

function handleBookNow() {
  if (!selectedDate) {
    alert('Please select a date from the calendar first');
    // Scroll to calendar
    document.querySelector('#packageDetailsPage .booking-calendar-wrapper')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    return;
  }
  
  if (!currentPackageData) {
    console.error('❌ No package data');
    return;
  }
  
  // Prepare booking data
  const bookingData = {
    packageId: currentPackageData.id,
    packageTitle: currentPackageData.title,
    packagePrice: currentPackageData.price.amount,
    departureDate: selectedDate,
    dateInfo: selectedDateData,
    duration: currentPackageData.duration,
    timestamp: new Date().toISOString()
  };
  
  // Store in sessionStorage for booking page
  sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
  
  console.log('📝 Proceeding to booking:', bookingData);
  
  // Navigate to booking page (separate page)
  window.location.href = `pages/booking.php?package=${currentPackageData.id}&date=${selectedDate}`;
}

// ================================
// INITIALIZATION
// ================================
console.log('📦 Package Details (SPA Version) Script Loaded');