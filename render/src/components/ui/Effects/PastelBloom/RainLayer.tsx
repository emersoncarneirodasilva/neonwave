import React, { useMemo } from "react";

interface RainLayerProps {
  isRaining: boolean;
  hour: number;
}

export const RainLayer: React.FC<RainLayerProps> = ({ isRaining, hour }) => {
  const raindrops = useMemo(() => {
    return Array.from({ length: 65 }).map((_) => ({
      left: `${Math.random() * 120 - 10}%`, // Começa um pouco fora da tela à direita para cobrir a inclinação
      duration: Math.random() * 0.3 + 0.2, // Chuva bem rápida para passar ideia de viagem
      delay: Math.random() * 2,
      width: Math.random() > 0.8 ? "2px" : "1px",
      height: Math.random() * 25 + 25,
    }));
  }, []);

  const isNight = hour < 6 || hour > 18;

  return (
    <div
      className={`absolute inset-0 z-20 pointer-events-none overflow-hidden transition-opacity duration-2000 ${
        isRaining ? "opacity-100" : "opacity-0"
      }`}
    >
      <style>{`
        @keyframes rain-fall {
          0% { 
            transform: translateY(-20vh) translateX(0) rotate(15deg); 
          }
          100% { 
            transform: translateY(110vh) translateX(-150px) rotate(15deg); 
          }
        }
        .raindrop {
          position: absolute;
          background: ${
            isNight
              ? "linear-gradient(to bottom, transparent, rgba(160, 190, 255, 0.9))"
              : "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8))"
          };
          animation: rain-fall linear infinite;
          /* O segredo da visibilidade: um leve brilho externo */
          filter: blur(0.2px) drop-shadow(0 0 1px rgba(255,255,255,0.4));
        }
      `}</style>

      {raindrops.map((drop, i) => (
        <div
          key={i}
          className="raindrop"
          style={{
            left: drop.left,
            top: "-100px",
            width: drop.width,
            height: `${drop.height}px`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}

      {/* Neblina azulada que dá profundidade e destaca o branco da chuva */}
      <div className="absolute inset-0 bg-indigo-950/15 backdrop-blur-[0.5px]" />
    </div>
  );
};
