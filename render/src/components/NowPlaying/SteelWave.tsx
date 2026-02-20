import { useEffect, useState } from "react";
import { SteelWaveScene } from "../ui/Effects/SteelWave/SteelWaveScene";
import { Earth } from "../ui/Effects/SteelWave/Earth";
import { SpaceBackground } from "../ui/Effects/SteelWave/SpaceBackground";
import { SpaceObjects } from "../ui/Effects/SteelWave/SpaceObjects";
import { SteelWaveHUD } from "../ui/Effects/SteelWave/SteelWaveHUD";
import { CockpitIllumination } from "../ui/Effects/SteelWave/CockpitIllumination";

export function SteelWave() {
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

  const isNight = hour < 5 || hour >= 19;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-transparent">
      <SpaceBackground decimalHour={hour} />
      <Earth isNight={isNight} />
      <SpaceObjects hour={hour} />
      <SteelWaveScene isNight={isNight} />
      <SteelWaveHUD isNight={isNight} />
      <CockpitIllumination isNight={isNight} />
    </div>
  );
}
