import { useMemo, useState } from "react";

interface FishSwarmProps {
  fishImage: string;
  isNight: boolean;
}

export function FishSwarm({ fishImage, isNight }: FishSwarmProps) {
  const [iteration, setIteration] = useState(0);

  const swarmConfig = useMemo(() => {
    const baseTop = Math.random() * 60 + 10;
    const direction = Math.random() > 0.5;

    // Configuração de quantidade: Noite (4), Dia (12)
    const fishCount = isNight ? 4 : 12;

    return {
      baseTop,
      isNormalDirection: direction,
      fishes: Array.from({ length: fishCount }).map((_, i) => ({
        id: i,
        size: Math.random() * (45 - 25) + 25,
        relativeTop: Math.random() * 20 - 10,
        delay: Math.random() * 5,
        // Velocidade: Lenta à noite (25-35s), Normal de dia (18-26s)
        duration: isNight
          ? Math.random() * (35 - 25) + 25
          : Math.random() * (26 - 18) + 18,
        opacity: Math.random() * (0.8 - 0.5) + 0.5,
      })),
    };
  }, [iteration, isNight]); // Atualiza o cardume se o estado da noite mudar

  return (
    <>
      <style>
        {`
          @keyframes moveLeft {
            from { transform: translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { transform: translateX(calc(-100vw - 600px)); opacity: 0; }
          }
          @keyframes moveRight {
            from { transform: translateX(0) scaleX(-1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { transform: translateX(calc(100vw + 600px)) scaleX(-1); opacity: 0; }
          }
          .fish-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 10; 

            /* Sua máscara perfeita: X:52, Y:63, W:44, H:33 */
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
          .fish-unit {
            position: absolute;
            will-change: transform;
            animation-fill-mode: backwards;
            transition: filter 2s ease, opacity 2s ease; /* Transição suave entre dia e noite */
          }
        `}
      </style>

      <div className="fish-container">
        {swarmConfig.fishes.map((fish) => (
          <img
            key={`${iteration}-${fish.id}`}
            src={fishImage}
            alt="fish"
            className="fish-unit"
            onAnimationIteration={() => {
              if (fish.id === 0) setIteration((prev) => prev + 1);
            }}
            style={{
              width: `${fish.size}px`,
              top: `${swarmConfig.baseTop + fish.relativeTop}%`,
              left: swarmConfig.isNormalDirection ? "auto" : "-200px",
              right: swarmConfig.isNormalDirection ? "-200px" : "auto",
              animation: `${swarmConfig.isNormalDirection ? "moveLeft" : "moveRight"} ${fish.duration}s linear infinite`,
              animationDelay: `${fish.delay}s`,
              // Sombras noturnas: Opacidade e brilho reduzidos
              opacity: isNight ? fish.opacity * 0.3 : fish.opacity,
              filter: isNight
                ? "brightness(0.1) saturate(0.2) blur(1px)"
                : "none",
            }}
          />
        ))}
      </div>
    </>
  );
}
