import { useState } from "react";
import { Search, Leaf, ShieldAlert, HeartPulse, Sparkles, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CROPS } from "@/data/crops";
import { useTranslation } from "react-i18next";

// Import generated assets
import tomatoEarlyBlight from "@/assets/tomato_early_blight.png";
import riceBlast from "@/assets/rice_blast.png";
import potatoLateBlight from "@/assets/potato_late_blight.png";
import cottonLeafCurl from "@/assets/cotton_leaf_curl.png";
import bacterialLeafBlight from "@/assets/bacterial_leaf_blight.png";
import rustWheat from "@/assets/rust_wheat.png";
import powderyMildew from "@/assets/powdery_mildew.png";
import northernLeafBlight from "@/assets/northern_leaf_blight.png";
import fallArmyworm from "@/assets/fall_armyworm.png";
import bollworm from "@/assets/bollworm.png";
import downyMildew from "@/assets/downy_mildew.png";
import appleScab from "@/assets/apple_scab.png";
import fireBlight from "@/assets/fire_blight.png";
import bacterialWilt from "@/assets/bacterial_wilt.png";

// Map crop disease identifier keys (cropId_diseaseName) to custom generated images
const DISEASE_IMAGES: Record<string, string> = {
  "tomato_Early Blight": tomatoEarlyBlight,
  "tomato_Late Blight": potatoLateBlight,
  "tomato_Bacterial Wilt": bacterialWilt,
  "rice_Rice Blast": riceBlast,
  "rice_Bacterial Leaf Blight": bacterialLeafBlight,
  "wheat_Rust (Yellow/Brown)": rustWheat,
  "wheat_Powdery Mildew": powderyMildew,
  "potato_Late Blight": potatoLateBlight,
  "potato_Early Blight": tomatoEarlyBlight,
  "maize_Northern Leaf Blight": northernLeafBlight,
  "maize_Fall Armyworm": fallArmyworm,
  "cotton_Bollworm": bollworm,
  "cotton_Leaf Curl Virus": cottonLeafCurl,
  "grape_Downy Mildew": downyMildew,
  "grape_Powdery Mildew": powderyMildew,
  "apple_Apple Scab": appleScab,
  "apple_Fire Blight": fireBlight,
};

// Map disease names to detailed prevention advice
const DISEASE_PREVENTION: Record<string, string> = {
  "Early Blight": "Remove infected lower leaves; space plants for airflow; rotate crops yearly.",
  "Late Blight": "Avoid overhead watering; spray preventative fungicides before rainy periods; destroy volunteer potatoes.",
  "Bacterial Wilt": "Solarize soil before planting; use disease-free seed; maintain neutral soil pH.",
  "Rice Blast": "Avoid excessive nitrogen; use resistant varieties; maintain proper water levels.",
  "Bacterial Leaf Blight": "Use clean seed; keep field weed-free; spray copper-based treatments.",
  "Rust (Yellow/Brown)": "Plant resistant cultivars; spray propiconazole; destroy infected crop residue.",
  "Powdery Mildew": "Prune for maximum sunlight; apply sulfur dust/spray; avoid overhead irrigation.",
  "Northern Leaf Blight": "Use resistant hybrids; manage residues; rotate crops.",
  "Fall Armyworm": "Deploy pheromone traps; handpick larvae; spray Bt or emamectin benzoate.",
  "Bollworm": "Use Bt seed varieties; monitor for eggs; release Trichogramma parasites.",
  "Leaf Curl Virus": "Control whitefly vector with Imidacloprid 17.8% SL; remove infected plants.",
  "Downy Mildew": "Improve canopy air circulation; spray copper oxychloride; clean fallen leaves.",
  "Apple Scab": "Rake and compost fallen leaves; prune apple tree canopy; apply sulfur sprays in early spring.",
  "Fire Blight": "Prune infected twigs 30cm below visible symptoms; sanitize tools; avoid late season nitrogen.",
};

export const CropDashboard = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [activeCrop, setActiveCrop] = useState<string>("all");

  // Flatten all diseases to support global searching and filtering
  const allDiseases = CROPS.flatMap((crop) =>
    crop.commonDiseases.map((d) => ({
      ...d,
      cropId: crop.id,
      cropName: crop.name,
      image: DISEASE_IMAGES[`${crop.id}_${d.name}`] || null,
      prevention: DISEASE_PREVENTION[d.name] || "Check plants regularly; ensure proper soil nutrition and water hygiene.",
    }))
  );

  // Apply filters
  const filtered = allDiseases.filter((d) => {
    const matchesCrop = activeCrop === "all" || d.cropId === activeCrop;
    const matchesQuery =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.cropName.toLowerCase().includes(query.toLowerCase()) ||
      d.symptoms.toLowerCase().includes(query.toLowerCase());
    return matchesCrop && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("nav.library")}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("library.title")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("library.desc")}</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder={t("library.filter")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 glass-input text-foreground placeholder:text-muted-foreground/40 rounded-xl focus-visible:ring-primary focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {/* Crop Filter Cards */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mb-2 font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter by Crop:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCrop("all")}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 min-h-[40px] flex items-center gap-1.5 ${
              activeCrop === "all"
                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                : "glass-btn hover:border-primary/40"
            }`}
          >
            All Crops
          </button>
          {CROPS.map((c) => {
            const active = c.id === activeCrop;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCrop(c.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 min-h-[40px] flex items-center gap-1.5 ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                    : "glass-btn hover:border-primary/40"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, index) => (
          <Card
            key={`${d.name}-${index}`}
            className="group overflow-hidden glass-card hover:border-primary/40 transition-all duration-300 shadow-md flex flex-col h-full rounded-2xl"
          >
            {/* Disease Image or stylized header */}
            <div className="relative aspect-video w-full bg-muted/30 overflow-hidden flex items-center justify-center border-b border-border/30">
              {d.image ? (
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-6 text-center text-muted-foreground/30">
                  <Leaf className="w-12 h-12 text-primary/40" />
                  <span className="text-xs uppercase tracking-widest">{d.cropName} Detail</span>
                </div>
              )}
              <Badge className="absolute top-3 left-3 bg-muted/40 backdrop-blur-sm border border-border/30 text-foreground rounded-lg px-2 py-0.5">
                {d.cropName}
              </Badge>
            </div>

            {/* Disease Info */}
            <div className="p-5 flex-1 flex flex-col space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {d.name}
                </h3>
              </div>

              {/* Symptoms */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5 text-warning" />
                  <span>{t("library.symptoms")}</span>
                </div>
                <p className="text-sm text-foreground/90 line-clamp-2 leading-relaxed">{d.symptoms}</p>
              </div>

              {/* Treatment */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider">
                  <HeartPulse className="w-3.5 h-3.5 text-primary" />
                  <span>{t("library.treatment")}</span>
                </div>
                <p className="text-sm text-muted-foreground/90 line-clamp-2 leading-relaxed">{d.treatment}</p>
              </div>

              {/* Prevention */}
              <div className="space-y-1 pt-1 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider">
                  <Leaf className="w-3.5 h-3.5 text-primary" />
                  <span>{t("results.prevention")}</span>
                </div>
                <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">{d.prevention}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl">
          <Leaf className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-foreground font-medium">{t("library.no_results", { query })}</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Try filtering by a different crop or adjusting search terms.</p>
        </div>
      )}
    </div>
  );
};