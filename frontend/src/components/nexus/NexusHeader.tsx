import React from "react";
import { 
  Sprout, CloudSun, FlaskConical, Bot, 
  MapPin, Store, LayoutDashboard
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenScanWizard: () => void;
}

export const NexusHeader: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  onOpenScanWizard
}) => {
  const { t } = useTranslation();

  const navItems = [
    { id: "overview", label: t("nav.overview", "Farm Overview"), icon: LayoutDashboard },
    { id: "disease", label: t("nav.disease", "Crop Doctor"), icon: Sprout },
    { id: "weather", label: t("nav.weather", "Weather & Rain"), icon: CloudSun },
    { id: "soil", label: t("nav.soil", "Soil & Fertilizer"), icon: FlaskConical },
    { id: "advisor", label: t("nav.advisor", "AI Agri-Advisor"), icon: Bot },
    { id: "shops", label: t("nav.shops", "Fertilizer Shops"), icon: Store }
  ];

  return (
    <header className="border-b border-border/40 bg-background/85 backdrop-blur-xl sticky top-0 z-40 transition-colors shadow-xs">
      {/* Main Header Bar */}
      <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab("overview")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/krishi-mithra-logo.png" 
            alt="Krishi Mithra Logo" 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform shrink-0 border border-emerald-500/20 bg-card" 
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-foreground bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                {t("hero.title", "KRISHIMITHRA")}
              </span>
              <Badge variant="outline" className="hidden xs:inline-flex text-[10px] font-bold py-0 h-4 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                {t("header.badge", "Farmer First AI")}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium line-clamp-1">
              {t("header.tagline", "Smart Agri Assistant for Farmers")}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Disease Scan Button */}
          <Button
            size="sm"
            onClick={onOpenScanWizard}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 h-9 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <Sprout className="w-4 h-4 text-emerald-100" />
            <span className="hidden sm:inline">{t("header.scan_btn", "Scan Crop Disease")}</span>
            <span className="sm:hidden">{t("nav.scan", "Scan")}</span>
          </Button>

          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>

      {/* Horizontal Sub-Navigation Tab Bar */}
      <div className="border-t border-border/30 bg-card/40 px-4 overflow-x-auto scrollbar-none">
        <div className="container max-w-7xl mx-auto flex items-center gap-1.5 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-2 ring-primary/40 font-extrabold scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
