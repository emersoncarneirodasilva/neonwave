import React, { useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { AeroLayer } from "./AeroLayer";
import { ShootingStarLayer } from "./ShootingStarLayer";

const lerpColor = (a: string, b: string, amount: number) => {
  const ah = parseInt(a.replace(/#/g, ""), 16),
    ar = (ah >> 16) & 0xff,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ""), 16),
    br = (bh >> 16) & 0xff,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);
  return `rgb(${Math.round(rr)}, ${Math.round(rg)}, ${Math.round(rb)})`;
};

interface SkyCycleProps {
  hour: number;
  isRaining: boolean;
}

export const SkyCycle: React.FC<SkyCycleProps> = ({ hour, isRaining }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;
  const horizonY = 55;
  const arcHeight = 350;

  const { starData, cloudData, moonPhase } = useMemo(
    () => ({
      starData: Array.from({ length: 150 }).map(() => ({
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
      })),
      cloudData: Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        top: 8 + Math.random() * 25,
        speed: 120 + Math.random() * 100,
        delay: Math.random() * -200,
        scale: 0.7 + Math.random() * 0.8,
        bubbles: [
          { w: 100, h: 50, x: 0, y: 15 },
          { w: 70, h: 70, x: 30, y: 0 },
          { w: 80, h: 60, x: 70, y: 10 },
          { w: 60, h: 40, x: 120, y: 20 },
        ],
      })),
      moonPhase: Math.random() * 200 - 100,
    }),
    [],
  );

  const sky = useMemo(() => {
    const h = hour;
    const keyframes = [
      { h: 0, t: "#02040a", m: "#050b18", b: "#0a1224", st: 1 },
      { h: 4.0, t: "#02040a", m: "#050b18", b: "#0a1224", st: 1 },
      { h: 5.0, t: "#1a2a6c", m: "#3a4a8a", b: "#5271c4", st: 0.4 },
      { h: 6.0, t: "#2a5298", m: "#f3904f", b: "#fceabb", st: 0.05 },
      { h: 8.0, t: "#2980b9", m: "#6dd5fa", b: "#ffffff", st: 0 },
      { h: 12.0, t: "#2980b9", m: "#6dd5fa", b: "#ffffff", st: 0 },
      { h: 16.0, t: "#2980b9", m: "#6dd5fa", b: "#ffffff", st: 0 },
      { h: 17.0, t: "#4a90e2", m: "#feb47b", b: "#ff7e5f", st: 0 },
      { h: 18.0, t: "#2c3e50", m: "#4a00e0", b: "#ff0080", st: 0.2 },
      { h: 19.5, t: "#02040a", m: "#050b18", b: "#0a1224", st: 1 },
      { h: 24.0, t: "#02040a", m: "#050b18", b: "#0a1224", st: 1 },
    ];

    let i = 0;
    while (i < keyframes.length - 2 && h >= keyframes[i + 1].h) i++;
    const start = keyframes[i],
      end = keyframes[i + 1];
    const progress = (h - start.h) / (end.h - start.h);

    return {
      top: lerpColor(start.t, end.t, progress),
      mid: lerpColor(start.m, end.m, progress),
      bot: lerpColor(start.b, end.b, progress),
      starOpacity:
        (start.st + (end.st - start.st) * progress) * (isRaining ? 0.15 : 1),
    };
  }, [hour, isRaining]);

  const isDay = hour >= 5.5 && hour <= 18.5;
  const isNight = !isDay;
  const sunProgress = isDay ? (hour - 5.5) / 13 : 0;
  const sunX = 100 - sunProgress * 100;
  const sunY = isDay
    ? horizonY - 2 - Math.sin(sunProgress * Math.PI) * (arcHeight / 10)
    : horizonY + 20;

  const moonTime = hour < 5.5 ? hour + 24 : hour;
  const moonProgress = (moonTime - 18.5) / 11;
  const moonX = 100 - moonProgress * 100;
  const moonY = isNight
    ? horizonY - 2 - Math.sin(moonProgress * Math.PI) * (arcHeight / 10)
    : horizonY + 20;

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden transition-all duration-4000"
      style={{
        background: `linear-gradient(to bottom, ${sky.top} 0%, ${sky.mid} 45%, ${sky.bot} 100%)`,
        filter: isRaining
          ? "brightness(0.65) saturate(0.7) contrast(1.1)"
          : "none",
      }}
    >
      <style>{`
        @keyframes cloud-move {
          from { transform: translateX(-400px) scale(var(--sc)); }
          to { transform: translateX(calc(100vw + 400px)) scale(var(--sc)); }
        }
        .cloud-group { position: absolute; filter: blur(12px); animation: cloud-move linear infinite; will-change: transform; }
        .cloud-bubble { position: absolute; background: radial-gradient(circle at 30% 30%, white 20%, #f0f0f0 60%, #d9d9d9 100%); border-radius: 50%; }
        
        /* Camada extra de neblina para a chuva */
        .storm-overlay {
          position: absolute;
          inset: 0;
          background: #4a5568;
          mix-blend-mode: multiply;
          transition: opacity 4s ease-in-out;
        }
      `}</style>

      {/* Camada de "Tempo Fechado" */}
      <div
        className="storm-overlay"
        style={{ opacity: isRaining ? 0.35 : 0 }}
      />

      {/* ESTRELAS */}
      <div
        className="absolute inset-0"
        style={{ opacity: sky.starOpacity, transition: "opacity 0.8s ease" }}
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

      {/* CAMADAS DE AMBIENTAÇÃO (Não aparecem na chuva) */}
      {!isRaining && (
        <>
          <AeroLayer hour={hour} />
          <ShootingStarLayer hour={hour} />
        </>
      )}

      {/* SOL */}
      <div
        className="absolute rounded-full"
        style={{
          left: `${sunX}%`,
          top: `${sunY}%`,
          width: isLarge ? 85 : 65,
          height: isLarge ? 85 : 65,
          backgroundColor: "#fffdf7",
          // O sol fica difuso e opaco na chuva
          boxShadow: isRaining
            ? `0 0 40px 5px white`
            : `0 0 60px 10px white, 0 0 100px 20px ${sky.mid}`,
          opacity: isDay ? (isRaining ? 0.25 : 0.85) : 0,
          filter: isRaining ? "blur(15px)" : "none",
          transform: "translate(-50%, -50%)",
          transition: "all 4s ease-in-out",
        }}
      />

      {/* LUA */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          left: `${moonX}%`,
          top: `${moonY}%`,
          width: isLarge ? 50 : 40,
          height: isLarge ? 50 : 40,
          // Lua ganha um tom "frio/ice" na chuva
          backgroundColor: isRaining ? "#b0e0e6" : "#f5f5f5",
          boxShadow: isRaining
            ? "0 0 50px 10px rgba(176, 224, 230, 0.6)" // Brilho mais espalhado na chuva
            : "0 0 20px 2px rgba(255,255,255,0.3)",
          // Reduzimos a opacidade na chuva para parecer "atrás" da neblina
          opacity: isNight ? (isRaining ? 0.4 : 0.9) : 0,
          // Aplicamos o blur igual fizemos no Sol
          filter: isRaining ? "blur(8px)" : "none",
          transform: "translate(-50%, -50%)",
          transition: "all 4s ease-in-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${moonPhase}%`,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* NUVENS */}
      {cloudData.map((c) => (
        <div
          key={c.id}
          className="cloud-group"
          style={
            {
              top: `${c.top}%`,
              animationDuration: `${c.speed}s`,
              animationDelay: `${c.delay}s`,
              // Nuvens ficam mais visíveis/escuras na chuva
              opacity: isDay ? (isRaining ? 0.7 : 0.45) : isRaining ? 0.3 : 0.1,
              "--sc": c.scale,
              filter: isRaining ? "blur(15px) brightness(0.5)" : "blur(12px)",
              transition: "all 4s ease",
            } as any
          }
        >
          {c.bubbles.map((b, idx) => (
            <div
              key={idx}
              className="cloud-bubble"
              style={{ width: b.w, height: b.h, left: b.x, top: b.y }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
