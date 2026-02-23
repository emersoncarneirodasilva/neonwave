import { useState } from "react";
import { usePlayer } from "../../../../contexts/PlayerContext";
import cellImg from "../../../../assets/images/cell.png";
import raianePerfilImg from "../../../../assets/images/raiane-perfil-pixel.png";

export const BeachPhone = () => {
  const [isHovered, setIsHovered] = useState(false);

  const player = usePlayer();
  const currentTrack = (player as any)?.currentTrack;

  // Tratamento dos textos para português e fallbacks
  const displayTitle = currentTrack?.title || "Sinal perdido...";
  const displayArtist = currentTrack?.album?.artist?.name || "Rádio TerraWave";
  const displayAlbum = currentTrack?.album?.title || "Estação Offline";

  return (
    <div
      className="absolute bottom-[18%] left-[28%] z-30 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HUD de Informações */}
      <div
        className={`
          absolute bottom-16 left-1/2 -translate-x-1/2 w-56 
          bg-black/80 backdrop-blur-xl border border-white/10 
          p-4 rounded-2xl transition-all duration-500 ease-out shadow-2xl
          ${isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90 pointer-events-none"}
        `}
      >
        <div className="relative group overflow-hidden rounded-lg mb-3">
          {raianePerfilImg ? (
            <img
              src={raianePerfilImg}
              alt="Capa do Álbum"
              className="w-full h-40 object-cover shadow-md"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            /* Visual "Sem Sinal" com Arte de Palmeira em Pixel/Emoji */
            <div className="w-full h-40 bg-linear-to-b from-slate-900 to-blue-900/40 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Efeito de Scanline/Ruído */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] pointer-events-none" />

              {/* Elementos Visuais */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-4xl mb-2 filter drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                  🏝️
                </span>
                <div className="flex gap-1 mb-2">
                  <div className="w-1 h-3 bg-blue-500/40 rounded-full animate-[pulse_1s_infinite_0ms]" />
                  <div className="w-1 h-3 bg-blue-500/60 rounded-full animate-[pulse_1s_infinite_200ms]" />
                  <div className="w-1 h-3 bg-blue-500/80 rounded-full animate-[pulse_1s_infinite_400ms]" />
                </div>
                <span className="text-[10px] text-blue-300/60 font-mono tracking-[0.3em] uppercase">
                  Sem Sinal
                </span>
              </div>

              {/* Ondas decorativas no fundo */}
              <div className="absolute bottom-0 w-full h-8 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-[pulse_3s_infinite]" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="space-y-1">
          <span className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.2em] mb-1 block">
            {currentTrack ? "Ouvindo Agora" : "Status do Sistema"}
          </span>
          <h4 className="text-white font-bold text-sm truncate tracking-tight">
            {displayTitle}
          </h4>
          <p className="text-white/80 text-[11px] truncate uppercase tracking-wider">
            {displayArtist}
          </p>
          <div className="pt-2 border-t border-white/10 mt-2">
            <p className="text-white/40 text-[9px] truncate font-mono italic">
              {currentTrack
                ? `Álbum: ${displayAlbum}`
                : "Aguardando conexão..."}
            </p>
          </div>
        </div>
      </div>

      {/* O Celular (Asset real) */}
      <div className="relative cursor-pointer group">
        <div className="absolute -bottom-1 left-2 w-16 h-4 bg-black/40 blur-md rounded-full -z-10 transition-opacity group-hover:opacity-60" />

        <img
          src={cellImg}
          alt="Celular"
          className={`
            w-14 h-auto drop-shadow-2xl transition-all duration-700
            -rotate-6 group-hover:-rotate-3 group-hover:scale-110
          `}
          style={{ imageRendering: "pixelated" }}
        />

        {/* Indicador de "Tela Ligada" quando há música */}
        {currentTrack && (
          <div className="absolute top-4 left-4 w-4 h-4 bg-blue-400/30 blur-xl animate-pulse -z-10" />
        )}

        {/* Notas musicais flutuantes no hover */}
        {isHovered && currentTrack && (
          <div className="absolute -top-8 -right-2 flex flex-col animate-bounce">
            <span className="text-white/80 text-sm">♫</span>
            <span className="text-white/50 text-xs ml-3">♪</span>
          </div>
        )}
      </div>
    </div>
  );
};
