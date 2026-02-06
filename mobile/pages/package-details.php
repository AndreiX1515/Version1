<!-- Package Details Container -->
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
                <div class="package-badge-hero">Featured</div>
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

            <div class="booking-calendar-wrapper">

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

                <div class="calendar-booking-wrapper">
                    <div class="booking-bar-content">
                        <div class="booking-price">
                            <!-- <span class="price-label">From</span>
                                <span class="price-amount" id="stickyPrice">₱-</span>
                                <span class="price-per">per person</span> -->
                        </div>
                        <button class="btn-book-now" id="bookNowBtn">
                            <span>Book Now</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
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
            <button class="btn-book-now" id="bookNowBtn">
                <span>Book Now</span>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    </div>

</div>