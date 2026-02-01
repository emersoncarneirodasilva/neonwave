import type { Track } from "../../../../app/pages/HomePage";
import { usePlayer } from "../../../../contexts/PlayerContext";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export const RadioHUD = () => {
  const player = usePlayer();
  const currentTrack = (player as { currentTrack: Track | null })?.currentTrack;

  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const animations = `
    @keyframes radioScroll { 
      0% { transform: translateX(0%); } 
      100% { transform: translateX(-50%); } 
    }
    
    @keyframes scan {
      from { top: 0; }
      to { top: 100%; }
    }

    /* Brilho interno constante, sem pulsação exagerada */
    .inner-screen-glow {
      background: radial-gradient(circle at center, #0ca339 0%, #09b23b 100%);
    }

    .hud-marquee-container { 
      display: inline-block; 
      white-space: nowrap; 
      animation: radioScroll 18s linear infinite; /* Mais lento para ser natural */
      -webkit-font-smoothing: none;
    }

    .radio-font {
      font-family: 'Courier New', Courier, monospace;
      letter-spacing: -0.2px;
      text-transform: uppercase;
      color: #ffffff;
      /* Brilho de "lâmpada" sutil, sem parecer neon */
      text-shadow: 0 0 2px rgba(255, 255, 255, 0.7);
    }
  `;

  const RadioRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex w-full items-baseline overflow-hidden leading-none h-1/3 radio-font">
      <span
        className={
          isLarge
            ? "font-bold mr-1 shrink-0 text-[12px] opacity-40"
            : "font-bold mr-1 shrink-0 text-[8.5px] opacity-40"
        }
      >
        {label}
      </span>

      <div className="overflow-hidden relative flex-1 h-full flex items-center">
        <div className="hud-marquee-container">
          <span
            className={
              isLarge ? "text-[13px] font-bold" : "text-[9px] font-bold"
            }
          >
            {value}
          </span>
          <span
            className={
              isLarge
                ? "ml-12 text-[13px] font-bold opacity-30"
                : "ml-12 text-[9px] font-bold opacity-30"
            }
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="absolute z-10 pointer-events-none overflow-hidden inner-screen-glow"
      style={{
        bottom: isLarge ? "5%" : "19.4%",
        right: isLarge ? "28.4%" : "27.9%",
        width: isLarge ? "10.6%" : "81px",
        height: isLarge ? "12.4%" : "58px",
        transform: isLarge
          ? "perspective(500px) rotateY(-20deg) skewY(6.5deg)"
          : "perspective(500px) rotateY(-25deg) skewY(6deg)",
        imageRendering: "pixelated",
        /* Removemos o box-shadow externo e a animação de pulsação de cor */
      }}
    >
      <style>{animations}</style>

      {/* Sombra interna nas bordas: faz o visor parecer que está "atrás" do plástico do rádio */}
      <div className="absolute inset-0 z-20 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />

      {/* Linha de Scan bem discreta */}
      <div
        className="absolute w-full h-px bg-white/5 z-10"
        style={{ animation: "scan 5s linear infinite" }}
      />

      <div className="relative z-10 flex flex-col w-full h-full p-2">
        {currentTrack ? (
          <div className="flex flex-col w-full h-full justify-between">
            <RadioRow label="Música:" value={currentTrack.title} />
            <RadioRow label="Álbum:" value={currentTrack.album.title} />
            <RadioRow label="Artista:" value={currentTrack.album.artist.name} />
          </div>
        ) : (
          <div
            className={
              isLarge
                ? "flex items-center justify-center h-full animate-pulse text-[13px] font-bold text-white/80 radio-font"
                : "flex items-center justify-center h-full animate-pulse text-[8px] font-bold text-white/80 radio-font"
            }
          >
            SEM SINAL
          </div>
        )}
      </div>

      {/* Camada de vidro: reflexo diagonal que não se move, para parecer estático */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-40 z-30" />
    </div>
  );
};
