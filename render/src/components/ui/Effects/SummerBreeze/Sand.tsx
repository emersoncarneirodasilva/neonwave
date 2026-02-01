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

interface SandProps {
  time: number;
}

export const Sand: React.FC<SandProps> = ({ time }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const colors = useMemo(() => {
    const t = time;
    const keyframes = [
      { h: 0, sand: "#5d5045" }, // Noite
      { h: 5.5, sand: "#5d5045" },
      { h: 7.0, sand: "#d2b48c" }, // Manhã
      { h: 16.5, sand: "#e8d0aa" }, // Sol pleno (segura até tarde)
      { h: 18.0, sand: "#8b5e5e" }, // Pôr do sol (avermelhado)
      { h: 20.0, sand: "#5d5045" }, // Noite
      { h: 24, sand: "#5d5045" },
    ];

    let i = 0;
    while (i < keyframes.length - 2 && t > keyframes[i + 1].h) i++;
    const start = keyframes[i];
    const end = keyframes[i + 1];
    const progress = (t - start.h) / (end.h - start.h);

    return {
      currentSand: lerpColor(start.sand, end.sand, progress),
    };
  }, [time]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        background: `linear-gradient(to right, transparent 50%, ${colors.currentSand} 52%)`,
        clipPath: isLarge
          ? "polygon(50% 45%, 100% 45%, 100% 100%, 75% 100%)"
          : "polygon(50% 46.5%, 100% 46.5%, 100% 100%, 75% 100%)",
        filter: "contrast(1.2) brightness(0.85)",
      }}
    >
      {/* TEXTURA ORGÂNICA VIA SVG NOISE */}
      <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay">
        <filter id="sandNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sandNoise)" />
      </svg>

      {/* SOMBRA DE RELEVO (DUNA) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.1) 100%),
            linear-gradient(to bottom, transparent 46%, rgba(0,0,0,0.2) 60%, transparent 100%)
          `,
        }}
      />

      {/* BRILHO DO SOL NA AREIA */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.2) 0%, transparent 60%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
};
