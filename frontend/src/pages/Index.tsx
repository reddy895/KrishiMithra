import { useState } from "react";
import { 
  Leaf, Sprout, ArrowRight, Sparkles, 
  CloudSun, FlaskConical, Bot, Store, LayoutDashboard
} from "lucide-react";
import { UploadAnalyzer } from "@/components/UploadAnalyzer";
import { CropDashboard } from "@/components/CropDashboard";
import { FertilizerShopsSection } from "@/components/FertilizerShopsSection";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

// Nexus Components
import { NexusHeader } from "@/components/nexus/NexusHeader";
import { FarmIntelligenceCard } from "@/components/nexus/FarmIntelligenceCard";
import { ClimateEngine } from "@/components/nexus/ClimateEngine";
import { SoilRegenerativeEngine } from "@/components/nexus/SoilRegenerativeEngine";
import { AiAgroAdvisor } from "@/components/nexus/AiAgroAdvisor";

// Datasets
import { DEMO_FARMS } from "@/data/nexusData";
import { FarmProfile } from "@/types/nexus";

// Real crop disease example images
import tomatoEarlyBlight from "@/assets/tomato_early_blight.png";
import riceBlast from "@/assets/rice_blast.png";
import potatoLateBlight from "@/assets/potato_late_blight.png";
import cottonLeafCurl from "@/assets/cotton_leaf_curl.png";

const Index = () => {
  const { t } = useTranslation();
  
  // Platform Navigation State
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [currentFarm, setCurrentFarm] = useState<FarmProfile>(DEMO_FARMS[0]);

  // Modal Overlays
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeLibrarySearch, setActiveLibrarySearch] = useState<string>("");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExampleClick = (diseaseName: string) => {
    setActiveLibrarySearch(diseaseName);
    setActiveTab("disease");
    setTimeout(() => scrollToSection("library"), 100);
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Immersive Diagnostic Wizard Overlay */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto transition-colors duration-300">
          <UploadAnalyzer onClose={() => setIsWizardOpen(false)} />
        </div>
      )}

      {/* KrishiMithra Header */}
      <NexusHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScanWizard={() => setIsWizardOpen(true)}
      />

      {/* Hero Section (Rendered on Overview Tab) */}
      {activeTab === "overview" && (
        <section className="relative overflow-hidden bg-gradient-hero py-12 lg:py-16 border-b border-border/30">
          <div className="container max-w-5xl mx-auto text-center space-y-6 px-4">
            {/* Farmer Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Sprout className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-wider">
                {t("hero.badge", "Built for farmers")}
              </span>
            </div>

            {/* Official Emblem Logo */}
            <div className="pt-1">
              <img 
                src="/krishi-mithra-logo.png" 
                alt="Krishi Mithra" 
                className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl shadow-2xl shadow-emerald-600/25 border-2 border-emerald-500/30 object-cover hover:scale-105 transition-transform" 
              />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto text-foreground">
              {t("hero.title", "KRISHIMITHRA")}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent max-w-3xl mx-auto">
              {t("hero.subtitle", "Smart Farming & Crop Care Companion")}
            </p>

            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("hero.desc", "Instant crop disease diagnosis, 7-day weather & spray advice, soil fertilizer guide, and 24/7 AI agricultural assistance in your own language.")}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
              <button
                onClick={() => setIsWizardOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] min-h-[46px] cursor-pointer"
              >
                <Sprout className="w-4 h-4" />
                {t("hero.cta_start", "Diagnose Crop Disease")}
              </button>

              <button
                onClick={() => setActiveTab("weather")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-card hover:bg-muted/80 text-foreground transition-all duration-200 shadow-sm border border-border/50 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] min-h-[46px] cursor-pointer"
              >
                <CloudSun className="w-4 h-4 text-amber-500" />
                {t("hero.cta_weather", "Check Weather & Rain")}
              </button>

              <button
                onClick={() => setActiveTab("soil")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-card hover:bg-muted/80 text-foreground transition-all duration-200 shadow-sm border border-border/50 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] min-h-[46px] cursor-pointer"
              >
                <FlaskConical className="w-4 h-4 text-teal-600" />
                {t("hero.cta_soil", "Check Soil Health")}
              </button>

              <button
                onClick={() => setActiveTab("advisor")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-card hover:bg-muted/80 text-foreground transition-all duration-200 shadow-sm border border-border/50 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] min-h-[46px] cursor-pointer"
              >
                <Bot className="w-4 h-4 text-indigo-600" />
                {t("hero.cta_advisor", "Ask AI Advisor")}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Dynamic Content Container */}
      <div id="nexus-content" className="container max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* TAB 1: OVERVIEW & MY FARM HUB */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            <FarmIntelligenceCard
              farm={currentFarm}
              farmsList={DEMO_FARMS}
              onSelectFarm={setCurrentFarm}
              onNavigateToTab={setActiveTab}
              onOpenScan={() => setIsWizardOpen(true)}
            />
          </div>
        )}

        {/* TAB 2: CROP DOCTOR & DISEASE DIAGNOSIS */}
        {activeTab === "disease" && (
          <div className="space-y-10">
            {/* Quick Diagnostic Callout */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-600/20">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">
                  {t("disease.badge", "Real-Time Plant Pathology")}
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  {t("disease.title", "Detect Crop Diseases from Photo or Symptoms")}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
                  {t("disease.desc", "Upload an infected leaf photo or answer a few quick questions to receive instant diagnosis, treatment, and safe organic remedies.")}
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => setIsWizardOpen(true)}
                className="bg-white text-emerald-800 hover:bg-emerald-50 font-black text-sm px-7 py-6 rounded-2xl shadow-lg shrink-0"
              >
                <Sprout className="w-5 h-5 mr-2 text-emerald-600" />
                {t("disease.launch_wizard", "Launch Diagnosis Wizard")}
              </Button>
            </div>

            {/* Real Crop Disease Examples */}
            <section className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">
                  {t("disease.library_title", "Visual Crop Disease Reference")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t("disease.library_desc", "Select any common crop disease below to explore treatment and prevention guidelines:")}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: t("examples.tomato", "Tomato Early Blight"), img: tomatoEarlyBlight, query: "Early Blight" },
                  { name: t("examples.rice", "Rice Blast"), img: riceBlast, query: "Rice Blast" },
                  { name: t("examples.potato", "Potato Late Blight"), img: potatoLateBlight, query: "Late Blight" },
                  { name: t("examples.cotton", "Cotton Leaf Curl"), img: cottonLeafCurl, query: "Leaf Curl Virus" }
                ].map((ex, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleExampleClick(ex.query)}
                    className="group cursor-pointer rounded-2xl bg-card border border-border/40 hover:border-primary/50 overflow-hidden transition-all duration-200 shadow-sm"
                  >
                    <div className="aspect-video overflow-hidden bg-muted/30">
                      <img
                        src={ex.img}
                        alt={ex.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3.5 flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-1">
                        {ex.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Disease Dashboard */}
            <section id="library">
              <CropDashboard />
            </section>
          </div>
        )}

        {/* TAB 3: WEATHER & IRRIGATION */}
        {activeTab === "weather" && (
          <ClimateEngine
            weather={currentFarm.weather}
            lat={currentFarm.lat}
            lng={currentFarm.lng}
            locationName={`${currentFarm.village}, ${currentFarm.region}`}
          />
        )}

        {/* TAB 4: SOIL & FERTILIZERS */}
        {activeTab === "soil" && (
          <SoilRegenerativeEngine
            soil={currentFarm.soil}
            cropName={currentFarm.crop}
            initialRegenerativeScore={currentFarm.regenerativeScore}
          />
        )}

        {/* TAB 5: AI AGRO-ADVISOR */}
        {activeTab === "advisor" && (
          <AiAgroAdvisor
            farm={currentFarm}
          />
        )}

        {/* TAB 6: FERTILIZER SHOPS LOCATOR */}
        {activeTab === "shops" && (
          <FertilizerShopsSection />
        )}

      </div>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/60 backdrop-blur-md mt-16">
        <div className="container max-w-7xl mx-auto py-8 px-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-foreground">
              {t("hero.title", "KRISHIMITHRA")} • {t("header.tagline", "Smart Agri Assistant for Farmers")}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {t("footer.rights", "KrishiMithra • All rights reserved.")}
            </p>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>{t("footer.made_with", "Engineered for sustainable and prosperous farming")}</span>
            <Leaf className="w-4 h-4 text-primary animate-pulse" />
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
