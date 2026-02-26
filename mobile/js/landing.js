// ================================
// LANDING.JS — SPA V2.3.0
// ================================

// ================================
// DOM REFS
// ================================
const sidebar        = document.getElementById('mobileSidebar');
const overlay        = document.getElementById('sidebarOverlay');
const toggleBtn      = document.querySelector('.sidebar-toggle');
const closeBtn       = document.getElementById('sidebarClose');
const themeToggleBtn = document.getElementById('themeToggle');
const themeModeText  = document.querySelector('.theme-mode-text');
const bottomNavLinks = document.querySelectorAll('.bottom-nav a');
const sidebarNavLinks = document.querySelectorAll('.sidebar-nav a:not(.danger)');
const pageContents   = document.querySelectorAll('.page-content');

// ================================
// STATE
// ================================
let currentPage      = 'home';
let currentPackageId = null;


// ================================
// STAR HELPER
// ================================
function generateStarHTML(rating) {
  const full  = Math.floor(rating);
  const half  = (rating % 1) >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    '<i class="fas fa-star"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-alt"></i>' : '') +
    '<i class="far fa-star"></i>'.repeat(empty)
  );
}


// ================================
// BUILD SINGLE CARD
// ================================
function buildPackageCard(pkg) {
  const card = document.createElement('div');

  card.className = `
    package-card 
    package-card--compact
    ${pkg.featured ? 'featured' : ''}
  `.trim();

  card.dataset.packageId = pkg.id;
  card.dataset.category  = pkg.country.toLowerCase();

  const badge = pkg.featured
    ? '<div class="package-badge">Featured</div>'
    : pkg.status === 'coming-soon'
      ? '<div class="package-badge popular">Coming Soon</div>'
      : '';

  const originalPrice = pkg.price?.originalPrice
    ? `<span class="price-original">&#8369;${pkg.price.originalPrice.toLocaleString()}</span>`
    : '';

  card.innerHTML = `
    ${badge}
    <button class="package-favorite" aria-label="Add to favorites">
      <i class="far fa-heart"></i>
    </button>

    <div class="img-wrap">
      <img src="${pkg.images.thumbnail}" alt="${pkg.title}" loading="lazy">
    </div>

    <div class="package-info">
      <div class="package-rating">
        ${generateStarHTML(pkg.rating.average)}
        <span>${pkg.rating.average}</span>
      </div>

      <h3>${pkg.title}</h3>

      <p>
        <i class="far fa-clock"></i>
        ${pkg.duration.description}
      </p>

      <div class="package-footer">
        <div class="price-wrap">
          ${originalPrice}
          <span class="price">&#8369;${pkg.price.amount.toLocaleString()}</span>
        </div>

        <button class="btn-details">View Details</button>
      </div>
    </div>
  `;

  return card;
}






// ================================
// BUILD DYNAMIC PACKAGE UI
// ================================
function buildPackageUI(gridSelector, tabsSelector) {
  const grid          = document.querySelector(gridSelector);
  const tabsContainer = document.querySelector(tabsSelector);
  if (!grid || !tabsContainer) return;

  const allPackages = typeof getAllPackages === 'function' ? getAllPackages() : [];
  if (!allPackages.length) { console.warn('No packages found'); return; }

  // Country map for tab labels
  const countryMap = {};
  allPackages.forEach(pkg => {
    const key = pkg.country.toLowerCase();
    if (!countryMap[key]) countryMap[key] = pkg.country;
  });

  // Build Tabs
  tabsContainer.innerHTML = '';

  const makeTab = (tabVal, label, active = false) => {
    const btn = document.createElement('button');
    btn.className   = `tab-btn${active ? ' active' : ''}`;
    btn.dataset.tab = tabVal;
    btn.innerHTML   = `<span>${label}</span>`;
    return btn;
  };

  tabsContainer.appendChild(makeTab('all', 'All', true));
  Object.entries(countryMap).forEach(([key, display]) => {
    tabsContainer.appendChild(makeTab(key, display.replace('South ', '')));
  });

  // Build Cards
  grid.innerHTML = '';
  allPackages.forEach(pkg => grid.appendChild(buildPackageCard(pkg)));

  // Tab filter
  const tabs  = tabsContainer.querySelectorAll('.tab-btn');
  const cards = grid.querySelectorAll('.package-card');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selected = btn.dataset.tab;
      cards.forEach(card => {
        card.style.display = (selected === 'all' || card.dataset.category === selected) ? '' : 'none';
      });
    });
  });

  // Delegated: View Details
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.btn-details');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = btn.closest('.package-card')?.dataset.packageId;
    if (id) showPackageDetails(id);
  });

  // Delegated: Favorite toggle
  grid.addEventListener('click', e => {
    const fav = e.target.closest('.package-favorite');
    if (!fav) return;
    e.stopPropagation();
    fav.classList.toggle('active');
    fav.style.transform = 'scale(1.25)';
    setTimeout(() => { fav.style.transform = ''; }, 180);
  });
}



// ================================
// CAROUSEL
// ================================
function initCarousel() {
  const track      = document.getElementById('carouselTrack');
  const slides     = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const container  = document.querySelector('.carousel-container');
  if (!track || !slides.length) return;

  let cur = 0, timer;

  function show(i) {
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    if (indicators[i]) indicators[i].classList.add('active');
    track.style.transform = `translateX(${-i * 100}%)`;
  }

  function next()  { cur = (cur + 1) % slides.length; show(cur); }
  function prev()  { cur = (cur - 1 + slides.length) % slides.length; show(cur); }
  function start() { stop(); timer = setInterval(next, 4000); }
  function stop()  { clearInterval(timer); }

  show(0);
  start();

  indicators.forEach((d, i) => {
    d.addEventListener('click', () => { cur = i; show(cur); start(); });
  });

  let touchStartX = 0;
  container.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stop();
  }, { passive: true });

  container.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    start();
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });
}


// ================================
// SIDEBAR
// ================================
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  toggleBtn?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  toggleBtn?.classList.remove('active');
  document.body.style.overflow = '';
}

toggleBtn?.addEventListener('click', e => {
  e.stopPropagation();
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

closeBtn?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);
sidebar?.addEventListener('click', e => e.stopPropagation());

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
});


// ================================
// FOOTER VISIBILITY
// ================================
function updateFooterVisibility(pageName) {
  const footer = document.querySelector('.app-footer');
  if (!footer) return;
  footer.style.display = ['packageDetails', 'booking'].includes(pageName) ? 'none' : '';
}


// ================================
// PAGE SWITCH
// ================================
function switchPage(pageName, options = {}) {
  const page = document.getElementById(`${pageName}Page`);
  if (!page) { console.warn(`switchPage: no element #${pageName}Page`); return; }

  pageContents.forEach(p => p.classList.remove('active'));
  page.classList.add('active');

  if (pageName === 'booking' && typeof initBookingPage === 'function') {
    setTimeout(initBookingPage, 100);
  }

  updateFooterVisibility(pageName);

  bottomNavLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageName));
  sidebarNavLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageName));

  closeSidebar();

  if (!options.skipScroll) window.scrollTo({ top: 0, behavior: 'smooth' });

  currentPage = pageName;

  if (!['booking', 'packageDetails'].includes(pageName)) {
    localStorage.setItem('currentPage', pageName);
  }

  if (!options.skipHash) updateURLHash(pageName);
}


// ================================
// SHOW PACKAGE DETAILS
// ================================
function showPackageDetails(packageId) {
  sessionStorage.setItem('previousPage', currentPage);
  currentPackageId = packageId;
  sessionStorage.setItem('currentPackageId', packageId);

  switchPage('packageDetails', { skipScroll: true, skipHash: true });

  if (typeof loadPackageData === 'function') loadPackageData(packageId);

  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateURLHash('packageDetails', packageId);
}

window.showPackageDetails = showPackageDetails;


// ================================
// BACK NAVIGATION (unified)
// ================================
function goBack() {
  const returnPage = sessionStorage.getItem('previousPage') || 'home';
  sessionStorage.removeItem('currentPackageId');
  switchPage(returnPage);
}

window.generalGoBack            = goBack;
window.goBackFromPackageDetails = goBack;


// ================================
// URL HASH
// ================================
function updateURLHash(pageName, packageId = null) {
  let hash = '';
  if (pageName === 'packageDetails' && packageId) hash = `#package/${packageId}`;
  else if (pageName !== 'home') hash = `#${pageName}`;
  const target = hash || window.location.pathname;
  if (window.location.hash !== hash) history.pushState(null, '', target);
}

function handleHashChange() {
  const hash = window.location.hash.slice(1);

  if (!hash) {
    ['packageDetails', 'booking'].includes(currentPage)
      ? goBack()
      : switchPage('home', { skipHash: true });

  } else if (hash.startsWith('package/')) {
    const id = hash.split('package/')[1];
    if (id !== currentPackageId) showPackageDetails(id);

  } else if (hash === 'booking') {
    sessionStorage.getItem('bookingData')
      ? switchPage('booking', { skipHash: true })
      : switchPage('home',    { skipHash: true });

  } else {
    if (['packageDetails', 'booking'].includes(currentPage)) goBack();
    switchPage(hash, { skipHash: true });
  }
}

window.addEventListener('hashchange', handleHashChange);


// ================================
// BOTTOM NAV
// ================================
bottomNavLinks.forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); switchPage(link.dataset.page); });
});


// ================================
// SIDEBAR NAV
// ================================
sidebarNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.page;
    if (['packageDetails', 'booking'].includes(currentPage)) {
      sessionStorage.removeItem('currentPackageId');
      currentPage = sessionStorage.getItem('previousPage') || 'home';
    }
    switchPage(target);
  });
});


// ================================
// GLOBAL SHORTCUTS
// ================================
window.switchToHome    = () => switchPage('home');
window.switchToPackage = () => switchPage('packages');

document.querySelector('.package-see-all')
  ?.addEventListener('click', e => { e.preventDefault(); switchPage('packages'); });

document.querySelector('.profile-avatar')
  ?.addEventListener('click', () => switchPage('profile'));

document.querySelector('.sidebar-nav a.danger')
  ?.addEventListener('click', e => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      closeSidebar();
    }
  });


// ================================
// TABS DRAG SCROLL
// ================================
function initTabsDrag(el) {
  if (!el) return;
  let isDown = false, startX, startScrollLeft;

  el.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - el.offsetLeft;
    startScrollLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
  });

  el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = ''; });
  el.addEventListener('mouseup',    () => { isDown = false; el.style.cursor = ''; });

  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = startScrollLeft - (x - startX) * 1.2;
  });
}


// ================================
// THEME
// ================================
function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  if (themeToggleBtn) themeToggleBtn.checked = isDark;
  if (themeModeText)  themeModeText.textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}


// ================================
// INIT — single DOMContentLoaded
// ================================
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  applyTheme(localStorage.getItem('theme') === 'dark');
  themeToggleBtn?.addEventListener('change', () => applyTheme(themeToggleBtn.checked));

  // Carousel
  initCarousel();

  // Package grids
  buildPackageUI('#homePage .package-grid',    '#packageTabs');
  buildPackageUI('#packagesPage .package-grid', '#packageTabsAll');

  // Tab drag
  initTabsDrag(document.getElementById('packageTabs'));
  initTabsDrag(document.getElementById('packageTabsAll'));

  // Restore page from URL hash or localStorage
  const hash = window.location.hash.slice(1);
  if (hash) {
    handleHashChange();
  } else {
    const saved = localStorage.getItem('currentPage');
    if (saved && saved !== 'packageDetails') {
      switchPage(saved, { skipHash: true });
    }
  }

  document.body.classList.add('loaded');
  console.log('✅ Smart Escape Travel — V2.3.0 ready');
});