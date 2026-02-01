import { useWindowSize } from "../../../../hooks/useWindowSize";

export function TabletLights({ isNight }: { isNight: boolean }) {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const lightsConfig = {
    translateX: isLarge ? "295.3px" : "168.5px",
    translateY: isLarge ? "13px" : "7.7px",
    rotate: "-2deg",
    skewY: "1deg",
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
      style={{
        transform: `translate(${lightsConfig.translateX}, ${lightsConfig.translateY}) rotate(${lightsConfig.rotate}) skewY(${lightsConfig.skewY})`,
      }}
    >
      <div className={`flex flex-col ${isLarge ? "gap-y-14.5" : "gap-y-8.5"}`}>
        {/* Luz Vermelha (Status/Alert) */}
        <div
          className={`${isLarge ? "w-5 h-2.5" : "w-3 h-1.25"} transition-all duration-500 ${
            isNight
              ? "bg-red-600 shadow-[0_0_5px_red]" // Noite: brilho contido
              : "bg-red-500 shadow-[0_0_10px_red,0_0_20px_red]" // Dia: brilho forte
          }`}
          style={{
            // Agora a animação roda sempre, independente de ser noite ou dia
            animation: "alert-blink 2s step-end infinite",
          }}
        />

        {/* Luz Azul (Power/System) */}
        <div
          className={`${isLarge ? "w-5 h-2.5" : "w-3 h-1.25"} transition-all duration-1000 ${
            isNight
              ? "bg-blue-400 shadow-[0_0_4px_cyan]" // Noite: mais suave
              : "bg-cyan-400 shadow-[0_0_8px_#22d3ee,0_0_15px_#22d3ee]" // Dia: neon forte
          }`}
          style={{
            animation: "soft-glow 4s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes soft-glow {
          0%, 100% { opacity: 0.7; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.4); }
        }
        @keyframes alert-blink {
          0%, 85% { opacity: 1; }
          90%, 95% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
