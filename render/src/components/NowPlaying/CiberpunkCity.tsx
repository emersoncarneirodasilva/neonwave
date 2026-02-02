import { useEffect, useState } from "react";
import type { Track } from "../../app/pages/HomePage";
import { usePlayer } from "../../contexts/PlayerContext";
import { useWindowSize } from "../../hooks/useWindowSize";
import { MarqueeText } from "../ui/Effects/CyberpunkCIty/MarqueeText";
import {
  RainEffect,
  type RainIntensity,
} from "../ui/Effects/CyberpunkCIty/RainEffect";
import { NeonGlow } from "../ui/Effects/CyberpunkCIty/NeonGlow";
import { CityTraffic } from "../ui/Effects/CyberpunkCIty/CityTraffic";
import { StreetLights } from "../ui/Effects/CyberpunkCIty/StreetLights";
import { SkyTrain } from "../ui/Effects/CyberpunkCIty/SkyTrain";
import cyberpunkCityImg from "../../assets/images/cyberpunk-city-bg.png";

export function CiberpunkCity() {
  const [isRaining, setIsRaining] = useState(false);
  const [intensity, setIntensity] = useState<RainIntensity>("low");
  const { currentTrack } = usePlayer() as { currentTrack: Track | null };
  const { width } = useWindowSize();

  useEffect(() => {
    let weatherTimeout: number | undefined;

    const startWeatherSystem = (shouldRain: boolean) => {
      if (shouldRain) {
        // Sorteia intensidade: 50% low, 30% medium, 20% high
        const rand = Math.random();
        if (rand < 0.5) setIntensity("low");
        else if (rand < 0.8) setIntensity("medium");
        else setIntensity("high");

        const duration =
          Math.floor(Math.random() * (300000 - 30000 + 1)) + 30000;
        setIsRaining(true);
        weatherTimeout = setTimeout(() => startWeatherSystem(false), duration);
      } else {
        const dryTime =
          Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000;
        setIsRaining(false);
        weatherTimeout = setTimeout(() => startWeatherSystem(true), dryTime);
      }
    };

    startWeatherSystem(false);
    return () => clearTimeout(weatherTimeout);
  }, []);

  // HUD com duas configurações fixas (Lógica de posicionamento)
  const hudStyle =
    width >= 1000
      ? {
          top: "28%",
          right: "22%",
          width: "200px",
          transform: "perspective(400px) rotateY(-10deg) skewY(17deg)",
        }
      : {
          top: "28%",
          right: "4.5%",
          width: "220px",
          transform: "perspective(400px) rotateY(-10deg) skewY(17deg)",
        };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* 1. IMAGEM DE FUNDO */}
      <img
        src={cyberpunkCityImg}
        alt="Cyberpunk City"
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-3000 ${
          isRaining
            ? intensity === "high"
              ? "opacity-30"
              : "opacity-60"
            : "opacity-100"
        }`}
      />

      {/* 2. EFEITO ILUMINAÇÃO DOS POSTES */}
      <StreetLights />

      {/* 3. EFEITO DO TRÂNSITO */}
      <CityTraffic />

      {/* 4. EFEITO DE NEON */}
      <NeonGlow />

      {/* 5. EFEITO DO TREM */}
      <SkyTrain />

      {/* 6. EFEITO DE CHUVA */}
      <RainEffect isRaining={isRaining} intensityLevel={intensity} />

      {/* 7. HUD NO LETREIRO */}
      {currentTrack && (
        <div
          className="absolute pointer-events-none select-none text-right z-20"
          style={hudStyle}
        >
          {/* TÍTULO DA MÚSICA */}
          <MarqueeText
            text={currentTrack.title}
            className="font-mono text-6xl text-cyan-300 leading-tight"
            style={{
              textShadow: "0 0 6px #22d3ee, 0 0 12px #22d3ee, 0 0 18px #22d3ee",
            }}
          />

          {/* NOME DO ÁLBUM */}
          <MarqueeText
            text={`Álbum: ${currentTrack.album.title}`}
            className="mt-3 font-mono text-lg text-pink-300"
            style={{
              textShadow: "0 0 6px #ec4899, 0 0 12px #ec4899, 0 0 18px #ec4899",
            }}
          />

          {/* NOME DO ARTISTA */}
          <MarqueeText
            text={`Artista: ${currentTrack.album.artist.name}`}
            className="mt-1 font-mono text-md text-purple-300"
            style={{
              textShadow: "0 0 6px #a855f7, 0 0 12px #a855f7, 0 0 18px #a855f7",
            }}
          />
        </div>
      )}
    </div>
  );
}
