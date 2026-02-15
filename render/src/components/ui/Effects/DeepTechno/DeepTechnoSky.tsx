import { useMemo, useState, useEffect } from "react";
import { AeroLayer } from "../../AeroLayer";

interface DeepTechnoSkyProps {
  hour: number;
  intensity: "weak" | "moderate" | "storm" | "none";
}

export const DeepTechnoSky = ({ hour, intensity }: DeepTechnoSkyProps) => {
  const isRaining = intensity !== "none";
  const isStorm = intensity === "storm";
  const isNight = hour >= 19 || hour < 5;

  // Estado para controlar o disparo do raio
  const [lightning, setLightning] = useState(false);

  // Lógica de cores do céu e nuvens (Mantida conforme sua preferência)
  const skyStyles = useMemo(() => {
    let styles = {
      from: "#05050a",
      to: "#000000",
      cloudColor: "rgba(100, 100, 255, 0.3)",
    };

    if (hour >= 5 && hour < 7) {
      styles = {
        from: "#1a1a40",
        to: "#ff7e5f",
        cloudColor: "rgba(255, 126, 95, 0.5)",
      };
    } else if (hour >= 7 && hour < 17) {
      styles = {
        from: "#1E90FF",
        to: "#87CEEB",
        cloudColor: "rgba(255, 255, 255, 0.7)",
      };
    } else if (hour >= 17 && hour < 19) {
      styles = {
        from: "#4b0082",
        to: "#fd746c",
        cloudColor: "rgba(253, 116, 108, 0.5)",
      };
    }

    if (isRaining) {
      styles.cloudColor = isStorm
        ? "rgba(20, 20, 30, 0.8)"
        : "rgba(60, 60, 70, 0.6)";

      if (hour >= 7 && hour < 17) {
        styles.from = "#4682B4";
        styles.to = "#708090";
      }
    }

    return styles;
  }, [hour, isRaining, isStorm]);

  // Efeito para disparar raios aleatórios durante a tempestade
  useEffect(() => {
    if (!isStorm) {
      setLightning(false);
      return;
    }

    let nextLightningTimer: number;

    const triggerLightning = () => {
      setLightning(true);
      setTimeout(() => setLightning(false), 100 + Math.random() * 200);
      const nextIn = 3000 + Math.random() * 7000;
      nextLightningTimer = setTimeout(triggerLightning, nextIn);
    };

    nextLightningTimer = setTimeout(triggerLightning, 2000);

    return () => {
      clearTimeout(nextLightningTimer);
    };
  }, [isStorm]);

  const skyElements = useMemo(
    () => ({
      stars: Array.from({ length: 120 }).map(() => ({
        top: `${Math.random() * 60}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8,
      })),
      clouds: Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        top: 10 + Math.random() * 40,
        speed: 35 + Math.random() * 20,
        scale: 0.8 + Math.random() * 0.5,
        delay: `-${Math.random() * 100}s`,
      })),
    }),
    [],
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      <style>{`
        @property --sky-from { syntax: '<color>'; initial-value: #000000; inherits: false; }
        @property --sky-to { syntax: '<color>'; initial-value: #000000; inherits: false; }

        .sky-gradient {
          --sky-from: ${skyStyles.from};
          --sky-to: ${skyStyles.to};
          --sky-brightness: ${isRaining ? "0.5" : "1.0"};
          
          background: linear-gradient(to bottom, var(--sky-from), var(--sky-to));
          filter: brightness(var(--sky-brightness));
          
          /* Transição de 5s aplicada a tudo: cores e brilho */
          transition: 
            --sky-from 5s ease-in-out, 
            --sky-to 5s ease-in-out,
            filter 5s ease-in-out;
        }

        .lightning-flash {
          background: white;
          opacity: 0;
          transition: opacity 0.1s;
        }
        .lightning-active {
          opacity: 0.3;
        }

        @keyframes cloud-drift {
          from { transform: translateX(-300px) scale(var(--sc)); }
          to { transform: translateX(calc(100vw + 300px)) scale(var(--sc)); }
        }

        .real-cloud {
          position: absolute;
          width: 250px;
          height: 60px;
          background: ${skyStyles.cloudColor};
          border-radius: 50%;
          filter: blur(40px);
          animation: cloud-drift linear infinite;
          will-change: transform;
          /* Transição suave de cor nas nuvens também */
          transition: background 5s ease-in-out;
        }
      `}</style>

      {/* Camada 1: Fundo Suave */}
      <div className="sky-gradient absolute inset-0 w-full h-full" />

      {/* Camada do Flash do Raio */}
      <div
        className={`lightning-flash absolute inset-0 z-10 ${lightning ? "lightning-active" : ""}`}
      />

      {/* Camada 2: Estrelas (Transição de 5s para sumir na chuva) */}
      <div
        className={`absolute inset-0 transition-opacity duration-5000 ${isNight && !isStorm ? "opacity-100" : "opacity-0"}`}
      >
        {skyElements.stars.map((s, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {!isRaining && <AeroLayer hour={hour} />}

      {/* Camada 3: Nuvens */}
      {skyElements.clouds.map((c) => (
        <div
          key={c.id}
          className="real-cloud"
          style={
            {
              top: `${c.top}%`,
              animationDuration: `${c.speed}s`,
              animationDelay: c.delay,
              opacity: isRaining ? 0.9 : 0.5,
              "--sc": c.scale,
            } as any
          }
        />
      ))}

      {/* Camada 4: O Raio Visual */}
      {lightning && (
        <div
          className="absolute z-20 bg-white"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: 0,
            width: "2px",
            height: "60%",
            filter: "blur(1px) drop-shadow(0 0 10px white)",
            clipPath:
              "polygon(50% 0%, 0% 20%, 100% 40%, 0% 60%, 100% 80%, 50% 100%)",
          }}
        />
      )}
    </div>
  );
};
