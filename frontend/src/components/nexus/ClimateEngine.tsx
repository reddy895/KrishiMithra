import React, { useState } from "react";
import { WeatherObservation } from "@/types/nexus";
import { WeatherService } from "@/services/weatherService";
import { 
  CloudSun, Droplets, Wind, Thermometer, Sun, Umbrella, 
  RefreshCw, Sparkles, CheckCircle2, Clock, Zap
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface Props {
  weather: WeatherObservation;
  lat: number;
  lng: number;
  locationName: string;
}

export const ClimateEngine: React.FC<Props> = ({ weather: initialWeather, lat, lng, locationName }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherObservation>(initialWeather);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshLive = async () => {
    setIsRefreshing(true);
    toast.info("Fetching real-time weather information...");
    try {
      const live = await WeatherService.fetchLiveAgroWeather(lat, lng, weather);
      setWeather(live);
      toast.success("Weather data updated successfully.");
    } catch (err) {
      toast.error("Could not fetch live weather; fallback data retained.");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                {t("weather.title", "Weather Forecast & Spray Advisory")}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
              {locationName} • {t("weather.subtitle", "Practical weather insights and spray suitability for your farm")}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleRefreshLive}
          disabled={isRefreshing}
          className="gap-1.5 text-xs font-bold h-9 rounded-xl shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>{t("weather.refresh", "Refresh Live Weather")}</span>
        </Button>
      </div>

      {/* Main Meteorological Sensors Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Temperature */}
        <Card className="border-border/50 shadow-sm p-3.5 space-y-1 rounded-2xl">
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-red-500" />
            {t("weather.temp", "Temperature")}
          </span>
          <p className="text-2xl font-black text-foreground">{weather.temperatureC}°C</p>
          <p className="text-[11px] text-muted-foreground">{t("weather.feels_like", "Feels like")} {weather.feelsLikeC}°C</p>
        </Card>

        {/* Humidity */}
        <Card className="border-border/50 shadow-sm p-3.5 space-y-1 rounded-2xl">
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            {t("weather.humidity", "Relative Humidity")}
          </span>
          <p className="text-2xl font-black text-foreground">{weather.humidityPercent}%</p>
          <p className="text-[11px] text-muted-foreground">{t("weather.dew_point", "Dew Point")}: {weather.dewPointC}°C</p>
        </Card>

        {/* 48h Rain Probability */}
        <Card className="border-border/50 shadow-sm p-3.5 space-y-1 rounded-2xl">
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <Umbrella className="w-3.5 h-3.5 text-indigo-500" />
            {t("weather.rain_prob", "Rain Prob. (48h)")}
          </span>
          <p className="text-2xl font-black text-foreground">{weather.precipitationProbability48h}%</p>
          <p className="text-[11px] text-muted-foreground">{t("weather.rain_24h", "24h Rain")}: {weather.precipitationMm24h} mm</p>
        </Card>

        {/* Wind Speed */}
        <Card className="border-border/50 shadow-sm p-3.5 space-y-1 rounded-2xl">
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <Wind className="w-3.5 h-3.5 text-teal-500" />
            {t("weather.wind", "Wind Speed")}
          </span>
          <p className="text-2xl font-black text-foreground">{weather.windSpeedKmh} <span className="text-xs font-normal">km/h</span></p>
          <p className="text-[11px] text-muted-foreground">{weather.windDirection}</p>
        </Card>

        {/* Solar Radiation */}
        <Card className="border-border/50 shadow-sm p-3.5 space-y-1 rounded-2xl">
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            {t("weather.solar", "Solar Radiation")}
          </span>
          <p className="text-2xl font-black text-foreground">{weather.solarRadiationWm2} <span className="text-xs font-normal">W/m²</span></p>
          <p className="text-[11px] text-muted-foreground">UV Index: {weather.uvIndex}</p>
        </Card>

        {/* Heat Risk */}
        <Card className="border-border/50 shadow-sm p-3.5 space-y-1 rounded-2xl">
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-orange-500" />
            {t("weather.heat_risk", "Heat Risk Level")}
          </span>
          <p className={`text-xl font-black ${
            weather.heatRiskLevel === "Extreme" ? "text-red-500" : weather.heatRiskLevel === "Severe" ? "text-orange-500" : "text-emerald-500"
          }`}>
            {weather.heatRiskLevel}
          </p>
          <p className="text-[11px] text-muted-foreground">{t("overview.status_safe", "Safe Condition")}</p>
        </Card>
      </div>

      {/* Practical Farming Advice based on Weather */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {t("weather.advice_title", "Practical Farming Advice for Today")}
            </h3>
            <p className="text-xs text-muted-foreground">
              Direct recommendations on irrigation, pesticide spraying, and crop protection:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weather.agriculturalConsequences.map((cons, idx) => (
            <Card key={idx} className="border-border/50 shadow-sm overflow-hidden rounded-2xl flex flex-col justify-between">
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-bold uppercase bg-muted/30">
                    {cons.domain}
                  </Badge>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    cons.urgency === "Immediate"
                      ? "bg-red-500/20 text-red-600 dark:text-red-400"
                      : cons.urgency === "Within 24h"
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                      : "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                  }`}>
                    {cons.urgency}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground leading-snug">{cons.headline}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{cons.operationalAdvice}</p>
              </div>
              <div className="p-2.5 bg-muted/20 border-t border-border/20 text-[11px] text-muted-foreground flex items-center gap-1.5 px-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>{t("weather.safe_to_spray", "Safe Spray Window & Weather Advisory")}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 7-Day Agricultural Forecast Bar */}
      <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/30">
          <CardTitle className="text-sm font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {t("weather.forecast_title", "7-Day Farm Weather Forecast")}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center">
            {weather.forecast7Days.map((day, i) => (
              <div key={i} className="p-3 rounded-2xl bg-muted/20 border border-border/30 space-y-1.5 hover:bg-muted/40 transition-colors">
                <span className="text-xs font-bold text-foreground block">{day.day}</span>
                <span className="text-lg font-black text-foreground block">{day.tempMax}° / {day.tempMin}°</span>
                <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                  <Umbrella className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-semibold">{day.rainProb}%</span>
                </div>
                <Badge variant="outline" className="text-[10px] truncate max-w-full font-semibold">
                  {day.condition}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
