import React, { useMemo } from "react";
import { motion } from "framer-motion";

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

interface DunesProps {
  time: number;
}

export const DunesLayer: React.FC<DunesProps> = ({ time }) => {
  const vFuga = 18.8;
  const hFuga = 44.1;
  const duration = 12;

  // CÁLCULO DE CORES DINÂMICAS PARA O GRADIENTE
  const colors = useMemo(() => {
    const t = time;
    const keyframes = [
      // Noite: Areia acinzentada (cor de areia, mas sem o brilho do sol)
      { h: 0, top: "#8b7e6d", mid: "#5a5145", bot: "#363028" },
      { h: 5.5, top: "#8b7e6d", mid: "#5a5145", bot: "#363028" },

      // Amanhecer: Transição suave para o dourado
      { h: 7.0, top: "#e3c598", mid: "#c2a378", bot: "#8b6e4d" },

      // Dia (Cores que você gosta)
      { h: 16.5, top: "#e3c598", mid: "#c2a378", bot: "#6b5a42" },

      // Pôr do sol: Areia avermelhada
      { h: 18.0, top: "#9e5f3a", mid: "#6e3a2a", bot: "#3d1f17" },

      // Noite (Retorno)
      { h: 20.0, top: "#8b7e6d", mid: "#5a5145", bot: "#363028" },
      { h: 24, top: "#8b7e6d", mid: "#5a5145", bot: "#363028" },
    ];

    let i = 0;
    while (i < keyframes.length - 2 && t > keyframes[i + 1].h) i++;
    const start = keyframes[i];
    const end = keyframes[i + 1];
    const progress = (t - start.h) / (end.h - start.h);

    return {
      top: lerpColor(start.top, end.top, progress),
      mid: lerpColor(start.mid, end.mid, progress),
      bot: lerpColor(start.bot, end.bot, progress),
    };
  }, [time]);

  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`dune-${i}`}
          className="absolute"
          style={{
            top: `${hFuga}%`,
            left: `${vFuga}%`,
            width: "450px",
            height: "140px",
            // Aplicando o gradiente com as cores dinâmicas
            background: `linear-gradient(170deg, ${colors.top} 0%, ${colors.mid} 45%, ${colors.bot} 100%)`,
            clipPath:
              "path('M 0,100 C 50,90 150,20 220,20 C 230,20 350,60 450,100 Z')",
            transformOrigin: "0% 100%",
          }}
          initial={{ x: "-10%", y: "-5%", scale: 0.1, opacity: 0 }}
          animate={{ x: "150%", y: "25%", scale: 4, opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeIn",
            delay: i * (duration / 4),
          }}
        />
      ))}
    </>
  );
};
