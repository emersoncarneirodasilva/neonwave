import { useState, useEffect } from "react";
import { ForestLandscape } from "../ui/Effects/ForestEcho/ForestLandscape";
import { ForestSky } from "../ui/Effects/ForestEcho/ForestSky";
import { Fireflies } from "../ui/Effects/ForestEcho/Fireflies";
import { Campfire } from "../ui/Effects/ForestEcho/Campfire";
import { RadioHUD } from "../ui/Effects/ForestEcho/RadioHUD";
import { Clouds } from "../ui/Effects/ForestEcho/Clouds";
import { FallingLeaves } from "../ui/Effects/ForestEcho/FallingLeaves";
import { Rain } from "../ui/Effects/ForestEcho/Rain";

export function ForestEcho() {
  const [hour, setHour] = useState(new Date().getHours());
  const [isRaining, setIsRaining] = useState(false);

  // Ciclo de Chuva Randômica
  useEffect(() => {
    let timer: number;

    const weatherManager = () => {
      // Range de 1 a 3 minutos para ESPERAR a chuva começar
      const waitTime = Math.floor(Math.random() * (180000 - 60000 + 1) + 60000);

      timer = setTimeout(() => {
        setIsRaining(true);

        // Range de 1 a 3 minutos de DURAÇÃO da chuva
        const rainDuration = Math.floor(
          Math.random() * (180000 - 60000 + 1) + 60000,
        );

        setTimeout(() => {
          setIsRaining(false);
          weatherManager(); // Reinicia o ciclo para a próxima chuva
        }, rainDuration);
      }, waitTime);
    };

    weatherManager();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const isNight = hour >= 18 || hour < 5;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <ForestSky hour={hour} />
      <Clouds hour={hour} />
      <FallingLeaves isNight={isNight} />
      <Rain isRaining={isRaining} />
      <ForestLandscape isNight={isNight} />
      <Fireflies isNight={isNight} />
      <Campfire isNight={isNight} />
      <RadioHUD />
    </div>
  );
}
