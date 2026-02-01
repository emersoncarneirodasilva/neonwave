import { useMemo, useState, useEffect, useRef } from "react";

export const ForestSky = ({ hour }: { hour: number }) => {
  const isNight = hour >= 18 || hour < 6;
  const [cycleId, setCycleId] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isNight) setCycleId((prev) => prev + 1);
  }, [isNight]);

  const getColors = () => {
    const now = new Date();
    const timeInDecimal = hour + now.getMinutes() / 60;
    if (timeInDecimal >= 4.5 && timeInDecimal < 5)
      return { from: "#1a1a2e", to: "#4a4e69" };
    if (hour >= 5 && hour < 7) return { from: "#ff9e7d", to: "#ffcfd1" };
    if (hour >= 7 && hour < 9) return { from: "#a5d6f7", to: "#e0f6ff" };
    if (hour >= 9 && hour < 12) return { from: "#87CEEB", to: "#B0E2FF" };
    if (hour >= 12 && hour < 15) return { from: "#4fa8ff", to: "#87CEEB" };
    if (hour >= 15 && hour < 17) return { from: "#6190e8", to: "#a7bfe8" };
    if (hour >= 17 && hour < 18) return { from: "#6a5acd", to: "#ff69b4" };
    if (hour >= 18 && hour < 19) return { from: "#2c3e50", to: "#4b0082" };
    return { from: "#05050a", to: "#1a1a2e" };
  };

  const colors = getColors();

  const now = new Date();
  const timeInDecimal = hour + now.getMinutes() / 60;

  // A Galáxia aparece suavemente entre 18:30 e 19:30, ficando 100% às 19:30
  const galaxyOpacity = timeInDecimal >= 19 || timeInDecimal < 5 ? 1 : 0;

  const dailyStars = useMemo(() => {
    let seed = cycleId + 123;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const stars = [];
    for (let i = 0; i < 250; i++) {
      stars.push({
        x: (random() * 100).toFixed(2),
        y: (random() * 80).toFixed(2),
        size: (random() * 2 + 0.5).toFixed(1),
        opacity: (random() * 0.6 + 0.2).toFixed(2),
        delay: (random() * 5).toFixed(1),
        isTwinkle: i % 3 === 0,
      });
    }
    return { stars, angle: Math.PI / 4 + random() * 0.2 };
  }, [cycleId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isNight) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let seed = cycleId + 999;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const angle = dailyStars.angle;

    for (let i = 0; i < 5000; i++) {
      const posAlong = (random() - 0.5) * canvas.width * 2;
      const randNormal = (random() + random() + random()) / 3 - 0.5;
      const spread = randNormal * 200;

      const x =
        posAlong * Math.cos(angle) -
        spread * Math.sin(angle) +
        canvas.width / 2;
      const y =
        posAlong * Math.sin(angle) +
        spread * Math.cos(angle) +
        canvas.height / 3;

      if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
        const opacity = random() * 0.4 * (1 - Math.abs(spread) / 100);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, random() * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [cycleId, isNight, dailyStars.angle]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      <style>{`
        @property --sky-from { syntax: '<color>'; initial-value: #05050a; inherits: false; }
        @property --sky-to { syntax: '<color>'; initial-value: #1a1a2e; inherits: false; }

        .sky-gradient {
          --sky-from: ${colors.from};
          --sky-to: ${colors.to};
          background: linear-gradient(to bottom, var(--sky-from), var(--sky-to));
          transition: --sky-from 5s ease-in-out, --sky-to 5s ease-in-out;
        }

        .milky-way-glow {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(ellipse at 50% 40%, rgba(66, 30, 122, 0.2) 0%, transparent 70%);
          transform: rotate(${dailyStars.angle}rad) scale(3);
          filter: blur(80px);
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <div className="sky-gradient absolute inset-0 w-full h-full" />

      {/* 2. CAMADA DA NOITE */}
      <div
        className={`absolute inset-0 transition-opacity duration-5000 ${isNight ? "opacity-100" : "opacity-0"}`}
      >
        {/* Camada específica da Galáxia com transição suave controlada pelo tempo */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: galaxyOpacity }}
        >
          <div className="milky-way-glow" />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        {/* Suas estrelas originais - Aparecem assim que isNight é true (18h) */}
        {dailyStars.stars.map((s, i) => (
          <div
            key={`${cycleId}-${i}`}
            className="absolute bg-white rounded-full shadow-[0_0_2px_white]"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animation: s.isTwinkle
                ? `twinkle 4s infinite ease-in-out ${s.delay}s`
                : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};
