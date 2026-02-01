import React, { useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { BirdsLayer } from "./BirdsLayer";

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
  time: number;
}

export const SkyCycle: React.FC<SkyCycleProps> = ({ time }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const tangencia = 1.1;
  const horizonY = 52.3;
  const arcHeight = 235;
  const sunSize = isLarge ? 80 : 60;
  const moonSize = isLarge ? 60 : 40;

  // --- 1. DADOS ALEATÓRIOS (Estrelas, Nuvens e Fase da Lua) ---
  const { starData, cloudData, moonPhase } = useMemo(() => {
    return {
      starData: Array.from({ length: 150 }).map(() => ({
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
      })),
      cloudData: Array.from({ length: 10 }).map((_, i) => {
        const speed = 600 + Math.random() * 1000;
        return {
          id: i,
          top: 10 + Math.random() * 30,
          speed,
          delay: Math.random() * -speed,
          scale: 0.4 + Math.random() * 0.5,
          bubbles: [
            { x: 30, y: -20, r: 40 + Math.random() * 15 },
            { x: 70, y: -15, r: 30 + Math.random() * 15 },
            { x: 50, y: 5, r: 35 + Math.random() * 15 },
          ],
        };
      }),
      // moonPhase: 0 ou 100 = Nova | 50 = Cheia | Outros = Crescente/Minguante
      moonPhase: Math.random() * 100,
    };
  }, []);

  // --- LÓGICA DO SOL ---
  const isDay = time >= 6 && time <= 18;
  const sunProgress = isDay ? (time - 6) / 12 : 0;
  const sunX = 100 - sunProgress * 100;
  const sunY =
    horizonY -
    Math.pow(Math.sin(sunProgress * Math.PI), tangencia) * (arcHeight / 10);

  // --- LÓGICA DA LUA ---
  const moonTime = time < 6 ? time + 6 : time - 18;
  const moonProgress = moonTime / 12;
  const moonX = 100 - Math.max(0, Math.min(1, moonProgress)) * 100;
  const moonY =
    horizonY -
    Math.pow(
      Math.sin(Math.max(0, Math.min(1, moonProgress)) * Math.PI),
      tangencia,
    ) *
      (arcHeight / 10);

  // --- LÓGICA DAS CORES (Suas originais) ---
  const sky = useMemo(() => {
    const t = time;
    const keyframes = [
      {
        h: 0,
        t: "#02040a",
        m: "#050b18",
        b: "#0a1224",
        g: "#000",
        s: "#ff4500",
        st: 1,
      },
      {
        h: 5.0,
        t: "#02040a",
        m: "#050b18",
        b: "#0a1224",
        g: "#000",
        s: "#ff4500",
        st: 1,
      },
      {
        h: 6.0,
        t: "#1a2a6c",
        m: "#5c4b8a",
        b: "#f3904f",
        g: "#e9d362",
        s: "#fffdf0",
        st: 0,
      },
      {
        h: 7.0,
        t: "#2a5298",
        m: "#5271c4",
        b: "#fceabb",
        g: "#f8b500",
        s: "#fffdf0",
        st: 0,
      },
      {
        h: 12.0,
        t: "#2980b9",
        m: "#6dd5fa",
        b: "#ffffff",
        g: "#e3f2fd",
        s: "#fffde7",
        st: 0,
      },
      {
        h: 15.5,
        t: "#1e88e5",
        m: "#42a5f5",
        b: "#90caf9",
        g: "#e3f2fd",
        s: "#fffde7",
        st: 0,
      },
      {
        h: 17.0,
        t: "#3a7bd5",
        m: "#61a4e4",
        b: "#f8ca9d",
        g: "#ffdca2",
        s: "#ffedbc",
        st: 0,
      },
      {
        h: 18.0,
        t: "#130f40",
        m: "#8e44ad",
        b: "#ff4e50",
        g: "#f9d423",
        s: "#ff8c00",
        st: 0.2,
      },
      {
        h: 18.5,
        t: "#0f0c29",
        m: "#302b63",
        b: "#24243e",
        g: "#1a1a2e",
        s: "#ff4500",
        st: 0.5,
      },
      {
        h: 19.0,
        t: "#02040a",
        m: "#050b18",
        b: "#0a1224",
        g: "#000",
        s: "#ff4500",
        st: 1,
      },
      {
        h: 24,
        t: "#02040a",
        m: "#050b18",
        b: "#0a1224",
        g: "#000",
        s: "#ff4500",
        st: 1,
      },
    ];
    let i = 0;
    while (i < keyframes.length - 2 && t > keyframes[i + 1].h) i++;
    const start = keyframes[i];
    const end = keyframes[i + 1];
    const progress = (t - start.h) / (end.h - start.h);
    return {
      top: lerpColor(start.t, end.t, progress),
      mid: lerpColor(start.m, end.m, progress),
      bot: lerpColor(start.b, end.b, progress),
      glow: lerpColor(start.g, end.g, progress),
      sun: lerpColor(start.s, end.s, progress),
      starOpacity: start.st + (end.st - start.st) * progress,
    };
  }, [time]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        zIndex: 1,
        background: `linear-gradient(to bottom, ${sky.top} 0%, ${sky.mid} 40%, ${sky.bot} 85%, ${sky.glow} 100%)`,
      }}
    >
      <style>{`
        @keyframes drift {
          from { transform: translate3d(-400px, 0, 0) scale(var(--sc)); }
          to { transform: translate3d(110vw, 0, 0) scale(var(--sc)); }
        }
        .cloud-container { position: absolute; width: 150px; height: 50px; animation: drift linear infinite; will-change: transform; backface-visibility: hidden; }
        .cloud-base { position: absolute; background: white; width: 100%; height: 100%; border-radius: 100px; filter: blur(8px); }
        .cloud-bubble { position: absolute; background: white; border-radius: 50%; }
      `}</style>

      {/* ESTRELAS */}
      <div className="absolute inset-0" style={{ opacity: sky.starOpacity }}>
        {starData.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* PÁSSAROS - Adicionado aqui */}
      <BirdsLayer time={time} />

      {/* SOL */}
      <div
        style={{
          position: "absolute",
          left: `${sunX}%`,
          top: `${sunY}%`,
          width: `${sunSize}px`,
          height: `${sunSize}px`,
          backgroundColor: sky.sun,
          borderRadius: "50%",
          boxShadow: `0 0 ${sunSize * 1.2}px ${sunSize / 4}px ${sky.glow}`,
          transform: "translate(-50%, -50%)",
          opacity: isDay ? 1 : 0,
        }}
      />

      {/* LUA COM FASES DINÂMICAS */}
      <div
        style={{
          position: "absolute",
          left: `${moonX}%`,
          top: `${moonY}%`,
          width: `${moonSize}px`,
          height: `${moonSize}px`,
          transform: "translate(-50%, -50%)",
          opacity: !isDay ? 1 : 0,
          // O brilho (glow) é circular e desaparece na Lua Nova
          boxShadow:
            moonPhase < 8 || moonPhase > 92
              ? "none"
              : `0 0 30px 8px rgba(255,255,255,0.15)`,
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden", // Recorta a sombra para criar a fase
            backgroundColor:
              moonPhase < 8 || moonPhase > 92 ? "#1a1a1a" : "#f5f5f5",
          }}
        >
          {/* Sombra que se move lateralmente para simular fases */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.85)",
              borderRadius: "50%",
              filter: "blur(1px)",
              // Cálculo de cosseno para o movimento esférico da sombra
              transform: `translateX(${Math.cos((moonPhase / 100) * Math.PI * 2) * 105}%)`,
              display: moonPhase > 46 && moonPhase < 54 ? "none" : "block",
            }}
          />
        </div>
      </div>

      {/* NUVENS */}
      {cloudData.map((c) => (
        <div
          key={c.id}
          className="cloud-container"
          style={
            {
              top: `${c.top}%`,
              animationDuration: `${c.speed}s`,
              animationDelay: `${c.delay}s`,
              opacity: isDay ? 0.7 : 0.2,
              "--sc": c.scale,
            } as any
          }
        >
          <div className="cloud-base">
            {c.bubbles.map((b, bi) => (
              <div
                key={bi}
                className="cloud-bubble"
                style={{ left: b.x, top: b.y, width: b.r, height: b.r }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
