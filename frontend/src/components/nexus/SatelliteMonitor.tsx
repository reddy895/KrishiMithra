import React, { useState } from "react";
import { SatelliteObservation } from "@/types/nexus";
import { SatelliteService } from "@/services/satelliteService";
import { 
  Satellite, Layers, TrendingDown, TrendingUp, AlertTriangle, 
  HelpCircle, Eye, Info, CheckCircle2, RefreshCw, BarChart2, ShieldCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataHonestyBadge } from "./DataHonestyBadge";

interface Props {
  observation: SatelliteObservation;
  cropName: string;
}

export const SatelliteMonitor: React.FC<Props> = ({ observation, cropName }) => {
  // Interactive Spectral Band Simulation
  const [nirReflectance, setNirReflectance] = useState(0.48);
  const [redReflectance, setRedReflectance] = useState(0.12);
  const [swirReflectance, setSwirReflectance] = useState(0.22);

  const interactiveNdvi = SatelliteService.calculateNdvi(nirReflectance, redReflectance);
  const interactiveNdwi = SatelliteService.calculateNdwi(nirReflectance, swirReflectance);
  const evaluatedStatus = SatelliteService.evaluateVegetationStatus(
    interactiveNdvi,
    observation.ndviPrevious,
    interactiveNdwi,
    cropName
  );

  // Time-series mock passes for the last 5 Sentinel-2 orbital cycles
  const sentinelPasses = [
    { date: "May 15", ndvi: 0.28, stage: "Germination" },
    { date: "Jun 04", ndvi: 0.46, stage: "Vegetative" },
    { date: "Jun 24", ndvi: 0.62, stage: "Tillering" },
    { date: "Jul 14", ndvi: 0.69, stage: "Peak Vigor" },
    { date: "Aug 03", ndvi: 0.67, stage: "Flowering" },
    { date: "Aug 22", ndvi: observation.ndviCurrent, stage: "Current Observation" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Satellite className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Satellite Farm Monitor
              </h2>
              <DataHonestyBadge sourceType={observation.provenance.sourceType} sourceName={observation.provenance.sourceName} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Multispectral analysis via {observation.sensor} • Resolution: 10m Ground Sample Distance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Pass: {new Date(observation.timestamp).toLocaleDateString()}
          </Badge>
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 text-xs font-semibold">
            Uncertainty: ±{(observation.uncertaintyScore * 100).toFixed(0)}%
          </Badge>
        </div>
      </div>

      {/* Main Spectral Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* NDVI */}
        <Card className="border-border/50 shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>NDVI (Vegetation Index)</span>
            <span className="font-mono">Band 8 - Band 4</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{observation.ndviCurrent}</span>
            <span className={`text-xs font-bold flex items-center ${
              observation.ndviChangePercent < 0 ? "text-red-500" : "text-emerald-500"
            }`}>
              {observation.ndviChangePercent < 0 ? <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> : <TrendingUp className="w-3.5 h-3.5 mr-0.5" />}
              {observation.ndviChangePercent}%
            </span>
          </div>
          <div className="w-full bg-muted/40 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                observation.ndviCurrent >= 0.7 ? "bg-emerald-500" : observation.ndviCurrent >= 0.5 ? "bg-amber-500" : "bg-red-500"
              }`} 
              style={{ width: `${Math.max(0, Math.min(100, observation.ndviCurrent * 100))}%` }} 
            />
          </div>
          <p className="text-[11px] text-muted-foreground">Previous: {observation.ndviPrevious}</p>
        </Card>

        {/* NDWI */}
        <Card className="border-border/50 shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>NDWI (Canopy Water Index)</span>
            <span className="font-mono">Band 8 - Band 11</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{observation.ndwiMoistureIndex}</span>
            <span className="text-xs font-semibold text-emerald-500">Adequate</span>
          </div>
          <div className="w-full bg-muted/40 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${Math.max(0, Math.min(100, (observation.ndwiMoistureIndex + 0.2) * 120))}%` }} 
            />
          </div>
          <p className="text-[11px] text-muted-foreground">Hydration state is healthy</p>
        </Card>

        {/* EVI */}
        <Card className="border-border/50 shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>EVI (Enhanced Vegetation)</span>
            <span className="font-mono">Atmospheric Corrected</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{observation.eviEnhancedVegetation}</span>
            <span className="text-xs font-semibold text-muted-foreground">Index</span>
          </div>
          <div className="w-full bg-muted/40 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 rounded-full" 
              style={{ width: `${Math.max(0, Math.min(100, observation.eviEnhancedVegetation * 100))}%` }} 
            />
          </div>
          <p className="text-[11px] text-muted-foreground">Reduces soil background bias</p>
        </Card>

        {/* Canopy Chlorophyll */}
        <Card className="border-border/50 shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Chlorophyll Density</span>
            <span className="font-mono">Red Edge Band 5</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{observation.canopyChlorophyll}</span>
            <span className="text-xs font-bold text-muted-foreground">mg/m²</span>
          </div>
          <div className="w-full bg-muted/40 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 rounded-full" 
              style={{ width: `${Math.max(0, Math.min(100, (observation.canopyChlorophyll / 60) * 100))}%` }} 
            />
          </div>
          <p className="text-[11px] text-muted-foreground">Photosynthetic potential</p>
        </Card>
      </div>

      {/* Structured Change Detection & Root Cause Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 Cols): Change Flow & Possible Cause Probability */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/30">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-amber-500" />
                  Vegetation Change & Anomaly Reasoning
                </span>
                <Badge variant="outline" className="text-xs font-semibold">
                  Status: {observation.vegetationHealthStatus}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Step 1 to 4 Pipeline visualization */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Current Health</span>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{observation.ndviCurrent} NDVI</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Previous Cycle</span>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{observation.ndviPrevious} NDVI</p>
                </div>
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <span className="text-[10px] uppercase font-bold text-red-500">Observed Change</span>
                  <p className="text-sm font-extrabold text-red-600 dark:text-red-400 mt-0.5">{observation.ndviChangePercent}%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Uncertainty</span>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">±{observation.uncertaintyScore * 100}%</p>
                </div>
              </div>

              {/* Detected Anomalies */}
              <div className="space-y-1.5 p-3 rounded-xl bg-muted/30 border border-border/30">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Detected Spectral Anomalies:
                </span>
                <ul className="space-y-1">
                  {observation.detectedAnomalies.map((anom, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="text-primary font-bold">•</span>
                      <span>{anom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Possible Causes Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-foreground">
                  Triangulated Root Cause Analysis (Probabilistic):
                </span>
                <div className="space-y-2">
                  {observation.possibleCauses.map((cause, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-border/40 bg-card space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">{cause.cause}</span>
                        <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-[10px]">
                          {(cause.probability * 100).toFixed(0)}% Probability
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">{cause.evidence}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Recommended by Satellite Engine */}
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-primary">Geospatial Recommendation:</span>
                  <p className="text-xs text-foreground mt-0.5">{observation.recommendedAction}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right (5 Cols): Historical Time Series & Interactive Band Sandbox */}
        <div className="lg:col-span-5 space-y-6">
          {/* Historical Sentinel-2 Passes */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" />
                6-Month NDVI Historical Curve
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">Sentinel-2 (10m)</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentinelPasses.map((pass, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-muted-foreground font-semibold">{pass.date}</span>
                    <span className="text-[11px] text-foreground font-medium">({pass.stage})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted/50 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pass.ndvi * 100}%` }} />
                    </div>
                    <span className="font-mono font-bold text-foreground w-8 text-right">{pass.ndvi}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Interactive Spectral Sandbox */}
          <Card className="border-border/50 shadow-sm bg-muted/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-primary" />
                  Interactive Spectral Band Sandbox
                </span>
                <Badge variant="outline" className="text-[10px]">Live Simulation</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-[11px] text-muted-foreground">
                Adjust raw Sentinel-2 reflectance bands to simulate crop stress scenarios:
              </p>

              {/* NIR Band Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span>Band 8 (Near-Infrared / Cellular Vigor)</span>
                  <span className="font-mono text-primary">{nirReflectance.toFixed(2)}</span>
                </div>
                <Slider
                  min={0.1}
                  max={0.8}
                  step={0.01}
                  value={[nirReflectance]}
                  onValueChange={(val) => setNirReflectance(val[0])}
                />
              </div>

              {/* Red Band Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span>Band 4 (Red / Chlorophyll Absorption)</span>
                  <span className="font-mono text-primary">{redReflectance.toFixed(2)}</span>
                </div>
                <Slider
                  min={0.02}
                  max={0.4}
                  step={0.01}
                  value={[redReflectance]}
                  onValueChange={(val) => setRedReflectance(val[0])}
                />
              </div>

              {/* Computed Live Result */}
              <div className="p-3 rounded-xl bg-card border border-border/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-muted-foreground">Computed Sandbox NDVI:</span>
                  <p className="text-lg font-black text-foreground">{interactiveNdvi}</p>
                </div>
                <Badge className={`text-xs font-bold ${
                  evaluatedStatus.healthStatus === "Vigorous" || evaluatedStatus.healthStatus === "Optimal"
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                }`}>
                  {evaluatedStatus.healthStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
