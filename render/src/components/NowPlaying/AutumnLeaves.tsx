import { useEffect, useRef, useState } from "react";
import { AutumnLeavesScene } from "../ui/Effects/AutumnLeaves/AutumnLeavesScene";
import { FallingLeaves } from "../ui/Effects/AutumnLeaves/FallingLeaves";
import { AutumnHUD } from "../ui/Effects/AutumnLeaves/AutumnHUD";
import { RainEffect } from "../ui/Effects/AutumnLeaves/RainEffect";
import { WalkingPeople } from "../ui/Effects/AutumnLeaves/WalkingPeople";
import { SittingPeople } from "../ui/Effects/AutumnLeaves/SittingPeople";

export function AutumnLeaves() {
  const [hour, setHour] = useState(new Date().getHours());
  const [isRain, setIsRain] = useState(false);
  const rainTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lógica da Chuva Aleatória
  useEffect(() => {
    const manageRain = () => {
      if (!isRain) {
        // Se NÃO está chovendo, espera entre 1min e 3min para começar
        const waitBeforeRain = Math.random() * (180000 - 60000) + 60000;
        rainTimerRef.current = setTimeout(() => {
          setIsRain(true);
        }, waitBeforeRain);
      } else {
        // Se ESTÁ chovendo, dura entre 30s e 2min
        const rainDuration = Math.random() * (120000 - 30000) + 30000;
        rainTimerRef.current = setTimeout(() => {
          setIsRain(false);
        }, rainDuration);
      }
    };

    manageRain();

    return () => {
      if (rainTimerRef.current) clearTimeout(rainTimerRef.current);
    };
  }, [isRain]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const isNight = hour >= 18 || hour < 6;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AutumnLeavesScene hour={hour} />

      {/* Renderiza a chuva visual se isRain for true */}
      {isRain && <RainEffect isNight={isNight} />}

      <FallingLeaves isNight={isNight} />
      <AutumnHUD isNight={isNight} />
      <WalkingPeople isNight={isNight} isRain={isRain} />
      <SittingPeople isNight={isNight} isRain={isRain} />
    </div>
  );
}
