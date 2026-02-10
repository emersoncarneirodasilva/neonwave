import React, { useState, useCallback } from "react";

interface BirdsLayerProps {
  hour: number;
}

export const BirdsLayer: React.FC<BirdsLayerProps> = ({ hour }) => {
  const isNight = hour >= 19 || hour < 5.5;
  const isSunset = hour >= 17 && hour < 19;

  // Cor: No pôr do sol fica escuro contra a luz, de dia branco, à noite some.
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
      top: `${15 + Math.random() * 40}%`, // Altura variada no céu
      speed: 40 + Math.random() * 20, // Movimento calmo
    };
  }, []);

  const [route, setRoute] = useState(generateFlock);

  const handleIteration = () => {
    setRoute(generateFlock());
  };

  // Se for noite total, não renderiza nada para poupar processamento
  if (isNight) return null;

  const formation = [
    { x: 0, y: 0 }, // Líder
    { x: -20, y: -15 }, // Asa esquerda 1
    { x: -40, y: -30 }, // Asa esquerda 2
    { x: -20, y: 15 }, // Asa direita 1
    { x: -40, y: 30 }, // Asa direita 2
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      <style>{`
        @keyframes fly-across-${route.id} {
          from { 
            left: ${route.startX}; 
            transform: translateY(0);
          }
          to { 
            left: ${route.endX}; 
            transform: translateY(${Math.random() > 0.5 ? "-50px" : "50px"});
          }
        }
        @keyframes flap {
          0%, 100% { transform: scaleY(1) rotate(0deg); }
          50% { transform: scaleY(0.4) rotate(15deg); }
        }
        .v-formation {
          position: absolute;
          top: ${route.top};
          animation: fly-across-${route.id} ${route.speed}s linear forwards;
          will-change: left;
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
