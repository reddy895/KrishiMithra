import React, { useState, useEffect } from "react";
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Play, 
  Pause, X, Satellite, CloudSun, FlaskConical, Sprout, 
  Bot, Globe2, Clock, ThumbsUp, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  onClose: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const DemoTourModal: React.FC<Props> = ({ onClose, onNavigateToTab }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "1. Farm Digital Profile & Soil Ingestion",
      tab: "overview",
      icon: Layers,
      highlight: "Karnataka Rice Paddy (Mandya)",
      desc: "Every farm receives an interoperable dynamic digital profile combining geospatial bounds, soil tests (pH 6.4, low Nitrogen), and phenology stages.",
      actionText: "Viewing Farm Intelligence Profile"
    },
    {
      title: "2. Satellite Vegetation Stress Detection",
      tab: "satellite",
      icon: Satellite,
      highlight: "Sentinel-2 10m Multispectral Imagery",
      desc: "The satellite engine calculates NDVI (0.58), flagging a sudden -15.9% decline while NDWI moisture remains normal—pinpointing active foliar lesions rather than drought.",
      actionText: "Spectral Anomaly Flagged"
    },
    {
      title: "3. Climate Forecast & Agricultural Consequence",
      tab: "weather",
      icon: CloudSun,
      highlight: "Open-Meteo High-Resolution Agro-API",
      desc: "Converts raw weather (88% humidity + 74% rain probability) into immediate agricultural rules: delay canal flooding and issue fungal blast spore warning.",
      actionText: "Actionable Operational Consequence"
    },
    {
      title: "4. Computer Vision Crop Pathology",
      tab: "disease",
      icon: Sprout,
      highlight: "AI Vision Pathology Classifier",
      desc: "Farmer's leaf photo is analyzed, identifying Rice Blast (Magnaporthe oryzae) with 91.4% confidence and providing biological alternatives (Pseudomonas).",
      actionText: "91.4% Confirmed Diagnosis"
    },
    {
      title: "5. RAG Peer-Reviewed Evidence Retrieval",
      tab: "rag",
      icon: Bot,
      highlight: "ICAR & CAAS Research Repositories",
      desc: "Agricultural RAG engine retrieves verified ICAR Rice Blast management protocols and humidity thresholds with full DOI citations and zero hallucinations.",
      actionText: "Cited Research Chunks Retrieved"
    },
    {
      title: "6. Evidence-Based Structured AI Advisory",
      tab: "advisor",
      icon: Sparkles,
      highlight: "Strict 5-Part Grounded Recommendation",
      desc: "Synthesizes multi-source telemetry into: [What is happening], [Why it may be happening], [What you should do], [Confidence: 89%], and [Data Sources].",
      actionText: "Action Roadmap Synthesized"
    },
    {
      title: "7. Cross-Regional Practice Transfer (BRICS AgriN)",
      tab: "brics",
      icon: Globe2,
      highlight: "Cooperation Layer",
      desc: "The Indian paddy matches with a proven Chinese Alternate Wetting and Drying (AWD) protocol, saving 25% water and aerating root zones to mitigate blast spread.",
      actionText: "Cross-Border Knowledge Shared"
    },
    {
      title: "8. Action Timeline & Outcome Feedback Loop",
      tab: "overview",
      icon: Clock,
      highlight: "Continuous Responsible AI Learning",
      desc: "Converts advice into a Day 0 to Day 7 action timeline. The farmer records outcome feedback ('Did this help?'), creating a closed-loop model refinement pipeline.",
      actionText: "From Data to Decision • One Farm to Many Nations"
    }
  ];

  const current = steps[currentStep];
  const StepIcon = current.icon;

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  useEffect(() => {
    onNavigateToTab(current.tab);
  }, [currentStep]);

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 max-w-2xl mx-auto rounded-3xl bg-card/95 backdrop-blur-2xl border-2 border-primary/40 shadow-2xl p-5 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
            <StepIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">{current.title}</span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Step {currentStep + 1} of {steps.length} • 2-Min Hackathon Judging Tour
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 text-xs font-bold gap-1 rounded-xl"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
            <span>{isPlaying ? "Pause" : "Auto-Play"}</span>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/30 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold">
            {current.highlight}
          </Badge>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {current.actionText}
          </span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {current.desc}
        </p>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-8 gap-1.5">
        {steps.map((s, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`h-1.5 rounded-full cursor-pointer transition-all ${
              idx === currentStep
                ? "bg-primary"
                : idx < currentStep
                ? "bg-primary/40"
                : "bg-muted/40"
            }`}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-1">
        <Button
          size="sm"
          variant="ghost"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
          className="h-8 text-xs font-semibold gap-1 rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            size="sm"
            onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
            className="h-8 text-xs font-bold gap-1 rounded-xl"
          >
            <span>Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={onClose}
            className="h-8 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
          >
            <span>Finish Tour</span>
          </Button>
        )}
      </div>
    </div>
  );
};
