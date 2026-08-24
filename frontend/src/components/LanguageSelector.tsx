import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", name: "English", label: "EN" },
  { code: "kn", name: "ಕನ್ನಡ", label: "KN" },
  { code: "hi", name: "हिन्दी", label: "HI" },
  { code: "te", name: "తెలుగు", label: "TE" },
  { code: "ta", name: "தமிழ்", label: "TA" },
  { code: "mr", name: "मराठी", label: "MR" },
  { code: "bn", name: "বাংলা", label: "BN" },
  { code: "pt", name: "Português", label: "PT" },
  { code: "ru", name: "Русский", label: "RU" },
  { code: "zh", name: "中文", label: "ZH" },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (lang: typeof LANGUAGES[0]) => {
    i18n.changeLanguage(lang.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 px-3 hover:bg-secondary/60">
          <Languages className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium hidden sm:inline-block">{currentLang.name}</span>
          <span className="text-xs sm:hidden font-mono bg-primary-soft text-primary px-1.5 py-0.5 rounded font-semibold">{currentLang.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] max-h-[320px] overflow-y-auto p-1 shadow-card border-border/60">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between cursor-pointer rounded-lg px-2 py-1.5 text-sm transition-colors"
            onClick={() => changeLanguage(lang)}
          >
            <span>{lang.name}</span>
            <span className="text-xs font-mono bg-primary-soft text-primary px-1.5 py-0.5 rounded font-semibold">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
