import React, { useState } from "react";
import { 
  BRICS_NODES, REGIONAL_MODELS, CROSS_REGIONAL_PRACTICES 
} from "@/data/nexusData";
import { BricsNode, RegionalModelCard, CrossRegionalPractice } from "@/types/nexus";
import { 
  Globe2, Cpu, Share2, Layers, ShieldCheck, ArrowRight, 
  ExternalLink, Sparkles, CheckCircle2, Play, RefreshCw, 
  Database, Network, BookOpen
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DataHonestyBadge } from "./DataHonestyBadge";

export const BricsNetwork: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<BricsNode>(BRICS_NODES[0]);
  const [selectedModel, setSelectedModel] = useState<RegionalModelCard>(REGIONAL_MODELS[0]);
  const [interopRunning, setInteropRunning] = useState(false);
  const [interopLog, setInteropLog] = useState<string | null>(null);

  const runInteroperabilitySimulation = (model: RegionalModelCard) => {
    setInteropRunning(true);
    setInteropLog(null);
    toast.info(`Simulating cross-border inference with ${model.modelName}...`);

    setTimeout(() => {
      setInteropRunning(false);
      setInteropLog(
        `[AgriN Protocol v2.4 Handshake: OK]\n• Ingested: Indian Cauvery Basin Sentinel-2 Spectrum\n• Dispatched to: ${model.organization} (${model.contributingCountry})\n• Target Architecture: ${model.parametersCount}\n• Inference Result: Confidence 94.8% • Latency: ${model.latencyMs}ms\n• Cross-Region Alignment: Optimal calibration across subtropical/tropical climate boundary.`
      );
      toast.success("Cross-regional model interoperability verified successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                BRICS Agri-Intelligence Network & Model Exchange
              </h2>
              <DataHonestyBadge sourceType="simulated_regional" sourceName="BRICS AgriN Interoperability Protocol v2.4" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              "One intelligence layer. Many farming nations." • Digital Public Good Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-xs font-bold">
            {BRICS_NODES.length} Active Nodes
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Open Standards
          </Badge>
        </div>
      </div>

      {/* Connected BRICS Regional Nodes Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Network className="w-4 h-4 text-primary" />
              Connected Regional Nodes
            </h3>
            <p className="text-xs text-muted-foreground">Select a participating country node to explore shared datasets and models:</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {BRICS_NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer text-center space-y-1.5 ${
                  isSelected
                    ? "bg-primary/10 border-primary shadow-sm shadow-primary/20 scale-[1.02]"
                    : "bg-card border-border/40 hover:border-primary/40 hover:bg-muted/20"
                }`}
              >
                <div className="text-2xl">{node.flag}</div>
                <p className="text-xs font-bold text-foreground leading-tight truncate">{node.country}</p>
                <Badge
                  variant="outline"
                  className={`text-[9px] px-1 py-0 h-4 ${
                    node.status === "active"
                      ? "text-emerald-600 border-emerald-500/30 bg-emerald-500/10"
                      : "text-amber-600 border-amber-500/30 bg-amber-500/10"
                  }`}
                >
                  {node.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Card */}
      <Card className="border-border/50 shadow-sm bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader className="pb-3 border-b border-border/30 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedNode.flag}</span>
            <div>
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                {selectedNode.country} Agricultural Node: {selectedNode.region}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{selectedNode.agriZone} • {selectedNode.climateProfile}</p>
            </div>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {selectedNode.connectedAgriNProtocol}
          </Badge>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-muted/20 border border-border/30 space-y-1">
            <span className="text-muted-foreground font-semibold">Primary Regional Crops:</span>
            <p className="text-sm font-bold text-foreground">{selectedNode.primaryCrops.join(", ")}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/20 border border-border/30 space-y-1">
            <span className="text-muted-foreground font-semibold">Federated Shared Assets:</span>
            <p className="text-sm font-bold text-foreground">
              {selectedNode.sharedModelsCount} AI Models • {selectedNode.sharedDatasetsCount} Open Datasets
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Latest Node Climate Insight:
            </span>
            <p className="text-xs leading-snug">{selectedNode.recentInsight}</p>
          </div>
        </CardContent>
      </Card>

      {/* Feature 1: "LEARN FROM OTHER FARMING REGIONS" (Cross-Regional Practice Transfer) */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Learn From Other Farming Regions (Cross-Regional Knowledge Transfer)
          </h3>
          <p className="text-xs text-muted-foreground">
            Identifying climate and crop analogs across BRICS nations to share proven regenerative practices:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CROSS_REGIONAL_PRACTICES.map((prac) => (
            <Card key={prac.id} className="border-border/50 shadow-sm flex flex-col justify-between">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-bold">
                    Origin: {prac.originCountry}
                  </Badge>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-semibold">
                    {prac.applicableToCrop}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-foreground leading-snug">{prac.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{prac.practiceDescription}</p>
                <div className="p-2.5 rounded-xl bg-muted/30 border border-border/30 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-primary block">Expected Benefit:</span>
                  <p className="text-xs text-foreground font-medium leading-tight">{prac.expectedBenefit}</p>
                </div>
              </div>
              <div className="p-2.5 bg-muted/20 border-t border-border/20 text-[11px] text-muted-foreground px-4 space-y-1">
                <p><strong>Evidence:</strong> {prac.scientificEvidence}</p>
                <p className="text-[10px] text-primary">Tested in: {prac.testedInRegions.join(" • ")}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature 2: MODEL EXCHANGE LAYER ("Cooperation without Centralization") */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Federated Agricultural AI Model Exchange
            </h3>
            <p className="text-xs text-muted-foreground">
              Regional specialization with global interoperability: Open-source model cards and APIs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Models Catalog List (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {REGIONAL_MODELS.map((model) => {
              const isSelected = selectedModel.id === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-card border-primary shadow-sm shadow-primary/20 ring-1 ring-primary/40"
                      : "bg-card border-border/40 hover:border-primary/40"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">{model.modelName}</span>
                      <Badge variant="outline" className="text-[10px] font-mono">{model.version}</Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold">
                        {model.contributingCountry}
                      </Badge>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      Accuracy: {model.accuracyOrF1}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{model.taskType} • Target: {model.cropTarget}</p>
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground gap-2 pt-1 border-t border-border/20">
                    <span>Org: {model.organization}</span>
                    <span className="font-mono text-[10px] text-primary">{model.license}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Model Sandbox & Interoperability Tester (5 Cols) */}
          <div className="lg:col-span-5">
            <Card className="border-border/50 shadow-sm bg-muted/15 h-full flex flex-col justify-between">
              <CardHeader className="pb-3 border-b border-border/30">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>Model Interoperability Sandbox</span>
                  <Badge variant="outline" className="text-[10px]">AgriN Gateway</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs flex-1">
                <div className="p-3 rounded-xl bg-card border border-border/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{selectedModel.modelName}</span>
                    <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                      Latency: {selectedModel.latencyMs}ms
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    <strong>Architecture:</strong> {selectedModel.parametersCount}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    <strong>Training Data:</strong> {selectedModel.trainingDataCategory} ({selectedModel.sampleCount.toLocaleString()} samples)
                  </p>
                  <p className="text-[10px] font-mono text-primary truncate">
                    Endpoint: {selectedModel.interoperabilityEndpoint}
                  </p>
                </div>

                <Button
                  onClick={() => runInteroperabilitySimulation(selectedModel)}
                  disabled={interopRunning}
                  className="w-full text-xs font-bold gap-1.5 h-10 rounded-xl"
                >
                  <Play className={`w-3.5 h-3.5 ${interopRunning ? "animate-spin" : ""}`} />
                  <span>Test Cross-Border Schema Execution</span>
                </Button>

                {interopLog && (
                  <div className="p-3 rounded-xl bg-black/80 text-emerald-400 font-mono text-[10px] whitespace-pre-wrap leading-relaxed border border-emerald-500/30">
                    {interopLog}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
