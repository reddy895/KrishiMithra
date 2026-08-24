import {
  BricsNode,
  FarmProfile,
  RagDocument,
  RegionalModelCard,
  CrossRegionalPractice,
  AiObservabilityMetrics,
} from "@/types/nexus";

export const BRICS_NODES: BricsNode[] = [
  {
    id: "brics-ind-01",
    country: "India",
    flag: "🇮🇳",
    region: "Karnataka (Deccan Agro-Climatic Zone)",
    status: "active",
    agriZone: "Semi-Arid Tropical / Coastal Alluvium",
    primaryCrops: ["Rice", "Tomato", "Cotton", "Ragi", "Maize"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-IND-ICAR",
    sharedModelsCount: 14,
    sharedDatasetsCount: 38,
    lat: 13.0827,
    lng: 77.5877,
    climateProfile: "Tropical wet-and-dry, monsoon dependent",
    recentInsight: "High humidity spike in Mandya basin elevates rice blast spore germination risk."
  },
  {
    id: "brics-bra-02",
    country: "Brazil",
    flag: "🇧🇷",
    region: "Mato Grosso (Cerrado Biome)",
    status: "active",
    agriZone: "Tropical Savanna / Oxisol Soils",
    primaryCrops: ["Soybean", "Maize", "Cotton", "Sugarcane", "Coffee"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-BRA-EMBRAPA",
    sharedModelsCount: 18,
    sharedDatasetsCount: 42,
    lat: -12.6819,
    lng: -56.9211,
    climateProfile: "Tropical Savanna with distinct wet/dry seasons",
    recentInsight: "Biological nitrogen fixation inoculants reduced synthetic fertilizer requirements by 32%."
  },
  {
    id: "brics-rus-03",
    country: "Russia",
    flag: "🇷🇺",
    region: "Krasnodar Krai (Black Soil Steppe)",
    status: "active",
    agriZone: "Chernozem Fertile Plains",
    primaryCrops: ["Winter Wheat", "Sunflower", "Barley", "Sugar Beet"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-RUS-RAS",
    sharedModelsCount: 9,
    sharedDatasetsCount: 29,
    lat: 45.0393,
    lng: 38.9872,
    climateProfile: "Humid continental with moderate winters",
    recentInsight: "Sentinel-2 NDRE index successfully flagged early snow-mold fungal stress in winter wheat."
  },
  {
    id: "brics-chn-04",
    country: "China",
    flag: "🇨🇳",
    region: "Heilongjiang (Northeast Black Earth Zone)",
    status: "active",
    agriZone: "Temperate Monsoonal / Mollisols",
    primaryCrops: ["Rice", "Maize", "Soybean", "Potato"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-CHN-CAAS",
    sharedModelsCount: 22,
    sharedDatasetsCount: 65,
    lat: 45.7567,
    lng: 126.6424,
    climateProfile: "Subarctic monsoonal with warm, humid summers",
    recentInsight: "Alternate Wetting and Drying (AWD) protocol demonstrated 24% water conservation in cold-region paddy."
  },
  {
    id: "brics-zaf-05",
    country: "South Africa",
    flag: "🇿🇦",
    region: "Free State (Highveld Grain Basket)",
    status: "active",
    agriZone: "Semi-Arid Continental Plateau",
    primaryCrops: ["Maize", "Sorghum", "Wheat", "Sunflower"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-ZAF-ARC",
    sharedModelsCount: 8,
    sharedDatasetsCount: 21,
    lat: -28.4541,
    lng: 26.7968,
    climateProfile: "Semi-arid with severe drought susceptibility",
    recentInsight: "Conservation tillage with crop residue retention maintained +18% soil moisture during 21-day dry spell."
  },
  {
    id: "brics-egy-06",
    country: "Egypt",
    flag: "🇪🇬",
    region: "Kafr El Sheikh (Nile Delta)",
    status: "syncing",
    agriZone: "Hyper-Arid Irrigated Floodplain",
    primaryCrops: ["Long-Staple Cotton", "Rice", "Wheat", "Citrus"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-EGY-ARC",
    sharedModelsCount: 6,
    sharedDatasetsCount: 16,
    lat: 31.1107,
    lng: 30.9388,
    climateProfile: "Arid Mediterranean with zero non-irrigation rainfall",
    recentInsight: "Precision salinity monitoring via electrical conductivity prevented root burn in juvenile cotton."
  },
  {
    id: "brics-eth-07",
    country: "Ethiopia",
    flag: "🇪🇹",
    region: "Oromia (East African Rift Highlands)",
    status: "syncing",
    agriZone: "Highland Vertisols / Tropical Montane",
    primaryCrops: ["Teff", "Coffee", "Wheat", "Maize", "Legumes"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-ETH-EIAR",
    sharedModelsCount: 5,
    sharedDatasetsCount: 12,
    lat: 8.5410,
    lng: 39.2689,
    climateProfile: "Tropical highland with bimodal rainfall (Belg/Kiremt)",
    recentInsight: "Agroforestry shade integration stabilized soil organic carbon in smallholder plots."
  },
  {
    id: "brics-uae-08",
    country: "UAE",
    flag: "🇦🇪",
    region: "Al Ain (Arid Hyper-Controlled Agronomy)",
    status: "standby",
    agriZone: "Hyper-Arid Desert / Controlled Environment",
    primaryCrops: ["Date Palm", "Hydroponic Vegetables", "Forage"],
    connectedAgriNProtocol: "AgriN-REST/v2.4-UAE-ICBA",
    sharedModelsCount: 4,
    sharedDatasetsCount: 9,
    lat: 24.1302,
    lng: 55.8023,
    climateProfile: "Hyper-arid desert with extreme summer heat",
    recentInsight: "Subsurface biosaline irrigation algorithms reduced freshwater footprint by 41%."
  }
];

export const DEMO_FARMS: FarmProfile[] = [
  {
    id: "IND-KA-001",
    name: "Sri Anjaneya Nilaya Agro Farm",
    farmerName: "Basavaraj Gowda",
    phone: "+91 98450 12345",
    country: "India",
    region: "Karnataka",
    village: "Mandya, Cauvery Basin",
    lat: 12.5218,
    lng: 76.8951,
    fieldAreaAcres: 4.5,
    crop: "Rice",
    variety: "Jaya / Jyothi (Semi-Dwarf)",
    sowingDate: "2026-06-15",
    growthStage: "Tillering",
    satellite: {
      id: "SAT-IND-001",
      timestamp: "2026-08-22T06:30:00Z",
      sensor: "Sentinel-2 (ESA/Copernicus)",
      ndviCurrent: 0.58,
      ndviPrevious: 0.69,
      ndviChangePercent: -15.9,
      ndwiMoistureIndex: 0.28,
      eviEnhancedVegetation: 0.44,
      canopyChlorophyll: 38.2,
      vegetationHealthStatus: "Moderate Stress",
      detectedAnomalies: [
        "Localized NDVI canopy depression in South-East quadrant (-19%)",
        "NDWI moisture index stable (water stress ruled out)",
        "Spectral reflectance signature matches foliar lesion formation"
      ],
      possibleCauses: [
        {
          cause: "Fungal Leaf Blast (Magnaporthe oryzae)",
          probability: 0.78,
          evidence: "High relative humidity (86%) + sudden drop in green reflectance with normal soil moisture."
        },
        {
          cause: "Localized Nitrogen Leaching",
          probability: 0.22,
          evidence: "Heavy post-irrigation runoff observed in recent satellite drainage pass."
        }
      ],
      recommendedAction: "Inspect lower and middle leaf collars for diamond-shaped blast lesions. Apply bio-control Pseudomonas fluorescens or Tricyclazole.",
      uncertaintyScore: 0.12,
      provenance: {
        sourceType: "public_dataset",
        sourceName: "Sentinel-2 Level-2A BOA Reflectance via Copernicus Open Access Hub",
        datasetOrApiUrl: "https://dataspace.copernicus.eu",
        lastUpdated: "2026-08-22",
        confidence: 0.91,
        uncertaintyMargin: "±0.03 NDVI calibration error"
      }
    },
    weather: {
      id: "WEA-IND-001",
      timestamp: "2026-08-23T05:00:00Z",
      temperatureC: 28.4,
      feelsLikeC: 31.8,
      humidityPercent: 88,
      windSpeedKmh: 9.2,
      windDirection: "SW",
      precipitationMm24h: 4.2,
      precipitationProbability48h: 74,
      uvIndex: 7.2,
      dewPointC: 26.1,
      solarRadiationWm2: 680,
      heatRiskLevel: "Moderate",
      forecast7Days: [
        { day: "Sun", tempMax: 29, tempMin: 22, rainProb: 74, rainMm: 12, condition: "Thunderstorms", icon: "rain" },
        { day: "Mon", tempMax: 28, tempMin: 22, rainProb: 80, rainMm: 18, condition: "Moderate Rain", icon: "rain" },
        { day: "Tue", tempMax: 30, tempMin: 23, rainProb: 45, rainMm: 4, condition: "Scattered Clouds", icon: "cloud" },
        { day: "Wed", tempMax: 31, tempMin: 23, rainProb: 20, rainMm: 0, condition: "Partly Sunny", icon: "sun" },
        { day: "Thu", tempMax: 31, tempMin: 22, rainProb: 15, rainMm: 0, condition: "Sunny", icon: "sun" },
        { day: "Fri", tempMax: 32, tempMin: 23, rainProb: 10, rainMm: 0, condition: "Clear", icon: "sun" },
        { day: "Sat", tempMax: 32, tempMin: 24, rainProb: 25, rainMm: 2, condition: "Passing Clouds", icon: "cloud" }
      ],
      agriculturalConsequences: [
        {
          domain: "Irrigation",
          headline: "Delay Scheduled Puddle Flooding",
          operationalAdvice: "Heavy precipitation (18mm) forecast over next 48 hours. Conserve canal water and open drainage sluices to avoid submergence.",
          urgency: "Immediate"
        },
        {
          domain: "Disease Risk",
          headline: "High Fungal Blast Spore Dispersal Warning",
          operationalAdvice: "Extended dew duration (>9 hours) combined with 88% humidity creates high-risk microclimate for Magnaporthe oryzae.",
          urgency: "Within 24h"
        },
        {
          domain: "Spray Window",
          headline: "Spray Feasibility Restricted",
          operationalAdvice: "Foliar sprays should only be conducted during the Tuesday morning dry window (07:00 - 10:30 AM) to prevent rain wash-off.",
          urgency: "Within 3d"
        }
      ],
      provenance: {
        sourceType: "live_api",
        sourceName: "Open-Meteo High-Resolution Agricultural Meteorology API",
        datasetOrApiUrl: "https://open-meteo.com/en/docs/agricultural-api",
        lastUpdated: "2026-08-23 05:00 UTC",
        confidence: 0.94
      }
    },
    soil: {
      id: "SOIL-IND-001",
      timestamp: "2026-08-20T11:00:00Z",
      soilType: "Clay Loam (Red Sandy Alluvium)",
      pH: 6.4,
      nitrogenKgHa: 198, // Low (Opt: 280-450)
      phosphorusKgHa: 26, // Medium (Opt: 22-55)
      potassiumKgHa: 245, // Good (Opt: 140-280)
      organicCarbonPercent: 0.62, // Moderate (Opt: >0.75%)
      moisturePercent: 38,
      electricalConductivityDsM: 0.42,
      soilHealthScore: 73,
      strengths: [
        "Optimal pH for paddy nutrient availability (6.4)",
        "Strong available Potassium (K) reserve protects against lodging",
        "Low salinity / excellent electrical conductivity (0.42 dS/m)"
      ],
      deficiencies: [
        "Deficient available Nitrogen (198 kg/ha vs target 320 kg/ha)",
        "Marginal Organic Carbon (0.62%) indicates potential microbial slowdown"
      ],
      cropSuitabilityScore: 84,
      regenerativeAmendments: [
        {
          name: "Neem Cake Coated Urea / Azospirillum Biofertilizer",
          targetNutrient: "Nitrogen & Microbial Bio-activation",
          dosagePerAcre: "4 kg Azospirillum + 15 kg Neem Cake",
          applicationMethod: "Top dress broadcast at 25 days after transplanting",
          expectedSoilImpact: "+15% nitrogen use efficiency and biological nitrogen fixation."
        },
        {
          name: "Farmyard Manure / Enriched Compost",
          targetNutrient: "Organic Carbon (OC)",
          dosagePerAcre: "1.5 tons/acre",
          applicationMethod: "Incorporate into field borders and top layer between crop rows",
          expectedSoilImpact: "Raises OC towards 0.8% and enhances moisture retention."
        }
      ],
      provenance: {
        sourceType: "public_dataset",
        sourceName: "ICAR-NBSS&LUP Soil Resource Mapping & Field Diagnostic Card",
        datasetOrApiUrl: "https://icar.org.in",
        lastUpdated: "2026-08-20",
        confidence: 0.92
      }
    },
    disease: {
      id: "DIS-IND-001",
      crop: "Rice (Paddy)",
      diseaseName: "Rice Blast (Leaf Blast)",
      isHealthy: false,
      confidence: 91.4,
      severity: "moderate",
      symptoms: [
        "Diamond / spindle-shaped lesions with grayish-white centers and brownish borders",
        "Yellow halo surrounding active expanding lesions",
        "Coalescing spots causing premature drying of upper leaf tips"
      ],
      detectedOnPart: "Middle and upper leaves",
      causes: [
        "High relative humidity (>85%) over consecutive days",
        "Extended night-time dew formation on leaf blades",
        "Susceptible semi-dwarf cultivar under tillering growth phase"
      ],
      imageUrl: "/assets/rice_blast.png",
      pesticides: [
        {
          name: "Tricyclazole 75% WP",
          dosage: "0.6 g per liter of water (120 g / acre)",
          application: "Targeted foliar spray covering both upper and lower leaf surfaces during calm morning hours",
          safety: "Pre-harvest interval 21 days. Wear protective mask and gloves. Do not spray within 48h of rain."
        },
        {
          name: "Isoprothiolane 40% EC",
          dosage: "1.5 ml per liter of water",
          application: "Alternative systemic fungicide for blast control and root vigor enhancement",
          safety: "Toxic to aquatic organisms; maintain perimeter bunds to prevent canal drainage."
        }
      ],
      organicAlternatives: [
        "Pseudomonas fluorescens (liquid formulation) @ 10 ml/L as prophylactic bio-fungicide",
        "5% Neem Seed Kernel Extract (NSKE) foliar spray to inhibit fungal mycelial expansion",
        "Cow dung slurry supernatant (10%) mixed with asafoetida for organic protection"
      ],
      prevention: [
        "Avoid excessive synthetic nitrogen application during tillering stage",
        "Adopt Alternate Wetting and Drying (AWD) water management to aerate root rhizosphere",
        "Burn or deeply plow infected stubble post-harvest to eliminate overwintering conidia"
      ],
      provenance: {
        sourceType: "demo_data",
        sourceName: "KrishiMithra Vision Pathology Model + ICAR Rice Protection Protocol",
        lastUpdated: "2026-08-23",
        confidence: 0.914
      }
    },
    riskRadar: {
      diseaseRisk: "HIGH",
      waterStress: "LOW",
      heatRisk: "LOW",
      rainfallRisk: "MEDIUM",
      soilRisk: "MEDIUM",
      cropStress: "HIGH",
      overallRisk: "HIGH",
      mainDrivers: [
        "1. Active Rice Blast fungal lesions confirmed by satellite NDVI anomaly (-15.9%) and camera scan (91.4% confidence).",
        "2. Favorable microclimate: 88% humidity + 74% rainfall probability in next 48 hours.",
        "3. Soil Nitrogen deficit (198 kg/ha) reducing leaf cellular immune resistance."
      ]
    },
    regenerativeScore: {
      overallScore: 71,
      soilHealth: 73,
      waterEfficiency: 68,
      cropDiversity: 64,
      organicMatter: 72,
      climateResilience: 78,
      topActions: [
        {
          priority: 1,
          title: "Transition to Alternate Wetting & Drying (AWD)",
          description: "Install field water tubes. Allow water level to drop 15cm below soil surface before re-flooding, reducing methane emissions by 30% and conserving 25% water.",
          expectedScoreGain: 8,
          timeframe: "Next 5 Days"
        },
        {
          priority: 2,
          title: "Introduce Nitrogen-Fixing Sesbania Cover Crop on Bunds",
          description: "Plant Daincha (Sesbania rostrata) on field borders and incorporate green biomass to naturally sequester 45 kg N/ha.",
          expectedScoreGain: 6,
          timeframe: "Next Sowing Cycle"
        },
        {
          priority: 3,
          title: "Apply Biochar & Neem Enriched Compost",
          description: "Apply 200 kg biochar per acre to improve long-term soil cation exchange capacity and increase organic carbon.",
          expectedScoreGain: 5,
          timeframe: "Post-Harvest"
        }
      ]
    },
    currentAdvisory: {
      id: "ADV-IND-001",
      timestamp: "2026-08-23T05:15:00Z",
      whatIsHappening: "Your paddy crop in Mandya is experiencing moderate vegetation stress triggered by an emerging Rice Blast (Magnaporthe oryzae) infection compounded by low available soil nitrogen.",
      whyItMayBeHappening: [
        "Satellite Sentinel-2 observes a -15.9% decline in canopy NDVI over the last 10 days.",
        "Weather sensor registers persistent high relative humidity (88%) and 4.2mm recent rainfall, creating ideal spore incubation conditions.",
        "Soil test reflects low Nitrogen (198 kg/ha), which weakens leaf cuticle thickness."
      ],
      whatYouShouldDo: [
        {
          action: "Spray Pseudomonas fluorescens (10 ml/L) or Tricyclazole 75% WP (0.6 g/L) immediately during the Tuesday morning dry window.",
          type: "Targeted Biological Treatment",
          timeline: "Within 24-48 Hours"
        },
        {
          action: "Postpone irrigation flooding until the forecasted 18mm rain event passes on Monday.",
          type: "Irrigation Adjustment",
          timeline: "Immediate (Today)"
        },
        {
          action: "Apply 15 kg Neem-coated urea blended with 4 kg Azospirillum per acre after disease symptoms stabilize.",
          type: "Immediate Organic Action",
          timeline: "Day 4 to Day 7"
        }
      ],
      confidence: 89,
      dataSources: [
        {
          name: "Sentinel-2 Level-2A Multispectral Satellite",
          type: "public_dataset",
          evidencePoint: "NDVI dropped from 0.69 to 0.58; NDWI confirms no moisture deficit"
        },
        {
          name: "Open-Meteo High-Resolution Agro-Forecast",
          type: "live_api",
          evidencePoint: "88% RH, 74% precipitation prob, 9-hour leaf wetness duration"
        },
        {
          name: "ICAR National Rice Research Institute Blast Advisory Protocol",
          type: "public_dataset",
          evidencePoint: "Blast threshold triggers bio-fungicide intervention above 85% RH"
        }
      ]
    },
    timeline: [
      {
        id: "ACT-01",
        timeframe: "TODAY",
        title: "Field Inspection & Drain Sluice Check",
        description: "Walk the south-east quadrant. Confirm blast lesion spread and open drainage bunds for upcoming rain.",
        category: "Inspection",
        completed: false
      },
      {
        id: "ACT-02",
        timeframe: "24 HOURS",
        title: "Rain Monitoring & Fungal Containment Prep",
        description: "Hold off on all foliar sprays until rain subsides; mix Pseudomonas bio-agent in shade.",
        category: "Protection",
        completed: false
      },
      {
        id: "ACT-03",
        timeframe: "3 DAYS",
        title: "Targeted Bio-Fungicide Application",
        description: "Spray Tricyclazole / Pseudomonas in the clear morning window (07:00 - 10:30 AM).",
        category: "Protection",
        completed: false
      },
      {
        id: "ACT-04",
        timeframe: "7 DAYS",
        title: "Evaluate Crop Vigor & Apply Nitrogen Amendment",
        description: "Check for new healthy green shoots; top-dress neem cake + urea blend to restore tillering vigor.",
        category: "Soil/Nutrition",
        completed: false
      }
    ],
    outcomes: [
      {
        id: "OUT-01",
        advisoryId: "ADV-IND-PREV",
        timestamp: "2026-08-10",
        farmerHelpfulRating: "Yes",
        cropHealthOutcome: "Recovered",
        observedYieldImpact: "+12% estimated protection vs untreated control plot",
        comments: "AWD water management saved 2 full pump cycles and reduced weed growth.",
        modelRetrainingContribution: true
      }
    ]
  },
  {
    id: "BRA-MT-002",
    name: "Fazenda Esperança Cerrado",
    farmerName: "Mateus Silva",
    country: "Brazil",
    region: "Mato Grosso",
    village: "Sorriso, Cerrado",
    lat: -12.5441,
    lng: -55.7231,
    fieldAreaAcres: 120.0,
    crop: "Soybean",
    variety: "BRS 1003 IPRO (Intacta RR2 PRO)",
    sowingDate: "2026-01-10",
    growthStage: "Grain Filling",
    satellite: {
      id: "SAT-BRA-002",
      timestamp: "2026-08-21T14:15:00Z",
      sensor: "Sentinel-2 (ESA/Copernicus)",
      ndviCurrent: 0.74,
      ndviPrevious: 0.76,
      ndviChangePercent: -2.6,
      ndwiMoistureIndex: 0.42,
      eviEnhancedVegetation: 0.62,
      canopyChlorophyll: 46.8,
      vegetationHealthStatus: "Optimal",
      detectedAnomalies: [
        "Uniform high canopy vigor across 120 acres",
        "Minor moisture depletion in western edge"
      ],
      possibleCauses: [
        {
          cause: "Normal crop maturation transition",
          probability: 0.85,
          evidence: "Expected slight NDVI plateau during pod-fill stage"
        }
      ],
      recommendedAction: "Maintain standard monitoring for Asian Soybean Rust (Phakopsora pachyrhizi) spores coming from southern corridors.",
      uncertaintyScore: 0.08,
      provenance: {
        sourceType: "public_dataset",
        sourceName: "Sentinel-2 Level-2A via EMBRAPA Geospatial Hub",
        lastUpdated: "2026-08-21",
        confidence: 0.95
      }
    },
    weather: {
      id: "WEA-BRA-002",
      timestamp: "2026-08-23T05:00:00Z",
      temperatureC: 32.1,
      feelsLikeC: 34.0,
      humidityPercent: 62,
      windSpeedKmh: 14.5,
      windDirection: "E",
      precipitationMm24h: 0.0,
      precipitationProbability48h: 15,
      uvIndex: 9.8,
      dewPointC: 22.4,
      solarRadiationWm2: 890,
      heatRiskLevel: "Moderate",
      forecast7Days: [
        { day: "Sun", tempMax: 33, tempMin: 22, rainProb: 15, rainMm: 0, condition: "Sunny", icon: "sun" },
        { day: "Mon", tempMax: 34, tempMin: 23, rainProb: 20, rainMm: 2, condition: "Partly Cloudy", icon: "cloud" },
        { day: "Tue", tempMax: 33, tempMin: 23, rainProb: 30, rainMm: 5, condition: "Passing Rain", icon: "rain" },
        { day: "Wed", tempMax: 32, tempMin: 22, rainProb: 40, rainMm: 8, condition: "Scattered Showers", icon: "rain" },
        { day: "Thu", tempMax: 33, tempMin: 22, rainProb: 10, rainMm: 0, condition: "Sunny", icon: "sun" },
        { day: "Fri", tempMax: 34, tempMin: 23, rainProb: 10, rainMm: 0, condition: "Clear", icon: "sun" },
        { day: "Sat", tempMax: 35, tempMin: 24, rainProb: 15, rainMm: 0, condition: "Hot & Clear", icon: "sun" }
      ],
      agriculturalConsequences: [
        {
          domain: "Spray Window",
          headline: "Optimal Spray Window Active",
          operationalAdvice: "Morning wind speeds < 12 km/h and dry canopy ideal for scheduled biological foliar sprays.",
          urgency: "Immediate"
        },
        {
          domain: "Heat Stress",
          headline: "Midday Solar Radiation Peak",
          operationalAdvice: "Ensure pivot irrigation operates in late afternoon to minimize evaporative loss under 34°C peak.",
          urgency: "Within 24h"
        }
      ],
      provenance: {
        sourceType: "simulated_regional",
        sourceName: "INMET Brazil National Meteorological Service / Open-Meteo",
        lastUpdated: "2026-08-23",
        confidence: 0.93
      }
    },
    soil: {
      id: "SOIL-BRA-002",
      timestamp: "2026-08-18T10:00:00Z",
      soilType: "Latossolo Vermelho-Escuro (Oxisol)",
      pH: 5.9,
      nitrogenKgHa: 280,
      phosphorusKgHa: 38,
      potassiumKgHa: 190,
      organicCarbonPercent: 1.45,
      moisturePercent: 32,
      electricalConductivityDsM: 0.31,
      soilHealthScore: 88,
      strengths: [
        "High soil organic carbon (1.45%) from continuous zero-till Brachiaria cover cropping",
        "Active Bradyrhizobium nodulation supplying 85% of plant nitrogen需求",
        "Deep root penetration profile"
      ],
      deficiencies: [
        "Minor Boron and Zinc micro-nutrient depletion"
      ],
      cropSuitabilityScore: 92,
      regenerativeAmendments: [
        {
          name: "Rock Phosphate & Micronutrient Glauconite Blend",
          targetNutrient: "Phosphorus & Potassium replenishment",
          dosagePerAcre: "80 kg/acre",
          applicationMethod: "Broadcaster post-harvest",
          expectedSoilImpact: "Builds long-term soil mineral reserve without acidifying."
        }
      ],
      provenance: {
        sourceType: "public_dataset",
        sourceName: "EMBRAPA Soja Soil Quality Benchmark",
        lastUpdated: "2026-08-18",
        confidence: 0.94
      }
    },
    disease: null,
    riskRadar: {
      diseaseRisk: "LOW",
      waterStress: "LOW",
      heatRisk: "MEDIUM",
      rainfallRisk: "LOW",
      soilRisk: "LOW",
      cropStress: "LOW",
      overallRisk: "LOW",
      mainDrivers: [
        "1. High canopy vigor (NDVI 0.74) and healthy Bradyrhizobium nodulation.",
        "2. Moderate heat peak (34°C) mitigated by adequate soil moisture and deep root zone.",
        "3. Zero-till cover crop residue buffering ground temperature."
      ]
    },
    regenerativeScore: {
      overallScore: 89,
      soilHealth: 88,
      waterEfficiency: 86,
      cropDiversity: 92,
      organicMatter: 94,
      climateResilience: 87,
      topActions: [
        {
          priority: 1,
          title: "Interseed Brachiaria Grass with Safrinha Corn",
          description: "Establish second-crop intercropping to maintain live roots 365 days/year and boost soil organic carbon.",
          expectedScoreGain: 4,
          timeframe: "Next Crop Rotation"
        },
        {
          priority: 2,
          title: "Introduce Multi-Strain Biological Inoculants",
          description: "Combine Azospirillum brasilense with Bradyrhizobium japonicum for co-inoculation benefits.",
          expectedScoreGain: 3,
          timeframe: "Next Sowing"
        }
      ]
    },
    currentAdvisory: {
      id: "ADV-BRA-002",
      timestamp: "2026-08-23T05:10:00Z",
      whatIsHappening: "Your soybean crop is in optimal grain-filling state with strong photosynthetic capacity and negligible disease pressure.",
      whyItMayBeHappening: [
        "Consistent NDVI of 0.74 and NDWI moisture index of 0.42 confirm excellent canopy hydration.",
        "Zero-tillage practice has preserved soil organic carbon at 1.45%, shielding roots from 34°C midday heat peaks."
      ],
      whatYouShouldDo: [
        {
          action: "Schedule center-pivot irrigation between 18:00 and 06:00 to eliminate high-temp evaporative loss.",
          type: "Irrigation Adjustment",
          timeline: "Tonight"
        },
        {
          action: "Deploy spore traps along south perimeter for early detection of airborne Asian Soybean Rust.",
          type: "Cultural Practice",
          timeline: "Within 3 Days"
        }
      ],
      confidence: 94,
      dataSources: [
        {
          name: "Sentinel-2 High-Resolution Surface Reflectance",
          type: "public_dataset",
          evidencePoint: "Uniform NDVI 0.74 across 120 ha with stable biomass"
        },
        {
          name: "EMBRAPA Soybean Phenology Model",
          type: "public_dataset",
          evidencePoint: "R5.2 pod-fill stage requires 6.5 mm/day water availability"
        }
      ]
    },
    timeline: [
      {
        id: "ACT-BRA-01",
        timeframe: "TODAY",
        title: "Night Pivot Irrigation Activation",
        description: "Run pivot cycle during cool hours to supply 8mm water.",
        category: "Water",
        completed: true
      },
      {
        id: "ACT-BRA-02",
        timeframe: "3 DAYS",
        title: "Spore Trap Inspection",
        description: "Examine microscopic slide captures for Phakopsora rust urediniospores.",
        category: "Protection",
        completed: false
      },
      {
        id: "ACT-BRA-03",
        timeframe: "7 DAYS",
        title: "Pre-Harvest Yield Sample Estimation",
        description: "Count pods per plant across 10 random 1-meter transects.",
        category: "Harvest",
        completed: false
      }
    ],
    outcomes: []
  },
  {
    id: "CHN-HLJ-003",
    name: "Sanjiang Plain Demonstration Farm",
    farmerName: "Zhang Wei",
    country: "China",
    region: "Heilongjiang",
    village: "Jiamusi, Sanjiang Plain",
    lat: 46.8322,
    lng: 130.3188,
    fieldAreaAcres: 85.0,
    crop: "Maize",
    variety: "Longdan 42 (Cold-Resistant Hybrid)",
    sowingDate: "2026-05-02",
    growthStage: "Flowering",
    satellite: {
      id: "SAT-CHN-003",
      timestamp: "2026-08-22T03:45:00Z",
      sensor: "Sentinel-2 (ESA/Copernicus)",
      ndviCurrent: 0.81,
      ndviPrevious: 0.83,
      ndviChangePercent: -2.4,
      ndwiMoistureIndex: 0.39,
      eviEnhancedVegetation: 0.68,
      canopyChlorophyll: 51.2,
      vegetationHealthStatus: "Vigorous",
      detectedAnomalies: [
        "Optimal green canopy development",
        "Minor nitrogen variance in eastern drainage trench"
      ],
      possibleCauses: [],
      recommendedAction: "Maintain tasseling stage moisture management; monitor for Northern Corn Leaf Blight.",
      uncertaintyScore: 0.07,
      provenance: {
        sourceType: "public_dataset",
        sourceName: "CAAS National Agro-Geospatial Observatory",
        lastUpdated: "2026-08-22",
        confidence: 0.96
      }
    },
    weather: {
      id: "WEA-CHN-003",
      timestamp: "2026-08-23T05:00:00Z",
      temperatureC: 24.6,
      feelsLikeC: 25.1,
      humidityPercent: 71,
      windSpeedKmh: 11.0,
      windDirection: "NE",
      precipitationMm24h: 0.0,
      precipitationProbability48h: 30,
      uvIndex: 6.4,
      dewPointC: 18.2,
      solarRadiationWm2: 740,
      heatRiskLevel: "Low",
      forecast7Days: [
        { day: "Sun", tempMax: 26, tempMin: 16, rainProb: 30, rainMm: 3, condition: "Partly Cloudy", icon: "cloud" },
        { day: "Mon", tempMax: 25, tempMin: 15, rainProb: 40, rainMm: 6, condition: "Showers", icon: "rain" },
        { day: "Tue", tempMax: 27, tempMin: 16, rainProb: 20, rainMm: 0, condition: "Sunny", icon: "sun" },
        { day: "Wed", tempMax: 28, tempMin: 17, rainProb: 15, rainMm: 0, condition: "Clear", icon: "sun" },
        { day: "Thu", tempMax: 26, tempMin: 15, rainProb: 25, rainMm: 1, condition: "Passing Clouds", icon: "cloud" },
        { day: "Fri", tempMax: 25, tempMin: 14, rainProb: 10, rainMm: 0, condition: "Sunny", icon: "sun" },
        { day: "Sat", tempMax: 24, tempMin: 13, rainProb: 15, rainMm: 0, condition: "Clear & Crisp", icon: "sun" }
      ],
      agriculturalConsequences: [
        {
          domain: "Field Operations",
          headline: "Ideal Tasseling Temperature Regime",
          operationalAdvice: "Temperatures 24-28°C are ideal for pollen viability. Ensure uninterrupted soil moisture during silking.",
          urgency: "Advisory"
        }
      ],
      provenance: {
        sourceType: "live_api",
        sourceName: "CMA / Open-Meteo Agro-Climate Feeds",
        lastUpdated: "2026-08-23",
        confidence: 0.95
      }
    },
    soil: {
      id: "SOIL-CHN-003",
      timestamp: "2026-08-19T09:00:00Z",
      soilType: "Black Earth (Mollisol / Chernozem)",
      pH: 6.8,
      nitrogenKgHa: 340,
      phosphorusKgHa: 48,
      potassiumKgHa: 290,
      organicCarbonPercent: 2.85,
      moisturePercent: 36,
      electricalConductivityDsM: 0.28,
      soilHealthScore: 94,
      strengths: [
        "Exceptional natural organic carbon (2.85%) in top 30cm",
        "Near-neutral pH (6.8) ensures maximum macro/micronutrient bioavailability",
        "Superb water holding capacity"
      ],
      deficiencies: [],
      cropSuitabilityScore: 96,
      regenerativeAmendments: [
        {
          name: "Biochar-Stubble Recycled Pelletized Compost",
          targetNutrient: "Long-term carbon lock & microbial biodiversity",
          dosagePerAcre: "100 kg/acre",
          applicationMethod: "Pre-winter banding",
          expectedSoilImpact: "Prevents organic matter mineralization during spring freeze-thaw cycles."
        }
      ],
      provenance: {
        sourceType: "public_dataset",
        sourceName: "Chinese Academy of Agricultural Sciences (CAAS) Mollisol Observatory",
        lastUpdated: "2026-08-19",
        confidence: 0.96
      }
    },
    disease: null,
    riskRadar: {
      diseaseRisk: "LOW",
      waterStress: "LOW",
      heatRisk: "LOW",
      rainfallRisk: "LOW",
      soilRisk: "LOW",
      cropStress: "LOW",
      overallRisk: "LOW",
      mainDrivers: [
        "1. Robust Black Soil fertility with 2.85% organic carbon.",
        "2. Optimal vegetative index (NDVI 0.81) during crucial flowering window.",
        "3. Moderate temperatures (24-27°C) with low pest pressure."
      ]
    },
    regenerativeScore: {
      overallScore: 92,
      soilHealth: 94,
      waterEfficiency: 90,
      cropDiversity: 88,
      organicMatter: 96,
      climateResilience: 91,
      topActions: [
        {
          priority: 1,
          title: "Full Stubble Return with Deep Loosening",
          description: "Macerate and incorporate 100% maize stalks back into topsoil to buffer winter soil freeze.",
          expectedScoreGain: 3,
          timeframe: "Autumn Harvest"
        }
      ]
    },
    currentAdvisory: {
      id: "ADV-CHN-003",
      timestamp: "2026-08-23T05:00:00Z",
      whatIsHappening: "Your maize crop is entering peak flowering with maximum photosynthetic biomass and zero acute stress.",
      whyItMayBeHappening: [
        "NDVI of 0.81 reflects dense, healthy leaf chlorophyll distribution.",
        "Black Soil Mollisol delivers balanced NPK without synthetic overload."
      ],
      whatYouShouldDo: [
        {
          action: "Maintain uniform soil moisture between 32-38% during silking for optimal kernel set.",
          type: "Irrigation Adjustment",
          timeline: "Next 48 Hours"
        }
      ],
      confidence: 96,
      dataSources: [
        {
          name: "Sentinel-2 Spectral Canopy Engine",
          type: "public_dataset",
          evidencePoint: "Canopy Chlorophyll 51.2 mg/m2 indicates top-tier photosynthetic efficiency"
        }
      ]
    },
    timeline: [
      {
        id: "ACT-CHN-01",
        timeframe: "TODAY",
        title: "Silking & Tassel Synchronization Audit",
        description: "Audit silk emergence rate across 5 representative field plots.",
        category: "Inspection",
        completed: true
      },
      {
        id: "ACT-CHN-02",
        timeframe: "7 DAYS",
        title: "Kernel Blister Stage Inspection",
        description: "Check ear tip filling and inspect for any early European Corn Borer boring holes.",
        category: "Inspection",
        completed: false
      }
    ],
    outcomes: []
  }
];

export const RAG_DOCUMENTS: RagDocument[] = [
  {
    id: "RAG-ICAR-001",
    title: "Integrated Management of Rice Blast Disease (Magnaporthe oryzae) in Tropical Agro-Ecosystems",
    publication: "ICAR Technical Bulletin on Rice Health",
    organization: "Indian Council of Agricultural Research (ICAR)",
    country: "India",
    region: "Karnataka & Southern Plateau",
    crop: "Rice",
    agriculturalDomain: "Plant Pathology",
    date: "2025-11-14",
    doiOrUrl: "https://icar.gov.in/bulletins/rice-blast-2025",
    summary: "Comprehensive guidelines on prophylactic and therapeutic management of blast in semi-dwarf rice varieties. Emphasizes threshold humidity (>85%), biocontrol agents (Pseudomonas fluorescens), balanced nitrogen timing, and systemic fungicides (Tricyclazole 75% WP @ 0.6g/L).",
    language: "English / Kannada",
    keyChunks: [
      {
        chunkId: "ICAR-RB-01",
        topic: "Environmental Blast Trigger Thresholds",
        content: "Rice blast conidia germinate optimally when relative humidity exceeds 85% accompanied by leaf wetness duration greater than 8 hours and temperatures between 22°C and 28°C. Excessive basal nitrogen fertilizer application thins the silicified epidermal cell layer of leaves, drastically accelerating fungal penetration.",
        relevanceScore: 0.96
      },
      {
        chunkId: "ICAR-RB-02",
        topic: "Biological Control & Chemical Intervention",
        content: "Prophylactic foliar spray of Pseudomonas fluorescens (talc formulation 10g/L or liquid 10ml/L) creates a protective biological biofilm. If disease severity surpasses the 5% leaf area threshold, apply Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L during morning hours when winds are below 10 km/h.",
        relevanceScore: 0.94
      }
    ]
  },
  {
    id: "RAG-EMBRAPA-002",
    title: "Biological Nitrogen Fixation and Cover Crop Integration in Cerrado Oxisol Soils",
    publication: "EMBRAPA Agricultural Research Communications",
    organization: "Brazilian Agricultural Research Corporation (EMBRAPA)",
    country: "Brazil",
    region: "Mato Grosso",
    crop: "Soybean & Maize",
    agriculturalDomain: "Soil Science & Regenerative",
    date: "2025-08-20",
    doiOrUrl: "https://embrapa.br/soja/publicacoes/bnf-cerrado",
    summary: "Studies on replacing chemical nitrogen with co-inoculation of Bradyrhizobium and Azospirillum in tropical savanna soils. Highlights organic carbon preservation through year-round Brachiaria cover cropping and zero tillage.",
    language: "Portuguese / English",
    keyChunks: [
      {
        chunkId: "EMB-BNF-01",
        topic: "Co-Inoculation Synergy",
        content: "Co-inoculation of soybean seeds with Bradyrhizobium japonicum and Azospirillum brasilense stimulates enhanced root hair branching and nodulation density, providing 100% of required plant nitrogen while saving over $110/hectare in synthetic nitrogenous fertilizers.",
        relevanceScore: 0.95
      },
      {
        chunkId: "EMB-BNF-02",
        topic: "Soil Thermal Regulation via Surface Mulch",
        content: "Maintaining a thick blanket of Brachiaria ruziziensis straw (6-8 tons/ha dry matter) on tropical Oxisols reduces topsoil temperatures by up to 8.5°C during midday solar peaks, protecting critical rhizobial bacteria from thermal degradation.",
        relevanceScore: 0.92
      }
    ]
  },
  {
    id: "RAG-CAAS-003",
    title: "Alternate Wetting and Drying (AWD) Water Management for High-Yield Cold-Climate Paddy",
    publication: "Chinese Journal of Rice Science",
    organization: "Chinese Academy of Agricultural Sciences (CAAS)",
    country: "China",
    region: "Heilongjiang & Sanjiang Basin",
    crop: "Rice",
    agriculturalDomain: "Water Management",
    date: "2025-06-18",
    doiOrUrl: "https://caas.cn/research/paddy-awd-2025",
    summary: "Detailed field protocol for water saving in irrigated rice. Demonstrates a 24-32% reduction in water withdrawal and a 35% reduction in field methane (CH4) emissions without compromising grain yield.",
    language: "Chinese / English",
    keyChunks: [
      {
        chunkId: "CAAS-AWD-01",
        topic: "Field Water Tube Installation & Thresholds",
        content: "Install perforated PVC field water tubes (20cm diameter, 30cm length with bottom 20cm perforated) in the field. Re-flood the paddy to a depth of 5cm only when the internal water level recedes to 15cm below the soil surface. Maintain continuous shallow flooding only during the 1-week flowering period.",
        relevanceScore: 0.97
      },
      {
        chunkId: "CAAS-AWD-02",
        topic: "Soil Aeration and Root Oxygenation",
        content: "AWD induces cyclic aeration of the paddy rhizosphere, promoting deeper root penetration, oxidizing toxic soil sulfides, and significantly strengthening rice stem culm strength to prevent late-season lodging.",
        relevanceScore: 0.93
      }
    ]
  },
  {
    id: "RAG-ARC-004",
    title: "Climate-Resilient Smallholder Farming: Mulching and Moisture Conservation in Semi-Arid Steppes",
    publication: "Agricultural Research Council Policy & Practice Guide",
    organization: "Agricultural Research Council (ARC South Africa)",
    country: "South Africa",
    region: "Free State & Limpopo",
    crop: "Maize & Sorghum",
    agriculturalDomain: "Climate Adaptation",
    date: "2025-09-02",
    doiOrUrl: "https://arc.agric.za/resilience/moisture-conservation",
    summary: "Strategies for drought mitigation among smallholders. Evaluates residue retention, micro-basin rainwater harvesting, and biochar soil conditioning in semi-arid zones.",
    language: "English / Zulu",
    keyChunks: [
      {
        chunkId: "ARC-DR-01",
        topic: "Residue Retention and Soil Moisture Extension",
        content: "Retention of at least 30% crop residue on the soil surface extends available plant moisture by 12 to 18 days during mid-season dry spells by minimizing evaporative soil moisture loss and mitigating wind erosion.",
        relevanceScore: 0.91
      }
    ]
  }
];

export const REGIONAL_MODELS: RegionalModelCard[] = [
  {
    id: "MOD-IND-01",
    modelName: "PaddyVision-Pathology-ViT",
    contributingCountry: "India",
    organization: "ICAR / KrishiMithra Consortium",
    version: "v1.4.2",
    cropTarget: "Rice (Paddy)",
    taskType: "Disease Computer Vision",
    trainingDataCategory: "48,000 field images of Blast, Bacterial Blight, Brown Spot, Sheath Blight",
    sampleCount: 48200,
    accuracyOrF1: 94.6,
    latencyMs: 120,
    license: "Digital Public Good (MIT)",
    lastUpdated: "2026-07-15",
    parametersCount: "86M (Vision Transformer)",
    interoperabilityEndpoint: "https://api.krishimithra.org/v1/models/ind-paddy-vit"
  },
  {
    id: "MOD-BRA-02",
    modelName: "SoyRust-Cerrado-ResNet",
    contributingCountry: "Brazil",
    organization: "EMBRAPA Soja AI Lab",
    version: "v2.1.0",
    cropTarget: "Soybean",
    taskType: "Disease Computer Vision",
    trainingDataCategory: "62,000 microscopic & foliar images of Asian Rust and Cercospora",
    sampleCount: 62400,
    accuracyOrF1: 96.1,
    latencyMs: 95,
    license: "Open Source (Apache 2.0)",
    lastUpdated: "2026-08-01",
    parametersCount: "44M (ResNet-50-D)",
    interoperabilityEndpoint: "https://agrin.embrapa.br/v2/models/soyrust-resnet"
  },
  {
    id: "MOD-RUS-03",
    modelName: "Chernozem-NDRE-CanopyNet",
    contributingCountry: "Russia",
    organization: "Russian Academy of Sciences (RAS)",
    version: "v1.1.0",
    cropTarget: "Winter Wheat",
    taskType: "Satellite NDVI Forecasting",
    trainingDataCategory: "Multi-temporal Sentinel-2 and Landsat-9 spectral time series across 1.2M hectares",
    sampleCount: 120000,
    accuracyOrF1: 92.8,
    latencyMs: 180,
    license: "Interoperable BRICS AgriN",
    lastUpdated: "2026-06-20",
    parametersCount: "110M (Temporal Transformer)",
    interoperabilityEndpoint: "https://agri-ai.ras.ru/v1/models/wheat-canopynet"
  },
  {
    id: "MOD-CHN-04",
    modelName: "Mollisol-Moisture-Predictor",
    contributingCountry: "China",
    organization: "CAAS Institute of Agricultural Resources",
    version: "v3.0.2",
    cropTarget: "Maize & Rice",
    taskType: "Evapotranspiration Model",
    trainingDataCategory: "Lysimeter and flux-tower soil moisture observations over 12 growing seasons",
    sampleCount: 240000,
    accuracyOrF1: 95.4,
    latencyMs: 70,
    license: "Digital Public Good (MIT)",
    lastUpdated: "2026-07-28",
    parametersCount: "32M (Ensemble GBDT + LSTM)",
    interoperabilityEndpoint: "https://caas-agrin.cn/api/v1/models/soil-moisture"
  },
  {
    id: "MOD-ZAF-05",
    modelName: "Highveld-Drought-Stress-Net",
    contributingCountry: "South Africa",
    organization: "Agricultural Research Council (ARC)",
    version: "v1.2.0",
    cropTarget: "Sorghum & Maize",
    taskType: "Yield Prediction",
    trainingDataCategory: "Semi-arid drought trials and thermal infrared canopy signatures",
    sampleCount: 35000,
    accuracyOrF1: 91.2,
    latencyMs: 110,
    license: "Research Use (CC-BY-4.0)",
    lastUpdated: "2026-05-10",
    parametersCount: "28M (Graph Neural Network)",
    interoperabilityEndpoint: "https://arc-ai.za/v1/models/drought-stress"
  }
];

export const CROSS_REGIONAL_PRACTICES: CrossRegionalPractice[] = [
  {
    id: "PRAC-01",
    title: "Alternate Wetting and Drying (AWD) Water Conservation",
    originCountry: "China",
    applicableToCrop: "Rice (Paddy)",
    climateContext: "Irrigated paddy in humid to sub-humid tropical & temperate floodplains",
    practiceDescription: "Using field water tubes to allow surface water to recede to 15cm below soil surface before re-irrigation.",
    expectedBenefit: "Saves 25-30% canal water, reduces methane greenhouse gas emissions by 35%, and strengthens root anchor strength.",
    scientificEvidence: "Validated by CAAS and IRRI across >1.5M hectares in China and Southeast Asia.",
    testedInRegions: ["Heilongjiang (China)", "Karnataka (India)", "Punjab (India)", "Nile Delta (Egypt)"]
  },
  {
    id: "PRAC-02",
    title: "Biological Nitrogen Fixation & Year-Round Grass Mulch",
    originCountry: "Brazil",
    applicableToCrop: "Soybean, Pulses, Legumes",
    climateContext: "Tropical savannas, red soils, and high-temperature sandy loams",
    practiceDescription: "Co-inoculating seed with dual bacterial strains (Bradyrhizobium + Azospirillum) under zero-tillage Brachiaria straw.",
    expectedBenefit: "Completely replaces synthetic nitrogen fertilizers, reduces soil surface temperature by 8°C, and increases organic carbon.",
    scientificEvidence: "Documented in EMBRAPA 30-year long-term soil quality trials.",
    testedInRegions: ["Mato Grosso (Brazil)", "Deccan Plateau (India)", "Free State (South Africa)"]
  },
  {
    id: "PRAC-03",
    title: "Biochar Soil Conditioning & Stubble Recycling",
    originCountry: "Russia",
    applicableToCrop: "Wheat, Barley, Maize",
    climateContext: "Continental steppes and semi-arid drylands with cold winters",
    practiceDescription: "Pyrolyzing post-harvest crop straw into high-surface-area biochar pellets and deep-banding at 100 kg/acre.",
    expectedBenefit: "Locks carbon in soil for >100 years, enhances cation exchange capacity by 22%, and buffers against soil compaction.",
    scientificEvidence: "Russian Academy of Sciences Agronomy Institute Chernozem Carbon Trial (2021-2025).",
    testedInRegions: ["Krasnodar (Russia)", "Sanjiang (China)", "Madhya Pradesh (India)"]
  }
];

export const AI_OBSERVABILITY_METRICS: AiObservabilityMetrics = {
  ragContextPrecision: 0.948,
  ragContextRecall: 0.916,
  ragFaithfulness: 0.962,
  ragAnswerRelevance: 0.935,
  averageResponseLatencyMs: 184,
  totalAdvisoriesGenerated: 14280,
  feedbackSatisfactionRate: 94.2,
  lowConfidenceThresholdGatingRate: 4.8,
  activeBricsNodesConnected: 8
};
