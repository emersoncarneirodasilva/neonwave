import React, { useMemo } from "react";

interface RainEffectProps {
  intensity: "weak" | "moderate" | "storm" | "none";
}

export const RainEffect: React.FC<RainEffectProps> = ({ intensity }) => {
  if (intensity === "none") return null;

  const dropCount = useMemo(() => {
    if (intensity === "weak") return 80;
    if (intensity === "moderate") return 200;
    return 500;
  }, [intensity]);

  const drops = useMemo(() => {
    return Array.from({ length: dropCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 120 - 10}%`,
      delay: `${Math.random() * 2}s`,
      duration:
        intensity === "storm"
          ? "0.5s"
          : intensity === "moderate"
            ? "0.8s"
            : "1.2s",
      opacity: Math.random() * 0.4 + 0.1,
      height: intensity === "storm" ? 60 : 30,
    }));
  }, [dropCount, intensity]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-blue-100/40"
          style={{
            left: drop.left,
            top: "-100px",
            width: "1.5px",
            height: `${drop.height}px`,
            opacity: drop.opacity,
            animation: `rainFallFullScreen ${drop.duration} linear infinite`,
            animationDelay: drop.delay,
            transform: "rotate(15deg)",
          }}
        />
      ))}

      <style>{`
        @keyframes rainFallFullScreen {
          0% { 
            transform: translateY(0vh) rotate(15deg); 
          }
          100% {  
            transform: translateY(110vh) rotate(15deg); 
          }
        }
      `}</style>
    </div>
  );
};
