import { useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export const Campfire = ({ isNight }: { isNight: boolean }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const embers = useMemo(() => {
    return Array.from({ length: 12 }).map((_) => ({
      left: `${20 + Math.random() * 60}%`,
      size: `${4 + Math.random() * 6}px`,
      duration: `${0.6 + Math.random() * 0.4}s`,
      delay: `${Math.random() * 1}s`,
    }));
  }, []);

  return (
    <div
      className={`absolute transition-opacity duration-3000 ${isNight ? "opacity-100" : "opacity-0"}`}
      style={{
        bottom: isLarge ? "0%" : "16%",
        left: isLarge ? "26.9%" : "26.1%",
        width: isLarge ? "80px" : "60px",
        height: isLarge ? "100px" : "80px",
        zIndex: 15,
      }}
    >
      <style>{`
        @keyframes flame-rise {
          0% { transform: translateY(0) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }

        @keyframes fire-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .ember {
          position: absolute;
          bottom: 0;
          border-radius: 2px; /* Estilo pixelado */
          background: #ff4500;
          filter: blur(1px);
        }

        .fire-glow-base {
          position: absolute;
          bottom: -10px; left: -20px; width: 100px; height: 100px;
          background: radial-gradient(circle, rgba(255,100,0,0.6) 0%, transparent 70%);
          border-radius: 50%;
          animation: fire-glow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Brilho da base no chão */}
      <div className="fire-glow-base" />

      {/* Partículas de chama */}
      {embers.map((e, i) => (
        <div
          key={i}
          className="ember"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            backgroundColor: i % 2 === 0 ? "#ffae00" : "#ff4500", // Alterna amarelo e laranja
            animation: `flame-rise ${e.duration} infinite ease-in ${e.delay}`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? "#ffae00" : "#ff4500"}`,
          }}
        />
      ))}
    </div>
  );
};
