interface SnowProps {
  intensity: number; // 0: nada, 1: leve, 2: moderada, 3: nevasca
}

export const WinterSnow = ({ intensity }: SnowProps) => {
  if (intensity === 0) return null;

  // Define a quantidade de flocos baseado na intensidade
  const flakeCount = intensity === 1 ? 40 : intensity === 2 ? 120 : 350;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Criamos os flocos dinamicamente */}
      {[...Array(flakeCount)].map((_, i) => (
        <div
          key={i}
          className={`snowflake ${intensity === 3 ? "blizzard" : ""}`}
          style={{
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            // Velocidade: nevasca (intensity 3) cai muito mais rápido
            animationDuration: `${Math.random() * (intensity === 3 ? 0.8 : 3) + (intensity === 1 ? 5 : 2)}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      <style>{`
        .snowflake {
          position: absolute;
          top: -10px;
          background: white;
          border-radius: 50%;
          filter: blur(1px);
          animation: fall linear infinite;
        }

        /* Na nevasca, os flocos ficam mais "borrados" pelo vento */
        .blizzard {
          filter: blur(2px);
          box-shadow: 0 0 3px white;
        }

        @keyframes fall {
          0% { transform: translateY(0vh) translateX(0); }
          100% { 
            /* Na nevasca, o vento joga a neve muito mais para o lado (150px) */
            transform: translateY(110vh) translateX(${intensity === 3 ? "150px" : "30px"}); 
          }
        }
      `}</style>
    </div>
  );
};
