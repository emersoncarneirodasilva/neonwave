import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import peopleBack01Img from "../../../../assets/images/people-back-01.png";
import peopleBack02Img from "../../../../assets/images/people-back-02.png";
import peopleBack03Img from "../../../../assets/images/people-back-03.png";
import peopleBack04Img from "../../../../assets/images/people-back-04.png";
import peopleBack05Img from "../../../../assets/images/people-back-05.png";
import peopleBack06Img from "../../../../assets/images/people-back-06.png";

import peopleBackRain01Img from "../../../../assets/images/people-back-rain-01.png";
import peopleBackRain02Img from "../../../../assets/images/people-back-rain-02.png";
import peopleBackRain03Img from "../../../../assets/images/people-back-rain-03.png";
import peopleBackRain04Img from "../../../../assets/images/people-back-rain-04.png";
import peopleBackRain05Img from "../../../../assets/images/people-back-rain-05.png";
import peopleBackRain06Img from "../../../../assets/images/people-back-rain-06.png";

import peopleFront01Img from "../../../../assets/images/people-front-01.png";
import peopleFront02Img from "../../../../assets/images/people-front-02.png";
import peopleFront03Img from "../../../../assets/images/people-front-03.png";
import peopleFront04Img from "../../../../assets/images/people-front-04.png";
import peopleFront05Img from "../../../../assets/images/people-front-05.png";
import peopleFront06Img from "../../../../assets/images/people-front-06.png";

import peopleFrontRain01Img from "../../../../assets/images/people-front-rain-01.png";
import peopleFrontRain02Img from "../../../../assets/images/people-front-rain-02.png";
import peopleFrontRain03Img from "../../../../assets/images/people-front-rain-03.png";
import peopleFrontRain04Img from "../../../../assets/images/people-front-rain-04.png";
import peopleFrontRain05Img from "../../../../assets/images/people-front-rain-05.png";
import peopleFrontRain06Img from "../../../../assets/images/people-front-rain-06.png";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface WalkingPeopleProps {
  isNight: boolean;
  isRain: boolean;
}

const backPool = [
  peopleBack01Img,
  peopleBack02Img,
  peopleBack03Img,
  peopleBack04Img,
  peopleBack05Img,
  peopleBack06Img,
];
const backRainPool = [
  peopleBackRain01Img,
  peopleBackRain02Img,
  peopleBackRain03Img,
  peopleBackRain04Img,
  peopleBackRain05Img,
  peopleBackRain06Img,
];
const frontPool = [
  peopleFront01Img,
  peopleFront02Img,
  peopleFront03Img,
  peopleFront04Img,
  peopleFront05Img,
  peopleFront06Img,
];
const frontRainPool = [
  peopleFrontRain01Img,
  peopleFrontRain02Img,
  peopleFrontRain03Img,
  peopleFrontRain04Img,
  peopleFrontRain05Img,
  peopleFrontRain06Img,
];

const pathToBack = [
  { x: "0%", y: "53%", scale: 2 },
  { x: "15%", y: "50%", scale: 1.8 },
  { x: "30%", y: "47%", scale: 1.5 },
  { x: "40%", y: "44%", scale: 1.3 },
  { x: "45%", y: "41%", scale: 1 },
];

const pathToBackRain = [
  { x: "0%", y: "53%", scale: 2.2 },
  { x: "15%", y: "50%", scale: 2 },
  { x: "30%", y: "47%", scale: 1.7 },
  { x: "40%", y: "44%", scale: 1.4 },
  { x: "45%", y: "41%", scale: 1.2 },
];

const pathToBackLarge = [
  { x: "0%", y: "53%", scale: 2.5 },
  { x: "15%", y: "50%", scale: 2.2 },
  { x: "30%", y: "47%", scale: 2 },
  { x: "40%", y: "44%", scale: 1.7 },
  { x: "45%", y: "41%", scale: 1.5 },
];

const pathToBackRainLarge = [
  { x: "0%", y: "53%", scale: 2.7 },
  { x: "15%", y: "50%", scale: 2.4 },
  { x: "30%", y: "47%", scale: 2.2 },
  { x: "40%", y: "44%", scale: 1.9 },
  { x: "45%", y: "41%", scale: 1.7 },
];

function SoloWalker({
  isRain,
  isLarge,
  isNight, // Nova prop recebida
  onComplete,
}: {
  isRain: boolean;
  isLarge: boolean;
  isNight: boolean;
  onComplete: () => void;
}) {
  const [isFront] = useState(() => Math.random() > 0.5);

  const [img] = useState(() => {
    if (isFront) {
      const pool = isRain ? frontRainPool : frontPool;
      return pool[Math.floor(Math.random() * pool.length)];
    } else {
      const pool = isRain ? backRainPool : backPool;
      return pool[Math.floor(Math.random() * pool.length)];
    }
  });

  const [path] = useState(() => {
    let base;
    if (isLarge) {
      base = isRain ? pathToBackRainLarge : pathToBackLarge;
    } else {
      base = isRain ? pathToBackRain : pathToBack;
    }
    return isFront ? [...base].reverse() : base;
  });

  const [duration] = useState(() => 23 + Math.random() * 4);

  return (
    <motion.div
      initial={{
        opacity: 0,
        left: path[0].x,
        top: path[0].y,
        scale: path[0].scale,
      }}
      animate={{
        left: path.map((p) => p.x),
        top: path.map((p) => p.y),
        scale: path.map((p) => p.scale),
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        ease: "linear",
        times: [0, 0.35, 0.7, 0.9, 1],
      }}
      onAnimationComplete={onComplete}
      className="absolute flex flex-col items-center"
      style={{
        width: "60px",
        height: "90px",
        marginLeft: "-30px",
        marginTop: "-90px",
        transformOrigin: "bottom center",
      }}
    >
      <img
        src={img}
        className="w-full h-full object-contain transition-all duration-2000"
        style={{
          imageRendering: "pixelated",
          // Adicionada lógica de brilho: 60% à noite, 100% de dia.
          // Também adicionei um tom levemente azulado (sepia/hue-rotate) para combinar com o luar.
          filter: `drop-shadow(0px 4px 3px rgba(0,0,0,0.25)) brightness(${isNight ? 0.6 : 1}) ${isNight ? "saturate(0.8) hue-rotate(10deg)" : ""}`,
        }}
      />
      {/* A sombra também fica mais suave/clara no chão à noite */}
      <div
        className={`absolute bottom-1 w-10 h-1.5 bg-black/${isNight ? "10" : "15"} blur-[3px] rounded-full`}
      />
    </motion.div>
  );
}

export function WalkingPeople({ isNight, isRain }: WalkingPeopleProps) {
  const [walkers, setWalkers] = useState<{ id: string }[]>([]);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSpawningRef = useRef(false);

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  useEffect(() => {
    if (isSpawningRef.current) return;
    isSpawningRef.current = true;

    const spawn = () => {
      const minWait = isNight ? 15000 : 8000;
      const randomRange = isNight ? 20000 : 12000;

      setWalkers((prev) => [...prev, { id: `${Date.now()}-${Math.random()}` }]);

      const nextSpawnIn = minWait + Math.random() * randomRange;
      spawnTimerRef.current = setTimeout(spawn, nextSpawnIn);
    };

    spawnTimerRef.current = setTimeout(spawn, 1000);

    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      isSpawningRef.current = false;
    };
  }, [isNight]);

  const removeWalker = (id: string) => {
    setWalkers((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {walkers.map((walker) => (
          <SoloWalker
            key={walker.id}
            isRain={isRain}
            isLarge={isLarge}
            isNight={isNight} // Passando para o filho
            onComplete={() => removeWalker(walker.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
