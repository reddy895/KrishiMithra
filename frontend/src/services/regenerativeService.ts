import { RegenerativeScore } from "@/types/nexus";

export class RegenerativeService {
  /**
   * Calculates 5-factor Regenerative Farm Score and top 3 prioritized improvements
   */
  static calculateRegenerativeProfile(params: {
    soilHealthScore: number;
    organicCarbonPercent: number;
    irrigationType: "AWD / Drip / Micro" | "Flood / Canal" | "Rainfed / Moisture Retentive";
    cropRotationCount: number;
    hasCoverCrops: boolean;
    tillagePractice: "Zero-Till / Conservation" | "Reduced Tillage" | "Conventional Deep Tillage";
    cropResidueRetentionPercent: number;
    agroforestryOrBorderPlanting: boolean;
  }): RegenerativeScore {
    const {
      soilHealthScore,
      organicCarbonPercent,
      irrigationType,
      cropRotationCount,
      hasCoverCrops,
      tillagePractice,
      cropResidueRetentionPercent,
      agroforestryOrBorderPlanting
    } = params;

    // 1. Soil Health Factor (0-100)
    const soilHealth = Math.min(100, Math.round(soilHealthScore));

    // 2. Water Efficiency Factor (0-100)
    let waterEfficiency = 65;
    if (irrigationType === "AWD / Drip / Micro") waterEfficiency = 92;
    else if (irrigationType === "Rainfed / Moisture Retentive") waterEfficiency = 80;
    else waterEfficiency = 55;

    // 3. Crop Diversity & Rotation (0-100)
    let cropDiversity = Math.min(100, 50 + cropRotationCount * 15 + (hasCoverCrops ? 20 : 0));

    // 4. Organic Matter & Carbon Sequestration (0-100)
    let organicMatter = Math.min(100, Math.round((organicCarbonPercent / 1.5) * 60 + (cropResidueRetentionPercent / 100) * 40));

    // 5. Climate Resilience (0-100)
    let climateResilience = 60;
    if (tillagePractice === "Zero-Till / Conservation") climateResilience += 22;
    else if (tillagePractice === "Reduced Tillage") climateResilience += 12;
    if (agroforestryOrBorderPlanting) climateResilience += 15;
    climateResilience = Math.min(100, climateResilience);

    // Weighted Overall Score
    const overallScore = Math.round(
      soilHealth * 0.25 +
      waterEfficiency * 0.20 +
      cropDiversity * 0.20 +
      organicMatter * 0.20 +
      climateResilience * 0.15
    );

    // Generate Top 3 Actions
    const topActions: RegenerativeScore["topActions"] = [];

    if (irrigationType === "Flood / Canal") {
      topActions.push({
        priority: 1,
        title: "Adopt Alternate Wetting & Drying (AWD) or Drip Scheduling",
        description: "Transition from continuous inundation to intermittent wetting using field tubes, conserving up to 30% water and mitigating anaerobic methane release.",
        expectedScoreGain: 8,
        timeframe: "Next 7 Days"
      });
    }

    if (!hasCoverCrops || cropRotationCount < 2) {
      topActions.push({
        priority: topActions.length + 1,
        title: "Introduce Leguminous Nitrogen-Fixing Cover Crops",
        description: "Sow Sesbania (Daincha), Sunnhemp, or Mucuna between main seasons to naturally fix atmospheric nitrogen and suppress weed emergence.",
        expectedScoreGain: 7,
        timeframe: "Pre-Sowing / Post-Harvest"
      });
    }

    if (cropResidueRetentionPercent < 50) {
      topActions.push({
        priority: topActions.length + 1,
        title: "Maintain Surface Stubble & Mulch Retention (>60%)",
        description: "Cease stubble burning; shred and leave crop residue on soil surface to lower soil temperature by 4-8°C and curb evaporation.",
        expectedScoreGain: 6,
        timeframe: "Harvest Transition"
      });
    }

    if (topActions.length < 3 && tillagePractice === "Conventional Deep Tillage") {
      topActions.push({
        priority: topActions.length + 1,
        title: "Transition to Minimum or Zero Tillage",
        description: "Adopt direct seed drilling to protect fungal mycorrhizal networks and preserve soil structural aggregates.",
        expectedScoreGain: 5,
        timeframe: "Next Planting Cycle"
      });
    }

    if (topActions.length < 3) {
      topActions.push({
        priority: topActions.length + 1,
        title: "Apply Microbial Inoculants & Biochar Conditioning",
        description: "Incorporate 150 kg/acre biochar inoculated with compost tea to establish permanent micro-pores for beneficial mycorrhizae.",
        expectedScoreGain: 4,
        timeframe: "Within 30 Days"
      });
    }

    return {
      overallScore,
      soilHealth,
      waterEfficiency,
      cropDiversity,
      organicMatter,
      climateResilience,
      topActions: topActions.slice(0, 3)
    };
  }
}
