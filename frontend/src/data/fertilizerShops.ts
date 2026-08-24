export interface FertilizerShop {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewsCount: number;
  lat: number;
  lng: number;
  distance?: number; // calculated dynamically
  products: string[];
  isOrganic: boolean;
  isCooperative: boolean;
  timings: string;
}

// Convert degrees to radians
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

// Haversine formula to calculate distance in km between two coordinates
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1)); // round to 1 decimal place
};

// Static default shops in major agri-hubs (fallback)
export const DEFAULT_SHOPS: FertilizerShop[] = [
  {
    id: "shop-bng-1",
    name: "Sri Rama Agri-Inputs & Fertilizers",
    address: "Kanakapura Road, Opp. Metro Station, Bengaluru, Karnataka 560062",
    phone: "+91 98450 12345",
    whatsapp: "+919845012345",
    rating: 4.6,
    reviewsCount: 142,
    lat: 12.9012,
    lng: 77.5734,
    products: ["Mancozeb", "Neem Oil Extract", "NPK 19-19-19", "Urea", "Copper Oxychloride", "Azotobacter Biofertilizer"],
    isOrganic: false,
    isCooperative: false,
    timings: "8:30 AM - 7:30 PM"
  },
  {
    id: "shop-bng-2",
    name: "Karnataka Farmers Sahakari Sangha",
    address: "APMC Yard, Yeshwanthpur, Bengaluru, Karnataka 560022",
    phone: "+91 80 2337 5678",
    whatsapp: "+918023375678",
    rating: 4.3,
    reviewsCount: 389,
    lat: 13.0234,
    lng: 77.5389,
    products: ["Urea", "DAP (Diammonium Phosphate)", "Potash", "Neem Cake", "Trichoderma Viride", "Pseudomonas Fluorescens"],
    isOrganic: true,
    isCooperative: true,
    timings: "9:00 AM - 6:00 PM (Sunday Closed)"
  },
  {
    id: "shop-hub-1",
    name: "Malaprabha Agro Chemicals & Seeds",
    address: "Station Road, Near Town Hall, Hubballi, Karnataka 580020",
    phone: "+91 94481 87654",
    whatsapp: "+919448187654",
    rating: 4.5,
    reviewsCount: 96,
    lat: 15.3524,
    lng: 75.1384,
    products: ["Streptocycline", "Copper Oxychloride", "Mancozeb", "Imidacloprid", "Neem Oil", "NPK 20-20-20"],
    isOrganic: false,
    isCooperative: false,
    timings: "8:00 AM - 8:00 PM"
  },
  {
    id: "shop-hub-2",
    name: "Krishi Seva Kendra Organic Depot",
    address: "Gokul Road, Opp. Airport Bypass, Hubballi, Karnataka 580030",
    phone: "+91 98860 45454",
    whatsapp: "+919886045454",
    rating: 4.8,
    reviewsCount: 78,
    lat: 15.3642,
    lng: 75.0991,
    products: ["Neem Oil Extract", "Vermicompost", "Trichoderma Viride", "Panchagavya Organic Liquid", "Bone Meal", "Cow Dung Fertilizer"],
    isOrganic: true,
    isCooperative: false,
    timings: "8:30 AM - 6:30 PM"
  },
  {
    id: "shop-luc-1",
    name: "Awadh Krishi Kendra",
    address: "Faizabad Road, near Polytechnic Crossing, Lucknow, Uttar Pradesh 226016",
    phone: "+91 99351 22334",
    whatsapp: "+919935122334",
    rating: 4.4,
    reviewsCount: 165,
    lat: 26.8724,
    lng: 80.9845,
    products: ["Urea", "DAP", "Zinc Sulphate", "Mancozeb", "Propiconazole", "NPK 15-15-15"],
    isOrganic: false,
    isCooperative: false,
    timings: "9:00 AM - 8:00 PM"
  },
  {
    id: "shop-hyd-1",
    name: "Telangana State Agro Industries Outlet",
    address: "HACA Bhavan, Nampally, Hyderabad, Telangana 500004",
    phone: "+91 40 2323 2345",
    whatsapp: "+914023232345",
    rating: 4.2,
    reviewsCount: 224,
    lat: 17.3984,
    lng: 78.4715,
    products: ["Urea", "SSP (Single Superphosphate)", "Copper Oxychloride", "Neem Oil", "Rhizobium Biofertilizer", "Carbendazim"],
    isOrganic: false,
    isCooperative: true,
    timings: "10:00 AM - 5:30 PM (Sunday Closed)"
  },
  {
    id: "shop-cbe-1",
    name: "Kovai Agri Tech & Bio-Solutions",
    address: "Mettupalayam Road, Coimbatore, Tamil Nadu 641043",
    phone: "+91 94220 98765",
    whatsapp: "+919422098765",
    rating: 4.7,
    reviewsCount: 114,
    lat: 11.0423,
    lng: 76.9452,
    products: ["Neem Oil Extract", "Pseudomonas Fluorescens", "Trichoderma Viride", "Copper Oxychloride", "NPK 19-19-19", "Fish Amino Acid"],
    isOrganic: true,
    isCooperative: false,
    timings: "8:00 AM - 7:30 PM"
  }
];

// Helper to generate dynamic nearby shops with offsets relative to user's location
// We inject the targeted treatment if provided so at least some shops stock it
export const generateShopsForLocation = (
  userLat: number,
  userLng: number,
  requiredTreatment?: string
): FertilizerShop[] => {
  const shopTemplates = [
    {
      name: "Sri Lakshmi Venkateshwara Agri-Inputs",
      addressOffset: "Market Road, 1st Cross",
      rating: 4.7,
      reviewsCount: 184,
      latOffset: 0.0042, // ~0.5 km
      lngOffset: -0.0031,
      products: ["NPK 19-19-19", "Urea", "Potash", "DAP"],
      isOrganic: false,
      isCooperative: false,
      timings: "8:00 AM - 8:30 PM",
      phone: "+91 98440 99887"
    },
    {
      name: "GreenEarth Bio-Organic & Seed Store",
      addressOffset: "Main Bus Stand Road, Opp. SBI Bank",
      rating: 4.8,
      reviewsCount: 92,
      latOffset: -0.0068, // ~1.0 km
      lngOffset: 0.0054,
      products: ["Neem Oil Extract", "Trichoderma Viride", "Panchagavya Organic Liquid", "Vermicompost"],
      isOrganic: true,
      isCooperative: false,
      timings: "8:30 AM - 7:00 PM",
      phone: "+91 97420 54321"
    },
    {
      name: "Rythu Seva Cooperative Agriculture Depot",
      addressOffset: "APMC Sub-Market Yard",
      rating: 4.4,
      reviewsCount: 312,
      latOffset: 0.0125, // ~1.8 km
      lngOffset: 0.0089,
      products: ["Urea", "DAP (Diammonium Phosphate)", "Potash", "Zinc Sulphate", "Mancozeb"],
      isOrganic: false,
      isCooperative: true,
      timings: "9:00 AM - 6:00 PM (Sunday Closed)",
      phone: "+91 80 5566 7788"
    },
    {
      name: "Kisan Bandhu Pesticides & Sprayers",
      addressOffset: "National Highway Bypass Cross",
      rating: 4.5,
      reviewsCount: 67,
      latOffset: -0.0162, // ~2.3 km
      lngOffset: -0.0141,
      products: ["Copper Oxychloride", "Streptocycline", "Propiconazole", "Imidacloprid", "Carbendazim"],
      isOrganic: false,
      isCooperative: false,
      timings: "8:00 AM - 8:00 PM",
      phone: "+91 96200 44556"
    },
    {
      name: "Mother Nature Organic Agri Solutions",
      addressOffset: "Industrial Suburb Road",
      rating: 4.6,
      reviewsCount: 45,
      latOffset: 0.0241, // ~3.5 km
      lngOffset: -0.0215,
      products: ["Vermicompost", "Neem Oil", "Pseudomonas Fluorescens", "Bone Meal", "Fish Amino Acid"],
      isOrganic: true,
      isCooperative: false,
      timings: "9:00 AM - 7:00 PM",
      phone: "+91 99000 88776"
    }
  ];

  return shopTemplates.map((tpl, idx) => {
    const lat = userLat + tpl.latOffset;
    const lng = userLng + tpl.lngOffset;
    
    // Calculate exact distance using Haversine
    const distance = calculateDistance(userLat, userLng, lat, lng);
    
    // Inject the required treatment chemical if passed, making sure it shows in the shop's list
    let products = [...tpl.products];
    if (requiredTreatment) {
      // Clean treatment name (e.g. "Mancozeb 75% WP" -> "Mancozeb")
      const cleanTreatment = requiredTreatment.split(/[;,\(\d]/)[0].trim();
      
      // Inject to 3 of the 5 shops (some have it, some don't, for realism)
      if (idx % 2 === 0 && !products.includes(cleanTreatment)) {
        products.unshift(cleanTreatment);
      }
    }

    // Try to guess a locality name from coordinate range (mocked for visual appeal)
    const locality = userLat > 13 ? "North Region" : "Central Hub";
    const address = `${tpl.addressOffset}, ${locality} Area (Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)})`;

    return {
      id: `shop-dyn-${idx}`,
      name: tpl.name,
      address,
      phone: tpl.phone,
      whatsapp: tpl.phone.replace(/[\s\+]/g, ""),
      rating: tpl.rating,
      reviewsCount: tpl.reviewsCount,
      lat,
      lng,
      distance,
      products,
      isOrganic: tpl.isOrganic,
      isCooperative: tpl.isCooperative,
      timings: tpl.timings
    };
  }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
};
