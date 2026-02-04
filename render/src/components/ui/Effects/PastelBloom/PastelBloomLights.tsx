import { useWindowSize } from "../../../../hooks/useWindowSize";

export const PastelBloomLights = ({ hour }: { hour: number }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const isNight = hour >= 19 || hour < 5;

  if (!isNight) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* LED Esquerdo - Inclinado para a diagonal */}
      <div
        className={`absolute ${isLarge ? "top-[0%] left-[15.8%] w-4 h-16" : "top-[14.2%] left-[15.2%] w-3.75 h-13"} bg-cyan-400/40 blur-sm animate-pulse`}
        style={{ transform: "rotate(-22deg)" }}
      />
      <div
        className={`absolute ${isLarge ? "top-[0%] left-[16.1%] w-1.5 h-14" : "top-[16%] left-[16%] w-1 h-8"} bg-white/60 blur-[1px]`}
        style={{ transform: "rotate(-22deg)" }}
      />

      {/* Painel Central - Mantemos reto, apenas com brilho */}
      <div
        className={`absolute ${isLarge ? "top-[0%] left-[42.5%] w-45 h-13" : "top-[16%] left-[43%] w-25 h-7.5"} bg-blue-500/30 blur-md animate-pulse`}
      />
      <div
        className={`absolute ${isLarge ? "top-[1.7%] left-[44.5%] w-31.5 h-7" : "top-[17.2%] left-[44.5%] w-17.5 h-3"} bg-cyan-200/40 blur-[2px]`}
      />

      {/* LED Direito - Inclinado para a diagonal oposta */}
      <div
        className={`absolute ${isLarge ? "top-[0%] right-[14.3%] w-4 h-16" : "top-[14.2%] right-[14%] w-3.75 h-13"} bg-cyan-400/40 blur-sm animate-pulse`}
        style={{ transform: "rotate(22deg)" }}
      />
      <div
        className={`absolute ${isLarge ? "top-[0%] right-[14.5%] w-1.5 h-14" : "top-[16%] right-[15%] w-1 h-8"} bg-white/60 blur-[1px]`}
        style={{ transform: "rotate(22deg)" }}
      />

      {/* BRILHO DO TABLET */}
      <div
        className={`absolute ${isLarge ? "bottom-[23%] right-[27%] w-65 h-43" : "bottom-[27%] right-[28%] w-35 h-33"} bg-purple-500/20 blur-[30px]`}
        style={{ transform: "rotate(10deg)" }}
      />

      <div
        className={`absolute ${isLarge ? "bottom-[24%] right-[28.5%] w-55 h-37" : "bottom-[28%] right-[25.5%] w-45 h-27.5"} bg-pink-400/10 blur-[10px] mix-blend-screen`}
        style={{
          transform: "rotate(8.5deg) skewY(-3.5deg)",
        }}
      />
    </div>
  );
};
