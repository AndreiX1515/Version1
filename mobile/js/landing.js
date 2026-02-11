// ================================
// LANDING.JS - SPA VERSION
// Smart Navigation + Unified Breakpoints
// ================================

// ================================
// DOM ELEMENTS
// ================================
const sidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('sidebarOverlay');
const toggleBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.getElementById('sidebarClose');
const themeToggleBtn = document.getElementById('themeToggle');
const themeModeText = document.querySelector('.theme-mode-text');
const bottomNavLinks = document.querySelectorAll('.bottom-nav a');
const sidebarNavLinks = document.querySelectorAll('.sidebar-nav a:not(.danger)');
const pageContents = document.querySelectorAll('.page-content');

// Package filtering
const tabButtons = document.querySelectorAll('.package-tabs .tab-btn');
const packageCards = document.querySelectorAll('.package-card');
const favoriteButtons = document.querySelectorAll('.package-favorite');

// ================================
// STATE MANAGEMENT
// ================================
let currentPage = 'home';
let previousPage = 'home'; // Track previous page for smart back navigation
let currentPackageId = null;

// ================================
// CAROUSEL FUNCTIONALITY
// ================================
(function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const carouselContainer = document.querySelector('.carousel-container');

    if (!carouselTrack || !carouselSlides.length || !indicators.length || !carouselContainer) {
        return;
    }

    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 4000;

    function showSlide(index) {
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        carouselSlides[index].classList.add('active');
        indicators[index].classList.add('active');
        carouselTrack.style.transform = `translateX(${-index * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    showSlide(0);
    startAutoplay();

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            startAutoplay();
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });

    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > threshold) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    }

    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopAutoplay() : startAutoplay();
    });
})();



// ================================
// SIDEBAR FUNCTIONALITY
// ================================
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    toggleBtn.classList.remove('active');
    document.body.style.overflow = '';
}

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
sidebar.addEventListener('click', (e) => e.stopPropagation());

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});




// ================================
// NAVIGATION FUNCTIONALITY
// ================================


// AFTER (new code):
function switchPage(pageName, options = {}) {
  console.log(`🔄 Switching to page: ${pageName}`);
  
  // Store previous page ONLY when not going to special pages
  if (pageName !== 'packageDetails' && pageName !== 'booking') {
    // Don't update previousPage - it's handled in showPackageDetails
    // This prevents overwriting the "return to" page
  }
  
  // Hide all pages
  pageContents.forEach(page => page.classList.remove('active'));

  // Show selected page
  const selectedPage = document.getElementById(`${pageName}Page`);
  if (selectedPage) {
    selectedPage.classList.add('active');
    
    // Initialize booking page if navigating to it
    if (pageName === 'booking' && typeof initBookingPage === 'function') {
      setTimeout(() => initBookingPage(), 100);
    }
  } else {
    console.error(`❌ Page not found: ${pageName}Page`);
    return;
  }

  // Update navigation states
  bottomNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });

  sidebarNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });

  // Close sidebar
  closeSidebar();

  // Scroll to top unless specified otherwise
  if (!options.skipScroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update current page
  currentPage = pageName;

  // Save state (but not for special pages)
  if (!options.skipHistory && pageName !== 'booking' && pageName !== 'packageDetails') {
    localStorage.setItem('currentPage', pageName);
  }

  // Update URL hash
  if (!options.skipHash) {
    updateURLHash(pageName);
  }

  console.log(`✅ Switched to: ${pageName}`);
}



// ================================
// TESTING THE BACK NAVIGATION
// ================================

/*
To test if back navigation is working correctly, try these scenarios in console:

// Scenario 1: Home → Package Details → Back
switchPage('home');
setTimeout(() => showPackageDetails('seoul-city-explorer'), 1000);
setTimeout(() => goBackFromPackageDetails(), 2000);
// Should return to 'home'

// Scenario 2: Packages → Package Details → Back
switchPage('packages');
setTimeout(() => showPackageDetails('seoul-city-explorer'), 1000);
setTimeout(() => goBackFromPackageDetails(), 2000);
// Should return to 'packages'

// Scenario 3: Favorites → Package Details → Back
switchPage('favorites');
setTimeout(() => showPackageDetails('seoul-city-explorer'), 1000);
setTimeout(() => goBackFromPackageDetails(), 2000);
// Should return to 'favorites'

*/





// ================================
// UPDATE handleHashChange to handle booking
// ================================
function handleHashChange() {
    const hash = window.location.hash.slice(1);
    
    console.log('🔗 Hash changed:', hash);
    
    if (!hash) {
        if (currentPage === 'packageDetails' || currentPage === 'booking') {
            goBackFromPackageDetails();
        } else {
            switchPage('home', { skipHash: true });
        }
    } else if (hash.startsWith('package/')) {
        const packageId = hash.split('package/')[1];
        if (packageId !== currentPackageId) {
            showPackageDetails(packageId);
        }
    } else if (hash === 'booking') {
        // Allow direct booking page access if data exists
        if (sessionStorage.getItem('bookingData')) {
            switchPage('booking', { skipHash: true });
        } else {
            // No booking data, redirect to home
            switchPage('home', { skipHash: true });
        }
    } else {
        if (currentPage === 'packageDetails' || currentPage === 'booking') {
            goBackFromPackageDetails();
        }
        switchPage(hash, { skipHash: true });
    }
}

console.log('✅ Landing.js V2.2 booking support added');






function updateURLHash(pageName, packageId = null) {
    let hash = '';
    
    if (pageName === 'packageDetails' && packageId) {
        hash = `#package/${packageId}`;
    } else if (pageName !== 'home') {
        hash = `#${pageName}`;
    }
    
    if (window.location.hash !== hash) {
        history.pushState(null, '', hash || window.location.pathname);
    }
}

function updatePackageGridParity(pageElement) {
    if (!pageElement) return;
    const packageGrid = pageElement.querySelector('.package-grid');
    if (!packageGrid) return;
    const totalCards = packageGrid.children.length;
    packageGrid.classList.toggle('is-even', totalCards % 2 === 0);
}






// ================================
// PACKAGE DETAILS NAVIGATION
// Smart back navigation to previous page
// ================================
// REPLACE your existing showPackageDetails function with this:
function showPackageDetails(packageId) {
  console.log(`📦 Opening package details: ${packageId}`);
  console.log(`📍 Current page (will be previous): ${currentPage}`);
  
  // IMPORTANT: Store current page as previous page BEFORE switching
  sessionStorage.setItem('previousPage', currentPage);
  
  // Store current package
  currentPackageId = packageId;
  sessionStorage.setItem('currentPackageId', packageId);
  
  // Switch to package details page
  switchPage('packageDetails', { skipScroll: true });
  
  // Load package data
  if (typeof loadPackageData === 'function') {
    loadPackageData(packageId);
  } else {
    console.error('❌ loadPackageData function not found');
  }
  
  // Update URL
  updateURLHash('packageDetails', packageId);
  
  console.log(`✅ Package details loaded: ${packageId} (will return to: ${currentPage})`);
}

// MAKE SURE goBackFromPackageDetails is available globally
window.goBackFromPackageDetails = goBackFromPackageDetails;



// ================================
// UPDATE your switchPage function to handle previousPage properly
// ================================

// Find this part in your switchPage function:
// BEFORE (old code):
/*
function switchPage(pageName, options = {}) {
    console.log(`🔄 Switching to page: ${pageName}`);
    
    if (pageName !== 'packageDetails') {
        previousPage = currentPage;
    }
    
    // ... rest of function
}
*/





// ================================
// VIEW DETAILS BUTTON HANDLERS
// ================================
function initPackageDetailsNavigation() {
    console.log('🔍 Initializing package details navigation...');
    
    const detailButtons = document.querySelectorAll('.btn-details');
    console.log(`✅ Found ${detailButtons.length} View Details buttons`);
    
    detailButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.package-card');
            if (!card) {
                console.error('❌ Could not find package card');
                return;
            }
            
            let packageId = card.dataset.packageId;
            
            if (!packageId) {
                const titleElement = card.querySelector('h3');
                if (titleElement) {
                    packageId = titleElement.textContent
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]/g, '');
                    console.log('🔄 Generated package ID:', packageId);
                } else {
                    packageId = 'seoul-city-explorer';
                    console.warn('⚠️ Using fallback package ID');
                }
            }
            
            console.log(`📦 Opening package: ${packageId} from page: ${currentPage}`);
            showPackageDetails(packageId);
        });
    });
}






// ================================
// URL HASH HANDLING (Back Button)
// ================================
function handleHashChange() {
    const hash = window.location.hash.slice(1);
    
    console.log('🔗 Hash changed:', hash);
    
    if (!hash) {
        if (currentPage === 'packageDetails') {
            goBackFromPackageDetails();
        } else {
            switchPage('home', { skipHash: true });
        }
    } else if (hash.startsWith('package/')) {
        const packageId = hash.split('package/')[1];
        if (packageId !== currentPackageId) {
            showPackageDetails(packageId);
        }
    } else {
        if (currentPage === 'packageDetails') {
            goBackFromPackageDetails();
        }
        switchPage(hash, { skipHash: true });
    }
}

window.addEventListener('hashchange', handleHashChange);

window.addEventListener('load', () => {
    handleHashChange();
});

// ================================
// BOTTOM NAVIGATION
// ================================
bottomNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.dataset.page;
        switchPage(pageName);
    });
});

// ================================
// SIDEBAR NAVIGATION
// ================================
sidebarNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.dataset.page;
        
        if (currentPage === 'packageDetails') {
            goBackFromPackageDetails();
            setTimeout(() => switchPage(pageName), 100);
        } else {
            switchPage(pageName);
        }
    });
});

// ================================
// HELPER FUNCTIONS
// ================================
function switchToHome() {
    switchPage('home');
}

function switchToPackage() {
    switchPage('packages');
}

window.switchToHome = switchToHome;

// ================================
// LOGOUT
// ================================
const logoutLink = document.querySelector('.sidebar-nav a.danger');
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmed = confirm('Are you sure you want to logout?');
        if (confirmed) {
            alert('Logged out successfully!');
            closeSidebar();
        }
    });
}

// ================================
// PROFILE AVATAR
// ================================
const profileAvatar = document.querySelector('.profile-avatar');
if (profileAvatar) {
    profileAvatar.addEventListener('click', () => {
        switchPage('profile');
    });
}













// ================================
// SEE ALL BUTTON
// ================================
const seeAllButton = document.querySelector('.package-see-all');
if (seeAllButton) {
    seeAllButton.addEventListener('click', function(e) {
        e.preventDefault();
        switchPage('packages');
    });
}

// ================================
// PACKAGE FILTERING
// ================================
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const tab = btn.dataset.tab;
        
        packageCards.forEach(card => {
            if (tab === 'all') {
                card.style.display = 'flex';
                setTimeout(() => card.classList.add('fade-in'), 10);
            } else {
                if (card.dataset.category === tab) {
                    card.style.display = 'flex';
                    setTimeout(() => card.classList.add('fade-in'), 10);
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// ================================
// FAVORITES
// ================================
favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        button.classList.toggle('active');
        
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);

        const card = button.closest('.package-card');
        const packageName = card.querySelector('h3').textContent;
        
        if (button.classList.contains('active')) {
            console.log(`❤️ Added ${packageName} to favorites`);
        } else {
            console.log(`💔 Removed ${packageName} from favorites`);
        }
    });
});

// ================================
// THEME TOGGLE
// ================================
document.addEventListener('DOMContentLoaded', () => {
    if (!themeToggleBtn || !themeModeText) {
        console.error('Theme toggle elements not found');
        return;
    }

    function applyTheme(isDark) {
        document.documentElement.classList.toggle('dark', isDark);
        themeToggleBtn.checked = isDark;
        themeModeText.textContent = isDark ? 'Dark' : 'Light';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme === 'dark');

    themeToggleBtn.addEventListener('change', () => {
        applyTheme(themeToggleBtn.checked);
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
        }
    });
}, observerOptions);

packageCards.forEach(card => {
    observer.observe(card);
});

// ================================
// PULL TO REFRESH
// ================================
let touchStartY = 0;
let touchEndY = 0;
const pullThreshold = 80;

document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
    }
});

document.addEventListener('touchmove', (e) => {
    if (window.scrollY === 0) {
        touchEndY = e.touches[0].clientY;
        const pullDistance = touchEndY - touchStartY;
        if (pullDistance > 0 && pullDistance < pullThreshold * 2) {
            // Visual feedback
        }
    }
});

document.addEventListener('touchend', () => {
    if (window.scrollY === 0) {
        const pullDistance = touchEndY - touchStartY;
        if (pullDistance > pullThreshold) {
            console.log('🔄 Pull to refresh triggered');
        }
        touchStartY = 0;
        touchEndY = 0;
    }
});

// ================================
// PACKAGE TABS DRAG
// ================================
const tabs = document.getElementById('packageTabs');
if (tabs) {
    let isDown = false;
    let startX;
    let scrollLeft;

    tabs.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - tabs.offsetLeft;
        scrollLeft = tabs.scrollLeft;
    });

    tabs.addEventListener('mouseleave', () => isDown = false);
    tabs.addEventListener('mouseup', () => isDown = false);

    tabs.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tabs.offsetLeft;
        const walk = (x - startX) * 1.2;
        tabs.scrollLeft = scrollLeft - walk;
    });
}

// ================================
// PERFORMANCE
// ================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll logic
    }, 100);
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Smart Escape Travel App - SPA Mode with Smart Navigation');
    
    initPackageDetailsNavigation();
    
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage && savedPage !== 'packageDetails') {
        switchPage(savedPage, { skipHash: true });
    }
    
    console.log('✅ App initialized');
});

console.log('📱 Landing.js (Smart Navigation) loaded');