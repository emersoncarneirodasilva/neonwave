import { useMemo } from "react";

export const Rain = ({ isRaining }: { isRaining: boolean }) => {
  const drops = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 120}%`,
      duration: `${Math.random() * 0.3 + 0.5}s`,
      delay: `${Math.random() * 2}s`,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-2000 ${
        isRaining ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 11 }}
    >
      <style>{`
        @keyframes rain-fall {
          0% { transform: translateY(-100vh) translateX(0px); }
          100% { transform: translateY(100vh) translateX(-30px); }
        }

        .rain-drop {
          position: absolute;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.6));
          width: 1px;
          height: 60px;
          top: -100px;
          animation: rain-fall var(--d) linear infinite;
          animation-delay: var(--delay);
        }

        .rain-mist {
          position: absolute;
          inset: 0;
          background: rgba(40, 50, 80, 0.15);
          backdrop-filter: blur(1px);
        }
      `}</style>

      {/* Efeito de neblina/atmosfera pesada quando chove */}
      <div className="rain-mist" />

      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={
            {
              left: drop.left,
              opacity: drop.opacity,
              "--d": drop.duration,
              "--delay": drop.delay,
            } as any
          }
        />
      ))}
    </div>
  );
};
