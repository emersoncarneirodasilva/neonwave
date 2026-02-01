import { useMemo } from "react";

interface BubblesProps {
  count?: number;
  isNight: boolean;
}

export function Bubbles({ count = 10, isNight }: BubblesProps) {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 30 + 10, // Bolhas entre 10px e 25px
      left: Math.random() * 100,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 15, // Espalha o início das bolhas
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <style>{`
        @keyframes rise-final {
          0% { 
            top: 110%; 
            opacity: 0; 
            transform: scale(0.6) translateX(0); 
          }
          /* Aparece suavemente após sair da borda inferior */
          10% { opacity: var(--op); } 
          50% { transform: scale(1) translateX(20px); }
          /* Mantém visível até quase o fim */
          90% { opacity: var(--op); }
          /* Atravessa o teto antes de sumir */
          100% { 
            top: -20%; 
            opacity: 0; 
            transform: scale(1.2) translateX(-20px); 
          }
        }

        .bubble-clean {
          position: absolute;
          top: 110%; /* Força início fora da tela */
          opacity: 0; 
          border-radius: 50%;
          transition: background 1.5s, border 1.5s;
          /* O modo 'backwards' impede que apareçam no teto ao carregar */
          animation: rise-final linear infinite backwards;
        }
      `}</style>

      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble-clean"
          style={
            {
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              /* Cores variam conforme isNight */
              background: isNight
                ? "rgba(100, 180, 255, 0.2)"
                : "rgba(255, 255, 255, 0.3)",
              border: isNight
                ? "1px solid rgba(255, 255, 255, 0.15)"
                : "1.5px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "inset -2px -2px 4px rgba(255, 255, 255, 0.2)",
              "--op": b.opacity,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
