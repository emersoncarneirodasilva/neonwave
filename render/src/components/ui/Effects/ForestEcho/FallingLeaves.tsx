import { useMemo } from "react";

export const FallingLeaves = ({ isNight }: { isNight: boolean }) => {
  const leaves = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 15}s`, // Queda bem lenta
      delay: `${Math.random() * 20}s`,
      size: `${Math.random() * 8 + 8}px`, // Tamanhos variados
      rotation: `${Math.random() * 360}deg`,
      swingDuration: `${Math.random() * 2 + 3}s`, // Balanço lateral
    }));
  }, []);

  // Cores: Marrom/Verde seco para o dia, tons escuros e azulados para a noite
  const leafColor = isNight ? "#2d3436" : "#636e72";
  const leafSecondaryColor = isNight ? "#1e272e" : "#2f3640";

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 11 }}
    >
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }

        @keyframes swing {
          0%, 100% { transform: translateX(-20px) rotate(-10deg); }
          50% { transform: translateX(20px) rotate(10deg); }
        }

        .leaf-container {
          position: absolute;
          top: -50px;
          animation: fall var(--fall-dur) linear infinite;
          animation-delay: var(--delay);
        }

        .leaf-shape {
          width: var(--size);
          height: var(--size);
          background: ${leafColor};
          /* Formato de folha simples e elegante */
          border-radius: 2px 50%;
          border: 1px solid ${leafSecondaryColor};
          animation: swing var(--swing-dur) ease-in-out infinite;
        }
      `}</style>

      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf-container"
          style={
            {
              left: leaf.left,
              "--fall-dur": leaf.duration,
              "--delay": leaf.delay,
            } as any
          }
        >
          <div
            className="leaf-shape"
            style={
              {
                "--size": leaf.size,
                "--swing-dur": leaf.swingDuration,
                transform: `rotate(${leaf.rotation})`,
                opacity: isNight ? 0.8 : 0.9,
              } as any
            }
          />
        </div>
      ))}
    </div>
  );
};
