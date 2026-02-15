import { useWindowSize } from "../../../../hooks/useWindowSize";

interface CityNeonGlowLight {
  hour: number;
}

export const CityNeonLights = ({ hour }: CityNeonGlowLight) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const isNight = hour >= 19 || hour < 5;

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-3000 ${
        isNight ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1 a 5: Seus glows originais (Ciano central, Roxo esquerda, Abajur, Antenas, Reflexo) */}
      <div
        className="neon-layer bg-cyan-400/50 blur-[20px] animate-neon-pulse"
        style={{
          top: isLarge ? "26%" : "33%",
          left: "42.5%",
          width: "6%",
          height: isLarge ? "20%" : "15%",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />
      <div
        className="neon-layer bg-purple-600/60 blur-[20px] animate-neon-flicker"
        style={{
          top: isLarge ? "33%" : "38%",
          left: "30.7%",
          width: "6%",
          height: isLarge ? "22%" : "15%",
          borderRadius: "50%",
        }}
      />
      <div
        className="neon-layer animate-neon-flicker"
        style={{
          top: isLarge ? "45%" : "46.5%",
          left: "0%",
          width: "30%",
          height: "25%",
          background:
            "linear-gradient(to bottom, rgba(249, 115, 22, 0.4), transparent)",
          clipPath: isLarge
            ? "polygon(50% 0%, 75% 0%, 120% 95%, 12% 100%)"
            : "polygon(50% 0%, 75% 0%, 120% 80%, 0% 100%)",
          filter: "blur(12px)",
          animationDuration: "4s",
          opacity: 0.8,
        }}
      />

      {/* Luzes de Antena/Obstrução */}
      <div
        className="neon-layer bg-red-500 blur-[5px] animate-neon-flicker-intense"
        style={{
          top: isLarge ? "-0.5%" : "14.2%",
          left: "28.12%",
          width: "1.5%",
          height: "1.5%",
          borderRadius: "50%",
        }}
      />
      <div
        className="neon-layer bg-red-500 blur-xs"
        style={{
          top: isLarge ? "15.5%" : "25.8%",
          left: "44%",
          width: "1.5%",
          height: "1.5%",
          borderRadius: "50%",
        }}
      />
      <div
        className="neon-layer bg-red-500 blur-[3px] animate-neon-pulse"
        style={{
          top: isLarge ? "13.5%" : "24.2%",
          left: "16.6%",
          width: "1.5%",
          height: "1.5%",
          borderRadius: "50%",
        }}
      />

      <div
        className="neon-layer bg-indigo-900/40 blur-[20px]"
        style={{
          top: isLarge ? "56%" : "52.5%",
          left: "38%",
          width: "9%",
          height: "4%",
          borderRadius: "50%",
        }}
      />

      <div
        className="neon-layer bg-purple-500/40 blur-[10px] animate-neon-pulse"
        style={{
          top: isLarge ? "6%" : "19%",
          left: "25%",
          width: "6.5%",
          height: isLarge ? "9%" : "7%",
          borderRadius: "10px",
        }}
      />
      <div
        className="neon-layer bg-purple-500/40 blur-[10px] animate-neon-pulse"
        style={{
          top: isLarge ? "24%" : "32.1%",
          left: "38.1%",
          width: "2.5%",
          height: isLarge ? "12.5%" : "8.5%",
          borderRadius: "10px",
        }}
      />

      {/* 7. Seu letreiro ciano lateral */}
      <div
        className="neon-layer bg-cyan-400/30 blur-[10px] animate-neon-flicker"
        style={{
          top: isLarge ? "19%" : "28.5%",
          left: "7.5%",
          width: "6%",
          height: isLarge ? "15%" : "10%",
          borderRadius: "5px",
        }}
      />

      {/* --- 8. ILUMINAÇÃO DO CACTO NEON --- */}
      {/* Brilho principal do Cacto (Ciano vibrante) */}
      <div
        className="neon-layer bg-cyan-300/60 blur-[15px] animate-neon-flicker"
        style={{
          top: isLarge ? "16%" : "27%",
          left: "88.5%",
          width: isLarge ? "10%" : "9%",
          height: isLarge ? "25%" : "15%",
          borderRadius: "40%",
          animationDuration: "3s", // Flicker um pouco mais rápido que os prédios
        }}
      />
      {/* Glow secundário para dar volume ao redor do vaso */}
      <div
        className="neon-layer bg-cyan-500/20 blur-[30px]"
        style={{
          top: "32%",
          left: "86%",
          width: "14%",
          height: "20%",
          borderRadius: "50%",
        }}
      />

      <style>{`
        .neon-layer {
          position: absolute;
          will-change: transform, opacity;
          mix-blend-mode: screen;
        }

        @keyframes neonPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 0.6; }
          20%, 24%, 55% { opacity: 0.2; }
        }

        @keyframes neonFlickerIntense {
          0%, 10%, 12%, 20%, 22%, 50%, 52%, 54%, 90%, 100% { opacity: 1; }
          11%, 21%, 51%, 53%, 91% { opacity: 0.2; }
        }

        .animate-neon-pulse { animation: neonPulse 6s infinite ease-in-out; }
        .animate-neon-flicker { animation: neonFlicker 5s infinite; }
        .animate-neon-flicker-intense { animation: neonFlickerIntense 2s infinite; }
      `}</style>
    </div>
  );
};
