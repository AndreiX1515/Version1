<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Escape Travel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Styles -->
    <link rel="stylesheet" href="assets/css/root.css?v=<?= time(); ?>">
    <link rel="stylesheet" href="assets/css/mobile.css?v=<?= time(); ?>">
    <link rel="stylesheet" href="assets/css/landing.css?v=<?= time(); ?>">
    <!-- Package Details CSS - loaded conditionally by JS -->
    <link rel="stylesheet" href="assets/css/package-details.css?v=<?= time(); ?>" id="packageDetailsCSS">
</head>

<body>

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


    <!-- Main Dashboard Content -->
    <main class="dashboard">

        <!-- ============================================
             HOME PAGE CONTENT
        ============================================= -->
        <div class="page-content active" id="homePage">
            <!-- Hero Carousel -->
            <div class="hero-carousel" id="heroCarousel">
                <div class="carousel-container">
                    <div class="carousel-track" id="carouselTrack">
                        <div class="carousel-slide active">
                            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop" alt="Travel Destination 1">
                            <div class="carousel-overlay"></div>
                            <div class="carousel-content">
                                <h3>Discover Paradise</h3>
                                <p>Exclusive beach destinations</p>
                            </div>
                        </div>

                        <div class="carousel-slide">
                            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop" alt="Travel Destination 2">
                            <div class="carousel-overlay"></div>
                            <div class="carousel-content">
                                <h3>Urban Adventures</h3>
                                <p>Explore vibrant city life</p>
                            </div>
                        </div>

                        <div class="carousel-slide">
                            <img src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=400&fit=crop" alt="Travel Destination 3">
                            <div class="carousel-overlay"></div>
                            <div class="carousel-content">
                                <h3>Mountain Escapes</h3>
                                <p>Breathtaking alpine views</p>
                            </div>
                        </div>

                        <div class="carousel-slide">
                            <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=400&fit=crop" alt="Travel Destination 4">
                            <div class="carousel-overlay"></div>
                            <div class="carousel-content">
                                <h3>Cultural Journeys</h3>
                                <p>Immerse in local traditions</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="carousel-indicators" id="carouselIndicators">
                    <span class="indicator active" data-slide="0"></span>
                    <span class="indicator" data-slide="1"></span>
                    <span class="indicator" data-slide="2"></span>
                    <span class="indicator" data-slide="3"></span>
                </div>
            </div>

            <div class="package-wrapper">
                <!-- Package Tabs Header -->
                <div class="package-header">
                    <div class="package-title">
                        <div class="package-title-text">
                            <h2>Travel Packages</h2>
                            <p class="package-subtitle">Find your perfect getaway</p>
                        </div>

                        <div class="package-title-action">
                            <a href="#" class="package-see-all">See all</a>
                        </div>
                    </div>

                    <div class="package-tabs-wrapper">
                        <div class="package-tabs" id="packageTabs">
                            <button class="tab-btn active" data-tab="all">
                                <span>All</span>
                            </button>
                            <button class="tab-btn" data-tab="korea">
                                <span>Korea</span>
                            </button>
                            <button class="tab-btn" data-tab="japan">
                                <span>Japan</span>
                            </button>
                            <button class="tab-btn" disabled data-tab="vietnam">
                                <span>Vietnam</span>
                            </button>
                            <button class="tab-btn" disabled data-tab="thailand">
                                <span>Thailand</span>
                            </button>
                            <button class="tab-btn" disabled>
                                <span>Coming Soon</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Package Grid -->
                <div class="package-grid">
                    <!-- Featured Card (Full Width) -->
                    <div class="package-card featured" data-package-id="seoul-city-explorer" data-category="korea">
                        <div class="package-badge">Featured</div>
                        <button class="package-favorite" aria-label="Add to favorites">
                            <i class="far fa-heart"></i>
                        </button>
                        <img src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop" alt="Korea City Tour">
                        <div class="package-info">
                            <div class="package-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                                <span>4.8</span>
                            </div>
                            <h3>Seoul City Explorer</h3>
                            <p><i class="far fa-clock"></i> 5 Days / 4 Nights</p>

                            <div class="package-footer">
                                <span class="price">₱29,999</span>
                                <button class="btn-details">View Details</button>
                            </div>
                        </div>
                    </div>

                    <!-- Regular Cards -->
                    <div class="package-card" data-package-id="busan-beach-resort" data-category="korea">
                        <button class="package-favorite" aria-label="Add to favorites">
                            <i class="far fa-heart"></i>
                        </button>
                        <img src="https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&h=400&fit=crop" alt="Busan Beach">
                        <div class="package-info">
                            <div class="package-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.3</span>
                            </div>
                            <h3>Busan Beach Resort</h3>
                            <p><i class="far fa-clock"></i> 4 Days / 3 Nights</p>
                            <div class="package-footer">
                                <span class="price">₱24,999</span>
                                <button class="btn-details">View Details</button>
                            </div>
                        </div>
                    </div>

                    <div class="package-card" data-package-id="jeju-island-paradise" data-category="korea">
                        <div class="package-badge popular">Coming Soon</div>
                        <button class="package-favorite" aria-label="Add to favorites">
                            <i class="far fa-heart"></i>
                        </button>
                        <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop" alt="Jeju Island">
                        <div class="package-info">
                            <div class="package-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                                <span>4.9</span>
                            </div>
                            <h3>Jeju Island Paradise</h3>
                            <p><i class="far fa-clock"></i> 5 Days / 4 Nights</p>
                            <div class="package-footer">
                                <span class="price">₱34,999</span>
                                <button class="btn-details">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="about-wrapper">
                <!-- About Header -->
                <div class="about-header">
                    <h2>About us</h2>
                </div>

                <!-- About Content Grid -->
                <div class="about-grid">
                    <!-- Company Introduction Card -->
                    <div class="about-card">
                        <div class="about-card-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="about-card-content">
                            <h3>Company Introduction</h3>
                            <p class="about-card-subtitle">Brand & Philosophy</p>
                            <p class="about-card-description">
                                We are a leading travel agency dedicated to creating unforgettable experiences.
                                Our mission is to provide exceptional service and curated travel packages that
                                inspire adventure and create lasting memories.
                            </p>
                        </div>
                    </div>

                    <!-- Partnership Information Card -->
                    <div class="about-card">
                        <div class="about-card-icon partnership">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="about-card-content">
                            <h3>Partnership Information</h3>
                            <p class="about-card-subtitle">Partnership</p>
                            <p class="about-card-description">
                                We collaborate with trusted partners worldwide to ensure the highest quality
                                experiences. Our network includes premium hotels, airlines, and local tour
                                operators committed to excellence.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Additional Info Section -->
                <div class="about-info-section">
                    <div class="about-info-grid">
                        <div class="about-info-item">
                            <div class="about-info-icon">
                                <i class="fas fa-globe-asia"></i>
                            </div>
                            <h4>50+ Destinations</h4>
                            <p>Explore amazing places across Asia</p>
                        </div>

                        <div class="about-info-item">
                            <div class="about-info-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h4>10K+ Happy Travelers</h4>
                            <p>Join our community of explorers</p>
                        </div>

                        <div class="about-info-item">
                            <div class="about-info-icon">
                                <i class="fas fa-award"></i>
                            </div>
                            <h4>Award Winning</h4>
                            <p>Recognized for excellence</p>
                        </div>

                        <div class="about-info-item">
                            <div class="about-info-icon">
                                <i class="fas fa-headset"></i>
                            </div>
                            <h4>24/7 Support</h4>
                            <p>We're here whenever you need us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================
             OTHER EXISTING PAGES (Bookings, Favorites, Profile, Packages)
        ============================================= -->

        <!-- Bookings Page Content -->
        <div class="page-content content-wrapper" id="bookingsPage">
            <div class="page-content-header">
                <div class="page-content-header-main">
                    <button class="page-back-btn" type="button" aria-label="Go back" onclick="switchToHome()">
                        <i class="fas fa-arrow-left"></i>
                    </button>

                    <div class="page-content-header-text">
                        <h2>My Bookings</h2>
                        <p>View and manage your travel reservations</p>
                    </div>
                </div>
            </div>

            <div class="page-content-body"></div>

            <div class="empty-state">
                <i class="fas fa-calendar-alt"></i>
                <h3>No bookings yet</h3>
                <p>Start exploring our packages and book your dream vacation!</p>
                <button class="btn-primary" onclick="switchToHome()">Browse Packages</button>
            </div>
        </div>

        <!-- Favorites Page Content -->
        <div class="page-content content-wrapper" id="favoritesPage">
            <div class="page-content-header">
                <div class="page-content-header-main">
                    <button class="page-back-btn" type="button" aria-label="Go back" onclick="switchToHome()">
                        <i class="fas fa-arrow-left"></i>
                    </button>

                    <div class="page-content-header-text">
                        <h2>Favorites</h2>
                        <p>Your go-to travel packages</p>
                    </div>
                </div>
            </div>

            <div class="page-content-body"></div>
        </div>

        <!-- Profile Page Content -->
        <div class="page-content content-wrapper" id="profilePage">
            <div class="page-content-header">
                <div class="page-content-header-main">
                    <button class="page-back-btn" type="button" aria-label="Go back" onclick="switchToHome()">
                        <i class="fas fa-arrow-left"></i>
                    </button>

                    <div class="page-content-header-text">
                        <h2>Profile Settings</h2>
                        <p>Manage your account information</p>
                    </div>
                </div>
            </div>

            <div class="page-content-body">
                <div class="profile-content">
                    <div class="profile-section">
                        <div class="profile-avatar-large">
                            <img src="" alt="">
                            <button class="avatar-edit">
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        <h3>John Traveler</h3>
                        <p class="profile-email">john@travel.com</p>
                    </div>

                    <div class="profile-menu">
                        <a href="#" class="profile-menu-item">
                            <i class="fas fa-user"></i>
                            <span>Personal Information</span>
                            <i class="fas fa-chevron-right"></i>
                        </a>
                        <a href="#" class="profile-menu-item">
                            <i class="fas fa-credit-card"></i>
                            <span>Payment Methods</span>
                            <i class="fas fa-chevron-right"></i>
                        </a>
                        <a href="#" class="profile-menu-item">
                            <i class="fas fa-bell"></i>
                            <span>Notifications</span>
                            <i class="fas fa-chevron-right"></i>
                        </a>
                        <a href="#" class="profile-menu-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>Privacy & Security</span>
                            <i class="fas fa-chevron-right"></i>
                        </a>
                        <a href="#" class="profile-menu-item">
                            <i class="fas fa-question-circle"></i>
                            <span>Help & Support</span>
                            <i class="fas fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Package Page Content -->
        <div class="page-content content-wrapper" id="packagesPage">
            <div class="page-content-header">
                <div class="page-content-header-main">
                    <button class="page-back-btn" type="button" aria-label="Go back" onclick="switchToHome()">
                        <i class="fas fa-arrow-left"></i>
                    </button>

                    <div class="page-content-header-text">
                        <h2>Available Packages</h2>
                        <p>Manage your account information</p>
                    </div>
                </div>
            </div>

            <div class="page-content-body">
                <div class="package-header">
                    <div class="package-tabs-wrapper">
                        <div class="package-tabs" id="packageTabsAll">
                            <button class="tab-btn active" data-tab="all">
                                <span>All</span>
                            </button>
                            <button class="tab-btn" data-tab="korea">
                                <span>Korea</span>
                            </button>
                            <button class="tab-btn" data-tab="japan">
                                <span>Japan</span>
                            </button>
                            <button class="tab-btn" disabled data-tab="vietnam">
                                <span>Vietnam</span>
                            </button>
                            <button class="tab-btn" disabled data-tab="thailand">
                                <span>Thailand</span>
                            </button>
                            <button class="tab-btn" disabled>
                                <span>Coming Soon</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Package Grid (same cards as home) -->
                <div class="package-grid">
                    <!-- Same package cards as home page -->
                </div>
            </div>
        </div>


        <!-- ============================================
             PACKAGE DETAILS PAGE (NEW SPA SECTION)
        ============================================= -->
        <div class="page-content" id="packageDetailsPage">

            <div class="package-details-page">

                <!-- Hero Section -->
                <div class="package-hero">

                    <!-- HERO MEDIA -->
                    <div class="hero-media">
                        <img src="" alt="" class="hero-image" id="heroImage">
                        <div class="hero-overlay"></div>
                    </div>

                    <!-- HERO ACTIONS (TOP CONTROLS) -->
                    <div class="hero-actions">
                        <a href="javascript:void(0);"
                            class="hero-back-btn"
                            aria-label="Go back"
                            onclick="switchToHome()">
                            <i class="fas fa-arrow-left"></i>
                        </a>


                        <button class="hero-favorite-btn"
                            aria-label="Add to favorites">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>

                    <!-- HERO CONTENT (BOTTOM TEXT BLOCK) -->
                    <div class="hero-content">
                        <!-- BADGE -->
                        <div class="hero-badge">
                            <div class="package-badge-hero" id="heroBadge">Featured</div>
                        </div>

                        <!-- TITLE GROUP -->
                        <div class="hero-text">
                            <h1 class="package-title-hero" id="packageTitle">Loading...</h1>
                            <p class="package-subtitle-hero" id="packageSubtitle">Please wait...</p>
                        </div>

                        <!-- META INFO -->
                        <div class="hero-meta">
                            <div class="package-meta-hero">
                                <span class="meta-item">
                                    <i class="far fa-clock"></i>
                                    <span id="packageDuration">-</span>
                                </span>
                                <span class="meta-item">
                                    <i class="fas fa-star"></i>
                                    <span id="packageRating">-</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="package-content">

                    <!-- Quick Info Cards -->
                    <div class="quick-info-grid">
                        <div class="info-card">
                            <i class="fas fa-calendar-alt"></i>
                            <div>
                                <h4>Duration</h4>
                                <p id="infoDuration">-</p>
                            </div>
                        </div>

                        <div class="info-card">
                            <i class="fas fa-users"></i>
                            <div>
                                <h4>Group Size</h4>
                                <p id="infoGroupSize">-</p>
                            </div>
                        </div>

                        <div class="info-card">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <p id="infoLocation">-</p>
                            </div>
                        </div>
                    </div>

                    <!-- Overview -->
                    <section class="content-section">
                        <h2 class="section-title">Overview</h2>
                        <p class="overview-text" id="overviewText">Loading...</p>

                        <h3 class="subsection-title">Highlights</h3>
                        <ul class="highlights-list" id="highlightsList">
                            <li>Loading...</li>
                        </ul>
                    </section>

                    <!-- Itinerary -->
                    <section class="content-section">
                        <h2 class="section-title">Itinerary</h2>
                        <div class="itinerary-list" id="itineraryList"></div>
                    </section>


                    <!-- Inclusions & Exclusions -->
                    <section class="content-section">
                        <h2 class="section-title">What's Included</h2>

                        <div class="inclusion-grid">
                            <div class="inclusion-card">
                                <h3><i class="fas fa-check-circle"></i> Inclusions</h3>
                                <ul id="inclusionsList">
                                    <li>Loading...</li>
                                </ul>
                            </div>

                            <div class="inclusion-card exclusions">
                                <h3><i class="fas fa-times-circle"></i> Exclusions</h3>
                                <ul id="exclusionsList">
                                    <li>Loading...</li>
                                </ul>
                            </div>
                        </div>
                    </section>


                    <!-- Booking Calendar -->
                    <section class="content-section">

                        <div class="section-header-with-action">
                            <h2 class="section-title">Booking Dates</h2>
                            <a href="#" class="view-all-link">View all available booking</a>
                        </div>

                        <div class="booking-summary" id="bookingSummary">
                            <div class="summary-item">
                                <i class="fas fa-users"></i>
                                <span>Booking <strong id="bookingSlots">-</strong> / 40</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Minimum Departure:</span>
                                <span><strong id="minDeparture">- people</strong></span>
                            </div>
                        </div>

                        <div class="selected-date-info" id="selectedDateInfo" style="display: none;">
                            <div class="date-info-header">
                                <i class="fas fa-plane-departure"></i>
                                <div>
                                    <p class="info-label">Departure Date</p>
                                    <p class="info-value" id="departureDate">-</p>
                                </div>
                            </div>

                            <div class="date-info-header">
                                <i class="fas fa-plane-arrival"></i>
                                <div>
                                    <p class="info-label">Return Date</p>
                                    <p class="info-value" id="returnDate">-</p>
                                </div>
                            </div>
                        </div>

                        <div class="booking-calendar-wrapper">

                            <div class="calendar-header">
                                <button class="calendar-nav-btn" id="prevMonth" aria-label="Previous month">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <h3 class="calendar-month" id="calendarMonth">May 2026</h3>
                                <button class="calendar-nav-btn" id="nextMonth" aria-label="Next month">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>

                            <div class="calendar-grid">
                                <div class="calendar-day-header">Sun</div>
                                <div class="calendar-day-header">Mon</div>
                                <div class="calendar-day-header">Tue</div>
                                <div class="calendar-day-header">Wed</div>
                                <div class="calendar-day-header">Thu</div>
                                <div class="calendar-day-header">Fri</div>
                                <div class="calendar-day-header">Sat</div>
                            </div>

                        </div>

                        <div class="calendar-booking-wrapper">
                            <div class="booking-bar-content">
                                <div class="booking-price"></div>
                                <button class="btn-book-now" id="bookNowBtn">
                                    <span>Book Now</span>
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                    </section>


                    <!-- Reviews -->
                    <section class="content-section">
                        <div class="section-header-with-action">
                            <h2 class="section-title">Reviews</h2>
                            <a href="#" class="view-all-link">View all reviews</a>
                        </div>

                        <div class="rating-summary">
                            <div class="rating-score">
                                <div class="score-big" id="ratingScore">-</div>
                                <div class="rating-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                </div>
                                <p class="rating-count" id="ratingCount">Loading...</p>
                            </div>

                            <div class="rating-breakdown">
                                <div class="rating-bar-item">
                                    <span>5★</span>
                                    <div class="rating-bar">
                                        <div class="rating-bar-fill" style="width: 63%"></div>
                                    </div>
                                    <span>98</span>
                                </div>
                                <div class="rating-bar-item">
                                    <span>4★</span>
                                    <div class="rating-bar">
                                        <div class="rating-bar-fill" style="width: 29%"></div>
                                    </div>
                                    <span>45</span>
                                </div>
                                <div class="rating-bar-item">
                                    <span>3★</span>
                                    <div class="rating-bar">
                                        <div class="rating-bar-fill" style="width: 6%"></div>
                                    </div>
                                    <span>10</span>
                                </div>
                                <div class="rating-bar-item">
                                    <span>2★</span>
                                    <div class="rating-bar">
                                        <div class="rating-bar-fill" style="width: 1%"></div>
                                    </div>
                                    <span>2</span>
                                </div>
                                <div class="rating-bar-item">
                                    <span>1★</span>
                                    <div class="rating-bar">
                                        <div class="rating-bar-fill" style="width: 1%"></div>
                                    </div>
                                    <span>1</span>
                                </div>
                            </div>
                        </div>

                        <div class="reviews-list" id="reviewsList"></div>
                    </section>


                    <!-- Related Packages -->
                    <section class="content-section">
                        <h2 class="section-title">You might also like</h2>
                        <div class="related-packages-grid" id="relatedPackages"></div>
                    </section>

                </div>

                <!-- Sticky Booking Bar -->
                <div class="sticky-booking-bar">
                    <div class="booking-bar-content">
                        <div class="booking-price">
                            <span class="price-label">From</span>
                            <span class="price-amount" id="stickyPrice">₱-</span>
                            <span class="price-per">per person</span>
                        </div>
                        <button class="btn-book-now" id="stickyBookNowBtn">
                            <span>Book Now</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

            </div>

        </div>

    </main>


    <!-- Bottom Navigation (Mobile) -->
    <nav class="bottom-nav">
        <a href="#" class="active" data-page="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="#" data-page="bookings">
            <i class="fas fa-calendar-check"></i>
            <span>Bookings</span>
        </a>
        <a href="#" data-page="packages">
            <i class="fas fa-box"></i>
            <span>Packages</span>
        </a>
        <a href="#" data-page="favorites">
            <i class="fas fa-heart"></i>
            <span>Favorites</span>
        </a>
    </nav>

    
    <!-- Scripts -->
    <script src="js/JSON/korea-packages.js"></script>
    <script src="js/package-details.js"></script>
    <script src="js/landing.js"></script>

</body>

</html>