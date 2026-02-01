import { useMemo } from "react";
import jellyfish01Img from "../../../../assets/images/jellyfish-01.png";
import jellyfish02Img from "../../../../assets/images/jellyfish-02.png";

export function Jellyfish({
  isNight,
  type,
}: {
  isNight: boolean;
  type: 1 | 2;
}) {
  // Mantendo a altura de 63% para o nascimento atrás do tablet
  const maskY = 63;

  const config = useMemo(() => {
    const isType1 = type === 1;
    return {
      startLeft: isType1 ? 5 : 90,
      drift: isType1 ? 3 : -4,
      duration: 65,
      size: 95,
      opacity: isNight ? 1 : 0.6,
      image: isType1 ? jellyfish01Img : jellyfish02Img,
      delay: Math.random() * -40,
    };
  }, [type, isNight]);

  return (
    <>
      <style>
        {`
          @keyframes jellyPulse {
            0%, 100% { 
              transform: scale(1); 
              filter: drop-shadow(0 0 15px rgba(0, 217, 255, 0.8)) brightness(1.2); 
            }
            50% { 
              transform: scale(1.1); 
              filter: drop-shadow(0 0 30px rgba(0, 255, 255, 1)) brightness(1.6); 
            }
          }

          @keyframes jellyRiseFromMiddle {
            0% { 
              transform: translateY(${maskY}vh) scale(0.4); 
              opacity: 0; 
            }
            15% { 
              opacity: var(--jelly-op); 
              transform: translateY(${maskY - 10}vh) scale(1);
            }
            100% { 
              transform: translateY(-130vh) translateX(${config.drift}vw); 
              opacity: 0; 
            }
          }

          .jelly-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 5;
            -webkit-mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 80%);
            mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 80%);
          }

          .jelly-wrapper {
            position: absolute;
            bottom: 0;
            will-change: transform;
            --jelly-op: ${config.opacity};
            animation: jellyRiseFromMiddle ${config.duration}s linear infinite;
          }

          .jelly-image {
            width: 100%;
            height: auto;
            animation: jellyPulse 6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="jelly-container">
        <div
          className="jelly-wrapper"
          style={{
            left: `${config.startLeft}%`,
            width: `${config.size}px`,
            animationDelay: `${config.delay}s`,
          }}
        >
          <img src={config.image} className="jelly-image" alt="jellyfish" />
        </div>
      </div>
    </>
  );
}
