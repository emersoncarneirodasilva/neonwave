import { useState, useEffect, useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export const LaptopTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const config = {
    width: isLarge ? "200px" : "115px",
    height: isLarge ? "125px" : "76px",
    translateX: isLarge ? "-350px" : "-199px",
    translateY: isLarge ? "110px" : "65px",
    rotateX: "13deg",
    rotateY: isLarge ? "30deg" : "28deg",
    skewX: "14deg",
    skewY: "-9deg",
    perspective: "1000px",
    originY: "43%",
  };

  const codeSnippets = useMemo(
    () => [
      "import { DeepTechnoSky } from './env';",
      "const [intensity, setIntensity] = useState('storm');",
      "Fetching assets from /assets/images/...",
      "Rendering AeroLayer: airplane-02.png",
      "Applied filter: brightness(0.8) contrast(1.2)",
      "SUCCESS: Layout synced with hourRef.current",
    ],
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLine =
          codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        return [...prev.slice(-11), `> ${nextLine}`];
      });
    }, 800);
    return () => clearInterval(interval);
  }, [codeSnippets]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 font-mono">
      <div
        style={{
          width: config.width,
          height: config.height,
          perspectiveOrigin: `50% ${config.originY}`,
          transform: `
            translate(${config.translateX}, ${config.translateY}) 
            perspective(${config.perspective}) 
            rotateX(${config.rotateX}) 
            rotateY(${config.rotateY}) 
            skewX(${config.skewX}) 
            skewY(${config.skewY})
          `,
          transformOrigin: "center center",
          backgroundColor: "rgba(5, 5, 10, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
        className="flex flex-col p-2 overflow-hidden shadow-inner"
      >
        {/* Cabeçalho */}
        <div className="flex gap-1 mb-1 border-b border-white/10 pb-1 opacity-50 shrink-0">
          <div
            className={`${isLarge ? "w-1.5 h-1.5" : "w-1 h-1"} rounded-full bg-red-500/50`}
          />
          <div
            className={`${isLarge ? "w-1.5 h-1.5" : "w-1 h-1"} rounded-full bg-yellow-500/50`}
          />
          <div
            className={`${isLarge ? "w-1.5 h-1.5" : "w-1 h-1"} rounded-full bg-green-500/50`}
          />
          <span
            className={`${isLarge ? "text-[5px]" : "text-[4px]"} ml-1 text-white/40 uppercase tracking-tighter`}
          >
            bash — techno-terminal
          </span>
        </div>

        {/* Linhas de Log */}
        <div className="flex flex-col gap-0.5 overflow-hidden">
          {logs.map((log, i) => {
            const isLast = i === logs.length - 1;
            return (
              <div
                key={i}
                className={`whitespace-nowrap ${isLarge ? "text-[6px]" : "text-[5px]"} leading-tight font-bold tracking-wider`}
                style={{
                  color: log.includes("SUCCESS")
                    ? "#4ade80" // Verde mais vivo
                    : log.includes("Rendering")
                      ? "#22d3ee" // Ciano
                      : "#cbd5e1", // Cinza claro (quase branco) para leitura
                  // Efeito de brilho no texto (Glow)
                  textShadow: log.includes("SUCCESS")
                    ? "0 0 2px rgba(74, 222, 128, 0.5)"
                    : "0 0 2px rgba(203, 213, 225, 0.3)",
                  opacity: isLast ? 1 : Math.max(0.4, (i + 1) / logs.length),
                }}
              >
                {log}
              </div>
            );
          })}
          <span className="inline-block w-1 h-1.5 bg-cyan-400 shadow-[0_0_5px_#22d3ee] animate-pulse mt-0.5" />
        </div>
      </div>
    </div>
  );
};
