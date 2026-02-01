import { useMemo } from "react";

interface SkyProps {
  time: number;
}

export const WinterSky = ({ time }: SkyProps) => {
  const getStarsOpacity = () => {
    if (time >= 17 || time < 8) {
      if (time >= 17 && time < 19) return (time - 17) / 2;
      if (time >= 5 && time < 8) return (8 - time) / 3;
      return 1;
    }
    return 0;
  };

  const getAuroraOpacity = () => {
    if (time >= 20 || time < 5) {
      if (time >= 20 && time < 22) return (time - 20) / 2;
      if (time >= 3 && time < 5) return (5 - time) / 2;
      return 0.7;
    }
    return 0;
  };

  const starsBoxShadow = useMemo(() => {
    const starCount = 180;
    const shadows = [];
    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() * 100).toFixed(2);
      const y = (Math.random() * 100).toFixed(2);
      const opacity = (Math.random() * 0.4 + 0.2).toFixed(2);
      shadows.push(`${x}vw ${y}vh 0 rgba(255, 255, 255, ${opacity})`);
    }
    return shadows.join(", ");
  }, []);

  const getSkyColors = () => {
    if (time >= 5 && time < 9)
      return "from-[#1a1c2c] via-[#4a4e69] via-[#9b59b6] to-[#e67e22]";
    if (time >= 9 && time < 15)
      return "from-[#2c3e50] via-[#34495e] to-[#7f8c8d]";
    if (time >= 15 && time < 18)
      return "from-[#0f0c29] via-[#302b63] to-[#24243e]";
    return "from-[#020205] via-[#050508] to-[#000000]";
  };

  return (
    <div
      className={`absolute inset-0 z-0 bg-linear-to-b transition-colors duration-10000 ${getSkyColors()}`}
    >
      {/* CAMADA DA AURORA - EFEITO CORTINA PREENCHIDA */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-8000"
        style={{ opacity: getAuroraOpacity() }}
      >
        <div className="aurora-fixed-container">
          {/* Camada Verde (Principal) */}
          <div className="aurora-curtain green-curtain" />
          {/* Camada Violeta (Profundidade) */}
          <div className="aurora-curtain purple-curtain" />
        </div>
      </div>

      {/* ESTRELAS */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-5000"
        style={{ opacity: getStarsOpacity() }}
      >
        <div className="stars-fixed" style={{ boxShadow: starsBoxShadow }} />
      </div>

      <style>{`
        .stars-fixed {
          width: 1px; height: 1px;
          background: transparent;
          position: absolute;
          top: 0; left: 0;
        }

        .aurora-fixed-container {
          position: absolute;
          width: 200%; height: 100%;
          left: -50%; top: -10%;
          /* Máscara que cria o arco da imagem f2b58d */
          mask-image: radial-gradient(ellipse 50% 60% at 50% 10%, black 25%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 50% 60% at 50% 10%, black 25%, transparent 80%);
        }

        .aurora-curtain {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
        }

        .green-curtain {
          /* Raios muito próximos para parecer uma cortina densa */
          background: repeating-linear-gradient(
            90deg,
            rgba(0, 255, 160, 0) 0%,
            rgba(0, 255, 160, 0.2) 2%,
            rgba(0, 255, 200, 0.5) 4%,
            rgba(0, 255, 160, 0.2) 6%,
            rgba(0, 255, 160, 0) 8%
          );
          background-size: 200% 100%;
          filter: blur(6px);
          animation: aurora-move 120s linear infinite;
        }

        .purple-curtain {
          /* Adiciona a cor violeta lateral da imagem f2b58d */
          background: repeating-linear-gradient(
            90deg,
            transparent 0%,
            rgba(155, 89, 182, 0.1) 10%,
            rgba(130, 80, 250, 0.3) 15%,
            transparent 30%
          );
          background-size: 150% 100%;
          filter: blur(15px);
          animation: aurora-move 180s linear infinite reverse;
        }

        @keyframes aurora-move {
          from { background-position: 0% 0%; transform: skewX(-10deg); }
          to { background-position: 100% 0%; transform: skewX(10deg); }
        }
      `}</style>
    </div>
  );
};
