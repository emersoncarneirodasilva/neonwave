import { useEffect, useState } from "react";
import { TerraWaveScene } from "../ui/Effects/TerraWave/TerraWaveScene";
import { Raiane } from "../ui/Effects/TerraWave/Raiane";
import { BeachPets } from "../ui/Effects/TerraWave/BeachPets";
import { BeachSky } from "../ui/Effects/TerraWave/BeachSky";
import { BeachRain } from "../ui/Effects/TerraWave/BeachRain";
import { BeachPhone } from "../ui/Effects/TerraWave/BeachPhone";

export function TerraWave() {
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

  return (
    <div className="relative w-full h-full overflow-hidden">
      <BeachRain isRaining={isRaining} hour={hour} />
      <BeachSky hour={hour} isRaining={isRaining} />
      <BeachPets hour={hour} />
      <Raiane hour={hour} />
      <BeachPhone />
      <TerraWaveScene hour={hour} />
    </div>
  );
}
