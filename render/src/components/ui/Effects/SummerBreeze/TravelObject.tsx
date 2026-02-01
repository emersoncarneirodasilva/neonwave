import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface TravelObjectProps {
  items: string[];
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  speed: number;
  time: number; // Nova prop
}

export const TravelObject: React.FC<TravelObjectProps> = ({
  items,
  startX,
  startY,
  endX,
  endY,
  size,
  speed,
  time,
}) => {
  const [index, setIndex] = useState(0);
  const [iteration, setIteration] = useState(0);

  const moveX = endX - startX;
  const moveY = endY - startY;

  // Lógica de cálculo de brilho idêntica à do KombiFrame
  const brightness = useMemo(() => {
    // DIA: 06:00 às 18:30
    if (time >= 6 && time <= 18.5) return 1;

    // NOITE PROFUNDA: 19:00 às 05:00
    if (time > 19 || time < 5) return 0.3;

    // ANOITECER: 18:30 às 19:00 (30 min)
    if (time > 18.5 && time <= 19) {
      const progress = (time - 18.5) / 0.5;
      return 1 - progress * 0.7; // Desce de 1.0 para 0.3
    }

    // AMANHECER: 05:00 às 06:00 (60 min)
    if (time >= 5 && time < 6) {
      const progress = (time - 5) / 1;
      return 0.3 + progress * 0.7; // Sobe de 0.3 para 1.0
    }

    return 1;
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIteration((prev) => {
        const nextIteration = prev + 1;
        const currentStep = nextIteration % 30;

        if (currentStep === 3)
          setIndex(1); // Outdoor
        else if (currentStep === 8)
          setIndex(2); // 80km
        else if (currentStep === 13)
          setIndex(3); // 100km
        else if (currentStep === 18)
          setIndex(4); // Praia
        else if (currentStep === 23)
          setIndex(5); // Proibido
        else setIndex(0); // Coqueiro

        return nextIteration;
      });
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [speed]);

  const isSign = index >= 2;
  const isOutdoor = index === 1;

  return (
    <motion.div
      key={`obj-${iteration}-${index}`}
      className="absolute flex items-end justify-center"
      style={{
        left: `${startX}vw`,
        top: `${startY}vh`,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: 3,
        transformOrigin: "bottom center",
        marginTop: `-${size}px`,
        marginLeft: `-${size / 2}px`,
      }}
      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      animate={{
        x: `${moveX}vw`,
        y: `${moveY}vh`,
        scale: 1,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: speed,
        ease: "linear",
      }}
    >
      <img
        src={items[index]}
        className="w-full h-auto transition-all duration-500"
        style={{
          imageRendering: "pixelated",
          display: "block",
          objectFit: "contain",
          objectPosition: "bottom center",
          filter: `brightness(${brightness})`, // Aplicação do brilho
          transform: isOutdoor
            ? "scale(1.2)"
            : isSign
              ? "scale(0.45)"
              : "scale(1)",
          transformOrigin: "bottom center",
        }}
      />
    </motion.div>
  );
};
