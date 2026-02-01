import { useMemo } from "react";

export const Clouds = ({ hour }: { hour: number }) => {
  const isNight = hour >= 18 || hour < 6;

  // Cores sólidas para o núcleo e translúcidas para as bordas
  const cloudColor = isNight ? "#3a4466" : "#ffffff";
  const mistColor = isNight
    ? "rgba(40, 45, 70, 0.7)"
    : "rgba(255, 255, 255, 0.4)";

  const randomClouds = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      return {
        id: i,
        top: `${Math.floor(Math.random() * 25) + 5}%`,
        duration: `${Math.floor(Math.random() * 750) + 160}s`,
        delay: `-${Math.floor(Math.random() * 200)}s`,
        scale: (Math.random() * 1.2 + 0.7).toFixed(1),
        width: Math.floor(Math.random() * 100) + 180 + "px",
        height: Math.floor(Math.random() * 40) + 60 + "px",
      };
    });
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <style>{`
        @keyframes drift-linear {
          from { transform: translateX(-400px); }
          to { transform: translateX(110vw); }
        }

        .cloud-wrapper {
          position: absolute;
          left: 0;
          animation: drift-linear var(--d) linear infinite;
          animation-delay: var(--delay);
        }

        /* O segredo: Várias camadas de sombra concentradas */
        .cloud-core {
          position: relative;
          background: ${cloudColor};
          border-radius: 100px;
          filter: blur(8px); /* Blur reduzido para concentrar o spray */
          box-shadow: 
            /* Camadas internas para dar volume */
            inset -15px -15px 30px rgba(0,0,0,0.05),
            /* Spray externo concentrado */
            20px -15px 40px ${mistColor},
            -20px -10px 30px ${mistColor},
            0px 10px 30px ${mistColor};
        }

        /* Pequenas bolhas extras para quebrar a forma oval */
        .cloud-core::after, .cloud-core::before {
          content: '';
          position: absolute;
          background: inherit;
          border-radius: 50%;
        }

        .cloud-core::after {
          width: 60%; height: 140%;
          top: -60%; left: 15%;
        }

        .cloud-core::before {
          width: 45%; height: 110%;
          top: -30%; right: 10%;
        }
      `}</style>

      {randomClouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud-wrapper"
          style={
            {
              "--d": cloud.duration,
              "--delay": cloud.delay,
              top: cloud.top,
              transform: `scale(${cloud.scale})`,
              opacity: isNight ? 0.5 : 0.8,
            } as any
          }
        >
          <div
            className="cloud-core"
            style={{
              width: cloud.width,
              height: cloud.height,
            }}
          />
        </div>
      ))}
    </div>
  );
};
