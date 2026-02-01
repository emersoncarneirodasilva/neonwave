import React, { useMemo } from "react";
import { usePlayer } from "../../../../contexts/PlayerContext";
import type { Track } from "../../../../app/pages/HomePage";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface KombiProps {
  img: string;
  time: number;
  isRaining?: boolean;
}

export const KombiFrame: React.FC<KombiProps> = ({
  img,
  time,
  isRaining = true,
}) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const { currentTrack } = usePlayer() as { currentTrack: Track | null };

  // --- LÓGICA DE HORÁRIO ---
  const isNight = time >= 18.5 || time < 5;
  const isDaytimeLum = time >= 6 && time < 18.5;

  // --- LÓGICA DE CHUVA (Criada aqui dentro) ---
  const rainElements = useMemo(() => {
    if (!isRaining) return { background: [], glass: [] };

    // Chuva que cai lá no fundo (atrás da lataria)
    const background = Array.from({ length: 60 }).map((_) => ({
      left: `${Math.random() * 110}%`,
      delay: Math.random() * 2,
      duration: 0.5 + Math.random() * 0.3,
      opacity: 0.1 + Math.random() * 0.2,
    }));

    // Gotas que escorrem no vidro (na frente da imagem)
    const glass = Array.from({ length: 15 }).map((_) => ({
      left: `${25 + Math.random() * 50}%`,
      top: `${27 + Math.random() * 30}%`,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 2,
    }));

    return { background, glass };
  }, [isRaining]);

  // --- 1. FARÓIS EXTERNOS (SÓ À NOITE) ---
  const headlightPoints = useMemo(() => {
    const baseX = isLarge ? 63 : 63,
      topX = isLarge ? 53 : 54,
      baseWidth = isLarge ? 85 : 85,
      topWidth = isLarge ? 11 : 14,
      horizonY = isLarge ? 50 : 50,
      bottomY = isLarge ? 77 : 68;
    const leftBottom = baseX - baseWidth / 2,
      rightBottom = baseX + baseWidth / 2;
    const leftTop = topX - topWidth / 2,
      rightTop = topX + topWidth / 2;
    return `${leftTop}% ${horizonY}%, ${rightTop}% ${horizonY}%, ${rightBottom}% ${bottomY}%, ${leftBottom}% ${bottomY}%`;
  }, [isLarge]);

  // --- 2. ELEMENTOS DO PAINEL ---
  const btn1 = isLarge
    ? { x: 42.1, y: 88, size: 2.8, alpha: 0.7 }
    : { x: 42.3, y: 76, size: 2.8, alpha: 0.7 };
  const btn2 = isLarge
    ? { x: 60.1, y: 88.1, size: 2.8, alpha: 0.7 }
    : { x: 60.1, y: 75.9, size: 2.8, alpha: 0.7 };
  const gauge1 = isLarge
    ? { x: 35.9, y: 91.7, size: 5.2, alpha: 0.3 }
    : { x: 35.9, y: 79.1, size: 5.2, alpha: 0.3 };
  const gauge2 = isLarge
    ? { x: 48.2, y: 91.7, size: 5.9, alpha: 0.3 }
    : { x: 48.2, y: 78.7, size: 5.9, alpha: 0.3 };
  const radioBase = isLarge
    ? { x: 71.8, y: 91.7, w: 16.2, h: 9.6, alpha: 0.4 }
    : { x: 71.8, y: 78.7, w: 16.2, h: 9.6, alpha: 0.4 };

  const dX = isLarge ? 71.9 : 71.9,
    dY = isLarge ? 92 : 78.7,
    dSize = isLarge ? 11 : 8.5,
    mSpeed = 21,
    lineH = isLarge ? 1.5 : 1.2,
    labelW = 41;

  const marqueeStyle = `
    @keyframes marqueeLine { 0% { transform: translateX(0%); } 20% { transform: translateX(0%); } 80% { transform: translateX(-50%); } 100% { transform: translateX(-50%); } }
    @keyframes rain-fall-kombi { 0% { transform: translateY(-10vh) translateX(0) rotate(10deg); } 100% { transform: translateY(110vh) translateX(-100px) rotate(10deg); } }
    @keyframes glass-drip-kombi { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 0.4; } 80% { opacity: 0.2; } 100% { transform: translateY(80px); opacity: 0; } }
    
    .radio-marquee { display: inline-block; white-space: nowrap; animation: marqueeLine ${mSpeed}s linear infinite; }
    .kombi-rain-drop { position: absolute; background: white; width: 1px; height: 30px; animation: rain-fall-kombi linear infinite; }
    .kombi-glass-drop { position: absolute; background: rgba(255, 255, 255, 0.4); width: 1.5px; height: 10px; border-radius: 10px; animation: glass-drip-kombi linear infinite; }
  `;

  const MarqueeRow = ({ label, value }: { label: string; value: string }) => (
    <div
      className="grid items-center w-full overflow-hidden border-b border-green-900/10"
      style={{ gridTemplateColumns: `${labelW}% ${100 - labelW}%` }}
    >
      <span className="font-bold opacity-80">{label}</span>
      <div className="overflow-hidden relative w-full h-full flex items-center">
        <div className="radio-marquee pr-12">
          <span>{value}</span>
          <span className="ml-12 opacity-50">{value}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 4 }}
    >
      <style>{marqueeStyle}</style>

      {/* CHUVA DE FUNDO (Atrás da Kombi) */}
      {isRaining && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {rainElements.background.map((drop, i) => (
            <div
              key={i}
              className="kombi-rain-drop"
              style={{
                left: drop.left,
                opacity: drop.opacity,
                animationDuration: `${drop.duration}s`,
                animationDelay: `${drop.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* IMAGEM BASE (Z-index 2 para ficar na frente da chuva de fundo) */}
      <img
        src={img}
        className="w-full h-full object-cover scale-110 pointer-events-none relative"
        style={{
          imageRendering: "pixelated",
          filter: `brightness(${isNight ? 0.5 : isRaining ? 0.8 : 1})`,
          transition: "filter 1s ease-in-out",
          zIndex: 2,
        }}
      />

      {/* CHUVA NO VIDRO (Na frente da imagem) */}
      {isRaining && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3 }}
        >
          {rainElements.glass.map((drop, i) => (
            <div
              key={i}
              className="kombi-glass-drop"
              style={{
                left: drop.left,
                top: drop.top,
                animationDuration: `${drop.duration}s`,
                animationDelay: `${drop.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* FARÓIS (SÓ À NOITE) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          opacity: isNight ? 1 : 0,
          clipPath: `polygon(${headlightPoints})`,
          background: `linear-gradient(to top, rgba(255, 255, 220, 0.45) 0%, rgba(255, 255, 220, 0.15) 60%, transparent 100%)`,
          mixBlendMode: "color-dodge",
          filter: "blur(4px)",
          zIndex: 4,
        }}
      />

      {/* TEXTO DO RÁDIO */}
      <div
        className="absolute bg-[#0a1a0a] rounded-[1px] pointer-events-none font-mono tracking-tighter flex flex-col justify-start p-1"
        style={{
          left: `${dX}%`,
          top: `${dY}%`,
          width: `14%`,
          height: isLarge ? "6.5%" : "5.2%",
          transform: `translate(-50%, -50%) skewX(-1deg)`,
          fontSize: `${dSize}px`,
          color: isDaytimeLum
            ? "rgba(180, 255, 180, 1)"
            : "rgba(150, 255, 150, 0.9)",
          filter: isDaytimeLum
            ? "drop-shadow(0 0 2px rgba(100, 255, 100, 0.8))"
            : "none",
          textShadow: isDaytimeLum
            ? "0 0 5px rgba(100, 255, 100, 0.7)"
            : "0 0 3px rgba(100, 255, 100, 0.4)",
          opacity: 1,
          zIndex: 7,
          lineHeight: lineH,
          transition: "all 1s ease-in-out",
        }}
      >
        {currentTrack ? (
          <>
            <MarqueeRow label="Música:" value={currentTrack.title} />
            <MarqueeRow label="Álbum:" value={currentTrack.album.title} />
            <MarqueeRow
              label="Artista:"
              value={currentTrack.album.artist.name}
            />
          </>
        ) : (
          <div className="h-full flex items-start justify-center animate-pulse">
            SEM SINAL
          </div>
        )}
      </div>

      {/* CAMADA DE LUZES */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: isNight ? 1 : 0,
          mixBlendMode: "screen",
          zIndex: 6,
          background: `
            radial-gradient(circle at ${btn1.x}% ${btn1.y}%, rgba(255, 0, 0, ${btn1.alpha}) 0%, transparent ${btn1.size}%),
            radial-gradient(circle at ${btn2.x}% ${btn2.y}%, rgba(255, 0, 0, ${btn2.alpha}) 0%, transparent ${btn2.size}%),
            radial-gradient(circle at ${gauge1.x}% ${gauge1.y}%, rgba(255, 200, 50, ${gauge1.alpha}) 0%, transparent ${gauge1.size}%),
            radial-gradient(circle at ${gauge2.x}% ${gauge2.y}%, rgba(255, 200, 50, ${gauge2.alpha}) 0%, transparent ${gauge2.size}%),
            radial-gradient(ellipse ${radioBase.w}% ${radioBase.h}% at ${radioBase.x}% ${radioBase.y}%, rgba(100, 255, 100, ${radioBase.alpha}) 0%, transparent 80%)
          `,
        }}
      />
    </div>
  );
};
