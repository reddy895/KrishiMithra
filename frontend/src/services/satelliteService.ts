import { SatelliteObservation } from "@/types/nexus";

export class SatelliteService {
  /**
   * Calculates NDVI from NIR (Near-Infrared, e.g. Band 8) and Red (Band 4)
   * Formula: (NIR - Red) / (NIR + Red)
   */
  static calculateNdvi(nir: number, red: number): number {
    if (nir + red === 0) return 0;
    const val = (nir - red) / (nir + red);
    return Math.max(-1, Math.min(1, parseFloat(val.toFixed(3))));
  }

  /**
   * Calculates NDWI (Normalized Difference Water Index) from NIR (Band 8) and SWIR (Band 11)
   * Formula: (NIR - SWIR) / (NIR + SWIR)
   */
  static calculateNdwi(nir: number, swir: number): number {
    if (nir + swir === 0) return 0;
    const val = (nir - swir) / (nir + swir);
    return Math.max(-1, Math.min(1, parseFloat(val.toFixed(3))));
  }

  /**
   * Evaluates vegetation health status and potential anomalies from spectral parameters
   */
  static evaluateVegetationStatus(
    currentNdvi: number,
    previousNdvi: number,
    ndwi: number,
    cropType: string
  ): {
    changePercent: number;
    healthStatus: SatelliteObservation["vegetationHealthStatus"];
    anomalies: string[];
    possibleCauses: SatelliteObservation["possibleCauses"];
    recommendedAction: string;
    uncertaintyScore: number;
  } {
    const diff = currentNdvi - previousNdvi;
    const changePercent = previousNdvi !== 0 ? parseFloat(((diff / previousNdvi) * 100).toFixed(1)) : 0;
    const anomalies: string[] = [];
    const possibleCauses: SatelliteObservation["possibleCauses"] = [];

    let healthStatus: SatelliteObservation["vegetationHealthStatus"] = "Optimal";

    if (currentNdvi >= 0.75) {
      healthStatus = "Vigorous";
    } else if (currentNdvi >= 0.60) {
      healthStatus = "Optimal";
    } else if (currentNdvi >= 0.45) {
      healthStatus = "Moderate Stress";
    } else {
      healthStatus = "Severe Stress";
    }

    if (changePercent <= -10) {
      anomalies.push(`Significant NDVI decline of ${Math.abs(changePercent)}% detected over the last observation interval.`);
      
      // Determine probable cause based on NDWI moisture vs dry stress
      if (ndwi < 0.15) {
        possibleCauses.push({
          cause: "Acute Water / Drought Stress",
          probability: 0.72,
          evidence: `NDWI moisture index is critically low (${ndwi}), indicating leaf tissue dehydration.`
        });
      } else {
        possibleCauses.push({
          cause: `Biotic Stress / Foliar Pathogen Outbreak on ${cropType}`,
          probability: 0.81,
          evidence: `NDWI moisture is adequate (${ndwi}), but chlorophyll absorption dropped sharply, indicating leaf tissue lesions or blight.`
        });
        possibleCauses.push({
          cause: "Nutrient Leaching / Nitrogen Deficiency",
          probability: 0.19,
          evidence: "Canopy yellowing without moisture deficit following heavy irrigation or rainfall."
        });
      }
    } else if (changePercent >= 8) {
      anomalies.push(`Canopy vigor expanded by +${changePercent}% showing rapid vegetative biomass accumulation.`);
    } else {
      anomalies.push("Canopy reflectance stable within expected seasonal growth curve.");
    }

    let recommendedAction = "Continue standard vegetative monitoring schedule.";
    if (possibleCauses.length > 0 && possibleCauses[0].cause.includes("Pathogen")) {
      recommendedAction = "Inspect lower and middle crop canopy immediately for foliar spot or blast lesions. Prepare biological bio-fungicide.";
    } else if (possibleCauses.length > 0 && possibleCauses[0].cause.includes("Water")) {
      recommendedAction = "Schedule emergency irrigation or check drip line pressure in depleted zones.";
    }

    const uncertaintyScore = parseFloat((0.08 + Math.abs(currentNdvi - 0.5) * 0.05).toFixed(2));

    return {
      changePercent,
      healthStatus,
      anomalies,
      possibleCauses,
      recommendedAction,
      uncertaintyScore
    };
  }
}
