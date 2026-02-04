import React, { useState, useEffect, useCallback } from "react";

import mountDayImg from "../../../../assets/images/mount-day.png";
import mountNightImg from "../../../../assets/images/mount-night.png";
import cityDay from "../../../../assets/images/city-day.png";
import cityNight from "../../../../assets/images/city-night.png";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface HorizonEvent {
  id: number;
  type: "mountain" | "city";
  image: string;
}

interface HorizonLayerProps {
  hour: number;
}

export const HorizonLayer: React.FC<HorizonLayerProps> = ({ hour }) => {
  const [elements, setElements] = useState<HorizonEvent[]>([]);

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  // Regra de Horário: 5h às 19h é Dia
  const isDay = hour >= 5 && hour < 19;

  const spawnElement = useCallback(() => {
    const type = Math.random() > 0.5 ? "mountain" : "city";
    let image = "";

    if (type === "mountain") {
      image = isDay ? mountDayImg : mountNightImg;
    } else {
      image = isDay ? cityDay : cityNight;
    }

    const newElement: HorizonEvent = {
      id: Date.now(),
      type,
      image,
    };

    setElements((prev) => [...prev, newElement]);

    // Remove o elemento após a animação terminar (ex: 60s) para não pesar a memória
    setTimeout(() => {
      setElements((prev) => prev.filter((el) => el.id !== newElement.id));
    }, 65000);
  }, [isDay]);

  useEffect(() => {
    // Intervalo aleatório entre um elemento e outro (ex: entre 10 e 30 segundos)
    const nextSpawn = Math.random() * 20000 + 10000;
    const timer = setInterval(spawnElement, nextSpawn);

    // Spawn inicial para não começar vazio
    spawnElement();

    return () => clearInterval(timer);
  }, [spawnElement]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <style>{`
        @keyframes travel-slow {
          from { transform: translateX(110vw); } /* Começa fora à direita */
          to { transform: translateX(-150%); }   /* Some à esquerda */
        }
        .horizon-object {
          position: absolute;
          bottom: ${isLarge ? "59.3%" : "60.5%"};  /* Ajuste conforme a linha do seu horizonte */
          height: 120px; 
          width: auto;
          animation: travel-slow 60s linear forwards;
          will-change: transform;
        }
        .obj-mountain { z-index: 1; ${isLarge ? "height: 30px;" : "height: 25px;"} filter: brightness(0.8); }
        .obj-city { z-index: 2; ${isLarge ? "height: 40px;" : "height: 35px;"} }
      `}</style>

      {elements.map((el) => (
        <img
          key={el.id}
          src={el.image}
          className={`horizon-object ${el.type === "mountain" ? "obj-mountain" : "obj-city"}`}
          alt=""
          style={{
            // Pequena variação de escala para não parecerem clones
            scale: el.type === "mountain" ? "1.2" : "1",
            opacity: el.type === "mountain" ? 1 : 0.9,
          }}
        />
      ))}
    </div>
  );
};
