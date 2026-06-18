// ============================================
// CINEVERSE — Movie Data
// ============================================

const MOVIES = [
  {
    id: 1,
    title: "Stellar Horizon",
    tagline: "Beyond the stars lies the truth",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    year: 2024,
    duration: "2h 28m",
    rating: 8.4,
    votes: "124K",
    certificate: "UA",
    synopsis: "When a deep space probe returns with undeniable evidence of ancient alien structures beyond our solar system, astronaut Dr. Maya Chen volunteers for a one-way mission that could either save or doom humanity forever.",
    director: "Alexandra Moore",
    cast: ["Priya Sharma", "Marcus Webb", "Elena Vasquez", "Jin Park"],
    poster: "assets/poster_stellar_horizon.png",
    gradient: "linear-gradient(135deg, #1a0a3e 0%, #0d1a4a 50%, #0a0a1a 100%)",
    accentColor: "#7c3aed",
    featured: true,
    category: "Sci-Fi",
    prices: { gold: 450, silver: 300, bronze: 180 }
  },
  {
    id: 2,
    title: "Iron Tempest",
    tagline: "When machines inherit the earth",
    genres: ["Action", "Sci-Fi"],
    year: 2024,
    duration: "2h 15m",
    rating: 7.8,
    votes: "89K",
    certificate: "UA",
    synopsis: "In a world where rogue AI-controlled mechs have overthrown governments, a former military engineer must reactivate the last surviving prototype to reclaim humanity's future.",
    director: "Christopher Nolan",
    cast: ["Ryan Cross", "Sara Miyamoto", "Viktor Bauer", "Aisha Khan"],
    poster: "assets/poster_iron_tempest.png",
    gradient: "linear-gradient(135deg, #1a0800 0%, #2d1600 50%, #0a0500 100%)",
    accentColor: "#f97316",
    featured: false,
    category: "Action",
    prices: { gold: 400, silver: 280, bronze: 160 }
  },
  {
    id: 3,
    title: "Neon Dreams",
    tagline: "In the city of lights, truth is the darkest secret",
    genres: ["Sci-Fi", "Noir", "Thriller"],
    year: 2024,
    duration: "2h 02m",
    rating: 8.1,
    votes: "67K",
    certificate: "A",
    synopsis: "A detective in 2085's neon-soaked megacity investigates a series of murders tied to an underground memory-hacking syndicate, unraveling a conspiracy that reaches the highest levels of corporate power.",
    director: "Denis Villeneuve",
    cast: ["Kai Nakamura", "Sofia Reyes", "James O'Brien", "Lena Kovacs"],
    poster: "assets/poster_neon_dreams.png",
    gradient: "linear-gradient(135deg, #0d0026 0%, #1a0038 50%, #00111a 100%)",
    accentColor: "#ec4899",
    featured: false,
    category: "Thriller",
    prices: { gold: 420, silver: 290, bronze: 170 }
  },
  {
    id: 4,
    title: "Midnight Requiem",
    tagline: "Some doors are better left closed",
    genres: ["Horror", "Mystery", "Thriller"],
    year: 2024,
    duration: "1h 54m",
    rating: 7.6,
    votes: "52K",
    certificate: "A",
    synopsis: "A grief-stricken composer inherits an ancient Victorian mansion, only to discover that the music emanating from its walls at midnight is the voice of something terrifyingly real.",
    director: "Jordan Peele",
    cast: ["Isabelle Crane", "Thomas Hartley", "Mira Santos", "David Okafor"],
    poster: "assets/poster_midnight_requiem.png",
    gradient: "linear-gradient(135deg, #1a0014 0%, #2d0020 50%, #0a000a 100%)",
    accentColor: "#dc2626",
    featured: false,
    category: "Horror",
    prices: { gold: 380, silver: 260, bronze: 150 }
  },
  {
    id: 5,
    title: "Shadow Protocol",
    tagline: "Trust no one. Not even yourself.",
    genres: ["Action", "Thriller", "Spy"],
    year: 2024,
    duration: "2h 20m",
    rating: 8.0,
    votes: "98K",
    certificate: "UA",
    synopsis: "Elite CIA operative Sarah Vance discovers that her entire career has been manipulated by a shadow organization that controls world governments. With no allies and nowhere to run, she must expose the truth.",
    director: "Kathryn Bigelow",
    cast: ["Natalia Storm", "Leo Farris", "Chen Wei", "Hassan Al-Rashid"],
    poster: null,
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a0505 50%, #0a0000 100%)",
    accentColor: "#ef4444",
    featured: false,
    category: "Action",
    prices: { gold: 430, silver: 295, bronze: 175 }
  },
  {
    id: 6,
    title: "The Last Garden",
    tagline: "Where love grew, so did secrets",
    genres: ["Drama", "Romance"],
    year: 2024,
    duration: "2h 05m",
    rating: 8.3,
    votes: "43K",
    certificate: "U",
    synopsis: "A botanist returns to her late grandmother's estate in Tuscany and discovers a hidden garden that holds the key to a decades-old mystery about her family, love, and the price of true sacrifice.",
    director: "Greta Gerwig",
    cast: ["Amara Osei", "Luca Bianchi", "Claire Fontaine", "Riya Patel"],
    poster: null,
    gradient: "linear-gradient(135deg, #0a1a00 0%, #1a2d0a 50%, #050d00 100%)",
    accentColor: "#84cc16",
    featured: false,
    category: "Drama",
    prices: { gold: 350, silver: 240, bronze: 140 }
  },
  {
    id: 7,
    title: "Wild Hearts",
    tagline: "Love that defies every boundary",
    genres: ["Romance", "Drama", "Adventure"],
    year: 2024,
    duration: "1h 58m",
    rating: 7.5,
    votes: "61K",
    certificate: "U",
    synopsis: "Two strangers meet on a cross-country motorcycle journey and discover that the road trip they planned separately has been leading them toward each other all along.",
    director: "Emma Thompson",
    cast: ["Zara Ellis", "Marco Rios", "Preet Kaur", "Sam Novak"],
    poster: null,
    gradient: "linear-gradient(135deg, #1a0014 0%, #2d0526 50%, #0d000a 100%)",
    accentColor: "#f472b6",
    featured: false,
    category: "Romance",
    prices: { gold: 340, silver: 230, bronze: 135 }
  },
  {
    id: 8,
    title: "The Hidden Realm",
    tagline: "Between worlds, a warrior stands",
    genres: ["Fantasy", "Adventure", "Action"],
    year: 2024,
    duration: "2h 42m",
    rating: 8.6,
    votes: "156K",
    certificate: "UA",
    synopsis: "A young archivist discovers an ancient portal connecting our world to a realm of mythical creatures facing extinction. To save both worlds, she must master powers she never knew she possessed.",
    director: "Peter Jackson",
    cast: ["Aria Blaze", "Finn O'Connor", "Zhen Liu", "Maya Stone"],
    poster: null,
    gradient: "linear-gradient(135deg, #00140a 0%, #002d1a 50%, #000d05 100%)",
    accentColor: "#10b981",
    featured: false,
    category: "Fantasy",
    prices: { gold: 480, silver: 320, bronze: 190 }
  },
  {
    id: 9,
    title: "Crimson Eclipse",
    tagline: "When the sky bleeds, the hunt begins",
    genres: ["Action", "Sci-Fi", "Thriller"],
    year: 2024,
    duration: "2h 10m",
    rating: 7.9,
    votes: "71K",
    certificate: "A",
    synopsis: "During a rare astronomical event, a series of supernatural attacks begin across the globe. A scientist and a mercenary must uncover the ancient forces awakened by the eclipse before it's too late.",
    director: "Ridley Scott",
    cast: ["Drake Stone", "Nadia Petrov", "Omar Hassan", "Yuki Tanaka"],
    poster: null,
    gradient: "linear-gradient(135deg, #1a0000 0%, #2d0505 50%, #0a0000 100%)",
    accentColor: "#b91c1c",
    featured: false,
    category: "Action",
    prices: { gold: 410, silver: 285, bronze: 165 }
  },
  {
    id: 10,
    title: "Echoes of Tomorrow",
    tagline: "The future is a warning from the past",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    year: 2024,
    duration: "2h 17m",
    rating: 8.2,
    votes: "88K",
    certificate: "UA",
    synopsis: "A temporal physicist begins receiving transmissions from her future self, warning of a catastrophic event. As she races to prevent it, she discovers that changing the future may erase everything she loves.",
    director: "Rian Johnson",
    cast: ["Nova Chen", "Elias Park", "Fatima Al-Zahra", "Leo Harris"],
    poster: null,
    gradient: "linear-gradient(135deg, #00141a 0%, #002535 50%, #000a0d 100%)",
    accentColor: "#06b6d4",
    featured: false,
    category: "Sci-Fi",
    prices: { gold: 440, silver: 305, bronze: 185 }
  }
];

const CATEGORIES = ["All", "Action", "Sci-Fi", "Thriller", "Horror", "Drama", "Romance", "Fantasy"];

const SHOWTIMES = [
  { id: "morning", label: "Morning", time: "10:00 AM", available: true },
  { id: "afternoon", label: "Afternoon", time: "2:30 PM", available: true },
  { id: "evening", label: "Evening", time: "6:00 PM", available: true },
  { id: "night", label: "Night", time: "9:30 PM", available: true }
];

// Seat configuration
const SEAT_CONFIG = {
  rows: 12,
  seatsPerRow: 14,
  aisleAfter: 7,
  rowLabels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
  tierRanges: {
    gold: [0, 3],    // rows A-D
    silver: [4, 7],  // rows E-H
    bronze: [8, 11]  // rows I-L
  },
  // Pre-booked seats (random)
  bookedSeats: [
    "A3", "A4", "A8", "A9",
    "B5", "B6", "B7",
    "C2", "C10", "C11",
    "D1", "D12",
    "E4", "E5", "E9",
    "F6", "F7", "F8",
    "G3", "G11", "G12",
    "H2", "H9",
    "I5", "I6",
    "J3", "J4", "J10",
    "K7", "K8",
    "L1", "L13"
  ]
};

function getMovieById(id) {
  return MOVIES.find(m => m.id === parseInt(id));
}

function getMoviesByCategory(category) {
  if (category === "All") return MOVIES;
  return MOVIES.filter(m => m.category === category);
}

function getFeaturedMovie() {
  return MOVIES.find(m => m.featured) || MOVIES[0];
}
