import { usePlayer } from "../../../../contexts/PlayerContext";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export function PastelBloomHUD() {
  const player = usePlayer();
  const currentTrack = (player as any)?.currentTrack;

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  // Ajuste de posição para encaixar perfeitamente no tablet da mesa
  const config = {
    width: isLarge ? "100px" : "60px",
    height: isLarge ? "85px" : "65px",
    translateX: isLarge ? "210px" : "118px",
    translateY: isLarge ? "110px" : "65px",
    rotate: isLarge ? "10.5deg" : "8.5deg",
    skewY: "-3.5deg",
  };

  const displayTitle = currentTrack?.title || "SINTONIZANDO...";
  const displayArtist =
    currentTrack?.album?.artist?.name || "Artista Desconhecido";
  const displayAlbum = currentTrack?.album?.title || "Álbum não identificado";

  // Cores baseadas na paleta Pastel Bloom / NeonWave
  const colors = {
    title: "text-[#ffd1dc]", // Rosa Pastel
    artist: "text-[#b19cd9]", // Roxo Pastel
    album: "text-[#aec6cf]", // Azul Pastel
    label: "text-[#ffb7c5]/50", // Rosa suave para rótulos
    glow: "drop-shadow-[0_0_3px_rgba(255,209,220,0.6)] drop-shadow-[0_0_6px_rgba(177,156,217,0.3)]",
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-60 font-mono">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          flex: 1;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .marquee-content {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 14s linear infinite;
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
        className={`flex flex-col justify-start p-2 transition-all duration-1000 ${isLarge ? "gap-y-2" : "gap-y-0 leading-[1.15]"}`}
      >
        {/* LINHA TOCANDO */}
        <div className="flex items-baseline w-full border-b border-[#ffd1dc]/10">
          <div className="marquee-container">
            <h2
              className={`marquee-content font-bold uppercase ${isLarge ? "text-[14px]" : "text-[11px]"} ${colors.title} ${colors.glow}`}
            >
              {displayTitle}
            </h2>
          </div>
        </div>

        {/* LINHA ARTISTA */}
        <div className="flex items-baseline w-full gap-x-1 -ml-0.5">
          <span
            className={`font-bold uppercase tracking-tighter shrink-0 ${isLarge ? "text-[10px]" : "text-[8px]"} ${colors.label}`}
          >
            FROM:
          </span>
          <div className="marquee-container">
            <span
              className={`marquee-content ${isLarge ? "text-[13px]" : "text-[10px]"} ${colors.artist} ${colors.glow}`}
            >
              {displayArtist}
            </span>
          </div>
        </div>

        {/* LINHA ÁLBUM */}
        <div className="flex items-baseline w-full gap-x-1 -ml-1.5">
          <span
            className={`font-bold uppercase tracking-tighter shrink-0 ${isLarge ? "text-[10px]" : "text-[8px]"} ${colors.label}`}
          >
            TAPE:
          </span>
          <div className="marquee-container">
            <span
              className={`marquee-content ${isLarge ? "text-[13px]" : "text-[10px]"} ${colors.album}`}
            >
              {displayAlbum}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
