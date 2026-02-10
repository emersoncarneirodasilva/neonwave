import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Importação dos componentes do trem
import { SkyCycle } from "../ui/Effects/PastelBloom/SkyCicle";
import { HorizonLayer } from "../ui/Effects/PastelBloom/HorizonLayer";
import { MovingFlowers } from "../ui/Effects/PastelBloom/MovingFlowers";
import { PastelBloomScene } from "../ui/Effects/PastelBloom/PastelBloomScene";
import { PastelBloomLights } from "../ui/Effects/PastelBloom/PastelBloomLights";
import { PastelBloomHUD } from "../ui/Effects/PastelBloom/PastelBloomHUD";
import { RainLayer } from "../ui/Effects/PastelBloom/RainLayer";
import { ButterflyLayer } from "../ui/Effects/PastelBloom/ButterflyLayer";

export function PastelBloom() {
  // --- ESTADO DO TEMPO REAL (Com precisão de segundos para fluidez) ---
  const [hour, setHour] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  });

  // --- ATUALIZAÇÃO DO RELÓGIO (A cada 1 segundo) ---
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHour(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- LÓGICA DE CHUVA DINÂMICA ---
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    let timer: number;

    const manageWeather = () => {
      if (!isRaining) {
        // Tempo para COMEÇAR a chover: 2 a 4 minutos
        const waitTime = (Math.random() * (4 - 2) + 2) * 60000;
        timer = setTimeout(() => {
          setIsRaining(true);
        }, waitTime);
      } else {
        // Duração da chuva: 30s a 2 minutos
        const rainDuration = (Math.random() * (120 - 30) + 30) * 1000;
        timer = setTimeout(() => {
          setIsRaining(false);
        }, rainDuration);
      }
    };

    manageWeather();

    return () => clearTimeout(timer);
  }, [isRaining]); // Re-executa sempre que o estado muda

  return (
    <div className="relative h-screen w-full overflow-hidden bg-transparent">
      <motion.div
        className="relative h-full w-full"
        animate={{
          y: [0, -0.8, 0.5, 0],
          rotate: [0, -0.1, 0.1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <SkyCycle hour={hour} />
        <HorizonLayer hour={hour} />
        <MovingFlowers hour={hour} />
        <ButterflyLayer isRaining={isRaining} hour={hour} />
        <RainLayer isRaining={isRaining} hour={hour} />
        <PastelBloomScene hour={hour} />
        <PastelBloomLights hour={hour} />
        <PastelBloomHUD />
      </motion.div>
    </div>
  );
}
