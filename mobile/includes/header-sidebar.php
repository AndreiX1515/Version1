<!-- Top Navigation -->
<header class="mobile-header" id="mobileHeader">
    <div class="header-left">
        <button class="sidebar-toggle" aria-label="Menu">
            <span></span>
        </button>
    </div>

    <div class="header-center">
        <img src="assets/images/logo.png" alt="Smart Escape Logo" class="header-logo">
        <h2>SMART ESCAPE</h2>
    </div>

    <div class="header-right">
        <img src="" alt="" class="profile-avatar" data-page="profile" role="button">
    </div>
</header>

<!-- Sidebar Overlay (Backdrop) -->
<div class="sidebar-overlay" id="sidebarOverlay"></div>

<!-- Sidebar -->
<aside class="mobile-sidebar" id="mobileSidebar">
    <div class="sidebar-header">
        <div class="sidebar-profile">
            <img src="" alt="" class="sidebar-avatar">
            <div class="sidebar-profile-info">
                <h3>John Traveler</h3>
                <p>john@travel.com</p>
            </div>
        </div>

        <button class="sidebar-close" id="sidebarClose" aria-label="Close menu">
            <i class="fas fa-times"></i>
        </button>
    </div>

    <nav class="sidebar-nav">
        <a href="#" class="active" data-page="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="#" data-page="bookings">
            <i class="fas fa-calendar-check"></i>
            <span>My Bookings</span>
        </a>
        <a href="#" data-page="packages">
            <i class="fas fa-box"></i>
            <span>All Packages</span>
        </a>
        <a href="#" data-page="favorites">
            <i class="fas fa-heart"></i>
            <span>Favorites</span>
        </a>
        <a href="#" data-page="profile">
            <i class="fas fa-user"></i>
            <span>Profile Settings</span>
        </a>

        <div class="sidebar-divider"></div>

        <a href="#" class="danger" data-page="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </a>
    </nav>

    <!-- Theme Toggle Button -->
    <div class="sidebar-footer">
        <div class="theme-toggle-container">
            <div class="theme-toggle-label">
                <span>Theme:</span>
                <span class="theme-mode-text">Light</span>
            </div>

            <label class="toggle-switch" for="themeToggle">
                <input type="checkbox" id="themeToggle" aria-label="Toggle dark mode">
                <span class="toggle-slider"></span>
            </label>
        </div>
    </div>
</aside>