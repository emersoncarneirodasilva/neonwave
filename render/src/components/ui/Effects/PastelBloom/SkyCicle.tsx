import React, { useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

const lerpColor = (a: string, b: string, amount: number) => {
  const ah = parseInt(a.replace(/#/g, ""), 16),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ""), 16),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);
  return `rgb(${Math.round(rr)}, ${Math.round(rg)}, ${Math.round(rb)})`;
};

interface SkyCycleProps {
  hour: number;
}

export const SkyCycle: React.FC<SkyCycleProps> = ({ hour }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const horizonY = 55;
  const arcHeight = 350;

  // --- DADOS ALEATÓRIOS (Estrelas, Nuvens e a Fase vinda do primeiro código) ---
  const { starData, cloudData, moonPhase } = useMemo(
    () => ({
      starData: Array.from({ length: 120 }).map(() => ({
        top: `${Math.random() * 65}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      })),
      cloudData: Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        top: 5 + Math.random() * 25,
        speed: 120 + Math.random() * 200,
        delay: Math.random() * -200,
        scale: 0.5 + Math.random() * 0.8,
      })),
      // Fase da lua (0-100) para calcular o movimento da sombra
      moonPhase: Math.random() * 100,
    }),
    [],
  );

  const isDay = hour >= 6 && hour <= 18;
  const sunProgress = isDay ? (hour - 6) / 12 : 0;
  const sunX = 100 - sunProgress * 100;
  const sunY = isDay
    ? horizonY - 2 - Math.sin(sunProgress * Math.PI) * (arcHeight / 10)
    : horizonY + 20;

  const isNight = hour > 18 || hour < 6;
  const moonTime = hour < 6 ? hour + 24 : hour;
  const moonProgress = (moonTime - 18) / 12;
  const moonX = 100 - moonProgress * 100;
  const moonY = isNight
    ? horizonY - 2 - Math.sin(moonProgress * Math.PI) * (arcHeight / 10)
    : horizonY + 20;

  const sky = useMemo(() => {
    const h = hour;
    const keyframes = [
      { h: 0, t: "#010103", m: "#020205", b: "#050510", st: 1 },
      { h: 4.0, t: "#010103", m: "#020205", b: "#050510", st: 1 },
      { h: 5.0, t: "#0a0a1a", m: "#1a1a2e", b: "#2c3e50", st: 0.7 },
      { h: 6.0, t: "#1a1a2e", m: "#4a266a", b: "#92507b", st: 0.1 },
      { h: 7.5, t: "#74ebd5", m: "#acb6e5", b: "#f9d423", st: 0 },
      { h: 12.5, t: "#1e90ff", m: "#87cefa", b: "#f0f8ff", st: 0 },
      { h: 17.5, t: "#2c3e50", m: "#E94E33", b: "#f9d423", st: 0 },
      { h: 19.0, t: "#000428", m: "#004e92", b: "#1a1a2e", st: 0.8 },
      { h: 24, t: "#010103", m: "#020205", b: "#050510", st: 1 },
    ];
    let i = 0;
    while (i < keyframes.length - 2 && h > keyframes[i + 1].h) i++;
    const start = keyframes[i],
      end = keyframes[i + 1];
    const progress = (h - start.h) / (end.h - start.h);
    return {
      top: lerpColor(start.t, end.t, progress),
      mid: lerpColor(start.m, end.m, progress),
      bot: lerpColor(start.b, end.b, progress),
      starOpacity: start.st + (end.st - start.st) * progress,
    };
  }, [hour]);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-black"
      style={{
        background: `linear-gradient(to bottom, ${sky.top} 0%, ${sky.mid} 50%, ${sky.bot} 100%)`,
      }}
    >
      <style>{`
        @keyframes cloud-drift { from { transform: translateX(-300px) scale(var(--sc)); } to { transform: translateX(calc(100vw + 300px)) scale(var(--sc)); } }
        .cloud-alt { position: absolute; background: white; border-radius: 100px; filter: blur(20px); animation: cloud-drift linear infinite; opacity: ${isDay ? 0.3 : 0.1}; transition: opacity 2s ease; will-change: transform; }
      `}</style>

      {/* ESTRELAS */}
      <div
        className="absolute inset-0 transition-opacity duration-2000"
        style={{ opacity: hour >= 6.5 && hour <= 17.5 ? 0 : sky.starOpacity }}
      >
        {starData.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* SOL */}
      <div
        className="absolute rounded-full transition-all duration-1000 ease-linear" // Aumentei para 1000ms e usei ease-linear
        style={{
          left: `${sunX}%`,
          top: `${sunY}%`,
          width: isLarge ? 80 : 60,
          height: isLarge ? 80 : 60,
          backgroundColor: "#fffdf7",
          boxShadow: `0 0 60px 10px white, 0 0 100px 20px ${sky.mid}`,
          opacity: isDay ? 0.8 : 0,
          transform: "translate(-50%, -50%)",
          willChange: "left, top", // Ajuda o navegador a otimizar o movimento
        }}
      />

      {/* LUA */}
      <div
        className="absolute rounded-full transition-all duration-1000 ease-linear" // Suavidade no movimento
        style={{
          left: `${moonX}%`,
          top: `${moonY}%`,
          width: isLarge ? 50 : 35,
          height: isLarge ? 50 : 35,
          opacity: isNight ? 0.9 : 0,
          transform: "translate(-50%, -50%)",
          boxShadow:
            moonPhase < 8 || moonPhase > 92
              ? "none"
              : `0 0 20px 2px rgba(255,255,255,0.3)`,
          backgroundColor:
            moonPhase < 8 || moonPhase > 92 ? "#1a1a1a" : "#f5f5f5",
          overflow: "hidden",
          willChange: "left, top",
        }}
      >
        {/* Sombra da fase */}
        <div
          className="transition-transform duration-1000 ease-linear" // Suaviza a mudança de fase se ela ocorrer
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            borderRadius: "50%",
            filter: "blur(1px)",
            transform: `translateX(${Math.cos((moonPhase / 100) * Math.PI * 2) * 105}%)`,
            display: moonPhase > 46 && moonPhase < 54 ? "none" : "block",
          }}
        />
      </div>

      {/* NUVENS */}
      {cloudData.map((c) => (
        <div
          key={c.id}
          className="cloud-alt w-64 h-12"
          style={
            {
              top: `${c.top}%`,
              animationDuration: `${c.speed}s`,
              animationDelay: `${c.delay}s`,
              "--sc": c.scale,
            } as any
          }
        />
      ))}

      <div className="absolute bottom-0 w-full h-1/2 bg-linear-to-t from-white/10 to-transparent pointer-events-none" />
    </div>
  );
};
