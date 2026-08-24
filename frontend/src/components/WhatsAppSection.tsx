import { MessageCircle, Camera, Globe, Leaf, Image, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export const WhatsAppSection = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: MessageCircle, label: t("whatsapp.step1") },
    { icon: Globe, label: t("whatsapp.step2") },
    { icon: Leaf, label: t("whatsapp.step3") },
    { icon: Image, label: t("whatsapp.step4") },
    { icon: Cpu, label: t("whatsapp.step5") },
  ];

  return (
    <section id="whatsapp" className="container py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 border-0">
            <MessageCircle className="w-3 h-3 mr-1" />
            {t("nav.whatsapp")}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("whatsapp.title")}</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            {t("whatsapp.desc")}
          </p>
        </div>

        {/* Steps */}
        <Card className="p-6 md:p-8 shadow-card border-border/60 mb-8">
          <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            {t("whatsapp.how")}
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-secondary/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.label}</p>
                {i < steps.length - 1 && (
                  <span className="hidden md:block text-primary/40 text-lg font-light absolute right-0 top-1/2 -translate-y-1/2">→</span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* WhatsApp CTA */}
        <Card className="p-8 md:p-10 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/60 dark:border-green-800/40">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/25">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">{t("whatsapp.cta")}</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            {t("whatsapp.qr_note")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              ⏳ {t("whatsapp.status_disconnected")}
            </Badge>
          </div>
          <div className="mt-6 pt-6 border-t border-green-200/50 dark:border-green-800/30">
            <p className="text-xs text-muted-foreground">
              {t("whatsapp.number")}: <span className="font-mono font-medium text-foreground">{t("whatsapp.number_placeholder")}</span>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};