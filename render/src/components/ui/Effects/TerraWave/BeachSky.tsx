import React, { useMemo } from "react";

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

interface BeachSkyProps {
  hour: number;
  isRaining: boolean;
}

export const BeachSky: React.FC<BeachSkyProps> = ({ hour, isRaining }) => {
  // --- GERADOR DE ESTRELAS (Persistente) ---
  const starData = useMemo(
    () =>
      Array.from({ length: 120 }).map(() => ({
        top: `${Math.random() * 60}%`, // Ficam mais no topo
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
      })),
    [],
  );

  // --- NUVENS ---
  const cloudData = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        top: 5 + Math.random() * 35,
        speed: 120 + Math.random() * 150,
        delay: Math.random() * -300,
        scale: 0.6 + Math.random() * 1.2,
        bubbles: [
          { w: 120, h: 60, x: 0, y: 10 },
          { w: 90, h: 90, x: 45, y: -10 },
          { w: 100, h: 70, x: 90, y: 5 },
        ],
      })),
    [],
  );

  // --- GRADIENTES E LÓGICA DE ESTRELAS ---
  const sky = useMemo(() => {
    const h = hour;
    const keyframes = [
      { h: 0, t: "#02040a", m: "#050b18", b: "#0a1224", st: 1 }, // Noite
      { h: 5.5, t: "#1a2a6c", m: "#3a4a8a", b: "#5271c4", st: 0.5 }, // Alvorada
      { h: 7.0, t: "#2980b9", m: "#6dd5fa", b: "#ffffff", st: 0 }, // Dia
      { h: 16.5, t: "#2980b9", m: "#6dd5fa", b: "#ffffff", st: 0 }, // Tarde
      { h: 18.0, t: "#2c3e50", m: "#4a00e0", b: "#ff0080", st: 0.3 }, // Sunset
      { h: 20.0, t: "#02040a", m: "#050b18", b: "#0a1224", st: 1 }, // Noite
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
        (start.st + (end.st - start.st) * progress) * (isRaining ? 0.2 : 1),
    };
  }, [hour, isRaining]);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden transition-colors duration-4000"
      style={{
        background: `linear-gradient(to bottom, ${sky.top} 0%, ${sky.mid} 50%, ${sky.bot} 100%)`,
        filter: isRaining ? "brightness(0.6) saturate(0.6)" : "none",
      }}
    >
      <style>{`
        @keyframes cloud-move {
          from { transform: translateX(-600px) scale(var(--sc)); }
          to { transform: translateX(calc(100vw + 600px)) scale(var(--sc)); }
        }
        .beach-cloud { position: absolute; filter: blur(20px); animation: cloud-move linear infinite; will-change: transform; }
        .cloud-bubble { position: absolute; background: white; border-radius: 50%; opacity: 0.7; }
      `}</style>

      {/* CAMADA DE ESTRELAS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: sky.starOpacity, transition: "opacity 1s ease" }}
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

      {/* NUVENS */}
      {cloudData.map((c) => (
        <div
          key={c.id}
          className="beach-cloud"
          style={
            {
              top: `${c.top}%`,
              animationDuration: `${c.speed}s`,
              animationDelay: `${c.delay}s`,
              opacity: isRaining ? 0.5 : 0.35,
              "--sc": c.scale,
              filter: isRaining ? "blur(30px) brightness(0.3)" : "blur(20px)",
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
