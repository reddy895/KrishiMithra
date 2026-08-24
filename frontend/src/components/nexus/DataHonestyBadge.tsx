import React from "react";
import { DataSourceType } from "@/types/nexus";
import { Radio, Database, Cpu, TestTube2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  sourceType: DataSourceType;
  sourceName?: string;
  className?: string;
  showTooltip?: boolean;
}

export const DataHonestyBadge: React.FC<Props> = ({
  sourceType,
  sourceName,
  className = "",
  showTooltip = true
}) => {
  const getBadgeConfig = () => {
    switch (sourceType) {
      case "live_api":
        return {
          label: "Live Connected API",
          icon: Radio,
          bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          dot: "bg-emerald-500 animate-pulse",
          desc: sourceName || "Direct verified API feed (Open-Meteo / Live Sensor)"
        };
      case "public_dataset":
        return {
          label: "Public Dataset / Research",
          icon: Database,
          bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
          dot: "bg-blue-500",
          desc: sourceName || "Peer-reviewed scientific dataset (Copernicus / FAO / ICAR / EMBRAPA)"
        };
      case "simulated_regional":
        return {
          label: "Simulated Regional Feed",
          icon: Cpu,
          bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          dot: "bg-amber-500",
          desc: sourceName || "Calibrated regional simulation modeling actual climate zones"
        };
      case "demo_data":
      default:
        return {
          label: "Demo Scenario Data",
          icon: TestTube2,
          bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
          dot: "bg-purple-500",
          desc: sourceName || "Pre-configured illustrative scenario for demonstration and testing"
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const badgeElement = (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm transition-all ${config.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );

  if (!showTooltip) return badgeElement;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help inline-block">{badgeElement}</span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs p-2.5 space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <Info className="w-3.5 h-3.5 text-primary" />
          <span>Data Honesty Protocol</span>
        </div>
        <p className="text-muted-foreground">{config.desc}</p>
      </TooltipContent>
    </Tooltip>
  );
};
