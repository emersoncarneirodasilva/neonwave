import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import shark01Img from "../../../../assets/images/shark-01.png";
import shark02Img from "../../../../assets/images/shark-02.png";

interface SharkProps {
  side: "left" | "right";
  isNight: boolean;
  initialDelay: number;
}

function SharkUnit({ side, isNight, initialDelay }: SharkProps) {
  const controls = useAnimation();
  const isLeft = side === "left";

  // Estado para a altura (Y) e escala mudarem a cada nado
  const [config, setConfig] = useState({ y: "-30vh", scale: 0.6 });

  const spawnX = isLeft ? "-120vw" : "120vw";
  const targetX = isLeft ? "-25vw" : "-15vw";

  const startPatrol = async (isFirstRun = false) => {
    if (isFirstRun) {
      await new Promise((resolve) => setTimeout(resolve, initialDelay));
    }

    // 🎲 Sorteia altura entre -25vh e -45vh para ser dinâmico mas natural
    const randomY = Math.floor(Math.random() * (-25 - -45 + 1) + -45);
    const randomScale = Math.random() * (0.65 - 0.55) + 0.55;

    setConfig({ y: `${randomY}vh`, scale: randomScale });

    // 🎲 Duração dinâmica entre 40s e 65s
    const dynamicDuration = Math.random() * (65 - 40) + 40;

    // Reset de posição
    await controls.set({ x: spawnX, opacity: 0 });

    // Iniciar movimento com Fade In/Out
    await controls.start({
      x: targetX,
      opacity: [0, 0.7, 0.7, 0],
      transition: {
        duration: dynamicDuration,
        ease: "easeInOut",
        times: [0, 0.1, 0.9, 1],
      },
    });

    // Espera entre 15s e 40s para o próximo nado
    const nextWait = Math.random() * (40000 - 15000) + 15000;
    setTimeout(() => startPatrol(false), nextWait);
  };

  useEffect(() => {
    startPatrol(true);
    return () => controls.stop();
  }, []);

  return (
    <motion.img
      src={isLeft ? shark02Img : shark01Img}
      animate={controls}
      initial={{ x: spawnX, opacity: 0 }}
      style={{
        width: "350px",
        position: "absolute",
        left: "50%",
        top: "50%",
        y: config.y,
        scale: config.scale,
        zIndex: 5,
        filter: isNight
          ? "brightness(0.3) contrast(1.2) blur(1px)"
          : "brightness(0.8) contrast(1.1)",
      }}
    />
  );
}

export function SharkEvent({ isNight }: { isNight: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 🦈 Shark 02 (Esquerda) */}
      <SharkUnit side="left" isNight={isNight} initialDelay={2000} />

      {/* 🦈 Shark 01 (Direita) */}
      <SharkUnit side="right" isNight={isNight} initialDelay={25000} />
    </div>
  );
}
