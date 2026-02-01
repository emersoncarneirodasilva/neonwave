import React from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export const NeonGlow: React.FC = () => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {/* 1. PAINEL PRINCIPAL (Roxo) */}
      <div
        className="neon-layer bg-purple-600/40 blur-[90px] animate-neon-pulse transition-all duration-700"
        style={{
          mixBlendMode: "screen",
          borderRadius: "50%",
          right: isLarge ? "12%" : "7%",
          top: isLarge ? "18%" : "15%",
          width: "35%",
          height: "45%",
        }}
      />

      {/* 2. PAINEL ROSA (Esquerda Superior) */}
      <div
        className="neon-layer bg-pink-600/70 blur-3xl animate-neon-flicker transition-all duration-700"
        style={{
          borderRadius: "50%",
          left: isLarge ? "22.8%" : "12%",
          top: isLarge ? "18%" : "12%",
          width: "8%",
          height: isLarge ? "20%" : "30%",
        }}
      />

      {/* 3. PAINEL CIANO (Esquerda Meio) */}
      <div
        className="neon-layer bg-cyan-400/60 blur-2xl animate-neon-pulse transition-all duration-700"
        style={{
          animationDuration: "3.5s",
          borderRadius: "50%",
          left: isLarge ? "24.3%" : "13%",
          top: isLarge ? "37%" : "40%",
          width: "6%",
          height: "15%",
        }}
      />

      {/* 4. PAINEL ROSA (Topo Central) */}
      <div
        className="neon-layer bg-pink-500/80 blur-2xl animate-neon-flicker-intense transition-all duration-700"
        style={{
          borderRadius: "50%",
          left: isLarge ? "32.7%" : "25%",
          top: "3%",
          width: "6%",
          height: isLarge ? "35%" : "30%",
        }}
      />

      {/* 5. FILETE CIANO (Topo Central) */}
      <div
        className="neon-layer bg-cyan-300/90 blur-xl animate-neon-flicker transition-all duration-700"
        style={{
          animationDuration: "2.5s",
          borderRadius: "50%",
          left: isLarge ? "38.6%" : "34.5%",
          top: "2%",
          width: "4%",
          height: "15%",
        }}
      />

      {/* ELEMENTOS EXCLUSIVOS PARA TELA GRANDE */}
      {isLarge && (
        <>
          {/* PAINEL CIANO */}
          <div
            className="neon-layer bg-cyan-400/60 left-[1.4%] top-[30%] w-[6%] h-[18%] blur-2xl animate-neon-flicker"
            style={{ animationDuration: "3.5s", borderRadius: "50%" }}
          />

          {/* PAINEL ROSA */}
          <div
            className="neon-layer bg-pink-600/70 left-[10%] top-[6%] w-[2.2%] h-[18%] blur-xl animate-neon-flicker"
            style={{ borderRadius: "50%" }}
          />
        </>
      )}

      {/* 6. TUBO NEON DIAGONAL */}
      <div
        className="absolute animate-neon-flicker transition-all duration-700"
        style={{
          zIndex: 6,
          left: isLarge ? "-1.875rem" : "-0.625rem", // Equivalente a -left-7.5 e -left-2.5
          top: isLarge ? "65.5%" : "62.5%",
          width: isLarge ? "32%" : "20%",
          height: "0.5%",
          transform: isLarge ? "rotate(-12.5deg)" : "rotate(-15deg)",
          background:
            "linear-gradient(to right, transparent, #a855f7, #e879f9, #a855f7, transparent)",
          filter: "blur(6px)",
          boxShadow: "0 0 25px 2px rgba(168, 85, 247, 0.4)",
          mixBlendMode: "color-dodge",
          borderRadius: "100px",
        }}
      />

      {/* 7. ILUMINAÇÃO DE AMBIENTE (Fixa) */}
      <div
        className="neon-layer bg-blue-900/30 bottom-[-10%] left-0 w-full h-[40%] blur-[120px]"
        style={{ mixBlendMode: "multiply", borderRadius: "50%" }}
      />

      <style>{`
        .neon-layer {
          position: absolute;
          will-change: opacity;
        }

        @keyframes neonPulse {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(-15deg); }
          50% { opacity: 1; transform: scale(1.03) rotate(-15deg); }
        }

        @keyframes neonFlicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 0.8; }
          20%, 24%, 55% { opacity: 0.3; }
        }

        @keyframes neonFlickerIntense {
          0%, 10%, 12%, 20%, 22%, 50%, 52%, 54%, 90%, 100% { opacity: 1; }
          11%, 21%, 51%, 53%, 91% { opacity: 0; }
        }

        .animate-neon-pulse { animation: neonPulse 5s infinite ease-in-out; }
        .animate-neon-flicker { animation: neonFlicker 4s infinite; }
        .animate-neon-flicker-intense { animation: neonFlickerIntense 0.8s infinite; }
      `}</style>
    </div>
  );
};
