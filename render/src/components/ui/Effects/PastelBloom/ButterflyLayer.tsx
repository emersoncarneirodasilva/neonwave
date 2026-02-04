import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Import de imagens
import redButterflyImg from "../../../../assets/images/red-butterfly.png";
import blueButterflyImg from "../../../../assets/images/blue-butterfly.png";
import greenButterflyImg from "../../../../assets/images/green-butterfly.png";
import orangeButterflyImg from "../../../../assets/images/orange-butterfly.png";
import purpleButterflyImg from "../../../../assets/images/purple-butterfly.png";
import pinkButterflyImg from "../../../../assets/images/pink-butterfly.png";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface ButterflyLayerProps {
  isRaining: boolean;
  hour: number;
}

export const ButterflyLayer: React.FC<ButterflyLayerProps> = ({
  isRaining,
  hour,
}) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const butterflyImages = [
    redButterflyImg,
    blueButterflyImg,
    greenButterflyImg,
    orangeButterflyImg,
    purpleButterflyImg,
    pinkButterflyImg,
  ];

  // Definimos a escala base com base no tamanho da tela
  const baseScale = isLarge ? 1 : 0.8;

  const butterflies = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      // Sorteia uma das 6 imagens
      img: butterflyImages[Math.floor(Math.random() * butterflyImages.length)],
      startLeft: `${Math.random() * 100}%`,
      startTop: `${45 + Math.random() * 15}%`,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * -20, // Delay negativo para já começarem em movimento
      scale: baseScale + Math.random() * 0.2,
    }));
  }, []);

  // Regra: Só aparecem entre 6h e 18h (Dia) e se NÃO estiver chovendo
  const isDay = hour >= 6 && hour <= 18;
  const isVisible = isDay && !isRaining;

  return (
    <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
      {butterflies.map((b) => (
        <motion.img
          key={b.id}
          src={b.img}
          alt="Butterfly"
          className="absolute w-4 h-4"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            x: [0, 120, -60, 180, 0],
            y: [0, -25, 15, -35, 0],
            rotateY: [0, 180, 0, 180, 0],
          }}
          transition={{
            opacity: { duration: 2 },
            x: {
              duration: b.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            },
            y: {
              duration: b.duration * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            },
            rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
          }}
          style={{
            left: b.startLeft,
            top: b.startTop,
            scale: b.scale,
            imageRendering: "pixelated",
          }}
        />
      ))}
    </div>
  );
};
