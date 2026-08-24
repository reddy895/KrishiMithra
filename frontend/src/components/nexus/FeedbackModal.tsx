import React, { useState } from "react";
import { 
  ThumbsUp, ThumbsDown, CheckCircle2, X, Sparkles, 
  Sprout, TrendingUp, ShieldCheck, HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

export const FeedbackModal: React.FC<Props> = ({ onClose }) => {
  const [helpfulRating, setHelpfulRating] = useState<"Yes" | "Partially" | "No">("Yes");
  const [cropOutcome, setCropOutcome] = useState<string>("Recovered");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Feedback recorded into Farm Intelligence Continuous Learning Pipeline!");
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border/50 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/30 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Farm Outcome Feedback Loop</h3>
              <p className="text-xs text-muted-foreground">Continuous AI learning & ground-truth validation</p>
            </div>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 1. Did this advisory help? */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-foreground">Did following this advisory help your farm?</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "Yes", label: "Yes, definitely", icon: ThumbsUp, color: "text-emerald-500" },
              { val: "Partially", label: "Partially", icon: Sparkles, color: "text-amber-500" },
              { val: "No", label: "No / Little impact", icon: ThumbsDown, color: "text-red-500" }
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => setHelpfulRating(item.val as any)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer space-y-1 ${
                  helpfulRating === item.val
                    ? "bg-primary/10 border-primary text-foreground font-bold shadow-sm"
                    : "bg-muted/20 border-border/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className={`w-4 h-4 mx-auto ${item.color}`} />
                <span className="text-xs block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Observed Crop Health Outcome */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-foreground">Observed Crop Health Outcome:</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Improved Significantly",
              "Recovered",
              "Disease Stabilized",
              "No Noticeable Change"
            ].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setCropOutcome(opt)}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                  cropOutcome === opt
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-muted/20 border-border/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Farmer Comments */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-foreground">Field Notes / Yield Observations:</span>
          <Textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="e.g. AWD water management saved 2 pump cycles and blast lesions dried out within 5 days..."
            className="text-xs rounded-xl bg-background min-h-[70px]"
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-border/30 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Used for model calibration
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={onClose} className="rounded-xl text-xs">
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-xl text-xs font-bold bg-primary text-primary-foreground"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
