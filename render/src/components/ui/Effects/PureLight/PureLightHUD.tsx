import { usePlayer } from "../../../../contexts/PlayerContext";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export function PureLightHUD() {
  const player = usePlayer();
  const currentTrack = (player as any)?.currentTrack;

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const config = {
    width: isLarge ? "260px" : "150px",
    height: isLarge ? "190px" : "105px",
    translateX: isLarge ? "79px" : "48px",
    translateY: isLarge ? "175px" : "98px",
    rotateX: isLarge ? "-7deg" : "-10deg",
    rotateY: isLarge ? "-12deg" : "-10deg",
    skewX: isLarge ? "-12.5deg" : "-11deg",
  };

  const displayTitle = currentTrack?.title || "ACCESSING_CORE...";
  const displayArtist = currentTrack?.album?.artist?.name || "ANONYMOUS";
  const displayAlbum = currentTrack?.album?.title || "ENCRYPTED_DATA";

  const colors = {
    text: "text-[#00ff41]",
    dim: "text-[#003b00]",
    label: "text-[#00ff41]/40",
    glow: "drop-shadow-[0_0_5px_#00ff41]",
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 font-mono">
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes marquee-text {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        .cursor-hacker { animation: blink 1s step-end infinite; }
        .terminal-scanline {
          background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 65, 0.05) 50%);
          background-size: 100% 4px;
        }

        /* Container que limita o texto e aplica a máscara hacker */
        .hacker-marquee-row {
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        /* O conteúdo que duplica para o loop ser infinito e fluído */
        .hacker-marquee-content {
          display: inline-block;
          padding-right: 50px; /* Espaço entre o fim e o reinício */
          animation: marquee-text 20s linear infinite;
        }
      `}</style>

      <div
        style={{
          width: config.width,
          height: config.height,
          transform: `translate(${config.translateX}, ${config.translateY}) perspective(1000px) rotateX(${config.rotateX}) rotateY(${config.rotateY}) skewX(${config.skewX})`,
          transformOrigin: "center center",
          backgroundColor: "rgba(0, 10, 0, 0.85)",
          border: "1px solid rgba(0, 255, 65, 0.2)",
        }}
        className="flex flex-col justify-between p-3 overflow-hidden shadow-[inset_0_0_20px_rgba(0,255,65,0.1)]"
      >
        <div className="absolute inset-0 terminal-scanline pointer-events-none" />

        {/* HEADER */}
        <div
          className={`flex justify-between items-center ${isLarge ? "text-[13px]" : "text-[7px]"} border-b border-[#00ff41]/20 pb-1 relative z-10`}
        >
          <span className={colors.label}>SYS.EXEC_TRACK</span>
          <span className={`${colors.text} animate-pulse`}>● LIVE</span>
        </div>

        {/* INFO COM MARQUEE APENAS NO CONTEÚDO */}
        <div className="flex flex-col gap-y-1 my-auto relative z-10">
          <div className="flex flex-col overflow-hidden">
            <span
              className={` ${isLarge ? "text-[10px]" : "text-[6px]"} ${colors.label}`}
            >
              root@purelight:~# track --info
            </span>
            <div className="hacker-marquee-row">
              <div className="hacker-marquee-content">
                <h2
                  className={`${isLarge ? "text-[14px]" : "text-[10px]"} ${colors.text} ${colors.glow} font-bold`}
                >
                  {displayTitle} <span className="cursor-hacker">_</span>
                </h2>
              </div>
              {/* Duplicata para o loop não dar "pulo" */}
              <div className="hacker-marquee-content">
                <h2
                  className={`${isLarge ? "text-[14px]" : "text-[10px]"} ${colors.text} ${colors.glow} font-bold`}
                >
                  {displayTitle} <span className="cursor-hacker">_</span>
                </h2>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col ${isLarge ? "text-[12px]" : "text-[8px]"} leading-tight`}
          >
            <div className="flex gap-x-1 overflow-hidden">
              <span className={`${colors.label} shrink-0`}>AUTHOR:</span>
              <div className="hacker-marquee-row flex-1">
                <div className="hacker-marquee-content">
                  <span className={colors.text}>{displayArtist}</span>
                </div>
                <div className="hacker-marquee-content">
                  <span className={colors.text}>{displayArtist}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-x-1 overflow-hidden">
              <span className={`${colors.label} shrink-0`}>SOURCE:</span>
              <div className="hacker-marquee-row flex-1">
                <div className="hacker-marquee-content">
                  <span className={colors.text}>{displayAlbum}</span>
                </div>
                <div className="hacker-marquee-content">
                  <span className={colors.text}>{displayAlbum}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="flex flex-col gap-y-1 relative z-10">
          <div
            className={`flex justify-between ${isLarge ? "text-[10px]" : "text-[6px]"} px-1`}
          >
            <span className={colors.label}>DECRYPTING...</span>
            <span className={colors.text}>33%</span>
          </div>
          <div className="w-full h-1.5 bg-[#003b00] p-px border border-[#00ff41]/20">
            <div className="h-full bg-[#00ff41] w-1/3 shadow-[0_0_8px_#00ff41]" />
          </div>
        </div>
      </div>
    </div>
  );
}
