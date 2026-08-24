import React, { useState } from "react";
import { FarmProfile, EvidenceBasedAdvisory } from "@/types/nexus";
import { AiAdvisorService } from "@/services/aiAdvisorService";
import { 
  Bot, Sparkles, Send, CheckCircle2, 
  HelpCircle, ThumbsUp
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface Props {
  farm: FarmProfile;
  onOpenFeedback?: () => void;
}

export const AiAgroAdvisor: React.FC<Props> = ({ farm, onOpenFeedback }) => {
  const { t, i18n } = useTranslation();
  const [queryInput, setQueryInput] = useState("");
  const [advisory, setAdvisory] = useState<EvidenceBasedAdvisory>(farm.currentAdvisory);
  const [isGenerating, setIsGenerating] = useState(false);

  const getPresetQuestions = () => {
    switch (i18n.language) {
      case "kn":
        return [
          `ನನ್ನ ${farm.crop} ಬೆಳೆಯಲ್ಲಿ ಎಲೆ ಕಲೆಗಳು ಏಕೆ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಿವೆ?`,
          `ಮುಂದಿನ 48 ಗಂಟೆಗಳಲ್ಲಿ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿರುವುದರಿಂದ ಇಂದು ನೀರು ಹಾಯಿಸಬೇಕೇ?`,
          `ಸಾರಜನಕ ಕೊರತೆಯನ್ನು ಸಾವಯವ ರೀತಿಯಲ್ಲಿ ಹೇಗೆ ನೀಗಿಸುವುದು?`,
          `${farm.region} ಪ್ರದೇಶಕ್ಕೆ ಶಿಫಾರಸು ಮಾಡಲಾದ ಅಂತರ್ ಬೆಳೆಗಳು ಯಾವುವು?`
        ];
      case "hi":
        return [
          `मेरी ${farm.crop} फसल में पत्तियों पर धब्बे क्यों आ रहे हैं?`,
          `अगले 48 घंटों में बारिश की संभावना को देखते हुए क्या आज सिंचाई करनी चाहिए?`,
          `नाइट्रोजन की कमी को जैविक तरीके से कैसे दूर करें?`,
          `${farm.region} क्षेत्र के लिए उपयुक्त अंतःफसली खेती कौन सी है?`
        ];
      case "te":
        return [
          `నా ${farm.crop} పంటలో ఆకులపై మచ్చలు ఎందుకు వస్తున్నాయి?`,
          `రాబోయే 48 గంటల్లో వర్షం కురిసే అవకాశం ఉన్నందున ఈరోజు నీరు పెట్టవచ్చా?`,
          `సేంద్రీయ పద్ధతిలో నత్రజని లోపాన్ని ఎలా సరిదిద్దాలి?`,
          `${farm.region} ప్రాంతానికి సిఫార్సు చేసిన అంతర పంటలు ఏవి?`
        ];
      case "ta":
        return [
          `எனது ${farm.crop} பயிரில் இலைகளில் புள்ளிகள் தோன்றுவது ஏன்?`,
          `அடுத்த 48 மணி நேரத்தில் மழை பெய்ய வாய்ப்புள்ளதால் இன்று நீர் பாய்ச்சலாமா?`,
          `நைட்ரஜன் குறைபாட்டை இயற்கை முறையில் சரிசெய்வது எப்படி?`,
          `${farm.region} பகுதிக்கு ஏற்ற ஊடுபயிர்கள் யாவை?`
        ];
      case "mr":
        return [
          `माझ्या ${farm.crop} पिकावर पानांवर ठिपके का येत आहेत?`,
          `पुढील ४८ तासांत पावसाची शक्यता पाहता आज पाणी द्यावे का?`,
          `नत्राची कमतरता सेंद्रिय पद्धतीने कशी भरून काढावी?`,
          `${farm.region} भागासाठी कोणती आंतरपिके योग्य आहेत?`
        ];
      case "bn":
        return [
          `আমার ${farm.crop} ফসলের পাতায় দাগ দেখা দেওয়ার কারণ কী?`,
          `আগামী ৪৮ ঘণ্টায় বৃষ্টির সম্ভাবনা থাকায় আজ কি সেচ দেওয়া উচিত?`,
          `জৈব পদ্ধতিতে নাইট্রোজেনের ঘাটতি কীভাবে পূরণ করবেন?`,
          `${farm.region} অঞ্চলের জন্য কোন সাথী ফসল উপযুক্ত?`
        ];
      default:
        return [
          `Why is my ${farm.crop} experiencing leaf spots and declining growth?`,
          `Should I irrigate today given the upcoming 48-hour rainfall probability?`,
          `How can I correct the available Nitrogen deficit organically?`,
          `Which companion or cover crops are recommended for ${farm.region}?`
        ];
    }
  };

  const presetQuestions = getPresetQuestions();

  const handleAsk = (questionText: string) => {
    if (!questionText.trim()) return;
    setIsGenerating(true);
    setQueryInput(questionText);

    setTimeout(() => {
      const generated = AiAdvisorService.generateStructuredAdvisory(questionText, farm);
      setAdvisory(generated);
      setIsGenerating(false);
      toast.success(t("advisor.output_title", "AI Expert Farming Advice"));
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                {t("advisor.title", "AI Agricultural Advisor")}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
              {t("advisor.subtitle", "Ask any question about crop care, pest management, fertilizer calculation, or market prices")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold bg-muted/40">
            {t("advisor.active_farm", "Active Farm:")} {farm.name} ({farm.crop})
          </Badge>
        </div>
      </div>

      {/* Query Bar & Presets */}
      <Card className="border-border/50 shadow-sm p-4 space-y-3 bg-muted/15 rounded-3xl">
        <div className="flex items-center gap-2">
          <Input
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk(queryInput)}
            placeholder={t("advisor.placeholder", "Ask any farming question in your language...")}
            className="h-12 rounded-2xl text-sm bg-background border-border/50 px-4"
          />
          <Button
            onClick={() => handleAsk(queryInput)}
            disabled={isGenerating || !queryInput.trim()}
            className="h-12 px-6 rounded-2xl text-xs font-bold gap-2 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
          >
            <Send className="w-4 h-4" />
            <span>{t("advisor.ask_btn", "Ask AI")}</span>
          </Button>
        </div>

        {/* Preset Prompts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-muted-foreground mr-1">
            {t("advisor.quick_questions", "Common Questions:")}
          </span>
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="text-xs font-medium px-3 py-1.5 rounded-xl bg-card border border-border/40 hover:border-primary/50 hover:text-primary transition-all text-left truncate max-w-xs sm:max-w-md cursor-pointer shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </Card>

      {/* Structured Output Presentation */}
      <Card className="border-border/50 shadow-md bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden rounded-3xl">
        <CardHeader className="pb-4 border-b border-border/30 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-foreground">
                {t("advisor.output_title", "AI Expert Farming Advice")}
              </CardTitle>
              <p className="text-[11px] text-muted-foreground">
                {new Date(advisory.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold">
              {t("advisor.confidence", "Confidence:")} {advisory.confidence}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-5 space-y-6">
          {/* 1. WHAT IS HAPPENING */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary">
              {t("advisor.what_happening", "1. What Is Happening")}
            </h3>
            <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed pl-2">
              {advisory.whatIsHappening}
            </p>
          </div>

          {/* 2. WHY IT IS HAPPENING */}
          <div className="space-y-2 p-4 rounded-2xl bg-muted/30 border border-border/30">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
              {t("advisor.why_happening", "2. Why It Is Happening")}
            </h3>
            <ul className="space-y-2 pl-2">
              {advisory.whyItMayBeHappening.map((why, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{why}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. WHAT YOU SHOULD DO */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t("advisor.what_to_do", "3. What You Should Do (Step-by-Step)")}
            </h3>
            <div className="space-y-2.5 pl-2">
              {advisory.whatYouShouldDo.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-border/40 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">{item.action}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <Badge variant="outline" className="text-[10px] font-medium">{item.type}</Badge>
                    <Badge className="text-[10px] font-bold bg-primary/15 text-primary border-primary/30">{item.timeline}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
