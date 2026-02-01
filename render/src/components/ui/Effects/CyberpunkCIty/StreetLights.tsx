import React from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export const StreetLights: React.FC = () => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Poste 1 - Esquerda (Mais Próximo) */}
      <div
        className="absolute transition-all duration-500"
        style={
          isLarge
            ? { left: "31.1%", bottom: "7.8%", width: "50px", height: "130px" } // Ativo (Grande)
            : { left: "21.8%", bottom: "4.6%", width: "50px", height: "130px" } // Comentado (Pequeno)
        }
      >
        <div className="light-beam" />
        <div className="light-source" />
      </div>

      {/* Poste 2 - Meio (COM DEFEITO) */}
      <div
        className="absolute transition-all duration-500"
        style={
          isLarge
            ? { left: "39.9%", bottom: "2%", width: "40px", height: "100px" } // Ativo (Grande)
            : { left: "34.7%", bottom: "-0.5%", width: "40px", height: "100px" } // Comentado (Pequeno)
        }
      >
        <div className="light-beam opacity-80 broken-flicker" />
        <div className="light-source broken-flicker" />
      </div>

      {/* Poste 3 - Fundo */}
      <div
        className="absolute transition-all duration-500"
        style={
          isLarge
            ? { left: "49.2%", bottom: "-4.7%", width: "30px", height: "70px" } // Ativo (Grande)
            : { left: "48.5%", bottom: "-6.4%", width: "30px", height: "70px" } // Comentado (Pequeno)
        }
      >
        <div className="light-beam opacity-60" />
        <div className="light-source" />
      </div>

      <style>{`
        .light-beam {
          position: absolute;
          width: 100%;
          height: 100%; 
          clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%); 
          background: linear-gradient(
            to bottom, 
            rgba(200, 255, 255, 0.4) 0%, 
            rgba(200, 255, 255, 0.1) 60%, 
            transparent 100%
          );
          filter: blur(4px);
          animation: beamPulse 4s infinite ease-in-out;
          transform: rotate(25deg);
          transform-origin: top center;
        }

        .light-source {
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 3px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 15px 2px rgba(255, 255, 255, 0.8);
          z-index: 2;
        }

        .broken-flicker {
          animation: brokenLamp 3s infinite !important;
        }

        @keyframes beamPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes brokenLamp {
          0%, 10%, 12%, 20%, 22%, 50%, 70%, 72%, 100% { opacity: 1; }
          11%, 21%, 71%, 73% { opacity: 0.1; }
          23%, 25% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
