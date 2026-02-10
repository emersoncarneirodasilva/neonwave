import React, { useState, useCallback } from "react";

interface BirdsLayerProps {
  hour: number;
  isRaining: boolean;
}

export const BirdsLayer: React.FC<BirdsLayerProps> = ({
  hour,
  isRaining = false,
}) => {
  const isNight = hour >= 19 || hour < 5.5;
  const isSunset = hour >= 17 && hour < 19;

  // Cor dos pássaros
  const birdColor = isSunset
    ? "#2d1b10"
    : isNight
      ? "transparent"
      : "rgba(255,255,255,0.7)";

  const generateFlock = useCallback(() => {
    const goesRight = Math.random() > 0.5;
    return {
      id: Math.random().toString(36).substr(2, 9),
      direction: goesRight ? "ltr" : "rtl",
      startX: goesRight ? "-30vw" : "130vw",
      endX: goesRight ? "130vw" : "-30vw",
      top: 15 + Math.random() * 40,
      driftY: (Math.random() - 0.5) * 100, // Variação de até 50px para cima ou baixo
      speed: 40 + Math.random() * 20,
    };
  }, []);

  const [route, setRoute] = useState(generateFlock);

  const handleIteration = () => {
    setRoute(generateFlock());
  };

  const shouldHide = isNight || isRaining;

  const formation = [
    { x: 0, y: 0 },
    { x: -20, y: -15 },
    { x: -40, y: -30 },
    { x: -20, y: 15 },
    { x: -40, y: 30 },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-3000"
      style={{
        zIndex: 2,
        opacity: shouldHide ? 0 : 1,
      }}
    >
      <style>{`
        @keyframes fly-across-${route.id} {
          from { 
            left: ${route.startX}; 
            transform: translateY(0);
          }
          to { 
            left: ${route.endX}; 
            transform: translateY(${route.driftY}px);
          }
        }
        @keyframes flap {
          0%, 100% { transform: scaleY(1) rotate(0deg); }
          50% { transform: scaleY(0.4) rotate(15deg); }
        }
        .v-formation {
          position: absolute;
          top: ${route.top}%;
          /* Usamos a rota travada até o onAnimationEnd disparar */
          animation: fly-across-${route.id} ${route.speed}s linear forwards;
          will-change: left, transform;
        }
        .bird-pixel {
          position: absolute;
          display: flex;
          gap: 1px;
          animation: flap 0.7s ease-in-out infinite;
        }
        .wing {
          width: 6px;
          height: 2px;
          background: ${birdColor};
          border-radius: 1px;
          transition: background 2s;
        }
        .wing-left { transform: rotate(-25deg); }
        .wing-right { transform: rotate(25deg); }
      `}</style>

      <div
        key={route.id}
        className="v-formation"
        onAnimationEnd={handleIteration}
      >
        <div
          style={{
            transform: route.direction === "rtl" ? "scaleX(-1)" : "none",
          }}
        >
          {formation.map((pos, i) => (
            <div
              key={i}
              className="bird-pixel"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                animationDelay: `${i * 0.15}s`,
                opacity: 1 - i * 0.1,
              }}
            >
              <div className="wing wing-left" />
              <div className="wing wing-right" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
