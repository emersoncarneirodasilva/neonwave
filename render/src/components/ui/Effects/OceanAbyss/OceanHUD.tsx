import { usePlayer } from "../../../../contexts/PlayerContext";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface OceanHUDProps {
  isNight: boolean;
}

export function OceanHUD({ isNight }: OceanHUDProps) {
  const player = usePlayer();
  const currentTrack = (player as any)?.currentTrack;

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const config = {
    width: isLarge ? "165px" : "100px",
    height: isLarge ? "100px" : "150px",
    translateX: isLarge ? "-150px" : "-85px",
    translateY: isLarge ? "65px" : "75px",
    rotate: "-2deg",
    skewY: "1deg",
  };

  const displayTitle = currentTrack?.title || "PROCURANDO...";
  const displayArtist = currentTrack?.album?.artist?.name || "...";
  const displayAlbum = currentTrack?.album?.title || "...";

  const colors = {
    title: isNight ? "text-blue-900/50" : "text-cyan-300",
    artist: isNight ? "text-blue-700/60" : "text-cyan-400",
    album: isNight ? "text-blue-700/60" : "text-cyan-400/80",
    label: isNight ? "text-blue-900/50" : "text-cyan-500/60",
    glow: isNight
      ? "drop-shadow-[0_0_1px_rgba(0,150,255,0.2)]"
      : "drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]",
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 text-cyan-400 font-mono">
      <style>{`
        @keyframes marquee {
          0%, 20% { transform: translateX(0); }
          80%, 100% { transform: translateX(-110%); }
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 10s linear infinite alternate;
        }
      `}</style>

      <div
        style={{
          width: config.width,
          height: config.height,
          transform: `
            translate(${config.translateX}, ${config.translateY}) 
            rotate(${config.rotate}) 
            skewY(${config.skewY})
          `,
          transformOrigin: "center center",
        }}
        className={`flex flex-col justify-start p-2 transition-colors duration-1000 ${isLarge ? "gap-y-7" : "gap-y-2"}`}
      >
        {/* Título da Música */}
        <div className="w-full">
          <div className="marquee-container">
            <h2
              className={`marquee-content font-bold uppercase ${isLarge ? "text-[15px]" : "text-[12px]"} ${colors.title} ${colors.glow}`}
            >
              {displayTitle}
            </h2>
          </div>
        </div>

        {/* ARTISTA */}
        <div className="flex flex-col items-start w-full leading-none max-w-16.25">
          <span
            className={`font-bold uppercase tracking-tighter ${isLarge ? "text-[12px]" : "text-[9px]"} ${colors.label}`}
          >
            ARTISTA:
          </span>
          <div
            className={`marquee-container ${isLarge ? "mt-0.5" : "-mt-0.5"}`}
          >
            <span
              className={`marquee-content ${isLarge ? "text-[12px]" : "text-[8px]"} ${colors.artist}`}
            >
              {displayArtist}
            </span>
          </div>
        </div>

        {/* ÁLBUM */}
        <div className="flex flex-col items-start w-full leading-none mt-1 max-w-16.25">
          <span
            className={`font-bold uppercase tracking-tighter ${isLarge ? "text-[12px]" : "text-[9px]"} ${colors.label}`}
          >
            ÁLBUM:
          </span>
          <div
            className={`marquee-container ${isLarge ? "mt-0.5" : "-mt-0.5"}`}
          >
            <span
              className={`marquee-content ${isLarge ? "text-[12px]" : "text-[8px]"} ${colors.album}`}
            >
              {displayAlbum}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
