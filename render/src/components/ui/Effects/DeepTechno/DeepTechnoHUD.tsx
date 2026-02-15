import { usePlayer } from "../../../../contexts/PlayerContext";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export function DeepTechnoHUD() {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const player = usePlayer();
  const currentTrack = (player as any)?.currentTrack;

  const displayTitle = currentTrack?.title || "ACCESSING_CORE_PROTOCOL...";
  const displayArtist = currentTrack?.album?.artist?.name || "ANONYMOUS_ENTITY";
  const displayAlbum = currentTrack?.album?.title || "ENCRYPTED_DATABASE_V1";

  const config = {
    width: isLarge ? "270px" : "150px",
    height: isLarge ? "180px" : "95px",
    translateX: isLarge ? "111px" : "63px",
    translateY: isLarge ? "-2px" : "-4px",
    rotateX: isLarge ? "0deg" : "0deg",
    rotateY: isLarge ? "-4deg" : "-2deg",
    skewX: isLarge ? "0deg" : "0deg",
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 font-mono">
      <style>{`
        @keyframes scanline-hud {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .monitor-glow {
          text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
        }
        .marquee-box {
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          width: 100%;
        }
        .marquee-inner {
          display: flex;
          animation: marquee-slow 20s linear infinite;
        }
        .marquee-spacer {
          padding-right: 60px;
        }
      `}</style>

      <div
        style={{
          width: config.width,
          height: config.height,
          transform: `translate(${config.translateX}, ${config.translateY}) perspective(1000px) rotateX(${config.rotateX}) rotateY(${config.rotateY}) skewX(${config.skewX})`,
          transformOrigin: "center center",
          background: `radial-gradient(44% 33% at 52% 63%, transparent 0%, transparent 80%, black 100%), rgba(0, 10, 15, 0.92)`,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 73%, 60% 100%, 0% 100%)",
        }}
        className="flex flex-col justify-between p-2.5 overflow-hidden shadow-[inset_0_0_15px_rgba(0,242,255,0.1)]"
      >
        {/* Scanline fixa */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-size-[100%_2px] bg-[linear-gradient(to_bottom,white_1px,transparent_1px)]" />

        {/* HEADER */}
        <div
          className={`flex justify-between items-center ${isLarge ? "text-[9px]" : "text-[7px]"} border-b border-[#00f2ff]/30 pb-1 relative z-10`}
        >
          <span className="text-[#a855f7] font-bold tracking-widest uppercase opacity-80">
            Now Playing
          </span>
          <span className="text-[#00f2ff] animate-pulse">● FEED_01</span>
        </div>

        {/* INFO AREA */}
        <div
          className={`flex flex-col ${isLarge ? "gap-y-6" : "gap-y-1.5"} my-auto relative z-10 w-full overflow-hidden`}
        >
          {/* TÍTULO */}
          <div className="flex flex-col w-full overflow-hidden">
            <div className="marquee-box">
              <div className="marquee-inner">
                <h2
                  className={`marquee-spacer ${isLarge ? "text-[13px]" : "text-[10px]"} text-[#00f2ff] monitor-glow font-bold uppercase tracking-tight`}
                >
                  {displayTitle}
                </h2>
                <h2
                  className={`marquee-spacer ${isLarge ? "text-[13px]" : "text-[10px]"} text-[#00f2ff] monitor-glow font-bold uppercase tracking-tight`}
                >
                  {displayTitle}
                </h2>
              </div>
            </div>
          </div>

          {/* ARTISTA E ÁLBUM */}
          <div className={`flex flex-col ${isLarge ? "gap-y-3" : "gap-y-0.5"}`}>
            <div className="flex items-center gap-1.5 w-full overflow-hidden border-l border-[#a855f7]/30 pl-1">
              <span
                className={`${isLarge ? "text-[9px]" : "text-[6px]"} text-[#a855f7]/50 shrink-0`}
              >
                AUTH
              </span>
              <div className="marquee-box">
                <div
                  className="marquee-inner"
                  style={{ animationDuration: "15s" }}
                >
                  <span
                    className={`marquee-spacer ${isLarge ? "text-[11px]" : "text-[9px]"} text-white/90 font-medium uppercase`}
                  >
                    {displayArtist}
                  </span>
                  <span
                    className={`marquee-spacer ${isLarge ? "text-[11px]" : "text-[9px]"} text-white/90 font-medium uppercase`}
                  >
                    {displayArtist}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 w-full overflow-hidden border-l border-[#00f2ff]/20 pl-1">
              <span
                className={`${isLarge ? "text-[9px]" : "text-[6px]"} text-[#00f2ff]/40 shrink-0`}
              >
                DATA
              </span>
              <div className="marquee-box">
                <div
                  className="marquee-inner"
                  style={{ animationDuration: "25s" }}
                >
                  <span
                    className={`marquee-spacer ${isLarge ? "text-[11px]" : "text-[8px]"} text-white/50 italic lowercase opacity-80`}
                  >
                    {displayAlbum}
                  </span>
                  <span
                    className={`marquee-spacer ${isLarge ? "text-[11px]" : "text-[8px]"} text-white/50 italic lowercase opacity-80`}
                  >
                    {displayAlbum}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="relative z-10 pt-1">
          <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-right from-[#a855f7] to-[#00f2ff] w-[70%] shadow-[0_0_5px_#00f2ff]" />
          </div>
        </div>
      </div>
    </div>
  );
}
