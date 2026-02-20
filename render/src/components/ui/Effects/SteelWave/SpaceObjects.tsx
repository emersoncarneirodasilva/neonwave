import { useEffect, useState } from "react";

// Importes das imagens
import autronautImg from "../../../../assets/images/astronaut.png";
import satellite1Img from "../../../../assets/images/satellite-01.png";
import satellite2Img from "../../../../assets/images/satellite-02.png";
import satellite3Img from "../../../../assets/images/satellite-03.png";
import alienShipImg from "../../../../assets/images/alien-ship-big.png";

const OBJECT_TYPES = [
  { id: "astro", src: autronautImg, size: "w-24", speed: 60, canRotate: true },
  { id: "sat1", src: satellite1Img, size: "w-28", speed: 60, canRotate: false },
  { id: "sat2", src: satellite2Img, size: "w-24", speed: 60, canRotate: false },
  { id: "sat3", src: satellite3Img, size: "w-20", speed: 60, canRotate: false },
  { id: "alien", src: alienShipImg, size: "w-32", speed: 15, canRotate: false },
];

interface SpaceObjectsProps {
  hour: number;
}

export const SpaceObjects = ({ hour }: SpaceObjectsProps) => {
  const [currentElement, setCurrentElement] = useState<any>(null);

  // Tratamos a hora como inteiro para evitar que o componente reinicie a cada segundo
  const currentHourInt = Math.floor(hour);
  const isNight = currentHourInt < 5 || currentHourInt >= 19;
  const isAlienHour = currentHourInt >= 3 && currentHourInt < 5;

  useEffect(() => {
    let timeoutId: any;

    const spawn = () => {
      let type;
      const roll = Math.random();

      // Regra da Nave Alien: 3h às 5h com 30% de chance
      if (isAlienHour && roll > 0.7) {
        type = OBJECT_TYPES[4];
      } else {
        const chance = Math.random();
        type =
          chance > 0.8
            ? OBJECT_TYPES[0]
            : OBJECT_TYPES[Math.floor(Math.random() * 3) + 1];
      }

      const newObj = {
        id: Date.now(),
        type,
        top: Math.random() * 70 + 10,
        initialRotation: type.id === "alien" ? 0 : Math.random() * 360,
        driftY: Math.random() * 80 - 40,
        speed: type.speed,
      };

      setCurrentElement(newObj);

      // Só agenda o próximo após o tempo de viagem do atual + silêncio
      timeoutId = setTimeout(spawn, newObj.speed * 1000 + 5000);
    };

    // Início inicial
    timeoutId = setTimeout(spawn, 3000);

    return () => clearTimeout(timeoutId);
    // IMPORTANTE: Não colocamos 'hour' aqui, senão ele reseta a cada segundo!
  }, [isAlienHour]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 bg-transparent">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes orbit-drift-left-right {
          from { left: -400px; }
          to { left: 105vw; }
        }
        @keyframes alien-glow {
          0% { filter: drop-shadow(0 0 10px #00ff00) brightness(1.2); }
          33% { filter: drop-shadow(0 0 20px #ff00ff) brightness(1.4); }
          66% { filter: drop-shadow(0 0 15px #00ffff) brightness(1.2); }
          100% { filter: drop-shadow(0 0 10px #00ff00) brightness(1.2); }
        }
        @keyframes astronaut-spin {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(var(--y)) rotate(360deg); }
        }
        @keyframes satellite-drift {
          from { transform: translateY(0); }
          to { transform: translateY(var(--y)); }
        }
      `,
        }}
      />

      {currentElement && (
        <div
          key={currentElement.id}
          className="absolute"
          style={{
            top: `${currentElement.top}%`,
            animation: `orbit-drift-left-right ${currentElement.speed}s linear forwards`,
          }}
        >
          <div
            className={`${currentElement.type.size} transition-all duration-3000 ease-in-out`}
            style={{
              animation:
                currentElement.type.id === "alien"
                  ? `alien-glow 1s linear infinite, satellite-drift ${currentElement.speed}s linear infinite`
                  : `${currentElement.type.canRotate ? "astronaut-spin" : "satellite-drift"} ${currentElement.speed}s linear infinite`,

              filter:
                currentElement.type.id === "alien"
                  ? "none"
                  : isNight
                    ? "brightness(0.4) saturate(0.8) contrast(1.1)"
                    : "brightness(1)",
              // @ts-ignore
              "--y": `${currentElement.driftY}px`,
            }}
          >
            <img
              src={currentElement.type.src}
              alt="Space Object"
              className="w-full h-auto"
              style={{
                transform: currentElement.type.canRotate
                  ? "none"
                  : `rotate(${currentElement.initialRotation}deg)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
