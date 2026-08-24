import React from "react";
import { AI_OBSERVABILITY_METRICS, BRICS_NODES } from "@/data/nexusData";
import { 
  BarChart3, Activity, ShieldCheck, Cpu, Globe, 
  Layers, AlertTriangle, CheckCircle2, TrendingUp, 
  MapPin, Radio, Sparkles
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataHonestyBadge } from "./DataHonestyBadge";

export const AdminDashboard: React.FC = () => {
  const metrics = AI_OBSERVABILITY_METRICS;

  const regionalHealthStatus = [
    { country: "India", region: "Karnataka", crop: "Rice", health: "82% Vigor", risk: "Medium (Blast Risk)", monitoredFarms: 3420 },
    { country: "Brazil", region: "Mato Grosso", crop: "Soybean", health: "94% Vigor", risk: "Low", monitoredFarms: 4890 },
    { country: "Russia", region: "Krasnodar", crop: "Winter Wheat", health: "88% Vigor", risk: "Low", monitoredFarms: 2150 },
    { country: "China", region: "Heilongjiang", crop: "Maize", health: "96% Vigor", risk: "Low", monitoredFarms: 3820 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Research & Agricultural Intelligence Dashboard
              </h2>
              <DataHonestyBadge sourceType="simulated_regional" sourceName="BRICS AgriN Global Observability Feeds" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Aggregated regional crop health, disease outbreak telemetry & AI model observability metrics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-xs">
            14,280 Farms Monitored
          </Badge>
        </div>
      </div>

      {/* Observability Telemetry Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            AI RAG Observability & Safety Evaluation Pipeline
          </h3>
          <span className="text-xs text-muted-foreground">Automated Ragas / TruLens benchmark suite</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* RAG Context Precision */}
          <Card className="border-border/50 shadow-sm p-3.5 space-y-1">
            <span className="text-xs text-muted-foreground font-semibold">Context Precision</span>
            <p className="text-2xl font-black text-foreground">{(metrics.ragContextPrecision * 100).toFixed(1)}%</p>
            <p className="text-[11px] text-emerald-500 font-medium">Relevance of retrieved chunks</p>
          </Card>

          {/* RAG Context Recall */}
          <Card className="border-border/50 shadow-sm p-3.5 space-y-1">
            <span className="text-xs text-muted-foreground font-semibold">Context Recall</span>
            <p className="text-2xl font-black text-foreground">{(metrics.ragContextRecall * 100).toFixed(1)}%</p>
            <p className="text-[11px] text-emerald-500 font-medium">Domain coverage</p>
          </Card>

          {/* Faithfulness */}
          <Card className="border-border/50 shadow-sm p-3.5 space-y-1">
            <span className="text-xs text-muted-foreground font-semibold">Faithfulness (Zero Hallucination)</span>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{(metrics.ragFaithfulness * 100).toFixed(1)}%</p>
            <p className="text-[11px] text-muted-foreground">Strict citation verification</p>
          </Card>

          {/* Answer Relevance */}
          <Card className="border-border/50 shadow-sm p-3.5 space-y-1">
            <span className="text-xs text-muted-foreground font-semibold">Answer Relevance</span>
            <p className="text-2xl font-black text-foreground">{(metrics.ragAnswerRelevance * 100).toFixed(1)}%</p>
            <p className="text-[11px] text-muted-foreground">Alignment with farmer query</p>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="border-border/50 shadow-sm p-3 text-xs space-y-0.5">
            <span className="text-muted-foreground">Avg Response Latency:</span>
            <p className="text-base font-bold text-foreground font-mono">{metrics.averageResponseLatencyMs} ms</p>
          </Card>
          <Card className="border-border/50 shadow-sm p-3 text-xs space-y-0.5">
            <span className="text-muted-foreground">Farmer Satisfaction:</span>
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">{metrics.feedbackSatisfactionRate}%</p>
          </Card>
          <Card className="border-border/50 shadow-sm p-3 text-xs space-y-0.5">
            <span className="text-muted-foreground">Low-Confidence Safe Gating:</span>
            <p className="text-base font-bold text-amber-500">{metrics.lowConfidenceThresholdGatingRate}%</p>
          </Card>
          <Card className="border-border/50 shadow-sm p-3 text-xs space-y-0.5">
            <span className="text-muted-foreground">Connected BRICS Nodes:</span>
            <p className="text-base font-bold text-primary">{metrics.activeBricsNodesConnected} Nodes Live</p>
          </Card>
        </div>
      </div>

      {/* Regional Crop Health & Hotspots Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          Participating Regional Agriculture Health Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {regionalHealthStatus.map((stat, i) => (
            <Card key={i} className="border-border/50 shadow-sm p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{stat.country}</span>
                <Badge variant="outline" className="text-[10px]">{stat.region}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Crop: <strong className="text-foreground">{stat.crop}</strong></p>
                <p>Health: <strong className="text-emerald-600 dark:text-emerald-400">{stat.health}</strong></p>
                <p>Status: <strong className="text-amber-600 dark:text-amber-400">{stat.risk}</strong></p>
              </div>
              <div className="pt-2 border-t border-border/20 text-[11px] text-muted-foreground font-mono">
                {stat.monitoredFarms.toLocaleString()} farms monitored
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
