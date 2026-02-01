import React from "react";

interface MarqueeTextProps {
  text: string;
  width?: string; // largura visível
  speed?: number; // pixels por segundo
  className?: string; // classes Tailwind extras
  style?: React.CSSProperties; // permite sobrescrever estilos
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  width = "220px",
  speed = 50,
  className,
  style,
}) => {
  const duration = Math.max(text.length * (100 / speed), 5); // mínimo 5s

  // efeito neon/telão padrão
  const neonStyle: React.CSSProperties = {
    filter: "blur(0.4px)",
    textShadow: `
      0 0 4px currentColor,
      0 0 8px currentColor,
      0 0 12px currentColor
    `,
  };

  return (
    <div
      style={{
        width,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div
        className={className}
        style={{
          display: "inline-block",
          paddingLeft: "100%",
          animation: `marquee ${duration}s linear infinite`,
          ...neonStyle,
          ...style, // sobrescreve se precisar
        }}
      >
        {text}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};
