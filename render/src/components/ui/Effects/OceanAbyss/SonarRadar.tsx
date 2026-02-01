import { useEffect, useState } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export function SonarRadar({ isNight }: { isNight: boolean }) {
  // Estado para um único ponto por vez
  const [coords, setCoords] = useState({ top: "40%", left: "50%", type: 1 });

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const sonarConfig = {
    translateX: isLarge ? "15px" : "10px",
    translateY: isLarge ? "143px" : "82px",
    rotate: "-2deg",
    skewY: "1deg",
  };

  useEffect(() => {
    // Muda a posição a cada ciclo de 3 segundos
    const interval = setInterval(() => {
      setCoords({
        top: `${Math.floor(Math.random() * 50) + 25}%`,
        left: `${Math.floor(Math.random() * 50) + 25}%`,
        type: Math.random() > 0.2 ? 1 : 0, // 80% azul, 20% vermelho
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
      style={{
        transform: `translate(${sonarConfig.translateX}, ${sonarConfig.translateY}) rotate(${sonarConfig.rotate}) skewY(${sonarConfig.skewY})`,
      }}
    >
      <div
        className={`relative ${isLarge ? "w-61 h-61" : "w-34 h-34"} rounded-full border ${isNight ? "border-transparent" : "border-cyan-500/10"} overflow-hidden bg-black/10`}
      >
        {/* Mira Central */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div
            className={`w-full h-[0.5px] ${isNight ? "bg-cyan-900" : "bg-cyan-500"}`}
          />
          <div
            className={`h-full w-[0.5px] ${isNight ? "bg-cyan-900" : "bg-cyan-500"} absolute`}
          />
        </div>

        {/* Sweep - Agora em 3 segundos */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, transparent 70%, ${isNight ? "rgba(8, 51, 68, 0.4)" : "rgba(34, 211, 238, 0.5)"} 100%)`,
            animation: "radar-sweep 3s linear infinite",
          }}
        />

        {/* O Ponto (Blip) */}
        <div
          key={`${coords.top}-${coords.left}`}
          className={`absolute w-1.5 h-1.5 rounded-full ${
            coords.type === 0
              ? "bg-red-500 shadow-[0_0_6px_red]"
              : "bg-cyan-400 shadow-[0_0_6px_cyan]"
          } ${isNight ? "opacity-50" : "opacity-100"}`}
          style={{
            top: coords.top,
            left: coords.left,
            animation: `blip-pulse 3s infinite`,
          }}
        />

        <style>{`
          @keyframes radar-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes blip-pulse {
            0%, 48% { opacity: 0; transform: scale(0.6); }
            50% { opacity: 1; transform: scale(1.3); }
            55% { opacity: 1; transform: scale(1); }
            100%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}
