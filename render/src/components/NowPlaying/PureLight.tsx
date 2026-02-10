import { useEffect, useState } from "react";
import { PureLightScene } from "../ui/Effects/PureLight/PureLightScene";
import { PureLightWindow } from "../ui/Effects/PureLight/PureLightWindow";
import { PureLightHUD } from "../ui/Effects/PureLight/PureLightHUD";
import { SkyCycle } from "../ui/Effects/PureLight/SkyCycle";
import { AeronauticalSignalingLight } from "../ui/Effects/PureLight/AeronauticalSignalingLight";
import { BirdsLayer } from "../ui/Effects/PureLight/BirdsLayer";
import { RainLayer } from "../ui/Effects/PureLight/RainLayer";

export function PureLight() {
  // --- ESTADO DO TEMPO REAL (Com precisão de segundos para fluidez) ---
  const [hour, setHour] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  });

  // Estado da Chuva
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    // Gerenciador de Clima (Ciclos de 1 a 3 min)
    const weatherManager = () => {
      const waitTime = Math.random() * (180000 - 60000) + 60000;
      return setTimeout(() => {
        setIsRaining(true);
        const rainDuration = Math.random() * (180000 - 60000) + 60000;
        setTimeout(() => {
          setIsRaining(false);
          weatherManager();
        }, rainDuration);
      }, waitTime);
    };

    const timer = weatherManager();
    return () => clearTimeout(timer);
  }, []);

  // --- ATUALIZAÇÃO DO RELÓGIO (A cada 1 segundo) ---
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHour(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <SkyCycle hour={hour} isRaining={isRaining} />
      <RainLayer isRaining={isRaining} hour={hour} />
      <BirdsLayer hour={hour} isRaining={isRaining} />
      <PureLightWindow hour={hour} isRaining={isRaining} />
      <PureLightScene hour={hour} />
      <AeronauticalSignalingLight hour={hour} />
      <PureLightHUD />
    </div>
  );
}
