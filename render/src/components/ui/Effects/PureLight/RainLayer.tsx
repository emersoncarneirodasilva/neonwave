import React, { useMemo } from "react";

interface RainLayerProps {
  isRaining: boolean;
  hour: number;
}

export const RainLayer: React.FC<RainLayerProps> = ({ isRaining, hour }) => {
  const isNight = hour < 5 || hour >= 19;

  // Criamos 80 gotas de chuva
  const drops = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${0.5 + Math.random() * 0.3}s`,
      opacity: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-3000 ${isRaining ? "opacity-100" : "opacity-0"}`}
      style={{ zIndex: 1 }}
    >
      <style>{`
        @keyframes rain-drop {
          0% { transform: translateY(-10vh) translateX(0); }
          100% { transform: translateY(110vh) translateX(10px); }
        }
        .rain-streak {
          position: absolute; 
          width: 1px; 
          height: 45px; 
          background: linear-gradient(to bottom, 
            ${isNight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.8)"} 0%, 
            ${isNight ? "rgba(255,255,255,0.1)" : "rgba(200,200,200,0.2)"} 100%
          ); 
          filter: drop-shadow(0px 0px 1px rgba(255,255,255,0.4)); 
          animation: rain-drop linear infinite;
        }
        .rain-mist {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.1) 100%);
          backdrop-filter: blur(${isRaining ? "0.5px" : "0px"});
          transition: backdrop-filter 5s;
        }
      `}</style>

      {/* Efeito de névoa/embaçamento no vidro */}
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
