// ================================
// BOOKING PAGE V2.2
// Price calculation + Form validation
// ================================

// ================================
// STATE
// ================================
let bookingData = null;
let currentPackageData = null;
let basePrice = 0;
const serviceFee = 500;

// ================================
// INITIALIZATION
// ================================
function initBookingPage() {
  console.log('📝 Initializing booking page...');
  
  // Load booking data from session
  const bookingDataStr = sessionStorage.getItem('bookingData');
  const packageDataStr = sessionStorage.getItem('currentPackageData');
  
  if (!bookingDataStr || !packageDataStr) {
    console.error('❌ No booking data found');
    alert('No booking information found. Please select a package first.');
    if (typeof switchPage === 'function') {
      switchPage('home');
    }
    return;
  }
  
  bookingData = JSON.parse(bookingDataStr);
  currentPackageData = JSON.parse(packageDataStr);
  basePrice = bookingData.packagePrice;
  
  console.log('✅ Booking data loaded:', bookingData);
  
  // Populate summary
  populateBookingSummary();
  
  // Initialize price calculation
  updatePriceCalculation();
  
  // Add event listeners
  initEventListeners();
  
  console.log('✅ Booking page initialized');
}

// Make globally available
window.initBookingPage = initBookingPage;

// ================================
// POPULATE BOOKING SUMMARY
// ================================
function populateBookingSummary() {
  // Set summary image
  const summaryImage = document.getElementById('bookingSummaryImage');
  if (summaryImage && currentPackageData) {
    summaryImage.src = currentPackageData.images.thumbnail || currentPackageData.images.hero;
    summaryImage.alt = currentPackageData.title;
  }
  
  // Set summary title
  const summaryTitle = document.getElementById('bookingSummaryTitle');
  if (summaryTitle) {
    summaryTitle.textContent = bookingData.packageTitle;
  }
  
  // Set summary date
  const summaryDate = document.getElementById('bookingSummaryDate');
  if (summaryDate && bookingData.departureDate) {
    const date = new Date(bookingData.departureDate);
    summaryDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  }
  
  // Set summary duration
  const summaryDuration = document.getElementById('bookingSummaryDuration');
  if (summaryDuration && bookingData.duration) {
    summaryDuration.innerHTML = `<i class="far fa-clock"></i> ${bookingData.duration.description}`;
  }
  
  // Set base price display
  const basePriceDisplay = document.getElementById('basePriceDisplay');
  if (basePriceDisplay) {
    basePriceDisplay.textContent = `₱${basePrice.toLocaleString()}`;
  }
}

// ================================
// PRICE CALCULATION
// ================================
function updatePriceCalculation() {
  const numAdults = parseInt(document.getElementById('numAdults')?.value || '1');
  const numChildren = parseInt(document.getElementById('numChildren')?.value || '0');
  
  const totalTravelers = numAdults + numChildren;
  const travelersPrice = basePrice * totalTravelers;
  const total = travelersPrice + serviceFee;
  
  // Update travelers label
  const travelersLabel = document.getElementById('travelersLabel');
  if (travelersLabel) {
    let label = '';
    if (numAdults > 0) {
      label += `${numAdults} Adult${numAdults > 1 ? 's' : ''}`;
    }
    if (numChildren > 0) {
      label += (numAdults > 0 ? ' + ' : '') + `${numChildren} Child${numChildren > 1 ? 'ren' : ''}`;
    }
    travelersLabel.textContent = label;
  }
  
  // Update travelers price
  const travelersPriceEl = document.getElementById('travelersPrice');
  if (travelersPriceEl) {
    travelersPriceEl.textContent = `₱${travelersPrice.toLocaleString()}`;
  }
  
  // Update total price (desktop)
  const totalPriceEl = document.getElementById('totalPrice');
  if (totalPriceEl) {
    totalPriceEl.textContent = `₱${total.toLocaleString()}`;
  }
  
  // Update total price (mobile)
  const mobileTotalPrice = document.getElementById('mobileTotalPrice');
  if (mobileTotalPrice) {
    mobileTotalPrice.textContent = `₱${total.toLocaleString()}`;
  }
  
  console.log('💰 Price updated:', {
    adults: numAdults,
    children: numChildren,
    total: total
  });
}

// ================================
// EVENT LISTENERS
// ================================
function initEventListeners() {
  // Number of travelers change
  const numAdultsSelect = document.getElementById('numAdults');
  const numChildrenSelect = document.getElementById('numChildren');
  
  if (numAdultsSelect) {
    numAdultsSelect.addEventListener('change', updatePriceCalculation);
  }
  
  if (numChildrenSelect) {
    numChildrenSelect.addEventListener('change', updatePriceCalculation);
  }
  
  // Confirm booking buttons
  const confirmBookingBtn = document.getElementById('confirmBookingBtn');
  const confirmBookingBtnMobile = document.getElementById('confirmBookingBtnMobile');
  
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener('click', handleConfirmBooking);
  }
  
  if (confirmBookingBtnMobile) {
    confirmBookingBtnMobile.addEventListener('click', handleConfirmBooking);
  }
  
  console.log('✅ Event listeners initialized');
}

// ================================
// FORM VALIDATION
// ================================
function validateForm() {
  // Required fields
  const firstName = document.getElementById('firstName')?.value.trim();
  const lastName = document.getElementById('lastName')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const emergencyName = document.getElementById('emergencyName')?.value.trim();
  const emergencyPhone = document.getElementById('emergencyPhone')?.value.trim();
  const emergencyRelation = document.getElementById('emergencyRelation')?.value;
  const agreeTerms = document.getElementById('agreeTerms')?.checked;
  
  // Validation checks
  if (!firstName) {
    alert('Please enter your first name');
    document.getElementById('firstName')?.focus();
    return false;
  }
  
  if (!lastName) {
    alert('Please enter your last name');
    document.getElementById('lastName')?.focus();
    return false;
  }
  
  if (!email) {
    alert('Please enter your email address');
    document.getElementById('email')?.focus();
    return false;
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    document.getElementById('email')?.focus();
    return false;
  }
  
  if (!phone) {
    alert('Please enter your phone number');
    document.getElementById('phone')?.focus();
    return false;
  }
  
  if (!emergencyName) {
    alert('Please enter emergency contact name');
    document.getElementById('emergencyName')?.focus();
    return false;
  }
  
  if (!emergencyPhone) {
    alert('Please enter emergency contact phone');
    document.getElementById('emergencyPhone')?.focus();
    return false;
  }
  
  if (!emergencyRelation) {
    alert('Please select emergency contact relationship');
    document.getElementById('emergencyRelation')?.focus();
    return false;
  }
  
  if (!agreeTerms) {
    alert('Please agree to the Terms & Conditions to continue');
    document.getElementById('agreeTerms')?.focus();
    return false;
  }
  
  return true;
}

// ================================
// CONFIRM BOOKING
// ================================
function handleConfirmBooking() {
  console.log('✅ Confirming booking...');
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Gather form data
  const formData = {
    // Traveler info
    firstName: document.getElementById('firstName')?.value.trim(),
    lastName: document.getElementById('lastName')?.value.trim(),
    email: document.getElementById('email')?.value.trim(),
    phone: document.getElementById('phone')?.value.trim(),
    
    // Number of travelers
    numAdults: parseInt(document.getElementById('numAdults')?.value || '1'),
    numChildren: parseInt(document.getElementById('numChildren')?.value || '0'),
    
    // Special requests
    dietaryRequirements: document.getElementById('dietaryRequirements')?.value.trim() || '',
    specialRequests: document.getElementById('specialRequests')?.value.trim() || '',
    
    // Emergency contact
    emergencyName: document.getElementById('emergencyName')?.value.trim(),
    emergencyPhone: document.getElementById('emergencyPhone')?.value.trim(),
    emergencyRelation: document.getElementById('emergencyRelation')?.value,
    
    // Marketing consent
    agreeMarketing: document.getElementById('agreeMarketing')?.checked || false,
    
    // Booking details
    packageId: bookingData.packageId,
    packageTitle: bookingData.packageTitle,
    departureDate: bookingData.departureDate,
    basePrice: basePrice,
    totalPrice: (basePrice * (parseInt(document.getElementById('numAdults')?.value || '1') + parseInt(document.getElementById('numChildren')?.value || '0'))) + serviceFee,
    serviceFee: serviceFee,
    bookingDate: new Date().toISOString()
  };
  
  console.log('📋 Booking form data:', formData);
  
  // Store in sessionStorage (in real app, send to backend)
  sessionStorage.setItem('confirmedBooking', JSON.stringify(formData));
  
  // Show success message
  alert(`Thank you, ${formData.firstName}!
  
Your booking request has been received.

Package: ${formData.packageTitle}
Departure: ${new Date(formData.departureDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Total: ₱${formData.totalPrice.toLocaleString()}

We'll send a confirmation email to ${formData.email} shortly.`);
  
  // Redirect to home
  if (typeof switchPage === 'function') {
    switchPage('home');
  }
}

// ================================
// GO BACK
// ================================
function goBackFromBooking() {
  console.log('⬅️ Going back from booking...');
  
  if (typeof switchPage === 'function') {
    switchPage('packageDetails');
  }
}

window.goBackFromBooking = goBackFromBooking;

// ================================
// AUTO-INIT
// ================================
console.log('📝 Booking.js V2.2 loaded');