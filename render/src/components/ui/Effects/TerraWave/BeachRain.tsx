import { useMemo } from "react";

interface BeachRainProps {
  isRaining: boolean;
  hour: number;
}

export const BeachRain = ({ isRaining, hour }: BeachRainProps) => {
  const isNight = hour < 5 || hour >= 19;

  // Criamos as gotas (aumentei para 100 para cobrir melhor telas largas)
  const drops = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -5}s`, // Delay negativo para já começar animado
      duration: `${0.4 + Math.random() * 0.3}s`,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-3000 ${
        isRaining ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 45 }}
    >
      <style>{`
        @keyframes rain-drop {
          0% { transform: translateY(-15vh) skewX(-10deg); }
          100% { transform: translateY(110vh) skewX(-10deg); }
        }
        .rain-streak {
          position: absolute; 
          width: 1px; 
          height: 50px; 
          background: linear-gradient(to bottom, 
            transparent, 
            ${isNight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.6)"}
          ); 
          animation: rain-drop linear infinite;
          /* Mantém o aspecto nítido se o projeto for Pixel Art */
          image-rendering: pixelated; 
        }
        .rain-mist {
          position: absolute;
          inset: 0;
          background: rgba(45, 55, 72, 0.1);
          backdrop-filter: blur(${isRaining ? "0.8px" : "0px"});
          transition: backdrop-filter 5s ease;
        }
      `}</style>

      {/* Efeito de névoa no ar */}
      <div className="rain-mist" />

      {/* Gotas caindo */}
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-streak"
          style={{
            left: drop.left,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
};
