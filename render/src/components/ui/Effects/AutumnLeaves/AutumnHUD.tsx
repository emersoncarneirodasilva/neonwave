import { usePlayer } from "../../../../contexts/PlayerContext";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface AutumnHUDProps {
  isNight: boolean;
}

export function AutumnHUD({ isNight }: AutumnHUDProps) {
  const player = usePlayer();
  const currentTrack = (player as any)?.currentTrack;

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const config = {
    width: isLarge ? "195px" : "135px",
    height: isLarge ? "100px" : "120px",
    translateX: isLarge ? "335px" : "227px",
    translateY: isLarge ? "140px" : "116px",
    rotate: "9deg",
    skewY: "-3deg",
  };

  const displayTitle = currentTrack?.title || "SINTONIZANDO...";
  const displayArtist =
    currentTrack?.album?.artist?.name || "Artista Desconhecido";
  const displayAlbum = currentTrack?.album?.title || "Álbum não identificado";

  const colors = {
    title: isNight ? "text-orange-100" : "text-[#fff5e6]",
    artist: isNight ? "text-orange-200/90" : "text-orange-200/90",
    album: isNight ? "text-orange-300/80" : "text-orange-300/80",
    label: isNight ? "text-orange-500/60" : "text-[#d35400]/70",
    // Brilho intensificado para a noite usando camadas de drop-shadow
    glow: isNight
      ? "drop-shadow-[0_0_3px_rgba(255,165,0,0.8)] drop-shadow-[0_0_8px_rgba(255,140,0,0.4)]"
      : "drop-shadow-[0_0_2px_rgba(255,245,230,0.4)]",
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 font-mono">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          flex: 1;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .marquee-content {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 12s linear infinite;
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
        className={`flex flex-col justify-start p-2 transition-all duration-1000 ${isLarge ? "gap-y-3" : "gap-y-0.5"}`}
      >
        {/* LINHA TOCANDO */}
        <div
          className={`flex items-baseline w-full gap-x-2 border-b border-orange-900/10 pb-1 transition-all ${isNight ? "border-orange-400/30" : ""}`}
        >
          <span
            className={`font-bold uppercase tracking-tighter ${isLarge ? "text-[11px]" : "text-[9px]"} shrink-0 ${colors.label} ${isNight ? "drop-shadow-[0_0_2px_rgba(211,84,0,0.5)]" : ""}`}
          >
            TOCANDO:
          </span>
          <div className="marquee-container">
            <h2
              className={`marquee-content font-bold uppercase ${isLarge ? "text-[12px]" : "text-[10px]"} ${colors.title} ${colors.glow}`}
            >
              {displayTitle}
            </h2>
          </div>
        </div>

        {/* LINHA ARTISTA */}
        <div
          className={`flex items-baseline w-full gap-x-2 ${isLarge ? "pl-18" : "pl-12.5"}`}
        >
          <span
            className={`font-bold uppercase tracking-tighter shrink-0 ${isLarge ? "text-[9px]" : "text-[7px]"} ${colors.label}`}
          >
            ARTISTA:
          </span>
          <div className="marquee-container">
            <span
              className={`marquee-content ${isLarge ? "text-[11px]" : "text-[9px]"} ${colors.artist} ${isNight ? colors.glow : ""}`}
            >
              {displayArtist}
            </span>
          </div>
        </div>

        {/* LINHA ÁLBUM */}
        <div
          className={`flex items-baseline w-full gap-x-2 ${isLarge ? "pl-18" : "pl-12.5"}`}
        >
          <span
            className={`font-bold uppercase tracking-tighter shrink-0 ${isLarge ? "text-[9px]" : "text-[7px]"} ${colors.label}`}
          >
            ÁLBUM:
          </span>
          <div className="marquee-container">
            <span
              className={`marquee-content ${isLarge ? "text-[11px]" : "text-[9px]"} ${colors.album} ${isNight ? colors.glow : ""}`}
            >
              {displayAlbum}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
