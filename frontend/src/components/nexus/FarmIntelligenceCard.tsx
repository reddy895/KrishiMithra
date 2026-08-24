import React from "react";
import { FarmProfile } from "@/types/nexus";
import { 
  MapPin, Sprout, CloudSun, FlaskConical, Bot, 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  CheckCircle2, Droplets, Sun, Store
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Props {
  farm: FarmProfile;
  farmsList: FarmProfile[];
  onSelectFarm: (farm: FarmProfile) => void;
  onNavigateToTab: (tab: string) => void;
  onOpenFeedback?: () => void;
  onOpenScan: () => void;
}

export const FarmIntelligenceCard: React.FC<Props> = ({
  farm,
  farmsList,
  onSelectFarm,
  onNavigateToTab,
  onOpenScan
}) => {
  const { t } = useTranslation();

  const getRiskStatus = (level: "LOW" | "MEDIUM" | "HIGH") => {
    switch (level) {
      case "HIGH":
        return {
          text: t("overview.status_alert", "Action Required"),
          className: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 font-bold"
        };
      case "MEDIUM":
        return {
          text: t("overview.status_attention", "Attention Needed"),
          className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold"
        };
      case "LOW":
      default:
        return {
          text: t("overview.status_safe", "Good / Safe"),
          className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold"
        };
    }
  };

  const riskDimensions = [
    { label: t("overview.risk_disease", "Plant Disease Risk"), level: farm.riskRadar.diseaseRisk, tab: "disease", icon: Sprout },
    { label: t("overview.risk_water", "Water Need"), level: farm.riskRadar.waterStress, tab: "weather", icon: Droplets },
    { label: t("overview.risk_heat", "Heat Stress"), level: farm.riskRadar.heatRisk, tab: "weather", icon: Sun },
    { label: t("overview.risk_soil", "Soil Health"), level: farm.riskRadar.soilRisk, tab: "soil", icon: FlaskConical },
    { label: t("overview.risk_crop", "Crop Vigor"), level: farm.riskRadar.cropStress, tab: "disease", icon: ShieldCheck }
  ];

  return (
    <div className="space-y-6">
      {/* Farm Profile Switcher & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">{farm.name}</h2>
              <Badge variant="outline" className="font-semibold text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                {farm.crop}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground mt-1.5 font-medium">
              <span className="flex items-center gap-1 text-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {farm.village}, {farm.region} ({farm.country})
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{t("overview.growth_stage", "Growth Stage:")} <strong className="text-foreground">{farm.growthStage}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>{t("overview.area_label", "Field Area:")} <strong className="text-foreground">{farm.fieldAreaAcres} {t("overview.acres", "Acres")}</strong></span>
            </div>
          </div>
        </div>

        {/* Farm Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-semibold hidden sm:inline">{t("overview.select_farm", "Select Farm Region:")}</span>
          <div className="flex flex-wrap gap-1.5">
            {farmsList.map((f) => {
              const isSelected = f.id === farm.id;
              return (
                <Button
                  key={f.id}
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => onSelectFarm(f)}
                  className={`h-8.5 text-xs font-bold rounded-xl transition-all ${
                    isSelected 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105 ring-2 ring-primary/40 border-2 border-primary" 
                      : "hover:border-primary/40"
                  }`}
                >
                  {f.country === "India" ? "🇮🇳 " + f.region : f.country === "Brazil" ? "🇧🇷 " + f.region : "🇨🇳 " + f.region}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Big Action Cards for Farmers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Crop Doctor */}
        <div
          onClick={onOpenScan}
          className="group cursor-pointer p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-card to-card border border-emerald-500/30 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-110 transition-transform">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-foreground text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>{t("nav.disease", "Crop Doctor")}</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {t("disease.desc", "Upload a photo of affected leaves to get instant disease diagnosis & organic remedies.")}
            </p>
          </div>
        </div>

        {/* Card 2: Weather & Rain */}
        <div
          onClick={() => onNavigateToTab("weather")}
          className="group cursor-pointer p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-card to-card border border-amber-500/30 hover:border-amber-500 hover:shadow-lg transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-foreground text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
              <span>{t("nav.weather", "Weather & Rain")}</span>
              <ArrowRight className="w-4 h-4 text-amber-500 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {farm.weather.temperatureC}°C • {farm.weather.precipitationProbability48h}% Rain Prob • {t("weather.safe_to_spray", "Safe Spray Window")}
            </p>
          </div>
        </div>

        {/* Card 3: Soil & Fertilizer */}
        <div
          onClick={() => onNavigateToTab("soil")}
          className="group cursor-pointer p-5 rounded-2xl bg-gradient-to-br from-teal-500/10 via-card to-card border border-teal-500/30 hover:border-teal-500 hover:shadow-lg transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-110 transition-transform">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-foreground text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              <span>{t("nav.soil", "Soil & Fertilizer")}</span>
              <ArrowRight className="w-4 h-4 text-teal-600 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              pH {farm.soil.pH} • NPK Balances • Organic Manure & Fertilizer Calculator
            </p>
          </div>
        </div>

        {/* Card 4: AI Agri-Advisor */}
        <div
          onClick={() => onNavigateToTab("advisor")}
          className="group cursor-pointer p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-card to-card border border-indigo-500/30 hover:border-indigo-500 hover:shadow-lg transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-foreground text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
              <span>{t("nav.advisor", "AI Agri-Advisor")}</span>
              <ArrowRight className="w-4 h-4 text-indigo-600 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {t("advisor.subtitle", "Ask any question about crop care, pest management, fertilizer calculation, or market prices")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Status & Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): FARM HEALTH RADAR */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-teal-500" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  {t("overview.radar_title", "Farm Health & Risk Status")}
                </CardTitle>
                <Badge className={getRiskStatus(farm.riskRadar.overallRisk).className}>
                  {getRiskStatus(farm.riskRadar.overallRisk).text}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Risk Dimensions Matrix */}
              <div className="space-y-2">
                {riskDimensions.map((item, idx) => {
                  const status = getRiskStatus(item.level);
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => onNavigateToTab(item.tab)}
                      className="p-3 rounded-2xl border border-border/40 bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-foreground">{item.label}</span>
                      </div>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-lg border ${status.className}`}>
                        {status.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (7 Cols): TODAY'S RECOMMENDED ACTIONS */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden h-full flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 border-b border-border/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    {t("overview.daily_plan_title", "Today's Recommended Farm Actions")}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border-emerald-500/30">
                    3 High Priority Tasks
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">
                      {t("overview.action_1", "Inspect tomato lower leaves for early fungal leaf spots.")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Early detection stops blight from spreading across field rows.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">
                      {t("overview.action_2", "Optimal window for light irrigation before expected dry heat.")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Watering in early morning or evening preserves root zone moisture.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-500/5 border border-teal-500/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">
                      {t("overview.action_3", "Apply organic neem cake or bio-fertilizer to replenish soil Nitrogen.")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Enhances soil organic carbon and strengthens plant pest resistance naturally.
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-muted/20 border-t border-border/30 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground font-medium">
                Need nearby fertilizers or seeds?
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigateToTab("shops")}
                className="text-xs font-bold gap-1.5 rounded-xl h-9"
              >
                <Store className="w-3.5 h-3.5 text-primary" />
                <span>{t("nav.shops", "Fertilizer Shops")}</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
