import winterHutImg from "../../../../assets/images/winter-hut.png";
import { usePlayer } from "../../../../contexts/PlayerContext";
import type { Track } from "../../../../app/pages/HomePage";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface WinterHutProps {
  time: number;
}

export const WinterHut = ({ time }: WinterHutProps) => {
  const { currentTrack } = usePlayer() as { currentTrack: Track | null };
  const isNight = time >= 20 || time < 5;

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const animations = `
    @keyframes radioScroll { 
      0% { transform: translateX(0%); } 
      20% { transform: translateX(0%); } 
      80% { transform: translateX(-50%); } 
      100% { transform: translateX(-50%); } 
    }
    
    /* Animação para a tremulação do fogo */
    @keyframes fireGlow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      25% { opacity: 0.45; transform: scale(1.05) translate(1px, -1px); }
      50% { opacity: 0.35; transform: scale(0.95) translate(-1px, 1px); }
      75% { opacity: 0.5; transform: scale(1.1); }
    }

    .hud-marquee { 
      display: inline-block; 
      white-space: nowrap; 
      animation: radioScroll 15s linear infinite;
      -webkit-font-smoothing: none;
      -moz-osx-font-smoothing: grayscale;
    }

    .fire-vibration {
      animation: fireGlow 0.2s infinite alternate ease-in-out;
    }
  `;

  const RadioRow = ({
    label,
    value,
    delay,
  }: {
    label: string;
    value: string;
    delay: string;
  }) => (
    <div className="flex w-full items-baseline overflow-hidden leading-none h-1/3 border-b border-cyan-900/20 last:border-0">
      <span
        className={
          isLarge
            ? "font-bold mr-1 shrink-0 opacity-90 text-[9px] text-cyan-300"
            : "font-bold mr-1 shrink-0 opacity-90 text-[6px] text-cyan-300"
        }
      >
        {label}
      </span>
      <div className="overflow-hidden relative flex-1 h-full flex items-center">
        <div className="hud-marquee" style={{ animationDelay: delay }}>
          <span
            className={
              isLarge
                ? "text-[10px] font-mono tracking-tight"
                : "text-[7px] font-mono tracking-tight"
            }
          >
            {value}
          </span>
          <span
            className={
              isLarge
                ? "ml-8 opacity-40 text-[10px] font-mono tracking-tight"
                : "ml-8 opacity-40 text-[7px] font-mono tracking-tight"
            }
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-20 pointer-events-none">
      <style>{animations}</style>

      {/* IMAGEM BASE */}
      <img
        src={winterHutImg}
        alt="Winter Hut"
        className="w-full h-full object-cover relative transition-all duration-1000"
        style={{
          imageRendering: "pixelated",
          filter: isNight
            ? "brightness(0.7) contrast(1.1) saturate(1.1)"
            : "brightness(1)",
          zIndex: 1,
        }}
      />

      {/* DISPLAY DO RÁDIO */}
      <div
        className="absolute flex flex-col justify-between px-1.5 py-0.5"
        style={{
          left: isLarge ? "71.1%" : "71.2%",
          top: isLarge ? "77%" : "68.5%",
          width: isLarge ? "11.2%" : "11%",
          height: isLarge ? "9%" : "6%",
          transform: "translate(-50%, -50%)",
          zIndex: 30,
          backgroundColor: "rgba(0, 15, 15, 1)",
          color: "rgba(127, 255, 212, 1)",
          overflow: "hidden",
          border: "0.5px solid rgba(127, 255, 212, 0.2)",
          imageRendering: "pixelated",
        }}
      >
        {currentTrack ? (
          <div className="flex flex-col w-full h-full">
            <RadioRow label="Música:" value={currentTrack.title} delay="0s" />
            <RadioRow
              label="Álbum:"
              value={currentTrack.album.title}
              delay="-3s"
            />
            <RadioRow
              label="Artista:"
              value={currentTrack.album.artist.name}
              delay="-6s"
            />
          </div>
        ) : (
          <div
            className={
              isLarge
                ? "flex items-center justify-center h-full animate-pulse text-[11px] text-cyan-500 font-mono"
                : "flex items-center justify-center h-full animate-pulse text-[6px] text-cyan-500 font-mono"
            }
          >
            SEM SINAL
          </div>
        )}
      </div>

      {/* EFEITO DE LAREIRA VIVA */}
      <div className="absolute inset-0 z-2">
        {/* Brilho Principal Pulsante */}
        <div
          className={`absolute fire-vibration transition-opacity duration-1000`}
          style={{
            left: "-10%",
            top: "52%",
            width: "30%",
            height: "30%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255, 100, 0, 0.5) 0%, transparent 70%)",
            mixBlendMode: "screen",
            opacity: isNight ? 1 : 0,
          }}
        />

        {/* Brilho de Reflexo no Chão/Móveis */}
        <div
          className="absolute transition-opacity duration-1000"
          style={{
            left: isLarge ? "0%" : "10%",
            top: isLarge ? "100%" : "88%",
            width: isLarge ? "100%" : "50%",
            height: "20%",
            transform: "translate(-50%, -50%) scaleX(2)",
            background:
              "radial-gradient(ellipse, rgba(255, 50, 0, 0.2) 0%, transparent 80%)",
            mixBlendMode: "overlay",
            opacity: isNight ? 0.6 : 0,
          }}
        />
      </div>
    </div>
  );
};
