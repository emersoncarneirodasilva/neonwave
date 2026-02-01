import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import sailingBoatBlackImg from "../../../../assets/images/sailing-boat-black.png";
import sailingBoatRedImg from "../../../../assets/images/sailing-boat-red.png";
import sailingBoatYellowImg from "../../../../assets/images/sailing-boat-yellow.png";
import cargoShipImg from "../../../../assets/images/cargo-ship.png";
import shipImg from "../../../../assets/images/ship.png";
import speedBoatImg from "../../../../assets/images/speedboat.png";

interface ShipsLayerProps {
  time: number;
  seaHorizon: number;
}

export const ShipsLayer: React.FC<ShipsLayerProps> = ({ time, seaHorizon }) => {
  const isNight = time >= 18.5 || time <= 6;

  const rtlBoats = useMemo(
    () => [
      { img: sailingBoatBlackImg, size: 22, speed: 180 },
      { img: sailingBoatRedImg, size: 18, speed: 220 },
      { img: sailingBoatYellowImg, size: 20, speed: 200 },
    ],
    [],
  );

  const ltrBoats = useMemo(
    () => [
      { img: cargoShipImg, size: 35, speed: 260 },
      { img: shipImg, size: 28, speed: 280 },
      { img: speedBoatImg, size: 16, speed: 100 },
    ],
    [],
  );

  const [currentRTL, setCurrentRTL] = useState<any>(null);
  const [currentLTR, setCurrentLTR] = useState<any>(null);

  const launchBoat = (direction: "RTL" | "LTR") => {
    const list = direction === "RTL" ? rtlBoats : ltrBoats;
    const randomBoat = list[Math.floor(Math.random() * list.length)];
    const setter = direction === "RTL" ? setCurrentRTL : setCurrentLTR;
    setter({ ...randomBoat, key: Date.now() });
  };

  useEffect(() => {
    const t1 = setTimeout(() => launchBoat("RTL"), 2000);
    const t2 = setTimeout(() => launchBoat("LTR"), 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const renderShip = (ship: any, direction: "RTL" | "LTR") => {
    if (!ship) return null;
    const isRTL = direction === "RTL";

    // Cores das cabines (Removido o branco puro para não confundir com estrelas)
    const cabinLights = [
      { top: "68%", left: "30%", color: "#fbbf24", delay: 0 }, // Âmbar quente
      { top: "72%", left: "50%", color: "#22d3ee", delay: 1.2 }, // Ciano suave
      { top: "65%", left: "70%", color: "#f59e0b", delay: 2.4 }, // Laranja
    ];

    return (
      <motion.div
        key={ship.key}
        initial={{ x: isRTL ? "105%" : "-15%" }}
        animate={{ x: isRTL ? "-15%" : "105%" }}
        transition={{ duration: ship.speed, ease: "linear" }}
        onAnimationComplete={() => {
          const setter = isRTL ? setCurrentRTL : setCurrentLTR;
          setter(null);
          setTimeout(
            () => launchBoat(direction),
            20000 + Math.random() * 40000,
          );
        }}
        style={{
          position: "absolute",
          top: `${seaHorizon - 0.8}%`,
          left: 0,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            animate={{ y: [0, -1, 0], rotate: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <img
                src={ship.img}
                alt="boat"
                style={{
                  width: `${ship.size}px`,
                  height: "auto",
                  filter: isNight
                    ? "brightness(0.4) saturate(0.8) contrast(1.1)"
                    : "none",
                  transform: isRTL ? "scaleX(-1)" : "none",
                  imageRendering: "pixelated",
                }}
              />

              {/* ILUMINAÇÃO NOTURNA SEM O PONTO DE MASTRO (ESTRELA) */}
              {isNight && (
                <>
                  {/* 1. Pontos de Cabine Coloridos */}
                  {cabinLights.map((light, index) => (
                    <motion.div
                      key={index}
                      animate={{ opacity: [0.2, 0.7, 0.2] }} // Piscar mais suave
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: light.delay,
                      }}
                      style={{
                        position: "absolute",
                        top: light.top,
                        left: light.left,
                        width: "1.2px",
                        height: "1.2px",
                        backgroundColor: light.color,
                        boxShadow: `0 0 3px ${light.color}`,
                        borderRadius: "50%",
                      }}
                    />
                  ))}

                  {/* 2. Luz de Navegação Lateral (Essencial para parecer barco) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "25%",
                      [isRTL ? "left" : "right"]: "10%",
                      width: "1.5px",
                      height: "1.5px",
                      backgroundColor: isRTL ? "#10b981" : "#ef4444", // Verde esmeralda ou Vermelho vivo
                      boxShadow: `0 0 5px ${isRTL ? "#10b981" : "#ef4444"}`,
                      borderRadius: "50%",
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      <AnimatePresence mode="wait">
        {renderShip(currentRTL, "RTL")}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {renderShip(currentLTR, "LTR")}
      </AnimatePresence>
    </div>
  );
};
