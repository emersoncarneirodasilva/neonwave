import { useState, useEffect, useMemo } from "react";
import { CyberpunkCity } from "../../components/NowPlaying/CyberpunkCity";
import { SummerBreeze } from "../../components/NowPlaying/SummerBreeze";
import { WinterChill } from "../../components/NowPlaying/WinterChill";
import { ForestEcho } from "../../components/NowPlaying/ForestEcho";
import { OceanAbyss } from "../../components/NowPlaying/OceanAbyss";
import { AutumnLeaves } from "../../components/NowPlaying/AutumnLeaves";
import { PastelBloom } from "../../components/NowPlaying/PastelBloom";

// 1. Mapeamento de Temas -> Cenários
const SCENARIO_MAP: Record<string, React.ComponentType> = {
  synthwave: CyberpunkCity,
  neonpunk: CyberpunkCity,
  urban: CyberpunkCity,
  summer: SummerBreeze,
  winter: WinterChill,
  forest: ForestEcho,
  oceanic: OceanAbyss,
  autumn: AutumnLeaves,
  pastel: PastelBloom,
};

export function NowPlayingPage() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const updateTheme = () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "data-theme") updateTheme();
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    updateTheme(); // Sync inicial

    return () => observer.disconnect();
  }, []);

  // 2. Identifica qual componente renderizar
  // Se o tema não estiver no mapa, não renderiza nada ou define um padrão
  const ActiveScenario = useMemo(() => {
    return SCENARIO_MAP[theme] || null;
  }, [theme]);

  return (
    <main
      className="relative w-full h-screen overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* 3. Renderização Dinâmica */}
      {ActiveScenario ? (
        <ActiveScenario key={theme} />
      ) : (
        /* Tela de fallback caso o tema não tenha cenário próprio ainda */
        <div className="flex items-center justify-center h-full">
          <p className="text-(--text-muted) font-medium animate-pulse">
            {theme.toUpperCase()} MODE ACTIVE
          </p>
        </div>
      )}
    </main>
  );
}
