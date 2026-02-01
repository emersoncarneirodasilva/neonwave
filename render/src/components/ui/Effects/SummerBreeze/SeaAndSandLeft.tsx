import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { ShipsLayer } from "./ShipsLayer";

const lerpColor = (a: string, b: string, amount: number) => {
  const ah = parseInt(a.replace(/#/g, ""), 16),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ""), 16),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);
  return `rgb(${Math.round(rr)}, ${Math.round(rg)}, ${Math.round(rb)})`;
};

interface SeaProps {
  time: number;
}

export const SeaAndSandLeft: React.FC<SeaProps> = ({ time }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const speed = 7.1;
  const seaHorizon = isLarge ? 45 : 46.5;
  const bottomWidth = -165;

  const isDay = time >= 6 && time <= 18;
  const sunProgress = isDay ? (time - 6) / 12 : 0;
  const moonTime = time < 6 ? time + 6 : time - 18;
  const moonProgress = moonTime / 12;

  const reflectX = isLarge
    ? (isDay ? 100 - sunProgress * 100 : 100 - moonProgress * 100) - 7.2
    : (isDay ? 100 - sunProgress * 100 : 100 - moonProgress * 100) - 9.5;

  const colors = useMemo(() => {
    const t = time;
    const keyframes = [
      {
        h: 0,
        sea: "#0a1a2f",
        shallow: "#1d456b",
        sand: "#5d5045",
        refl: "rgba(200,230,255,0.4)",
        foamOp: 0.4,
      },
      {
        h: 5.5,
        sea: "#0a1a2f",
        shallow: "#1d456b",
        sand: "#5d5045",
        refl: "rgba(200,230,255,0.4)",
        foamOp: 0.4,
      },
      {
        h: 7.0,
        sea: "#1a5f73",
        shallow: "#4da1b0",
        sand: "#d2b48c",
        refl: "rgba(255,250,200,0.6)",
        foamOp: 0.8,
      },
      {
        h: 16.5,
        sea: "#218ca8",
        shallow: "#6ad1e3",
        sand: "#e8d0aa",
        refl: "rgba(255,255,255,0.8)",
        foamOp: 0.8,
      },
      {
        h: 18.0,
        sea: "#3b1a4a",
        shallow: "#7b4b8f",
        sand: "#8b5e5e",
        refl: "rgba(255,150,50,0.7)",
        foamOp: 0.6,
      },
      {
        h: 20.0,
        sea: "#0a1a2f",
        shallow: "#1d456b",
        sand: "#5d5045",
        refl: "rgba(200,230,255,0.4)",
        foamOp: 0.4,
      },
      {
        h: 24,
        sea: "#0a1a2f",
        shallow: "#1d456b",
        sand: "#5d5045",
        refl: "rgba(200,230,255,0.4)",
        foamOp: 0.4,
      },
    ];

    let i = 0;
    while (i < keyframes.length - 2 && t > keyframes[i + 1].h) i++;
    const start = keyframes[i];
    const end = keyframes[i + 1];
    const progress = (t - start.h) / (end.h - start.h);

    return {
      seaDeep: lerpColor(start.sea, end.sea, progress),
      seaShallow: lerpColor(start.shallow, end.shallow, progress),
      sand: lerpColor(start.sand, end.sand, progress),
      reflect: start.refl,
      foamOpacity: start.foamOp + (end.foamOp - start.foamOp) * progress,
    };
  }, [time]);

  // VALORES DE MOVIMENTO SINCRONIZADOS
  const posA = 44; // Recuo
  const posB = 47; // Avanço

  const seaClipPath = [
    `polygon(-200% ${seaHorizon}%, ${posA}% ${seaHorizon}%, ${bottomWidth}% 100%, -200% 100%)`,
    `polygon(-200% ${seaHorizon}%, ${posB}% ${seaHorizon}%, ${bottomWidth}% 100%, -200% 100%)`,
  ];

  const foamClipPath = [
    `polygon(${posA}% ${seaHorizon}%, ${posA + 1.5}% ${seaHorizon}%, ${bottomWidth + 1.5}% 100%, ${bottomWidth}% 100%)`,
    `polygon(${posB}% ${seaHorizon}%, ${posB + 1.5}% ${seaHorizon}%, ${bottomWidth + 1.5}% 100%, ${bottomWidth}% 100%)`,
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* 1. AREIA */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: colors.sand,
          clipPath: `polygon(0% ${seaHorizon}%, 100% ${seaHorizon}%, 100% 100%, 0% 100%)`,
          zIndex: 1,
        }}
      />

      {/* 2. OCEANO (Agora animado junto com a espuma) */}
      <motion.div
        className="absolute inset-0"
        animate={{ clipPath: seaClipPath }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          background: `linear-gradient(110deg, ${colors.seaDeep} 0%, ${colors.seaShallow} 80%)`,
          zIndex: 2,
        }}
      />

      {/* 3. CAMADA DE BARCOS */}
      <ShipsLayer time={time} seaHorizon={seaHorizon} />

      {/* 4. REFLEXO (Também sincronizado) */}
      <motion.div
        className="absolute inset-0"
        animate={{ clipPath: seaClipPath }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ zIndex: 3 }}
      >
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: "absolute",
            left: `${reflectX}%`,
            top: `${seaHorizon}%`,
            width: "12%",
            height: "100%",
            background: `radial-gradient(ellipse at top, ${colors.reflect} 0%, transparent 60%)`,
            transform: "translateX(-50%) skewX(-12deg)",
            filter: "blur(12px)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* 5. LINHA DA ESPUMA */}
      <motion.div
        className="absolute inset-0"
        animate={{ clipPath: foamClipPath }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          backgroundColor: "white",
          opacity: colors.foamOpacity,
          zIndex: 4,
        }}
      />
    </div>
  );
};
