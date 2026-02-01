import { useState, useMemo } from "react";

interface SoloFishProps {
  fishImage: string;
  isNight: boolean;
}

export function SoloFish({ fishImage, isNight }: SoloFishProps) {
  const [iteration, setIteration] = useState(0);

  // Sorteia novas características a cada "viagem" completa
  const config = useMemo(() => {
    const isMovingLeft = Math.random() > 0.5;
    return {
      top: Math.random() * 70 + 5, // Altura aleatória na tela
      // Velocidade: Bem mais lento que o cardume (30s a 45s)
      duration: isNight
        ? Math.random() * (60 - 45) + 45
        : Math.random() * (45 - 30) + 30,
      size: Math.random() * (70 - 50) + 50, // Peixe maior que os do cardume
      direction: isMovingLeft ? "moveLeft" : "moveRight",
      opacity: Math.random() * (0.7 - 0.4) + 0.4,
    };
  }, [iteration, isNight]); // Reseta quando a animação acaba ou o tempo muda

  return (
    <>
      <style>
        {`
          .solo-fish-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 5; /* Fica entre o fundo e o cardume principal */

            /* Mesma máscara perfeita que configuramos */
            -webkit-mask-image: radial-gradient(
              ellipse 44% 33% at 52% 63%, 
              transparent 0%, 
              transparent 80%, 
              black 100%
            );
            mask-image: radial-gradient(
              ellipse 44% 33% at 52% 63%, 
              transparent 0%, 
              transparent 80%, 
              black 100%
            );
          }
          .solo-fish-unit {
            position: absolute;
            will-change: transform;
            transition: filter 2s ease;
          }
        `}
      </style>

      <div className="solo-fish-container">
        <img
          key={iteration}
          src={fishImage}
          className="solo-fish-unit"
          alt="solo-fish"
          onAnimationIteration={() => setIteration((prev) => prev + 1)}
          style={{
            width: `${config.size}px`,
            top: `${config.top}%`,
            left: config.direction === "moveLeft" ? "auto" : "-250px",
            right: config.direction === "moveLeft" ? "-250px" : "auto",
            animation: `${config.direction} ${config.duration}s linear infinite`,
            // Ajuste noturno: mais escuro e levemente desfocado
            opacity: isNight ? config.opacity * 0.3 : config.opacity,
            filter: isNight
              ? "brightness(0.1) saturate(0.3) blur(1px)"
              : "none",
          }}
        />
      </div>
    </>
  );
}
