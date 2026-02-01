import React, { useEffect, useRef } from "react";

// Definimos os tipos de intensidade
export type RainIntensity = "low" | "medium" | "high";

interface RainEffectProps {
  isRaining: boolean;
  intensityLevel?: RainIntensity;
}

export const RainEffect: React.FC<RainEffectProps> = ({
  isRaining,
  intensityLevel = "low",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let flashOpacity = 0; // Controle do clarão do relâmpago

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Configurações baseadas no nível
    const config = {
      low: { count: 100, speed: 12, length: 10, width: 1 },
      medium: { count: 250, speed: 20, length: 25, width: 2 },
      high: { count: 400, speed: 30, length: 40, width: 2.5 },
    }[intensityLevel];

    const drops = Array.from({ length: config.count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * 5 + config.speed,
      l: Math.random() * 5 + config.length,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isRaining) {
        // --- LÓGICA DO RELÂMPAGO (Apenas no modo High) ---
        if (intensityLevel === "high") {
          if (Math.random() > 0.997) flashOpacity = 0.3; // Dispara o clarão
          if (flashOpacity > 0) {
            ctx.fillStyle = `rgba(200, 230, 255, ${flashOpacity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            flashOpacity -= 0.02; // Desvanece o clarão aos poucos
          }
        }

        // --- DESENHO DA CHUVA ---
        ctx.strokeStyle = "rgba(200, 225, 255, 0.6)";
        ctx.lineWidth = config.width;
        ctx.lineCap = "round";

        drops.forEach((d) => {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x, d.y + d.l);
          ctx.stroke();

          d.y += d.v;
          if (d.y > canvas.height) {
            d.y = -50;
            d.x = Math.random() * canvas.width;
          }
        });
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isRaining, intensityLevel]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
