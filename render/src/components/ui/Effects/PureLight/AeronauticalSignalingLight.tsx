import React, { useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface AeronauticalSignalingLightProps {
  hour: number;
}

export const AeronauticalSignalingLight: React.FC<
  AeronauticalSignalingLightProps
> = ({ hour }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const isNight = hour > 18.5 || hour < 5;

  // Pontos de sinalização ajustados por tamanho de tela
  const signalingPoints = useMemo(() => {
    if (isLarge) {
      return [
        { top: "31.5%", left: "78%", delay: "0s" },
        { top: "44%", left: "68.2%", delay: "0.5s" },
        { top: "46.2%", left: "55.28%", delay: "0.2s" },
      ];
    } else {
      return [
        { top: "33.7%", left: "78%", delay: "0s" },
        { top: "42%", left: "68.2%", delay: "0.5s" },
        { top: "43.5%", left: "55.28%", delay: "0.2s" },
      ];
    }
  }, [isLarge]); // Re-calcula apenas quando o breakpoint muda

  const globalOpacity = useMemo(() => {
    if (hour > 17.5 && hour < 19.5) return (hour - 17.5) / 2;
    if (hour >= 19.5 || hour <= 4.5) return 1;
    if (hour > 4.5 && hour < 5.5) return 1 - (hour - 4.5);
    return 0;
  }, [hour]);

  if (!isNight) return null;

  return (
    <>
      <style>{`
        @keyframes signaling-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.4; filter: blur(2px); }
          50% { transform: scale(1.3); opacity: 1; filter: blur(3px) brightness(1.8); }
        }
        .signaling-bulb {
          animation: signaling-pulse 2.5s infinite ease-in-out;
          will-change: transform, opacity;
        }
      `}</style>

      {signalingPoints.map((point, i) => (
        <div
          key={`${isLarge ? "lg" : "sm"}-${i}`} // Key dinâmica ajuda no re-render ao trocar de tela
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: point.top,
            left: point.left,
            opacity: globalOpacity,
            transform: "translate(-50%, -50%)",
            transition: "all 0.5s ease", // Suaviza a transição de posição ao redimensionar
            zIndex: 40,
          }}
        >
          <div
            className="signaling-bulb absolute rounded-full bg-red-600"
            style={{
              width: isLarge ? "10px" : "8px", // Luzes ligeiramente maiores em telas grandes
              height: isLarge ? "10px" : "8px",
              filter: "blur(4px)",
              animationDelay: point.delay,
            }}
          />

          <div
            className="signaling-bulb absolute rounded-full bg-red-100"
            style={{
              width: "2px",
              height: "2px",
              boxShadow: "0 0 5px 1.5px #ff0000",
              animationDelay: point.delay,
            }}
          />
        </div>
      ))}
    </>
  );
};
