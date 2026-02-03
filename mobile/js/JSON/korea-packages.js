// ================================
// KOREA PACKAGES DATABASE
// ================================
// Organized by country for easy scalability
// Future: Replace with database queries

const KOREA_PACKAGES = {
  "seoul-city-explorer": {
    id: "seoul-city-explorer",
    country: "korea",
    city: "Seoul",
    title: "Seoul City Explorer",
    subtitle: "Discover the heart of South Korea",
    category: ["city-tour", "cultural", "shopping"],
    featured: true,
    status: "active", // active, soldout, coming-soon
    
    // Pricing
    price: {
      currency: "PHP",
      amount: 29999,
      originalPrice: 34999,
      pricePerPerson: true,
      deposit: 5000 // Required deposit
    },
    
    // Duration
    duration: {
      days: 5,
      nights: 4,
      description: "5 Days / 4 Nights"
    },
    
    // Group Requirements
    requirements: {
      minPeople: 2,
      maxPeople: 40,
      minAge: null,
      maxAge: null,
      fitness: "Moderate walking required",
      visa: "Check visa requirements for South Korea"
    },
    
    // Rating
    rating: {
      average: 4.8,
      total: 156,
      breakdown: {
        5: 98,
        4: 45,
        3: 10,
        2: 2,
        1: 1
      }
    },
    
    // Images
    images: {
      hero: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583074801503-b2c7d0c8e8e7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1526295112451-f368e1ae6d63?w=800&h=600&fit=crop"
      ]
    },
    
    // Overview
    overview: {
      description: "Experience the vibrant culture and modern marvels of Seoul. From ancient palaces to cutting-edge technology, this 5-day journey will immerse you in the perfect blend of tradition and innovation that makes Seoul one of Asia's most exciting destinations.",
      highlights: [
        "Visit Gyeongbokgung Palace and witness the changing of the guard",
        "Explore trendy Gangnam district and K-pop culture",
        "Experience traditional Korean BBQ and street food tours",
        "Shopping spree in Myeongdong and Dongdaemun",
        "Scenic views from N Seoul Tower",
        "Traditional tea ceremony experience"
      ]
    },
    
    // Detailed Itinerary
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Orientation",
        activities: [
          "Airport pickup and hotel check-in",
          "Welcome dinner at traditional Korean restaurant",
          "Evening stroll in Hongdae district",
          "Hotel rest"
        ],
        meals: ["Dinner"],
        accommodation: "4-star hotel in Myeongdong"
      },
      {
        day: 2,
        title: "Historical Seoul",
        activities: [
          "Visit Gyeongbokgung Palace",
          "Changing of the Guard ceremony",
          "Bukchon Hanok Village tour",
          "Insadong traditional market",
          "N Seoul Tower for panoramic views"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star hotel in Myeongdong"
      },
      {
        day: 3,
        title: "Modern Seoul & Shopping",
        activities: [
          "Gangnam district tour",
          "COEX Mall and Starfield Library",
          "K-pop entertainment district",
          "Myeongdong shopping district",
          "Free time for personal exploration"
        ],
        meals: ["Breakfast"],
        accommodation: "4-star hotel in Myeongdong"
      },
      {
        day: 4,
        title: "Cultural Immersion",
        activities: [
          "Traditional tea ceremony",
          "Korean cooking class",
          "Changdeokgung Palace and Secret Garden",
          "Dongdaemun Design Plaza",
          "Night market food tour"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "4-star hotel in Myeongdong"
      },
      {
        day: 5,
        title: "Departure",
        activities: [
          "Free time for last-minute shopping",
          "Hotel check-out",
          "Airport transfer"
        ],
        meals: ["Breakfast"],
        accommodation: null
      }
    ],
    
    // Inclusions
    inclusions: [
      "Round-trip airport transfers",
      "4 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "Selected meals as per itinerary",
      "English-speaking tour guide",
      "All entrance fees and activities",
      "Transportation during tours",
      "Travel insurance"
    ],
    
    // Exclusions
    exclusions: [
      "International airfare",
      "Personal expenses",
      "Meals not mentioned in itinerary",
      "Optional tours and activities",
      "Tips and gratuities",
      "Visa fees (if applicable)"
    ],
    
    // Booking Calendar Availability (May 2026)
    availability: {
      "2026-05-07": { 
        available: true, 
        price: 35000, 
        slots: 12,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-08": { 
        available: true, 
        price: 32000, 
        slots: 8,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-15": { 
        available: true, 
        price: 34000, 
        slots: 15,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-16": { 
        available: true, 
        price: 33000, 
        slots: 20,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-21": { 
        available: true, 
        price: 34000, 
        slots: 18,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-27": { 
        available: true, 
        price: 36000, 
        slots: 10,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-28": { 
        available: true, 
        price: 36000, 
        slots: 14,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-29": { 
        available: true, 
        price: 34000, 
        slots: 22,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-30": { 
        available: true, 
        price: 34000, 
        slots: 16,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      },
      "2026-05-31": { 
        available: true, 
        price: 32000, 
        slots: 25,
        departureTime: "19:35",
        flightNumber: "5J188",
        route: "Manila (MNL) → Incheon (ICN)"
      }
    },
    
    // Reviews
    reviews: [
      {
        id: 1,
        userName: "Maria Santos",
        rating: 5,
        date: "2024-03-15",
        title: "Amazing experience!",
        comment: "Seoul exceeded all my expectations. The tour was well-organized and our guide was incredibly knowledgeable. The blend of modern and traditional culture was fascinating.",
        verified: true,
        helpful: 24
      },
      {
        id: 2,
        userName: "John Reyes",
        rating: 5,
        date: "2024-02-28",
        title: "Highly recommended",
        comment: "Perfect itinerary! Not too rushed but we got to see all the main attractions. The food tours were a highlight. Already planning to come back!",
        verified: true,
        helpful: 18
      },
      {
        id: 3,
        userName: "Lisa Chen",
        rating: 4,
        date: "2024-02-10",
        title: "Great value for money",
        comment: "Overall great experience. Hotels were clean and well-located. Only wish we had more free time for shopping.",
        verified: true,
        helpful: 12
      }
    ],
    
    // Related packages (IDs)
    relatedPackages: ["busan-beach-resort", "jeju-island-paradise"],
    
    // SEO
    seo: {
      metaTitle: "Seoul City Explorer - 5 Days Korea Tour Package",
      metaDescription: "Discover Seoul's perfect blend of tradition and modernity. 5-day guided tour including palaces, shopping, food tours, and cultural experiences.",
      keywords: ["seoul tour", "korea package", "seoul travel", "korea vacation"]
    },
    
    // Timestamps
    createdAt: "2024-01-01",
    updatedAt: "2026-02-03"
  },

  "busan-beach-resort": {
    id: "busan-beach-resort",
    country: "korea",
    city: "Busan",
    title: "Busan Beach Resort",
    subtitle: "Sun, sand, and sea in Korea's coastal gem",
    category: ["beach", "relaxation", "cultural"],
    featured: false,
    status: "active",
    
    price: {
      currency: "PHP",
      amount: 24999,
      originalPrice: null,
      pricePerPerson: true,
      deposit: 5000
    },
    
    duration: {
      days: 4,
      nights: 3,
      description: "4 Days / 3 Nights"
    },
    
    requirements: {
      minPeople: 2,
      maxPeople: 40,
      minAge: null,
      maxAge: null,
      fitness: "Easy - suitable for all ages",
      visa: "Check visa requirements for South Korea"
    },
    
    rating: {
      average: 4.3,
      total: 87,
      breakdown: {
        5: 45,
        4: 30,
        3: 8,
        2: 3,
        1: 1
      }
    },
    
    images: {
      hero: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=800&h=600&fit=crop"
      ]
    },
    
    overview: {
      description: "Escape to Busan's beautiful beaches and experience Korea's laid-back coastal culture. Enjoy fresh seafood, stunning ocean views, and colorful temples by the sea in this relaxing 4-day getaway.",
      highlights: [
        "Relax at Haeundae Beach, Korea's most famous beach",
        "Visit colorful Gamcheon Culture Village",
        "Explore Haedong Yonggungsa Temple by the sea",
        "Fresh seafood at Jagalchi Fish Market",
        "Sunset views from Gwangan Bridge",
        "Traditional Korean spa experience"
      ]
    },
    
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Time",
        activities: [
          "Airport pickup and hotel check-in",
          "Afternoon at Haeundae Beach",
          "Sunset dinner by the ocean",
          "Evening walk along beach promenade"
        ],
        meals: ["Dinner"],
        accommodation: "4-star beachfront hotel"
      },
      {
        day: 2,
        title: "Cultural Exploration",
        activities: [
          "Morning visit to Haedong Yonggungsa Temple",
          "Gamcheon Culture Village tour",
          "Lunch at local restaurant",
          "Jagalchi Fish Market exploration",
          "Free time for shopping"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star beachfront hotel"
      },
      {
        day: 3,
        title: "Island & Spa Day",
        activities: [
          "Day trip to Dongbaek Island",
          "APEC House visit",
          "Traditional Korean spa (jimjilbang)",
          "Gwangan Bridge night view",
          "Seafood BBQ dinner"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "4-star beachfront hotel"
      },
      {
        day: 4,
        title: "Departure",
        activities: [
          "Free morning at beach",
          "Last-minute shopping",
          "Hotel check-out",
          "Airport transfer"
        ],
        meals: ["Breakfast"],
        accommodation: null
      }
    ],
    
    inclusions: [
      "Round-trip airport transfers",
      "3 nights accommodation in beachfront hotel",
      "Daily breakfast",
      "Selected meals as per itinerary",
      "English-speaking tour guide",
      "All entrance fees",
      "Transportation during tours",
      "Travel insurance"
    ],
    
    exclusions: [
      "International airfare",
      "Personal expenses",
      "Meals not mentioned",
      "Optional activities",
      "Tips and gratuities"
    ],
    
    availability: {
      "2026-05-10": { available: true, price: 26000, slots: 15, departureTime: "14:20", flightNumber: "5J189", route: "Manila (MNL) → Busan (PUS)" },
      "2026-05-17": { available: true, price: 24999, slots: 20, departureTime: "14:20", flightNumber: "5J189", route: "Manila (MNL) → Busan (PUS)" },
      "2026-05-24": { available: true, price: 27000, slots: 18, departureTime: "14:20", flightNumber: "5J189", route: "Manila (MNL) → Busan (PUS)" },
      "2026-05-31": { available: true, price: 25500, slots: 22, departureTime: "14:20", flightNumber: "5J189", route: "Manila (MNL) → Busan (PUS)" }
    },
    
    reviews: [
      {
        id: 1,
        userName: "Anna Garcia",
        rating: 5,
        date: "2024-03-10",
        title: "Perfect beach getaway!",
        comment: "Busan is beautiful! The beach was clean, the food was amazing, and the cultural sites were fascinating. Great value for money.",
        verified: true,
        helpful: 15
      },
      {
        id: 2,
        userName: "Mike Torres",
        rating: 4,
        date: "2024-02-20",
        title: "Relaxing trip",
        comment: "Loved the beach and the temples. Only wish we had more time to explore the city.",
        verified: true,
        helpful: 8
      }
    ],
    
    relatedPackages: ["seoul-city-explorer", "jeju-island-paradise"],
    
    seo: {
      metaTitle: "Busan Beach Resort - 4 Days Korea Beach Package",
      metaDescription: "Relax at Korea's most beautiful beaches in Busan. 4-day package including beach time, cultural sites, and fresh seafood.",
      keywords: ["busan tour", "korea beach", "busan package", "beach vacation"]
    },
    
    createdAt: "2024-01-15",
    updatedAt: "2026-02-03"
  },

  "jeju-island-paradise": {
    id: "jeju-island-paradise",
    country: "korea",
    city: "Jeju",
    title: "Jeju Island Paradise",
    subtitle: "Korea's tropical island escape",
    category: ["island", "nature", "adventure"],
    featured: false,
    status: "coming-soon",
    
    price: {
      currency: "PHP",
      amount: 34999,
      originalPrice: null,
      pricePerPerson: true,
      deposit: 5000
    },
    
    duration: {
      days: 5,
      nights: 4,
      description: "5 Days / 4 Nights"
    },
    
    requirements: {
      minPeople: 2,
      maxPeople: 35,
      minAge: null,
      maxAge: null,
      fitness: "Moderate - some hiking involved",
      visa: "Check visa requirements for South Korea"
    },
    
    rating: {
      average: 4.9,
      total: 203,
      breakdown: {
        5: 180,
        4: 18,
        3: 3,
        2: 1,
        1: 1
      }
    },
    
    images: {
      hero: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ]
    },
    
    overview: {
      description: "Discover Jeju Island, Korea's volcanic paradise. Experience stunning natural wonders, beautiful beaches, unique culture, and delicious local cuisine in this 5-day adventure.",
      highlights: [
        "Hike Hallasan Mountain, Korea's highest peak",
        "Explore Manjanggul Lava Tube",
        "Visit stunning Jeongbang Waterfall",
        "Seongsan Ilchulbong sunrise viewpoint",
        "Traditional Jeju stone park",
        "Fresh seafood and local specialties"
      ]
    },
    
    itinerary: [
      {
        day: 1,
        title: "Arrival & Island Introduction",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Visit Yongduam Rock",
          "Explore Jeju City",
          "Welcome dinner"
        ],
        meals: ["Dinner"],
        accommodation: "4-star resort"
      },
      {
        day: 2,
        title: "Eastern Jeju Exploration",
        activities: [
          "Sunrise at Seongsan Ilchulbong",
          "Seongeup Folk Village",
          "Manjanggul Lava Tube",
          "Hamdeok Beach",
          "Local seafood dinner"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "4-star resort"
      },
      {
        day: 3,
        title: "Southern Coastal Tour",
        activities: [
          "Jeongbang Waterfall",
          "Cheonjiyeon Waterfall",
          "Oedolgae Rock",
          "Yakcheonsa Temple",
          "Columnar Joint Cliff"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star resort"
      },
      {
        day: 4,
        title: "Western Jeju & Nature",
        activities: [
          "O'sulloc Tea Museum",
          "Innisfree Jeju House",
          "Hallim Park",
          "Hyeopjae Beach",
          "Sunset at beach"
        ],
        meals: ["Breakfast"],
        accommodation: "4-star resort"
      },
      {
        day: 5,
        title: "Departure",
        activities: [
          "Free morning",
          "Last-minute shopping",
          "Hotel check-out",
          "Airport transfer"
        ],
        meals: ["Breakfast"],
        accommodation: null
      }
    ],
    
    inclusions: [
      "Round-trip airport transfers",
      "4 nights accommodation in resort",
      "Daily breakfast",
      "Selected meals as per itinerary",
      "English-speaking tour guide",
      "All entrance fees",
      "Private transportation",
      "Travel insurance"
    ],
    
    exclusions: [
      "International airfare",
      "Personal expenses",
      "Meals not mentioned",
      "Optional activities",
      "Tips and gratuities"
    ],
    
    availability: {},
    
    reviews: [
      {
        id: 1,
        userName: "Sarah Kim",
        rating: 5,
        date: "2024-03-05",
        title: "Absolutely stunning!",
        comment: "Jeju Island is a must-visit! The natural beauty is breathtaking. Our guide was excellent and the itinerary was perfect.",
        verified: true,
        helpful: 32
      }
    ],
    
    relatedPackages: ["seoul-city-explorer", "busan-beach-resort"],
    
    seo: {
      metaTitle: "Jeju Island Paradise - 5 Days Korea Island Package",
      metaDescription: "Explore Jeju Island's volcanic landscapes, beaches, and culture. 5-day adventure package with nature tours and local experiences.",
      keywords: ["jeju tour", "jeju island", "korea island", "jeju package"]
    },
    
    createdAt: "2024-02-01",
    updatedAt: "2026-02-03"
  }
};

// ================================
// DATABASE HELPER FUNCTIONS
// ================================

// Get all Korea packages
function getKoreaPackages() {
  return Object.values(KOREA_PACKAGES);
}

// Get package by ID
function getPackageById(packageId) {
  return KOREA_PACKAGES[packageId] || null;
}

// Get packages by city
function getPackagesByCity(city) {
  return Object.values(KOREA_PACKAGES).filter(pkg => 
    pkg.city.toLowerCase() === city.toLowerCase()
  );
}

// Get packages by category
function getPackagesByCategory(category) {
  return Object.values(KOREA_PACKAGES).filter(pkg => 
    pkg.category.includes(category)
  );
}

// Get featured packages
function getFeaturedPackages() {
  return Object.values(KOREA_PACKAGES).filter(pkg => pkg.featured);
}

// Get active packages only
function getActivePackages() {
  return Object.values(KOREA_PACKAGES).filter(pkg => pkg.status === 'active');
}

// Search packages
function searchPackages(query) {
  const lowerQuery = query.toLowerCase();
  return Object.values(KOREA_PACKAGES).filter(pkg => 
    pkg.title.toLowerCase().includes(lowerQuery) ||
    pkg.city.toLowerCase().includes(lowerQuery) ||
    pkg.overview.description.toLowerCase().includes(lowerQuery)
  );
}

// ================================
// EXPORT
// ================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    KOREA_PACKAGES,
    getKoreaPackages,
    getPackageById,
    getPackagesByCity,
    getPackagesByCategory,
    getFeaturedPackages,
    getActivePackages,
    searchPackages
  };
}