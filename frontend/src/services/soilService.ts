import { SoilObservation } from "@/types/nexus";

export class SoilService {
  /**
   * Calculates comprehensive soil health score (0-100) and diagnostics
   */
  static evaluateSoilHealth(params: {
    pH: number;
    nitrogenKgHa: number;
    phosphorusKgHa: number;
    potassiumKgHa: number;
    organicCarbonPercent: number;
    moisturePercent: number;
    electricalConductivityDsM: number;
    soilType: string;
    crop: string;
  }): {
    score: number;
    strengths: string[];
    deficiencies: string[];
    cropSuitability: number;
    amendments: SoilObservation["regenerativeAmendments"];
  } {
    const { pH, nitrogenKgHa, phosphorusKgHa, potassiumKgHa, organicCarbonPercent, electricalConductivityDsM } = params;

    let totalScore = 0;
    const strengths: string[] = [];
    const deficiencies: string[] = [];
    const amendments: SoilObservation["regenerativeAmendments"] = [];

    // 1. pH Score (Weight: 20 points, ideal 6.0 - 7.5)
    if (pH >= 6.2 && pH <= 7.2) {
      totalScore += 20;
      strengths.push(`Ideal soil pH (${pH}) provides optimal bioavailability of macro and micronutrients.`);
    } else if ((pH >= 5.5 && pH < 6.2) || (pH > 7.2 && pH <= 8.0)) {
      totalScore += 14;
      if (pH < 6.2) deficiencies.push(`Slightly acidic soil (${pH}) may limit phosphorus solubility.`);
      else deficiencies.push(`Slightly alkaline soil (${pH}) may reduce iron/zinc availability.`);
    } else {
      totalScore += 8;
      deficiencies.push(`Sub-optimal soil pH (${pH}) requires corrective buffering.`);
    }

    // 2. Organic Carbon (Weight: 25 points, ideal > 0.8%)
    if (organicCarbonPercent >= 1.2) {
      totalScore += 25;
      strengths.push(`Rich Organic Carbon (${organicCarbonPercent}%) supports thriving microbial biodiversity and moisture retention.`);
    } else if (organicCarbonPercent >= 0.75) {
      totalScore += 20;
      strengths.push(`Adequate Organic Carbon (${organicCarbonPercent}%).`);
    } else if (organicCarbonPercent >= 0.5) {
      totalScore += 13;
      deficiencies.push(`Moderate Organic Carbon (${organicCarbonPercent}% vs recommended >0.75%).`);
      amendments.push({
        name: "Enriched Farmyard Manure / Vermicompost",
        targetNutrient: "Organic Carbon (OC) & Microbial Inoculum",
        dosagePerAcre: "1.5 to 2.0 Tons / Acre",
        applicationMethod: "Broadcast and lightly incorporate prior to intercultural operations",
        expectedSoilImpact: "Raises OC by +0.15% over one crop season, improving crumb structure."
      });
    } else {
      totalScore += 6;
      deficiencies.push(`Severely depleted Organic Carbon (${organicCarbonPercent}%).`);
      amendments.push({
        name: "Biochar + Cow Dung Slurry Compost Blend",
        targetNutrient: "Recalcitrant Carbon & Cation Exchange Capacity",
        dosagePerAcre: "250 kg Biochar + 2 Tons Compost / Acre",
        applicationMethod: "Deep basal incorporation",
        expectedSoilImpact: "Permanently restores microbial micro-habitats and water holding capacity."
      });
    }

    // 3. Nitrogen (N) (Weight: 20 points, ideal 280-450 kg/ha)
    if (nitrogenKgHa >= 280 && nitrogenKgHa <= 450) {
      totalScore += 20;
      strengths.push(`Available Nitrogen (${nitrogenKgHa} kg/ha) is in the optimal growth range.`);
    } else if (nitrogenKgHa < 280) {
      const deficit = 280 - nitrogenKgHa;
      totalScore += Math.max(5, Math.round((nitrogenKgHa / 280) * 18));
      deficiencies.push(`Nitrogen deficient: ${nitrogenKgHa} kg/ha (deficit of ${deficit} kg/ha).`);
      amendments.push({
        name: "Azospirillum / Azotobacter Biofertilizer + Neem-Coated Organic Urea",
        targetNutrient: "Biological & Controlled-Release Nitrogen",
        dosagePerAcre: "4 kg Biofertilizer + 20 kg Neem Cake / Acre",
        applicationMethod: "Split top-dressing mixed with moist organic compost",
        expectedSoilImpact: "Provides slow-release nitrogen without causing vegetative flush or leaf blast susceptibility."
      });
    } else {
      totalScore += 16;
      strengths.push(`High available Nitrogen (${nitrogenKgHa} kg/ha) - monitor to prevent excessive lodging.`);
    }

    // 4. Phosphorus (P) (Weight: 15 points, ideal 22-55 kg/ha)
    if (phosphorusKgHa >= 22 && phosphorusKgHa <= 60) {
      totalScore += 15;
      strengths.push(`Balanced available Phosphorus (${phosphorusKgHa} kg/ha) encourages strong root branching.`);
    } else if (phosphorusKgHa < 22) {
      totalScore += 8;
      deficiencies.push(`Low available Phosphorus (${phosphorusKgHa} kg/ha).`);
      amendments.push({
        name: "Phosphorus Solubilizing Bacteria (PSB) + Rock Phosphate",
        targetNutrient: "Available Phosphate (P2O5)",
        dosagePerAcre: "4 kg PSB + 50 kg Rock Phosphate / Acre",
        applicationMethod: "Basal soil drench or band placement near root zone",
        expectedSoilImpact: "Solubilizes fixed mineral phosphates naturally."
      });
    } else {
      totalScore += 12;
      strengths.push(`High Phosphorus reserve (${phosphorusKgHa} kg/ha).`);
    }

    // 5. Potassium (K) (Weight: 10 points, ideal 140-280 kg/ha)
    if (potassiumKgHa >= 140) {
      totalScore += 10;
      strengths.push(`Good Potassium level (${potassiumKgHa} kg/ha) enhances crop disease resistance and drought tolerance.`);
    } else {
      totalScore += 5;
      deficiencies.push(`Potassium deficit (${potassiumKgHa} kg/ha).`);
      amendments.push({
        name: "Potassium Mobilizing Bio-Consortium (KMB) / MOP",
        targetNutrient: "Potash (K2O)",
        dosagePerAcre: "3 kg KMB / Acre or 20 kg Organic Potash",
        applicationMethod: "Top dress at tillering/flowering",
        expectedSoilImpact: "Strengthens plant cellular walls against fungal penetration."
      });
    }

    // 6. Salinity / EC (Weight: 10 points, ideal < 1.0 dS/m)
    if (electricalConductivityDsM <= 0.8) {
      totalScore += 10;
      strengths.push(`Non-saline, healthy electrical conductivity (${electricalConductivityDsM} dS/m).`);
    } else if (electricalConductivityDsM <= 1.5) {
      totalScore += 6;
      deficiencies.push(`Slight salinity buildup (${electricalConductivityDsM} dS/m).`);
    } else {
      totalScore += 2;
      deficiencies.push(`Elevated soil salinity (${electricalConductivityDsM} dS/m) restricts root water uptake.`);
    }

    const cropSuitability = Math.min(98, Math.max(45, Math.round(totalScore * 0.95 + (pH >= 6.0 && pH <= 7.5 ? 5 : 0))));

    return {
      score: Math.min(100, Math.max(0, totalScore)),
      strengths,
      deficiencies,
      cropSuitability,
      amendments
    };
  }
}
