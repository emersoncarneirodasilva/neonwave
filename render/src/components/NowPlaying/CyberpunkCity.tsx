import { useEffect, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import {
  RainEffect,
  type RainIntensity,
} from "../ui/Effects/CyberpunkCity/RainEffect";
import { NeonGlow } from "../ui/Effects/CyberpunkCity/NeonGlow";
import { CityTraffic } from "../ui/Effects/CyberpunkCity/CityTraffic";
import { StreetLights } from "../ui/Effects/CyberpunkCity/StreetLights";
import { SkyTrain } from "../ui/Effects/CyberpunkCity/SkyTrain";
import { CyberpunkCityScene } from "../ui/Effects/CyberpunkCity/CyberpunkCityScene";
import { BuildingHUD } from "../ui/Effects/CyberpunkCity/BuildingHUD";

export function CyberpunkCity() {
  const [hour, setHour] = useState(new Date().getHours());
  const [isRaining, setIsRaining] = useState(false);
  const [intensity, setIntensity] = useState<RainIntensity>("low");
  const { width } = useWindowSize();

  const isNight = hour >= 18 || hour < 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let weatherTimeout: number | undefined;

    const startWeatherSystem = (shouldRain: boolean) => {
      if (shouldRain) {
        const rand = Math.random();
        if (rand < 0.5) setIntensity("low");
        else if (rand < 0.8) setIntensity("medium");
        else setIntensity("high");

        const duration =
          Math.floor(Math.random() * (300000 - 30000 + 1)) + 30000;
        setIsRaining(true);
        weatherTimeout = window.setTimeout(
          () => startWeatherSystem(false),
          duration,
        );
      } else {
        const dryTime =
          Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000;
        setIsRaining(false);
        weatherTimeout = window.setTimeout(
          () => startWeatherSystem(true),
          dryTime,
        );
      }
    };

    startWeatherSystem(false);
    return () => clearTimeout(weatherTimeout);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* 1. IMAGEM DE FUNDO DINÂMICA */}
      <CyberpunkCityScene
        hour={hour}
        intensity={intensity}
        isRaining={isRaining}
      />

      {/* 2. EFEITO ILUMINAÇÃO DOS POSTES */}
      {isNight && <StreetLights />}

      {/* 3. EFEITO DO TRÂNSITO */}
      <CityTraffic />

      {/* 4. EFEITO DE NEON */}
      {isNight && <NeonGlow />}

      {/* 5. EFEITO DO TREM */}
      <SkyTrain isNight={isNight} />

      {/* 6. EFEITO DE CHUVA */}
      <RainEffect isRaining={isRaining} intensityLevel={intensity} />

      {/* 7. HUD NO LETREIRO */}
      <BuildingHUD width={width} />
    </div>
  );
}
