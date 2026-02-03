// ================================
// DOM ELEMENTS
// ================================
const sidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('sidebarOverlay');
const toggleBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.getElementById('sidebarClose');


// For Theme Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const themeModeText  = document.querySelector('.theme-mode-text');



const bottomNavLinks = document.querySelectorAll('.bottom-nav a');
const sidebarNavLinks = document.querySelectorAll('.sidebar-nav a:not(.danger)');
const pageContents = document.querySelectorAll('.page-content');

// Carousel elements
const carouselTrack = document.getElementById('carouselTrack');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

// Package filtering
const tabButtons = document.querySelectorAll('.package-tabs .tab-btn');
const packageCards = document.querySelectorAll('.package-card');

// Favorite buttons
const favoriteButtons = document.querySelectorAll('.package-favorite');



// ================================
// CAROUSEL FUNCTIONALITY
// ================================
let currentSlide = 0;
let autoplayInterval;
const autoplayDelay = 4000; // 4 seconds

function showSlide(index) {

    // Remove active class from all slides and indicators
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    carouselSlides[index].classList.add('active');
    indicators[index].classList.add('active');

    // Move the track
    const offset = -index * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
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
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Initialize carousel
showSlide(0);
startAutoplay();

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopAutoplay();
        startAutoplay(); // Restart autoplay after manual change
    });
});

// Touch swipe for carousel
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
});

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay(); // Restart autoplay after swipe
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Pause autoplay when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
});


// ================================
// SIDEBAR FUNCTIONALITY
// ================================
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    toggleBtn.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
}

// Toggle sidebar
toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Close sidebar with close button
closeBtn.addEventListener('click', closeSidebar);

// Close sidebar when clicking overlay
overlay.addEventListener('click', closeSidebar);

// Prevent sidebar click from closing
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});




// ================================
// NAVIGATION FUNCTIONALITY
// ================================
function switchPage(pageName, packageId = null) {
    // Hide all pages
    pageContents.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(`${pageName}Page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update bottom nav active state
    bottomNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // Update sidebar nav active state
    sidebarNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // Close sidebar after navigation
    closeSidebar();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Save current page in localStorage for persistence
    localStorage.setItem('currentPage', pageName);

    // Handle package-detail page
    if (pageName === 'package-detail' && packageId) {
        localStorage.setItem('currentPackageId', packageId);
        loadPackageData();
    }
}

// Restore page on reload
document.addEventListener('DOMContentLoaded', () => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        switchPage(savedPage);
    } else {
        switchPage('home'); // default page
    }
});

// Bottom navigation click events
bottomNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.dataset.page;
        switchPage(pageName);
    });
});

// Sidebar navigation click events
sidebarNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.dataset.page;
        switchPage(pageName);
    });
});

// Helper function for "Browse Packages" button
function switchToHome() {
    switchPage('home');
}




// Logout functionality
const logoutLink = document.querySelector('.sidebar-nav a.danger');
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmed = confirm('Are you sure you want to logout?');
        if (confirmed) {
            // Add logout logic here
            alert('Logged out successfully!');
            closeSidebar();
        }
    });
}




// ================================
// PROFILE AVATAR NAVIGATION
// ================================
const profileAvatar = document.querySelector('.profile-avatar');
if (profileAvatar) {
    profileAvatar.addEventListener('click', () => {
        switchPage('profile');
    });
}

// ================================
// "SEE ALL" BUTTON NAVIGATION
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
        // Remove active class from all tabs
        tabButtons.forEach(b => b.classList.remove('active'));
        
        // Activate clicked tab
        btn.classList.add('active');
        
        const tab = btn.dataset.tab;
        
        // Filter packages with fade animation
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
// FAVORITE FUNCTIONALITY
// ================================
favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        button.classList.toggle('active');
        
        // Add haptic-like animation
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);

        // Optional: Save to localStorage
        const card = button.closest('.package-card');
        const packageName = card.querySelector('h3').textContent;
        
        if (button.classList.contains('active')) {
            console.log(`Added ${packageName} to favorites`);
            // You can save to localStorage here
        } else {
            console.log(`Removed ${packageName} from favorites`);
            // You can remove from localStorage here
        }
    });
});




// ================================
// THEME TOGGLE FUNCTIONALITY
// ================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeModeText  = document.querySelector('.theme-mode-text');

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

    // Initialize
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme === 'dark');

    // Toggle handler
    themeToggleBtn.addEventListener('change', () => {
        applyTheme(themeToggleBtn.checked);
    });
});



// ================================
// SMOOTH SCROLL ENHANCEMENTS
// ================================
// Add smooth reveal animation when scrolling
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

// Observe package cards
packageCards.forEach(card => {
    observer.observe(card);
});


// ================================
// PULL TO REFRESH (Optional)
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
            // You can add visual feedback here
        }
    }
});

document.addEventListener('touchend', () => {
    if (window.scrollY === 0) {
        const pullDistance = touchEndY - touchStartY;
        
        if (pullDistance > pullThreshold) {
            // Trigger refresh
            console.log('Pull to refresh triggered');
            // You can add actual refresh logic here
            // For example: location.reload();
        }
        
        touchStartY = 0;
        touchEndY = 0;
    }
});


// ================================
// Package Tabs
// ================================

const tabs = document.getElementById('packageTabs');
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
  const walk = (x - startX) * 1.2; // drag speed
  tabs.scrollLeft = scrollLeft - walk;
});

/* Arrow buttons */
// document.querySelector('.tabs-nav.left').onclick = () =>
//   tabs.scrollBy({ left: -120, behavior: 'smooth' });

// document.querySelector('.tabs-nav.right').onclick = () =>
//   tabs.scrollBy({ left: 120, behavior: 'smooth' });












// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Add scroll-based logic here if needed
    }, 100);
});

// ================================
// INITIALIZATION
// ================================
console.log('Smart Escape Travel App initialized ✈️');




// Add loading animation removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent zoom on double tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);











// Initialize View Details buttons
function initPackageDetailsNavigation() {
    console.log('🔍 Initializing package details navigation...');
    
    const detailButtons = document.querySelectorAll('.btn-details');
    console.log(`✅ Found ${detailButtons.length} View Details buttons`);
    
    detailButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`🎯 Button ${index + 1} clicked`);
            
            // Get package card
            const card = this.closest('.package-card');
            if (!card) {
                console.error('❌ Could not find package card');
                return;
            }
            
            // Get package ID from data attribute
            let packageId = card.dataset.packageId;
            
            // If no data-package-id, generate from title
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
            
            console.log('📦 Opening package:', packageId);
            
            // Store package ID in localStorage
            localStorage.setItem('currentPackageId', packageId);
            
            // Navigate to package details page
            // Adjust path based on current location
            const currentPath = window.location.pathname;
            let targetPath;
            
            if (currentPath.includes('/pages/')) {
                targetPath = `package-details.php?id=${packageId}`;
            } else {
                targetPath = `pages/package-details.php?id=${packageId}`;
            }
            
            console.log('🚀 Navigating to:', targetPath);
            window.location.href = targetPath;
        });
    });
}

// Call after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPackageDetailsNavigation);
} else {
    initPackageDetailsNavigation();
}

console.log('✅ Package details navigation initialized');