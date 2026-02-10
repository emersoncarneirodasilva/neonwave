import React, { useState, useEffect, useCallback } from "react";

interface ShootingStarLayerProps {
  hour: number;
}

export const ShootingStarLayer: React.FC<ShootingStarLayerProps> = ({
  hour,
}) => {
  // Aparecem apenas na calada da noite
  const isDarkNight = hour >= 22 || hour <= 4;

  const generateStar = useCallback(() => {
    const startX = 20 + Math.random() * 60; // Começa entre 20% e 80% da largura
    const startY = Math.random() * 30; // Começa no topo (0% a 30%)

    return {
      id: Math.random(),
      left: `${startX}%`,
      top: `${startY}%`,
      angle: 135 + (Math.random() * 20 - 10), // Ângulo de queda (~135 graus)
      delay: Math.random() * 10, // Espera aleatória para aparecer
      duration: 0.6 + Math.random() * 0.4, // Velocidade do risco
    };
  }, []);

  const [star, setStar] = useState(generateStar);

  useEffect(() => {
    if (!isDarkNight) return;

    // Timer para resetar a estrela e criar um novo ciclo aleatório
    const interval = setInterval(
      () => {
        setStar(generateStar());
      },
      8000 + Math.random() * 10000,
    ); // Aparece uma a cada 8-18 segundos

    return () => clearInterval(interval);
  }, [isDarkNight, generateStar]);

  if (!isDarkNight) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <style>{`
        @keyframes shoot {
          0% {
            transform: rotate(${star.angle}deg) translateX(0);
            opacity: 0;
            width: 0px;
          }
          10% {
            opacity: 1;
            width: 100px;
          }
          100% {
            transform: rotate(${star.angle}deg) translateX(300px);
            opacity: 0;
            width: 0px;
          }
        }
        .shooting-star {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
          border-radius: 999px;
          filter: drop-shadow(0 0 6px white);
          animation: shoot ${star.duration}s ease-out forwards;
          animation-delay: ${star.delay}s;
        }
      `}</style>

      <div
        key={star.id}
        className="shooting-star"
        style={{
          left: star.left,
          top: star.top,
        }}
      />
    </div>
  );
};
