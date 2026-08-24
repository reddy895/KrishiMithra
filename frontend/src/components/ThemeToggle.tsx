import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full h-9 w-9"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 rotate-0 scale-100 transition-all" />
      )}
    </Button>
  );
};