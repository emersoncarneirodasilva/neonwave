import React, { useState, useEffect, useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

// --- IMPORTAÇÃO DAS IMAGENS (Mantidas conforme seu original) ---
import blueCarF from "../../../../assets/images/blue-car-light.png";
import orangeCarF from "../../../../assets/images/orange-car-light.png";
import whiteCarF from "../../../../assets/images/white-car-light.png";
import grayCarF from "../../../../assets/images/gray-car-light.png";
import greenCarF from "../../../../assets/images/green-car-light.png";
import oldCarBlueF from "../../../../assets/images/old-car-blue-light.png";
import redMotoF from "../../../../assets/images/red-moto-light.png";
import blueMotoF from "../../../../assets/images/blue-moto-light.png";
import orangeMotoF from "../../../../assets/images/orange-moto-light.png";
import whiteMotoF from "../../../../assets/images/white-moto-light.png";
import purpleMotoF from "../../../../assets/images/purple-moto-light.png";
import purpleTruckF from "../../../../assets/images/purple-truck-light.png";
import silverTruckF from "../../../../assets/images/silver-truck-light.png";
import redTruckF from "../../../../assets/images/red-truck-light.png";

import orangeCarB from "../../../../assets/images/orange-car-back.png";
import blackCarB from "../../../../assets/images/black-car-back.png";
import blueCarB from "../../../../assets/images/blue-car-back.png";
import grayCarB from "../../../../assets/images/gray-car-back.png";
import greenCarB from "../../../../assets/images/green-car-back.png";
import beigeCarB from "../../../../assets/images/beige-car-back.png";
import purpleCarB from "../../../../assets/images/purple-car-back.png";
import blackMotoB from "../../../../assets/images/black-moto-back.png";
import grayMotoB from "../../../../assets/images/gray-moto-back.png";
import greenMotoB from "../../../../assets/images/green-moto-back.png";
import whiteMotoB from "../../../../assets/images/white-moto-back.png";
import blueTruckB from "../../../../assets/images/blue-truck-back.png";
import blackTruckB from "../../../../assets/images/black-truck-back.png";
import redTruckB from "../../../../assets/images/red-truck-back.png";

const CAR_IMAGES_FRONT = [
  blueCarF,
  orangeCarF,
  whiteCarF,
  grayCarF,
  greenCarF,
  oldCarBlueF,
  redMotoF,
  blueMotoF,
  orangeMotoF,
  whiteMotoF,
  purpleMotoF,
  purpleTruckF,
  silverTruckF,
  redTruckF,
];
const CAR_IMAGES_BACK = [
  orangeCarB,
  blackCarB,
  blueCarB,
  grayCarB,
  greenCarB,
  beigeCarB,
  purpleCarB,
  blackMotoB,
  grayMotoB,
  greenMotoB,
  whiteMotoB,
  blueTruckB,
  blackTruckB,
  redTruckB,
];

// Sub-componente Car (Lógica interna preservada)
const Car = ({
  config,
}: {
  config: { id: number; basePos: React.CSSProperties; direction: string };
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [currentImage, setCurrentImage] = useState("");
  const [key, setKey] = useState(0);

  const spawnCar = () => {
    const minSpeed = 1.2;
    const maxSpeed = 4.2;
    const speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed).toFixed(2);
    const pool =
      config.direction === "descendo" ? CAR_IMAGES_FRONT : CAR_IMAGES_BACK;
    const randomImg = pool[Math.floor(Math.random() * pool.length)];
    setCurrentImage(randomImg);

    const delay = Math.random() * 3500;
    setTimeout(() => {
      setStyle({
        animation: `carMove${config.id} ${speed}s linear forwards`,
        opacity: 1,
      });
    }, delay);
  };

  useEffect(() => {
    spawnCar();
  }, [key, config.basePos]); // Reinicia se a posição base mudar (resize)

  const imgLower = currentImage.toLowerCase();
  let sizeClass = "w-10";
  if (imgLower.includes("truck")) sizeClass = "w-14";
  else if (imgLower.includes("moto")) sizeClass = "w-6";

  return (
    <div
      className="car-unit"
      style={{ ...config.basePos, ...style }}
      onAnimationEnd={() => {
        setStyle({ opacity: 0 });
        setKey((prev) => prev + 1);
      }}
    >
      {currentImage && (
        <img
          src={currentImage}
          alt="Vehicle"
          className={`${sizeClass} h-auto object-contain opacity-75`}
          style={{ transform: "rotate(-11deg)" }}
        />
      )}
    </div>
  );
};

export const CityTraffic: React.FC = () => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  // Lógica de alternância entre configurações Ativas e Comentadas
  const carConfigs = useMemo(
    () => [
      {
        id: 1,
        direction: "descendo",
        basePos: isLarge
          ? { bottom: "6%", left: "26.5%" } // Grande (Ativo)
          : { bottom: "6%", left: "15%" }, // Pequeno (Comentado)
      },
      {
        id: 2,
        direction: "subindo",
        basePos: isLarge
          ? { bottom: "0%", left: "36%" } // Grande (Ativo)
          : { bottom: "0%", left: "29%" }, // Pequeno (Comentado)
      },
      {
        id: 3,
        direction: "subindo",
        basePos: isLarge
          ? { bottom: "0%", left: "41%" } // Grande (Ativo)
          : { bottom: "0%", left: "36%" }, // Pequeno (Comentado)
      },
    ],
    [isLarge]
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {carConfigs.map((car) => (
        <Car key={car.id} config={car} />
      ))}

      <style>{`
        .car-unit {
          position: absolute;
          display: flex;
          align-items: center;
          will-change: transform, opacity;
          transform: rotate(18deg);
          transition: left 0.7s, bottom 0.7s; /* Transição suave no resize */
        }

        @keyframes carMove1 {
          0% { transform: rotate(18deg) translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: rotate(18deg) translate(110px, 70px); opacity: 0; }
        }

        @keyframes carMove2 {
          0% { transform: rotate(18deg) translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: rotate(18deg) translate(-150px, -60px); opacity: 0; }
        }

        @keyframes carMove3 {
          0% { transform: rotate(18deg) translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: rotate(18deg) translate(-200px, -80px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
