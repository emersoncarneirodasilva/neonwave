import { useEffect, useState } from "react";
import { DeepTechnoScene } from "../ui/Effects/DeepTechno/DeepTechnoScene";
import { DeepTechnoSky } from "../ui/Effects/DeepTechno/DeepTechnoSky";
import { CityNeonLights } from "../ui/Effects/DeepTechno/CityNeonLights";
import { RainEffect } from "../ui/Effects/DeepTechno/RainEffect";
import { CityBuildings } from "../ui/Effects/DeepTechno/CityBuildings";
import { LaptopTerminal } from "../ui/Effects/DeepTechno/LaptopTerminal";
import { DeepTechnoHUD } from "../ui/Effects/DeepTechno/DeepTechnoHUD";

export type RainIntensity = "weak" | "moderate" | "storm" | "none";

export function DeepTechno() {
  const [hour, setHour] = useState(new Date().getHours());
  const [rainIntensity, setRainIntensity] = useState<RainIntensity>("none");

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Lógica do Ciclo da Chuva
  useEffect(() => {
    let rainTimer: number;

    const startRainCycle = () => {
      // 1. Define o intervalo para a próxima chuva (1 a 3 min)
      const waitTime = Math.random() * (180000 - 60000) + 60000;

      rainTimer = setTimeout(() => {
        // 2. Escolhe a intensidade aleatoriamente
        const intensities: RainIntensity[] = ["weak", "moderate", "storm"];
        const chosen =
          intensities[Math.floor(Math.random() * intensities.length)];

        setRainIntensity(chosen);

        // 3. Define quanto tempo a chuva dura (30s a 2min)
        const duration = Math.random() * (120000 - 30000) + 30000;

        setTimeout(() => {
          setRainIntensity("none");
          startRainCycle(); // Reinicia o ciclo de espera
        }, duration);
      }, waitTime);
    };

    startRainCycle();
    return () => clearTimeout(rainTimer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-transparent">
      <DeepTechnoSky hour={hour} intensity={rainIntensity} />
      <CityBuildings hour={hour} />
      <RainEffect intensity={rainIntensity} />
      <CityNeonLights hour={hour} />
      <DeepTechnoScene hour={hour} />
      <LaptopTerminal />
      <DeepTechnoHUD />
    </div>
  );
}
