import { useState, useEffect, useCallback } from "react";
import { WinterHut } from "../ui/Effects/WinterChill/WinterHut";
import { WinterLandscape } from "../ui/Effects/WinterChill/WinterLandscape";
import { WinterSky } from "../ui/Effects/WinterChill/WinterSky";
import { WinterSnow } from "../ui/Effects/WinterChill/WinterSnow";

export function WinterChill() {
  // 1. Relógio Interno (Sincronizado com a hora real)
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  });

  const [snowIntensity, setSnowIntensity] = useState(0);

  // 2. Lógica de Eventos Aleatórios de Neve
  const startSnowEvent = useCallback(() => {
    const intensity = Math.floor(Math.random() * 3) + 1; // Sorteia nível 1, 2 ou 3
    setSnowIntensity(intensity);

    // A neve dura entre 30 segundos e 3 minutos
    const duration = Math.floor(Math.random() * (180000 - 30000 + 1)) + 30000;

    setTimeout(() => {
      setSnowIntensity(0);
      scheduleNextSnow(); // Agenda o próximo evento após esse terminar
    }, duration);
  }, []);

  const scheduleNextSnow = useCallback(() => {
    // Espera entre 1 e 5 minutos para começar a nevar novamente
    const waitTime = Math.floor(Math.random() * (300000 - 60000 + 1)) + 60000;
    setTimeout(startSnowEvent, waitTime);
  }, [startSnowEvent]);

  // 3. Efeitos de Inicialização
  useEffect(() => {
    scheduleNextSnow(); // Inicia o ciclo de sorteio de neve

    // Atualiza o relógio a cada minuto
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() + now.getMinutes() / 60);
    }, 60000);

    return () => clearInterval(interval);
  }, [scheduleNextSnow]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Camada 1: O Céu (Estrelas e Aurora) */}
      <WinterSky time={currentTime} />

      {/* Camada 2: A Neve (Z-index baixo para ficar atrás da paisagem se necessário) */}
      <WinterSnow intensity={snowIntensity} />

      {/* Camada 3: A Montanha (Com os filtros de tempo real) */}
      <WinterLandscape time={currentTime} />

      {/* Camada 4: A Cabana (Frente de tudo) */}
      <WinterHut time={currentTime} />
    </div>
  );
}
