export type DataSourceType = "live_api" | "public_dataset" | "simulated_regional" | "demo_data";

export interface DataProvenance {
  sourceType: DataSourceType;
  sourceName: string;
  datasetOrApiUrl?: string;
  lastUpdated: string;
  confidence: number;
  uncertaintyMargin?: string;
}

export type BricsCountry = 
  | "India"
  | "Brazil"
  | "Russia"
  | "China"
  | "South Africa"
  | "Egypt"
  | "Ethiopia"
  | "UAE"
  | "Iran";

export interface BricsNode {
  id: string;
  country: BricsCountry;
  flag: string;
  region: string;
  status: "active" | "syncing" | "standby";
  agriZone: string;
  primaryCrops: string[];
  connectedAgriNProtocol: string;
  sharedModelsCount: number;
  sharedDatasetsCount: number;
  lat: number;
  lng: number;
  climateProfile: string;
  recentInsight: string;
}

export interface SatelliteObservation {
  id: string;
  timestamp: string;
  sensor: "Sentinel-2 (ESA/Copernicus)" | "Landsat-9 (NASA/USGS)" | "MODIS Terra" | "Simulated Constellation";
  ndviCurrent: number; // -1 to 1 (typically 0.2 to 0.9 for crops)
  ndviPrevious: number;
  ndviChangePercent: number; // e.g. -13%
  ndwiMoistureIndex: number; // -1 to 1 (water content of leaves)
  eviEnhancedVegetation: number;
  canopyChlorophyll: number; // mg/m2
  vegetationHealthStatus: "Optimal" | "Moderate Stress" | "Severe Stress" | "Senescence" | "Vigorous";
  detectedAnomalies: string[];
  possibleCauses: {
    cause: string;
    probability: number;
    evidence: string;
  }[];
  recommendedAction: string;
  uncertaintyScore: number; // 0 to 1
  provenance: DataProvenance;
}

export interface WeatherObservation {
  id: string;
  timestamp: string;
  temperatureC: number;
  feelsLikeC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  precipitationMm24h: number;
  precipitationProbability48h: number; // 0 to 100%
  uvIndex: number;
  dewPointC: number;
  solarRadiationWm2: number;
  heatRiskLevel: "Low" | "Moderate" | "Severe" | "Extreme";
  forecast7Days: {
    day: string;
    tempMax: number;
    tempMin: number;
    rainProb: number;
    rainMm: number;
    condition: string;
    icon: string;
  }[];
  agriculturalConsequences: {
    domain: "Irrigation" | "Spray Window" | "Disease Risk" | "Field Operations" | "Heat Stress";
    headline: string;
    operationalAdvice: string;
    urgency: "Immediate" | "Within 24h" | "Within 3d" | "Advisory";
  }[];
  provenance: DataProvenance;
}

export interface SoilObservation {
  id: string;
  timestamp: string;
  soilType: string;
  pH: number;
  nitrogenKgHa: number; // N
  phosphorusKgHa: number; // P
  potassiumKgHa: number; // K
  organicCarbonPercent: number; // OC %
  moisturePercent: number;
  electricalConductivityDsM: number;
  soilHealthScore: number; // 0 to 100
  strengths: string[];
  deficiencies: string[];
  cropSuitabilityScore: number;
  regenerativeAmendments: {
    name: string;
    targetNutrient: string;
    dosagePerAcre: string;
    applicationMethod: string;
    expectedSoilImpact: string;
  }[];
  provenance: DataProvenance;
}

export interface DiseaseObservation {
  id: string;
  crop: string;
  diseaseName: string;
  isHealthy: boolean;
  confidence: number;
  severity: "none" | "mild" | "moderate" | "severe";
  symptoms: string[];
  detectedOnPart: string;
  causes: string[];
  imageUrl?: string;
  pesticides: {
    name: string;
    dosage: string;
    application: string;
    safety: string;
  }[];
  organicAlternatives: string[];
  prevention: string[];
  lowConfidenceDisclaimer?: string;
  provenance: DataProvenance;
}

export interface FarmRiskRadar {
  diseaseRisk: "LOW" | "MEDIUM" | "HIGH";
  waterStress: "LOW" | "MEDIUM" | "HIGH";
  heatRisk: "LOW" | "MEDIUM" | "HIGH";
  rainfallRisk: "LOW" | "MEDIUM" | "HIGH";
  soilRisk: "LOW" | "MEDIUM" | "HIGH";
  cropStress: "LOW" | "MEDIUM" | "HIGH";
  overallRisk: "LOW" | "MEDIUM" | "HIGH";
  mainDrivers: string[];
}

export interface RegenerativeScore {
  overallScore: number; // 0-100
  soilHealth: number; // 0-100
  waterEfficiency: number; // 0-100
  cropDiversity: number; // 0-100
  organicMatter: number; // 0-100
  climateResilience: number; // 0-100
  topActions: {
    priority: number;
    title: string;
    description: string;
    expectedScoreGain: number;
    timeframe: string;
  }[];
}

export interface EvidenceBasedAdvisory {
  id: string;
  timestamp: string;
  whatIsHappening: string;
  whyItMayBeHappening: string[];
  whatYouShouldDo: {
    action: string;
    type: "Immediate Organic Action" | "Irrigation Adjustment" | "Targeted Biological Treatment" | "Cultural Practice";
    timeline: string;
  }[];
  confidence: number; // percentage e.g. 88
  dataSources: {
    name: string;
    type: DataSourceType;
    evidencePoint: string;
  }[];
}

export interface ActionTimelineItem {
  id: string;
  timeframe: "TODAY" | "24 HOURS" | "3 DAYS" | "7 DAYS";
  title: string;
  description: string;
  category: "Inspection" | "Water" | "Soil/Nutrition" | "Protection" | "Harvest";
  completed: boolean;
}

export interface FarmOutcomeFeedback {
  id: string;
  advisoryId: string;
  timestamp: string;
  farmerHelpfulRating: "Yes" | "Partially" | "No";
  cropHealthOutcome: "Improved Significantly" | "Recovered" | "No Change" | "Deteriorated";
  observedYieldImpact: string;
  comments?: string;
  modelRetrainingContribution: boolean;
}

export interface FarmProfile {
  id: string;
  name: string;
  farmerName: string;
  phone?: string;
  country: BricsCountry;
  region: string;
  village: string;
  lat: number;
  lng: number;
  fieldAreaAcres: number;
  crop: string;
  variety: string;
  sowingDate: string;
  growthStage: "Germination" | "Vegetative" | "Tillering" | "Flowering" | "Grain Filling" | "Harvest";
  satellite: SatelliteObservation;
  weather: WeatherObservation;
  soil: SoilObservation;
  disease: DiseaseObservation | null;
  riskRadar: FarmRiskRadar;
  regenerativeScore: RegenerativeScore;
  currentAdvisory: EvidenceBasedAdvisory;
  timeline: ActionTimelineItem[];
  outcomes: FarmOutcomeFeedback[];
}

export interface RagDocument {
  id: string;
  title: string;
  publication: string;
  organization: string; // e.g. "ICAR (India)", "EMBRAPA (Brazil)", "CAAS (China)", "ARC (South Africa)"
  country: BricsCountry;
  region: string;
  crop: string;
  agriculturalDomain: "Plant Pathology" | "Soil Science & Regenerative" | "Climate Adaptation" | "Water Management" | "Precision Agronomy";
  date: string;
  doiOrUrl: string;
  summary: string;
  keyChunks: {
    chunkId: string;
    topic: string;
    content: string;
    relevanceScore: number;
  }[];
  language: string;
}

export interface RegionalModelCard {
  id: string;
  modelName: string;
  contributingCountry: BricsCountry;
  organization: string;
  version: string;
  cropTarget: string;
  taskType: "Disease Computer Vision" | "Satellite NDVI Forecasting" | "Soil Health Estimator" | "Yield Prediction" | "Evapotranspiration Model";
  trainingDataCategory: string;
  sampleCount: number;
  accuracyOrF1: number;
  latencyMs: number;
  license: "Open Source (Apache 2.0)" | "Digital Public Good (MIT)" | "Research Use (CC-BY-4.0)" | "Interoperable BRICS AgriN";
  lastUpdated: string;
  parametersCount: string;
  interoperabilityEndpoint: string;
}

export interface CrossRegionalPractice {
  id: string;
  title: string;
  originCountry: BricsCountry;
  applicableToCrop: string;
  climateContext: string;
  practiceDescription: string;
  expectedBenefit: string;
  scientificEvidence: string;
  testedInRegions: string[];
}

export interface AiObservabilityMetrics {
  ragContextPrecision: number; // e.g. 0.94
  ragContextRecall: number; // e.g. 0.91
  ragFaithfulness: number; // e.g. 0.96
  ragAnswerRelevance: number; // e.g. 0.93
  averageResponseLatencyMs: number;
  totalAdvisoriesGenerated: number;
  feedbackSatisfactionRate: number; // %
  lowConfidenceThresholdGatingRate: number; // %
  activeBricsNodesConnected: number;
}
