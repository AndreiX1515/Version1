// ================================
// TRAVEL PACKAGES DATABASE
// ================================
// Organized by package ID for easy scalability
// Countries: South Korea, Thailand, Vietnam
// Future: Replace with database queries

const KOREA_PACKAGES = {

  "seoul-city-explorer": {
    id: "seoul-city-explorer",
    country: "South Korea",
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
      "2026-05-07": { available: true, price: 35000, slots: 12, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-08": { available: true, price: 32000, slots: 8,  departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-15": { available: true, price: 34000, slots: 15, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-16": { available: true, price: 33000, slots: 20, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-21": { available: true, price: 34000, slots: 18, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-27": { available: true, price: 36000, slots: 10, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-28": { available: true, price: 36000, slots: 14, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-29": { available: true, price: 34000, slots: 22, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-30": { available: true, price: 34000, slots: 16, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" },
      "2026-05-31": { available: true, price: 32000, slots: 25, departureTime: "19:35", flightNumber: "5J188", route: "Manila (MNL) → Incheon (ICN)" }
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
    country: "South Korea",
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
    country: "South Korea",
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
  },

  // ─────────────────────────────────────────
  //  THAILAND
  // ─────────────────────────────────────────

  "bangkok-city-explorer": {
    id: "bangkok-city-explorer",
    country: "Thailand",
    city: "Bangkok",
    title: "Bangkok City Explorer",
    subtitle: "Temples, street food, and the City of Angels",
    category: ["city-tour", "cultural", "food"],
    featured: true,
    status: "active",

    price: {
      currency: "PHP",
      amount: 27999,
      originalPrice: 32999,
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
      maxPeople: 40,
      minAge: null,
      maxAge: null,
      fitness: "Moderate walking required",
      visa: "Filipino passport holders enjoy visa-free entry to Thailand (30 days)"
    },

    rating: {
      average: 4.7,
      total: 214,
      breakdown: {
        5: 148,
        4: 50,
        3: 12,
        2: 3,
        1: 1
      }
    },

    images: {
      hero: "https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=1200&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=400&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop"
      ]
    },

    overview: {
      description: "Dive headfirst into Bangkok — a city that never sleeps and never stops surprising you. Over 5 days, wander through gilded temples, cruise the Chao Phraya River, lose yourself in chaotic night markets, and discover why Bangkok consistently tops travellers' favourite-city lists across Asia.",
      highlights: [
        "Marvel at the Grand Palace and the sacred Wat Phra Kaew",
        "Explore Wat Pho's reclining Buddha and traditional massage school",
        "Sunset river cruise along the Chao Phraya",
        "Night food tour through Yaowarat (Chinatown)",
        "Floating market experience at Damnoen Saduak",
        "Sky-high cocktails at a Bangkok rooftop bar"
      ]
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival & River of Kings",
        activities: [
          "Airport pickup from Suvarnabhumi (BKK)",
          "Hotel check-in in the Silom/Riverside area",
          "Sunset cruise on the Chao Phraya River",
          "Welcome dinner at riverside Thai restaurant",
          "Evening stroll along Asiatique Night Market"
        ],
        meals: ["Dinner"],
        accommodation: "4-star hotel in Silom / Riverside"
      },
      {
        day: 2,
        title: "Temples & Royal Bangkok",
        activities: [
          "Grand Palace and Wat Phra Kaew (Temple of the Emerald Buddha)",
          "Wat Pho — the reclining Buddha",
          "Wat Arun (Temple of Dawn) by ferry",
          "Tuk-tuk ride through Rattanakosin Island",
          "Free evening in the Khao San Road district"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star hotel in Silom / Riverside"
      },
      {
        day: 3,
        title: "Floating Market & Muay Thai",
        activities: [
          "Early morning trip to Damnoen Saduak Floating Market",
          "Boat ride through the canal market",
          "Afternoon rest",
          "Evening Muay Thai boxing show",
          "Night food tour — Yaowarat street feast"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star hotel in Silom / Riverside"
      },
      {
        day: 4,
        title: "Modern Bangkok & Skyline",
        activities: [
          "Morning visit to Jim Thompson House",
          "Siam area shopping — MBK, Siam Paragon",
          "Erawan Shrine",
          "Rooftop bar for golden-hour city views",
          "Dinner at ICONSIAM riverside mall"
        ],
        meals: ["Breakfast"],
        accommodation: "4-star hotel in Silom / Riverside"
      },
      {
        day: 5,
        title: "Departure",
        activities: [
          "Free morning — Chatuchak Weekend Market (Sat/Sun)",
          "Hotel check-out",
          "Airport transfer to Suvarnabhumi (BKK)"
        ],
        meals: ["Breakfast"],
        accommodation: null
      }
    ],

    inclusions: [
      "Round-trip airport transfers",
      "4 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "Selected meals as per itinerary",
      "English-speaking tour guide",
      "All entrance fees and activities",
      "Transportation during tours (tuk-tuk and boat rides)",
      "Travel insurance"
    ],

    exclusions: [
      "International airfare",
      "Personal expenses and shopping",
      "Meals not mentioned in itinerary",
      "Optional tours and activities",
      "Tips and gratuities",
      "Visa fees (if applicable)"
    ],

    availability: {
      "2026-05-07": { available: true, price: 29999, slots: 18, departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" },
      "2026-05-09": { available: true, price: 27999, slots: 22, departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" },
      "2026-05-14": { available: true, price: 30999, slots: 14, departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" },
      "2026-05-16": { available: true, price: 28999, slots: 20, departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" },
      "2026-05-21": { available: true, price: 31999, slots: 10, departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" },
      "2026-05-23": { available: true, price: 28999, slots: 25, departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" },
      "2026-05-28": { available: true, price: 32999, slots: 8,  departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" },
      "2026-05-30": { available: true, price: 29999, slots: 16, departureTime: "08:15", flightNumber: "5J859", route: "Manila (MNL) → Bangkok Suvarnabhumi (BKK)" }
    },

    reviews: [
      {
        id: 1,
        userName: "Patricia Lim",
        rating: 5,
        date: "2024-04-02",
        title: "Bangkok blew my mind!",
        comment: "I've been to many cities but Bangkok is on a different level. The temples were stunning, the food was incredible, and our guide was so knowledgeable. Will definitely be back.",
        verified: true,
        helpful: 38
      },
      {
        id: 2,
        userName: "Ramon dela Cruz",
        rating: 5,
        date: "2024-03-18",
        title: "Perfect first trip to Thailand",
        comment: "Everything was so well organized. The floating market was surreal. The rooftop bar on night 4 was also unforgettable. Great value.",
        verified: true,
        helpful: 27
      },
      {
        id: 3,
        userName: "Jennie Ong",
        rating: 4,
        date: "2024-02-25",
        title: "Amazing culture, amazing food",
        comment: "The temples on day 2 were jaw-dropping. Minor note — the floating market visit is an early 4am departure but totally worth it.",
        verified: true,
        helpful: 19
      }
    ],

    relatedPackages: ["phuket-island-escape", "hanoi-cultural-journey"],

    seo: {
      metaTitle: "Bangkok City Explorer - 5 Days Thailand Tour Package",
      metaDescription: "Discover Bangkok's temples, floating markets, and legendary street food. 5-day guided tour with Grand Palace, Wat Pho, Chao Phraya cruise, and more.",
      keywords: ["bangkok tour", "thailand package", "bangkok travel", "thailand vacation", "grand palace tour"]
    },

    createdAt: "2024-03-01",
    updatedAt: "2026-02-03"
  },

  "phuket-island-escape": {
    id: "phuket-island-escape",
    country: "Thailand",
    city: "Phuket",
    title: "Phuket Island Escape",
    subtitle: "Crystal waters and island-hopping in southern Thailand",
    category: ["beach", "island", "relaxation", "adventure"],
    featured: false,
    status: "active",

    price: {
      currency: "PHP",
      amount: 32999,
      originalPrice: 38999,
      pricePerPerson: true,
      deposit: 6000
    },

    duration: {
      days: 6,
      nights: 5,
      description: "6 Days / 5 Nights"
    },

    requirements: {
      minPeople: 2,
      maxPeople: 35,
      minAge: null,
      maxAge: null,
      fitness: "Easy to moderate — some swimming and light trekking",
      visa: "Filipino passport holders enjoy visa-free entry to Thailand (30 days)"
    },

    rating: {
      average: 4.9,
      total: 178,
      breakdown: {
        5: 155,
        4: 18,
        3: 4,
        2: 1,
        1: 0
      }
    },

    images: {
      hero: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800&h=600&fit=crop"
      ]
    },

    overview: {
      description: "Phuket is Thailand's crown jewel — where turquoise Andaman waters meet dramatic limestone karsts and white-sand beaches that feel too beautiful to be real. Spend 6 days island-hopping, snorkelling in hidden coves, and unwinding with a world-class Thai massage at sunset.",
      highlights: [
        "Full-day Phi Phi Islands tour with snorkelling at Maya Bay",
        "James Bond Island speedboat trip through Phang Nga Bay",
        "Patong Beach — the liveliest beach in Southeast Asia",
        "Sunset viewpoint at Promthep Cape",
        "Traditional Thai cooking class",
        "Sea cave kayaking through mangroves"
      ]
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival & Patong Beach",
        activities: [
          "Airport pickup from Phuket International (HKT)",
          "Hotel check-in near Patong Beach",
          "Afternoon free on the beach",
          "Evening at Bangla Road Night Market",
          "Welcome dinner — seafood by the ocean"
        ],
        meals: ["Dinner"],
        accommodation: "5-star beachfront resort, Patong"
      },
      {
        day: 2,
        title: "Phi Phi Islands Day Trip",
        activities: [
          "Speedboat to Phi Phi Islands",
          "Snorkelling at Loh Samah Bay and Pileh Cove",
          "Visit Maya Bay (The Beach filming location)",
          "Monkey Beach stop",
          "Return to Phuket — sunset drinks at a beach bar"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "5-star beachfront resort, Patong"
      },
      {
        day: 3,
        title: "James Bond Island & Phang Nga Bay",
        activities: [
          "Speedboat into Phang Nga Bay",
          "James Bond Island (Koh Tapu)",
          "Sea cave kayaking through mangroves",
          "Floating Muslim village at Koh Panyee",
          "Afternoon return and beach rest"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "5-star beachfront resort, Patong"
      },
      {
        day: 4,
        title: "Culture, Cooking & Old Town",
        activities: [
          "Thai cooking class",
          "Phuket Old Town — Sino-Portuguese architecture",
          "Wat Chalong temple visit",
          "Promthep Cape sunset viewpoint",
          "Traditional Thai massage on the beach"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "5-star beachfront resort, Patong"
      },
      {
        day: 5,
        title: "Island Hopping — Koh Racha",
        activities: [
          "Full-day island hopping to Koh Racha Yai",
          "Crystal-clear water snorkelling",
          "Stop at Coral Island (Koh Hae) on return",
          "Parasailing activity (optional)",
          "Farewell dinner at Surin Beach"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "5-star beachfront resort, Patong"
      },
      {
        day: 6,
        title: "Departure",
        activities: [
          "Free morning at leisure",
          "Hotel check-out",
          "Airport transfer to Phuket International (HKT)"
        ],
        meals: ["Breakfast"],
        accommodation: null
      }
    ],

    inclusions: [
      "Round-trip airport transfers",
      "5 nights accommodation in 5-star beachfront resort",
      "Daily breakfast",
      "Selected meals as per itinerary",
      "All island tours (Phi Phi, James Bond Island, Coral Island)",
      "Snorkelling equipment",
      "Sea cave kayaking",
      "English-speaking tour guide",
      "All entrance fees",
      "Travel insurance"
    ],

    exclusions: [
      "International airfare",
      "Personal expenses",
      "Meals not mentioned in itinerary",
      "Optional activities (parasailing, scuba diving)",
      "Tips and gratuities",
      "Alcoholic beverages"
    ],

    availability: {
      "2026-05-08": { available: true, price: 34999, slots: 12, departureTime: "10:40", flightNumber: "5J863", route: "Manila (MNL) → Phuket (HKT)" },
      "2026-05-15": { available: true, price: 32999, slots: 18, departureTime: "10:40", flightNumber: "5J863", route: "Manila (MNL) → Phuket (HKT)" },
      "2026-05-22": { available: true, price: 35999, slots: 10, departureTime: "10:40", flightNumber: "5J863", route: "Manila (MNL) → Phuket (HKT)" },
      "2026-05-29": { available: true, price: 33999, slots: 20, departureTime: "10:40", flightNumber: "5J863", route: "Manila (MNL) → Phuket (HKT)" },
      "2026-06-05": { available: true, price: 36999, slots: 8,  departureTime: "10:40", flightNumber: "5J863", route: "Manila (MNL) → Phuket (HKT)" },
      "2026-06-12": { available: true, price: 32999, slots: 22, departureTime: "10:40", flightNumber: "5J863", route: "Manila (MNL) → Phuket (HKT)" }
    },

    reviews: [
      {
        id: 1,
        userName: "Carla Mendoza",
        rating: 5,
        date: "2024-04-10",
        title: "The most beautiful place I've ever seen",
        comment: "Maya Bay left me speechless — the water colour is unreal. The cooking class was also a personal highlight. 10/10 will book again.",
        verified: true,
        helpful: 52
      },
      {
        id: 2,
        userName: "Dino Aquino",
        rating: 5,
        date: "2024-03-22",
        title: "Dream vacation delivered",
        comment: "Everything about this trip was perfect. James Bond Island was surreal. The 5-star resort was the cherry on top.",
        verified: true,
        helpful: 41
      },
      {
        id: 3,
        userName: "Tina Uy",
        rating: 4,
        date: "2024-02-14",
        title: "Phuket is paradise",
        comment: "Loved every moment. Phi Phi snorkelling was the highlight. 4 stars only because Patong is very busy — but that's just the area, not the tour's fault!",
        verified: true,
        helpful: 23
      }
    ],

    relatedPackages: ["bangkok-city-explorer", "danang-beach-retreat"],

    seo: {
      metaTitle: "Phuket Island Escape - 6 Days Thailand Beach Package",
      metaDescription: "Explore Phuket's stunning beaches and islands. 6-day package with Phi Phi Islands, James Bond Island, snorkelling, and 5-star beachfront resort.",
      keywords: ["phuket tour", "phi phi islands", "thailand beach", "phuket package", "island hopping thailand"]
    },

    createdAt: "2024-03-01",
    updatedAt: "2026-02-03"
  },

  // ─────────────────────────────────────────
  //  VIETNAM
  // ─────────────────────────────────────────

  "hanoi-cultural-journey": {
    id: "hanoi-cultural-journey",
    country: "Vietnam",
    city: "Hanoi",
    title: "Hanoi Cultural Journey",
    subtitle: "Ancient streets, Halong Bay, and northern Vietnamese soul",
    category: ["city-tour", "cultural", "nature", "cruise"],
    featured: true,
    status: "active",

    price: {
      currency: "PHP",
      amount: 24999,
      originalPrice: 29499,
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
      maxPeople: 40,
      minAge: null,
      maxAge: null,
      fitness: "Easy to moderate — some kayaking available",
      visa: "Filipino passport holders require a visa for Vietnam — e-Visa available online"
    },

    rating: {
      average: 4.8,
      total: 193,
      breakdown: {
        5: 142,
        4: 40,
        3: 8,
        2: 2,
        1: 1
      }
    },

    images: {
      hero: "https://images.unsplash.com/photo-1499561385668-5ebdb06a79bc?w=1200&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1499561385668-5ebdb06a79bc?w=400&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1499561385668-5ebdb06a79bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1580803834737-5e7b9f2fbb36?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop"
      ]
    },

    overview: {
      description: "Hanoi is Vietnam at its most raw and authentic — tree-lined boulevards, a thousand-year-old Old Quarter, and some of the best street food on the planet. This 5-day journey pairs the capital's timeless charm with an overnight cruise through Halong Bay, one of the world's most iconic natural wonders.",
      highlights: [
        "Overnight cruise through the legendary Halong Bay",
        "Kayaking through hidden caves and emerald lagoons",
        "Street food walking tour in Hanoi's Old Quarter",
        "Hoan Kiem Lake and Ngoc Son Temple at sunrise",
        "Ho Chi Minh Mausoleum and Temple of Literature",
        "Traditional water puppet theatre performance"
      ]
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        activities: [
          "Airport pickup from Noi Bai International (HAN)",
          "Hotel check-in in the Old Quarter",
          "Afternoon walking tour of Hoan Kiem Lake",
          "Ngoc Son Temple visit",
          "Welcome dinner — pho and bun cha tasting",
          "Optional evening at Bia Hoi Corner"
        ],
        meals: ["Dinner"],
        accommodation: "4-star boutique hotel, Old Quarter"
      },
      {
        day: 2,
        title: "Hanoi Landmarks & Old Quarter",
        activities: [
          "Ho Chi Minh Mausoleum and Presidential Palace complex",
          "One Pillar Pagoda",
          "Temple of Literature",
          "Cyclo ride through 36 Old Quarter streets",
          "Street food walking tour — banh mi, egg coffee, pho cuon",
          "Traditional water puppet theatre show"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star boutique hotel, Old Quarter"
      },
      {
        day: 3,
        title: "Halong Bay — Embark",
        activities: [
          "Scenic drive to Halong Bay",
          "Board overnight cruise",
          "Welcome lunch on deck",
          "Kayaking through caves and floating villages",
          "Sunset cocktails on the top deck",
          "Seafood BBQ dinner on board"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Halong Bay overnight cruise (4-star junk boat)"
      },
      {
        day: 4,
        title: "Halong Bay — Disembark & Return",
        activities: [
          "Sunrise on deck — morning tai chi session",
          "Visit Surprising Cave (Hang Sung Sot)",
          "Swim stop at a secluded cove",
          "Brunch on board before disembarking",
          "Scenic drive back to Hanoi",
          "Free evening — Night Market"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star boutique hotel, Old Quarter"
      },
      {
        day: 5,
        title: "Departure",
        activities: [
          "Free morning — Vietnamese coffee at a rooftop café",
          "Hotel check-out",
          "Airport transfer to Noi Bai International (HAN)"
        ],
        meals: ["Breakfast"],
        accommodation: null
      }
    ],

    inclusions: [
      "Round-trip airport transfers",
      "3 nights in 4-star boutique hotel (Old Quarter)",
      "1 night overnight cruise in Halong Bay (full-board)",
      "Daily breakfast",
      "Selected meals as per itinerary",
      "Kayaking in Halong Bay",
      "Cyclo ride in Old Quarter",
      "Water puppet theatre tickets",
      "English-speaking tour guide",
      "All entrance fees",
      "Travel insurance"
    ],

    exclusions: [
      "International airfare",
      "Vietnam e-Visa fee (~USD 25)",
      "Personal expenses",
      "Meals not mentioned in itinerary",
      "Tips and gratuities",
      "Alcoholic beverages (except welcome cocktail)"
    ],

    availability: {
      "2026-05-06": { available: true, price: 26999, slots: 20, departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" },
      "2026-05-09": { available: true, price: 24999, slots: 18, departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" },
      "2026-05-13": { available: true, price: 25999, slots: 14, departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" },
      "2026-05-16": { available: true, price: 24999, slots: 22, departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" },
      "2026-05-20": { available: true, price: 27999, slots: 10, departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" },
      "2026-05-23": { available: true, price: 25999, slots: 16, departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" },
      "2026-05-27": { available: true, price: 28999, slots: 8,  departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" },
      "2026-05-30": { available: true, price: 25999, slots: 20, departureTime: "07:55", flightNumber: "5J818", route: "Manila (MNL) → Hanoi Noi Bai (HAN)" }
    },

    reviews: [
      {
        id: 1,
        userName: "Grace Villanueva",
        rating: 5,
        date: "2024-04-05",
        title: "Halong Bay is out of this world",
        comment: "Words and photos cannot do Halong Bay justice. The overnight cruise was a highlight I'll remember forever. Hanoi's Old Quarter was also charming and the street food was incredible.",
        verified: true,
        helpful: 47
      },
      {
        id: 2,
        userName: "Nico Buenaventura",
        rating: 5,
        date: "2024-03-28",
        title: "Vietnam surprised me so much",
        comment: "The history, the food, the scenery — everything. The egg coffee alone is worth the trip. Booking again for Da Nang next!",
        verified: true,
        helpful: 35
      },
      {
        id: 3,
        userName: "Mia Fernandez",
        rating: 4,
        date: "2024-02-18",
        title: "Excellent value package",
        comment: "The cruise was the standout — beautiful boat, great food, wonderful views. Hanoi city tour was a bit rushed on day 2 but overall fantastic trip.",
        verified: true,
        helpful: 21
      }
    ],

    relatedPackages: ["danang-beach-retreat", "bangkok-city-explorer"],

    seo: {
      metaTitle: "Hanoi Cultural Journey - 5 Days Vietnam Tour with Halong Bay",
      metaDescription: "Explore Hanoi's ancient Old Quarter and cruise through Halong Bay. 5-day package with overnight cruise, kayaking, street food tour, and cultural sites.",
      keywords: ["hanoi tour", "halong bay cruise", "vietnam package", "hanoi travel", "halong bay tour"]
    },

    createdAt: "2024-03-15",
    updatedAt: "2026-02-03"
  },

  "danang-beach-retreat": {
    id: "danang-beach-retreat",
    country: "Vietnam",
    city: "Da Nang",
    title: "Da Nang Beach Retreat",
    subtitle: "Golden beaches, ancient Hoi An, and the Ba Na Hills",
    category: ["beach", "cultural", "city-tour"],
    featured: false,
    status: "active",

    price: {
      currency: "PHP",
      amount: 26999,
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
      maxPeople: 40,
      minAge: null,
      maxAge: null,
      fitness: "Easy — suitable for all ages",
      visa: "Filipino passport holders require a visa for Vietnam — e-Visa available online"
    },

    rating: {
      average: 4.6,
      total: 142,
      breakdown: {
        5: 95,
        4: 35,
        3: 9,
        2: 2,
        1: 1
      }
    },

    images: {
      hero: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop"
      ]
    },

    overview: {
      description: "Central Vietnam's jewel trio: Da Nang's sweeping My Khe Beach, the UNESCO-listed ancient town of Hoi An glowing lantern-gold at night, and the surreal French-village fantasy of Ba Na Hills sitting above the clouds. A perfect blend of beach relaxation and centuries of history.",
      highlights: [
        "My Khe Beach — one of Asia's most beautiful urban beaches",
        "Full day in UNESCO World Heritage Hoi An Ancient Town",
        "Ba Na Hills cable car and the iconic Golden Bridge",
        "Marble Mountains — limestone peaks hiding caves and temples",
        "Lantern release on Hoi An's Thu Bon River",
        "Local cooking class — cao lau, white rose dumplings, banh mi"
      ]
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival & My Khe Beach",
        activities: [
          "Airport pickup from Da Nang International (DAD)",
          "Hotel check-in near My Khe Beach",
          "Afternoon free at My Khe Beach",
          "Dragon Bridge walk at dusk",
          "Welcome dinner — fresh seafood at Han Market area"
        ],
        meals: ["Dinner"],
        accommodation: "4-star beachfront hotel, Da Nang"
      },
      {
        day: 2,
        title: "Ba Na Hills & Golden Bridge",
        activities: [
          "Full-day Ba Na Hills resort",
          "Longest and highest cable car ride in Vietnam",
          "Walk the iconic Golden Bridge held by giant stone hands",
          "Explore the French Village and Fantasy Park",
          "Panoramic views over Da Nang from above the clouds"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star beachfront hotel, Da Nang"
      },
      {
        day: 3,
        title: "Ancient Hoi An Town",
        activities: [
          "Morning visit to Marble Mountains",
          "Drive to Hoi An Ancient Town",
          "Guided walking tour — Japanese Covered Bridge, Assembly Halls",
          "Vietnamese cooking class — cao lau and white rose dumplings",
          "Evening lantern release on the Thu Bon River",
          "Night market exploration"
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "4-star beachfront hotel, Da Nang"
      },
      {
        day: 4,
        title: "Hoi An at Leisure & Beach Day",
        activities: [
          "Free morning in Hoi An — boutique shopping, café-hopping",
          "Optional bicycle ride through rice fields",
          "Afternoon at An Bang Beach",
          "Farewell dinner — BBQ seafood by the sea"
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "4-star beachfront hotel, Da Nang"
      },
      {
        day: 5,
        title: "Departure",
        activities: [
          "Free morning — coffee at Han River waterfront",
          "Hotel check-out",
          "Airport transfer to Da Nang International (DAD)"
        ],
        meals: ["Breakfast"],
        accommodation: null
      }
    ],

    inclusions: [
      "Round-trip airport transfers",
      "4 nights accommodation in 4-star beachfront hotel",
      "Daily breakfast",
      "Selected meals as per itinerary",
      "Ba Na Hills cable car and entrance tickets",
      "Marble Mountains entrance",
      "Hoi An Ancient Town pass",
      "Vietnamese cooking class",
      "Lantern release on Thu Bon River",
      "English-speaking tour guide",
      "All transportation during tours",
      "Travel insurance"
    ],

    exclusions: [
      "International airfare",
      "Vietnam e-Visa fee (~USD 25)",
      "Personal expenses and shopping",
      "Meals not mentioned in itinerary",
      "Optional tailor-made clothing in Hoi An",
      "Tips and gratuities"
    ],

    availability: {
      "2026-05-07": { available: true, price: 28999, slots: 16, departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" },
      "2026-05-10": { available: true, price: 26999, slots: 24, departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" },
      "2026-05-14": { available: true, price: 27999, slots: 18, departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" },
      "2026-05-17": { available: true, price: 26999, slots: 20, departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" },
      "2026-05-21": { available: true, price: 29999, slots: 10, departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" },
      "2026-05-24": { available: true, price: 27999, slots: 14, departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" },
      "2026-05-28": { available: true, price: 30999, slots: 8,  departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" },
      "2026-05-31": { available: true, price: 27999, slots: 22, departureTime: "06:30", flightNumber: "5J820", route: "Manila (MNL) → Da Nang (DAD)" }
    },

    reviews: [
      {
        id: 1,
        userName: "Bianca Soriano",
        rating: 5,
        date: "2024-04-12",
        title: "Hoi An alone is worth the trip",
        comment: "I fell completely in love with Hoi An. The lanterns, the ancient streets, the tailor shops — pure magic. The cooking class was so much fun too.",
        verified: true,
        helpful: 44
      },
      {
        id: 2,
        userName: "Felix Navarro",
        rating: 5,
        date: "2024-03-30",
        title: "Golden Bridge was breathtaking",
        comment: "Ba Na Hills looks fake — like a painting. Standing on the Golden Bridge above the clouds was one of the most amazing moments of my life.",
        verified: true,
        helpful: 38
      },
      {
        id: 3,
        userName: "Rhea Castillo",
        rating: 4,
        date: "2024-03-05",
        title: "Central Vietnam is underrated",
        comment: "People always talk about Hanoi and Ho Chi Minh but Da Nang / Hoi An blew me away. 4 stars only because Ba Na Hills can feel a bit theme-parky.",
        verified: true,
        helpful: 29
      }
    ],

    relatedPackages: ["hanoi-cultural-journey", "phuket-island-escape"],

    seo: {
      metaTitle: "Da Nang Beach Retreat - 5 Days Central Vietnam Package",
      metaDescription: "Discover Da Nang's beaches, Hoi An Ancient Town, and the iconic Golden Bridge at Ba Na Hills. 5-day Vietnam package with cooking class and lantern ceremony.",
      keywords: ["da nang tour", "hoi an travel", "vietnam beach", "golden bridge ba na hills", "central vietnam package"]
    },

    createdAt: "2024-03-15",
    updatedAt: "2026-02-03"
  }

};




// ================================
// DATABASE HELPER FUNCTIONS
// ================================

// Get all packages (all countries)
function getAllPackages() {
  return Object.values(KOREA_PACKAGES);
}

// Backwards-compatible alias
function getKoreaPackages() {
  return getPackagesByCountry('South Korea');
}

// Get package by ID
function getPackageById(packageId) {
  return KOREA_PACKAGES[packageId] || null;
}

// Get packages by country
function getPackagesByCountry(country) {
  return Object.values(KOREA_PACKAGES).filter(pkg =>
    pkg.country.toLowerCase() === country.toLowerCase()
  );
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

// Search packages — title, city, country, and description
function searchPackages(query) {
  const lowerQuery = query.toLowerCase();
  return Object.values(KOREA_PACKAGES).filter(pkg => 
    pkg.title.toLowerCase().includes(lowerQuery) ||
    pkg.city.toLowerCase().includes(lowerQuery) ||
    pkg.country.toLowerCase().includes(lowerQuery) ||
    pkg.overview.description.toLowerCase().includes(lowerQuery)
  );
}

// Get unique list of all countries in the database
function getAvailableCountries() {
  const countries = Object.values(KOREA_PACKAGES).map(pkg => pkg.country);
  return [...new Set(countries)].sort();
}


// ================================
// EXPORT
// ================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    KOREA_PACKAGES,
    getAllPackages,
    getKoreaPackages,
    getPackageById,
    getPackagesByCountry,
    getPackagesByCity,
    getPackagesByCategory,
    getFeaturedPackages,
    getActivePackages,
    searchPackages,
    getAvailableCountries
  };
}