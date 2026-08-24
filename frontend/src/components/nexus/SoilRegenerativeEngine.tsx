import React, { useState } from "react";
import { SoilObservation, RegenerativeScore } from "@/types/nexus";
import { SoilService } from "@/services/soilService";
import { RegenerativeService } from "@/services/regenerativeService";
import { 
  FlaskConical, Leaf, Sprout, CheckCircle2, 
  Sparkles, ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface Props {
  soil: SoilObservation;
  cropName: string;
  initialRegenerativeScore: RegenerativeScore;
}

export const SoilRegenerativeEngine: React.FC<Props> = ({
  soil,
  cropName,
  initialRegenerativeScore
}) => {
  const { t } = useTranslation();

  // Interactive Soil Inputs
  const [pH, setPH] = useState(soil.pH);
  const [nitrogen, setNitrogen] = useState(soil.nitrogenKgHa);
  const [phosphorus, setPhosphorus] = useState(soil.phosphorusKgHa);
  const [potassium, setPotassium] = useState(soil.potassiumKgHa);
  const [organicCarbon, setOrganicCarbon] = useState(soil.organicCarbonPercent);
  const [moisture, setMoisture] = useState(soil.moisturePercent);
  const [ec, setEc] = useState(soil.electricalConductivityDsM);

  // Recomputed soil evaluation
  const evaluatedSoil = SoilService.evaluateSoilHealth({
    pH,
    nitrogenKgHa: nitrogen,
    phosphorusKgHa: phosphorus,
    potassiumKgHa: potassium,
    organicCarbonPercent: organicCarbon,
    moisturePercent: moisture,
    electricalConductivityDsM: ec,
    soilType: soil.soilType,
    crop: cropName
  });

  // Recomputed regenerative profile
  const evaluatedRegen = RegenerativeService.calculateRegenerativeProfile({
    soilHealthScore: evaluatedSoil.score,
    organicCarbonPercent: organicCarbon,
    irrigationType: "AWD / Drip / Micro",
    cropRotationCount: 2,
    hasCoverCrops: true,
    tillagePractice: "Reduced Tillage",
    cropResidueRetentionPercent: 65,
    agroforestryOrBorderPlanting: true
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                {t("soil.title", "Soil Health & Fertilizer Guide")}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
              {t("soil.subtitle", "Understand your soil nutrients, calculate fertilizers, and improve soil fertility")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] font-bold text-muted-foreground block">
              {t("soil.score_title", "Soil Health Score")}
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {evaluatedRegen.overallScore}<span className="text-xs text-muted-foreground font-normal">/100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Soil Lab Diagnostic vs Organic Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 Cols): Interactive Soil Diagnostic Laboratory */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-primary" />
                  {t("soil.lab_title", "Soil Nutrient Analysis (NPK & pH)")}
                </CardTitle>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold">
                  {evaluatedSoil.score}/100
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <p className="text-muted-foreground text-xs">
                {t("soil.lab_desc", "Adjust values to match your soil health card or test report:")}
              </p>

              {/* pH Slider */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-muted/20 border border-border/30">
                <div className="flex justify-between font-bold text-xs">
                  <span>{t("soil.ph", "Soil pH (Acidity / Alkalinity)")}</span>
                  <span className="font-mono text-primary text-sm font-black">{pH.toFixed(1)}</span>
                </div>
                <Slider min={4.5} max={9.0} step={0.1} value={[pH]} onValueChange={(val) => setPH(val[0])} />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{t("soil.ph_acidic", "Acidic (<6.0)")}</span>
                  <span>{t("soil.ph_neutral", "Neutral (6.5-7.5)")}</span>
                  <span>{t("soil.ph_alkaline", "Alkaline (>7.5)")}</span>
                </div>
              </div>

              {/* Nitrogen (N) Slider */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-muted/20 border border-border/30">
                <div className="flex justify-between font-bold text-xs">
                  <span>{t("soil.nitrogen", "Available Nitrogen (N)")}</span>
                  <span className="font-mono text-primary text-sm font-black">{nitrogen} kg/ha</span>
                </div>
                <Slider min={100} max={500} step={5} value={[nitrogen]} onValueChange={(val) => setNitrogen(val[0])} />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Low (&lt;280)</span>
                  <span>Target: 280-450 kg/ha</span>
                  <span>High (&gt;450)</span>
                </div>
              </div>

              {/* Phosphorus (P) Slider */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-muted/20 border border-border/30">
                <div className="flex justify-between font-bold text-xs">
                  <span>{t("soil.phosphorus", "Available Phosphorus (P)")}</span>
                  <span className="font-mono text-primary text-sm font-black">{phosphorus} kg/ha</span>
                </div>
                <Slider min={5} max={100} step={1} value={[phosphorus]} onValueChange={(val) => setPhosphorus(val[0])} />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Low (&lt;22)</span>
                  <span>Target: 22-55 kg/ha</span>
                  <span>High (&gt;55)</span>
                </div>
              </div>

              {/* Potassium (K) Slider */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-muted/20 border border-border/30">
                <div className="flex justify-between font-bold text-xs">
                  <span>{t("soil.potassium", "Available Potassium (K)")}</span>
                  <span className="font-mono text-primary text-sm font-black">{potassium} kg/ha</span>
                </div>
                <Slider min={50} max={450} step={5} value={[potassium]} onValueChange={(val) => setPotassium(val[0])} />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Low (&lt;140)</span>
                  <span>Target: 140-300 kg/ha</span>
                  <span>High (&gt;300)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (6 Cols): Organic Recommendations */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden h-full flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 border-b border-border/30">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  {t("soil.organic_remedies", "Recommended Organic Amendments")}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="font-bold text-sm text-foreground">Neem Cake & Well-Decomposed Farmyard Manure (FYM)</h4>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Apply 250 kg/acre of neem cake to suppress soil-borne nematodes and gradually supply slow-release nitrogen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <h4 className="font-bold text-sm text-foreground">Bio-Fertilizer Inoculants (Azotobacter + PSB)</h4>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Inoculate with Phosphate Solubilizing Bacteria (PSB) to make fixed soil phosphorus available to crop roots.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <h4 className="font-bold text-sm text-foreground">Jeevamrutha / Liquid Organic Fertilizer</h4>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Apply 200 Liters/acre of prepared Jeevamrutha with irrigation water every 15-20 days to multiply beneficial micro-organisms.
                  </p>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-muted/20 border-t border-border/30 text-xs text-muted-foreground">
              {t("soil.fertilizer_advice", "Balanced nutrient application prevents soil degradation and increases crop yield sustainably.")}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
