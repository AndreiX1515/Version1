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
    <link rel="stylesheet" href="assets/css/booking.css?v=<?= time(); ?>">


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
                <button class="btn-primary" onclick="switchToPackage()">Browse Packages</button>
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
        </div>


        <!-- ============================================
                    PACKAGE DETAILS PAGE V2.3
        ============================================= -->
        <div class="page-content content-wrapper" id="packageDetailsPage">

            <div class="package-details-page">

                <!-- ========================
                    HERO SECTION
                ========================= -->
                <div class="package-hero">

                    <div class="hero-media">
                        <img src="" alt="" class="hero-image" id="heroImage">
                        <div class="hero-overlay"></div>
                    </div>

                    <button class="hero-back-btn" aria-label="Go back" onclick="goBackFromPackageDetails()" type="button">
                        <i class="fas fa-arrow-left"></i>
                    </button>

                    <button class="hero-favorite-btn" id="packageFavoriteBtn" aria-label="Add to favorites" type="button">
                        <i class="far fa-heart"></i>
                    </button>

                    <div class="hero-content">
                        <div class="package-badge-hero" id="packageBadge">Featured</div>
                        <h1 class="package-title-hero" id="packageTitle">Loading...</h1>
                        <p class="package-subtitle-hero" id="packageSubtitle">Please wait...</p>
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

                <!-- ========================
                    MAIN CONTENT
                ========================= -->
                <div class="package-content">

                    <div class="package-main-content">

                        <!-- ================================================
                            TOP SECTION
                            Desktop:  [package-top-left] [package-booking-panel]
                            Mobile:   [package-booking-panel] (order:-1, first)
                                    [package-top-left]
                        ================================================= -->

                        <div class="package-top-section">

                            <!-- LEFT: Quick info + Overview -->
                            <div class="package-top-left">

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

                            </div>


                            <!-- RIGHT/TOP: Booking Panel
                                - Mobile: order -1 → appears FIRST (after hero)
                                - Desktop: right column, sticky
                            -->

                            <div class="package-booking-panel">

                                <div class="booking-panel-inner">

                                    <!-- <h2 class="panel-title">Book This Trip</h2> -->

                                    <!-- Calendar Navigation -->
                                    <div class="calendar-header">
                                        <button class="calendar-nav-btn calendar-nav-prev" aria-label="Previous month">
                                            <i class="fas fa-chevron-left"></i>
                                        </button>
                                        <h3 class="calendar-month">Loading...</h3>
                                        <button class="calendar-nav-btn calendar-nav-next" aria-label="Next month">
                                            <i class="fas fa-chevron-right"></i>
                                        </button>
                                    </div>


                                    <!-- Calendar Grid -->
                                    <div class="calendar-grid">
                                        <div class="calendar-day-header">S</div>
                                        <div class="calendar-day-header">M</div>
                                        <div class="calendar-day-header">T</div>
                                        <div class="calendar-day-header">W</div>
                                        <div class="calendar-day-header">T</div>
                                        <div class="calendar-day-header">F</div>
                                        <div class="calendar-day-header">S</div>
                                    </div>


                                    <!-- Calendar Legend -->
                                    <div class="calendar-legend">
                                        <div class="legend-item">
                                            <div class="legend-box available"></div>
                                            <span>Available</span>
                                        </div>
                                        <div class="legend-item">
                                            <div class="legend-box today"></div>
                                            <span>Today</span>
                                        </div>
                                        <div class="legend-item">
                                            <div class="legend-box sold-out"></div>
                                            <span>Sold Out</span>
                                        </div>
                                    </div>


                                    <!-- Booking Info Card -->
                                    <div class="booking-info-card">
                                        <div class="booking-price-section">
                                            <p class="price-amount">₱-</p>
                                            <p class="price-per">per person</p>
                                        </div>

                                        <div class="booking-info-grid">
                                            <div class="booking-info-item">
                                                <i class="fas fa-users"></i>
                                                <div class="booking-info-content">
                                                    <p class="info-label">Group Size</p>
                                                    <p class="info-value">
                                                        <span id="minDeparture">-</span> to
                                                        <span id="maxGroup">-</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="booking-info-item">
                                                <i class="fas fa-calendar-check"></i>
                                                <div class="booking-info-content">
                                                    <p class="info-label">Available Slots</p>
                                                    <p class="info-value booking-slots">Select a date</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Revealed after date selection -->
                                        <div class="selected-date-info" id="selectedDateInfo">
                                            <div class="booking-info-item">
                                                <i class="fas fa-plane-departure"></i>
                                                <div class="booking-info-content">
                                                    <p class="info-label">Departure</p>
                                                    <p class="info-value" id="departureDate">-</p>
                                                </div>
                                            </div>
                                            <div class="booking-info-item">
                                                <i class="fas fa-plane-arrival"></i>
                                                <div class="booking-info-content">
                                                    <p class="info-label">Return</p>
                                                    <p class="info-value" id="returnDate">-</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- Book Now Button -->
                                    <button class="btn-book-now" disabled>
                                        <span>Select a date first</span>
                                        <i class="fas fa-arrow-right"></i>
                                    </button>

                                </div>
                            </div>

                        </div>


                        <!-- ========================
                            ITINERARY
                        ========================= -->
                        <section class="content-section">
                            <h2 class="section-title">Itinerary</h2>
                            <div class="itinerary-list" id="itineraryList"></div>
                        </section>

                        <!-- ========================
                            INCLUSIONS & EXCLUSIONS
                        ========================= -->
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

                        <!-- ========================
                            REVIEWS
                        ========================= -->
                        <section class="content-section">
                            <div class="section-header-with-action">
                                <h2 class="section-title">Reviews</h2>
                                <a href="#" class="view-all-link">View all</a>
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
                                            <div class="rating-bar-fill" style="width:63%"></div>
                                        </div>
                                        <span>98</span>
                                    </div>
                                    <div class="rating-bar-item">
                                        <span>4★</span>
                                        <div class="rating-bar">
                                            <div class="rating-bar-fill" style="width:29%"></div>
                                        </div>
                                        <span>45</span>
                                    </div>
                                    <div class="rating-bar-item">
                                        <span>3★</span>
                                        <div class="rating-bar">
                                            <div class="rating-bar-fill" style="width:6%"></div>
                                        </div>
                                        <span>10</span>
                                    </div>
                                    <div class="rating-bar-item">
                                        <span>2★</span>
                                        <div class="rating-bar">
                                            <div class="rating-bar-fill" style="width:1%"></div>
                                        </div>
                                        <span>2</span>
                                    </div>
                                    <div class="rating-bar-item">
                                        <span>1★</span>
                                        <div class="rating-bar">
                                            <div class="rating-bar-fill" style="width:1%"></div>
                                        </div>
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>

                            <div class="reviews-list" id="reviewsList"></div>
                        </section>

                        <!-- ========================
                            RELATED PACKAGES
                        ========================= -->
                        <section class="content-section">
                            <h2 class="section-title">You might also like</h2>
                            <div class="related-packages-wrapper">
                                <div class="related-packages-grid" id="relatedPackages"></div>
                            </div>
                        </section>

                    </div>

   
                </div>


                <!-- ========================
                    STICKY BOTTOM BAR (Mobile ≤767px)
                ========================= -->
                <div class="sticky-booking-bar">
                    <div class="booking-bar-content">
                        <div class="booking-price">
                            <span class="price-label">From</span>
                            <span class="price-amount">₱-</span>
                            <span class="price-per">per person</span>
                        </div>
                        <button class="btn-book-now" disabled>
                            <span>Select date</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

            </div>

        </div>


        <!-- ============================================
            BOOKING PAGE (SPA SECTION)
        ============================================= -->
        <div class="page-content content-wrapper" id="bookingPage">

            <div class="booking-page">

                <!-- Header -->
                <div class="booking-header">

                    <button class="booking-back-btn" onclick="goBackFromPackageDetails()" aria-label="Go back">
                        <i class="fas fa-arrow-left"></i>
                    </button>

                    <h1 class="booking-title">Complete Your Booking</h1>
                    <div class="booking-step-indicator">
                        <span class="step-dot active"></span>
                        <span class="step-dot"></span>
                        <span class="step-dot"></span>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="booking-content">

                    <!-- Booking Form -->
                    <div class="booking-form-section">

                        <!-- Package Summary Card -->
                        <div class="booking-summary-card">
                            <div class="summary-image">
                                <img src="" alt="Package" id="bookingSummaryImage">
                            </div>
                            <div class="summary-details">
                                <h3 id="bookingSummaryTitle">Loading...</h3>
                                <div class="summary-meta">
                                    <span id="bookingSummaryDate">
                                        <i class="far fa-calendar-alt"></i> Select date
                                    </span>
                                    <span id="bookingSummaryDuration">
                                        <i class="far fa-clock"></i> -
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Traveler Information -->
                        <div class="booking-section">
                            <h2 class="section-title">
                                <i class="fas fa-user"></i>
                                Lead Traveler Information
                            </h2>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">First Name *</label>
                                    <input type="text" id="firstName" name="firstName" required placeholder="John">
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Last Name *</label>
                                    <input type="text" id="lastName" name="lastName" required placeholder="Doe">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="email">Email Address *</label>
                                    <input type="email" id="email" name="email" required placeholder="john.doe@example.com">
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone Number *</label>
                                    <input type="tel" id="phone" name="phone" required placeholder="+63 912 345 6789">
                                </div>
                            </div>
                        </div>

                        <!-- Number of Travelers -->
                        <div class="booking-section">
                            <h2 class="section-title">
                                <i class="fas fa-users"></i>
                                Number of Travelers
                            </h2>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="numAdults">Adults (18+) *</label>
                                    <select id="numAdults" name="numAdults" required>
                                        <option value="1">1 Adult</option>
                                        <option value="2">2 Adults</option>
                                        <option value="3">3 Adults</option>
                                        <option value="4">4 Adults</option>
                                        <option value="5">5 Adults</option>
                                        <option value="6">6 Adults</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="numChildren">Children (0-17)</label>
                                    <select id="numChildren" name="numChildren">
                                        <option value="0">No Children</option>
                                        <option value="1">1 Child</option>
                                        <option value="2">2 Children</option>
                                        <option value="3">3 Children</option>
                                        <option value="4">4 Children</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Special Requests -->
                        <div class="booking-section">
                            <h2 class="section-title">
                                <i class="fas fa-comment-dots"></i>
                                Special Requests (Optional)
                            </h2>

                            <div class="form-group">
                                <label for="dietaryRequirements">Dietary Requirements</label>
                                <input type="text" id="dietaryRequirements" name="dietaryRequirements"
                                    placeholder="e.g., Vegetarian, Gluten-free, etc.">
                            </div>

                            <div class="form-group">
                                <label for="specialRequests">Additional Requests</label>
                                <textarea id="specialRequests" name="specialRequests" rows="4"
                                    placeholder="Any special requests or notes for your trip..."></textarea>
                            </div>
                        </div>

                        <!-- Emergency Contact -->
                        <div class="booking-section">
                            <h2 class="section-title">
                                <i class="fas fa-phone-alt"></i>
                                Emergency Contact
                            </h2>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="emergencyName">Contact Name *</label>
                                    <input type="text" id="emergencyName" name="emergencyName" required
                                        placeholder="Jane Doe">
                                </div>
                                <div class="form-group">
                                    <label for="emergencyPhone">Contact Phone *</label>
                                    <input type="tel" id="emergencyPhone" name="emergencyPhone" required
                                        placeholder="+63 912 345 6789">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="emergencyRelation">Relationship *</label>
                                <select id="emergencyRelation" name="emergencyRelation" required>
                                    <option value="">Select relationship</option>
                                    <option value="spouse">Spouse</option>
                                    <option value="parent">Parent</option>
                                    <option value="sibling">Sibling</option>
                                    <option value="child">Child</option>
                                    <option value="friend">Friend</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <!-- Terms & Conditions -->
                        <div class="booking-section">
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="agreeTerms" name="agreeTerms" required>
                                    <span>I agree to the <a href="#" class="link">Terms & Conditions</a> and <a href="#" class="link">Privacy Policy</a> *</span>
                                </label>
                            </div>

                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="agreeMarketing" name="agreeMarketing">
                                    <span>I would like to receive promotional emails and updates</span>
                                </label>
                            </div>
                        </div>

                    </div>

                    <!-- Booking Sidebar (Desktop) / Fixed Bottom (Mobile) -->
                    <div class="booking-sidebar">
                        <div class="booking-price-card">
                            <h3 class="price-card-title">Booking Summary</h3>

                            <div class="price-breakdown">
                                <div class="price-item">
                                    <span>Base Price</span>
                                    <span id="basePriceDisplay">₱0</span>
                                </div>
                                <div class="price-item">
                                    <span id="travelersLabel">1 Adult</span>
                                    <span id="travelersPrice">₱0</span>
                                </div>
                                <div class="price-item subtle">
                                    <span>Service Fee</span>
                                    <span id="serviceFee">₱500</span>
                                </div>
                                <div class="price-divider"></div>
                                <div class="price-item total">
                                    <span>Total</span>
                                    <span id="totalPrice">₱0</span>
                                </div>
                            </div>

                            <button class="btn-confirm-booking" id="confirmBookingBtn">
                                <span>Confirm Booking</span>
                                <i class="fas fa-arrow-right"></i>
                            </button>

                            <div class="booking-note">
                                <i class="fas fa-info-circle"></i>
                                <span>No payment required today. Pay upon confirmation.</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Mobile Fixed Bottom Bar -->
                <div class="booking-mobile-footer">
                    <div class="mobile-footer-content">
                        <div class="mobile-price">
                            <span class="price-label">Total</span>
                            <span class="price-amount" id="mobileTotalPrice">₱0</span>
                        </div>
                        <button class="btn-confirm-booking-mobile" id="confirmBookingBtnMobile">
                            <span>Confirm</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </main>


    <!-- Footer -->
    <footer class="app-footer">

        <div class="footer-content">

            <!-- Footer Top -->
            <div class="footer-top">

                <div class="footer-brand">

                    <div class="footer-brand-title">
                        <img src="../mobile/assets/images/logo.png" alt="TravelHub logo" class="footer-brand-logo">
                        <h3>SMART ESCAPE</h3>
                    </div>

                    <!-- <p>Your gateway to unforgettable adventures</p> -->

                    <div class="footer-social">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>

                </div>



                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Team</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Booking Policy</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4>Destinations</h4>
                        <ul>
                            <li><a href="#">Korea</a></li>
                            <li><a href="#">Japan</a></li>
                            <li><a href="#">Thailand</a></li>
                            <li><a href="#">Vietnam</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4>Contact</h4>
                        <ul class="footer-contact">
                            <li><i class="fas fa-phone"></i> +63 123 456 7890</li>
                            <li><i class="fas fa-envelope"></i> info@travelhub.ph</li>
                            <li><i class="fas fa-map-marker-alt"></i> Quezon City, PH</li>
                        </ul>
                    </div>
                </div>

            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p>&copy; 2026 Smart Escape. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>

        </div>

    </footer>

    <!-- Bottom Navigation (Mobile) -->
    <nav class="bottom-nav">
        <a href="#" data-page="bookings">
            <i class="fas fa-calendar-check"></i>
            <span>Bookings</span>
        </a>

        <a href="#" data-page="packages">
            <i class="fas fa-box"></i>
            <span>Packages</span>
        </a>

        <a href="#" class="active" data-page="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>

        <a href="#" data-page="favorites">
            <i class="fas fa-heart"></i>
            <span>Favorites</span>
        </a>

        <a href="#" data-page="profile">
            <i class="fas fa-user"></i>
            <span>Profile</span>
        </a>
    </nav>

    <!-- Scripts -->
    <script src="js/JSON/korea-packages.js"></script>
    <script src="js/package-details.js"></script>
    <script src="js/landing.js"></script>
    <script src="js/booking.js"></script>

</body>

</html>