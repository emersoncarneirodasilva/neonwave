import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Road, type RoadConfig } from "../ui/Effects/SummerBreeze/Road";
import { KombiFrame } from "../ui/Effects/SummerBreeze/KombiFrame";
import { Sand } from "../ui/Effects/SummerBreeze/Sand";
import { SeaAndSandLeft } from "../ui/Effects/SummerBreeze/SeaAndSandLeft";
import { SceneryLayer } from "../ui/Effects/SummerBreeze/SceneryLayer";
import { TravelObject } from "../ui/Effects/SummerBreeze/TravelObject";
import { SkyCycle } from "../ui/Effects/SummerBreeze/SkyCycle";

import kombiImg from "../../assets/images/kombi-bg.png";
import coqueiroImg from "../../assets/images/coqueiro.png";
import outdoorImg from "../../assets/images/outdoor-surf.png";
import speedLimit80Img from "../../assets/images/80km.png";
import speedLimit100Img from "../../assets/images/100km.png";
import beachSignImg from "../../assets/images/beach.png";
import forbiddenImg from "../../assets/images/forbidden.png";

export function SummerBreeze() {
  // --- ESTADOS ---
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  });
  const [isRaining, setIsRaining] = useState(false);

  // --- CICLO DE CHUVA AUTOMÁTICO (1 a 5 min) ---
  useEffect(() => {
    const duration = (Math.random() * 4 + 1) * 60000;
    const timer = setTimeout(() => {
      setIsRaining((prev) => !prev);
    }, duration);

    return () => clearTimeout(timer);
  }, [isRaining]);

  // --- ATUALIZAÇÃO DO RELÓGIO REAL ---
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() + now.getMinutes() / 60);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const roadConfig: RoadConfig = {
    topo: 47.4,
    altura: 14.7,
    posX: 50,
    qtd: 6,
    largura: 3,
    comprimento: 50,
    espacamento: 10,
    perspectiva: 257,
    rotacaoX: 86,
    velocidade: 0.6,
    fimAnimacao: 400,
  };

  const offRoadObjects = [
    coqueiroImg,
    outdoorImg,
    speedLimit80Img,
    speedLimit100Img,
    beachSignImg,
    forbiddenImg,
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-transparent">
      <motion.div
        className="relative h-full w-full"
        animate={{ y: [0, -1.5, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <SkyCycle time={currentTime} />

        <SeaAndSandLeft time={currentTime} />

        <Road config={roadConfig} />

        <Sand time={currentTime} />

        <SceneryLayer time={currentTime} />

        <TravelObject
          items={offRoadObjects}
          startX={44.2}
          startY={47.0}
          endX={156}
          endY={98}
          size={933}
          speed={3.0}
          time={currentTime}
        />

        <KombiFrame img={kombiImg} time={currentTime} isRaining={isRaining} />
      </motion.div>
    </div>
  );
}
