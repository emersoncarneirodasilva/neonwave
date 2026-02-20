import { usePlayer } from "../../../../contexts/PlayerContext";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface SteelWaveHUDProps {
  isNight: boolean;
}

export const SteelWaveHUD = ({ isNight }: SteelWaveHUDProps) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const player = usePlayer();
  const currentTrack = (player as any)?.currentTrack;

  const displayTitle = currentTrack?.title || "ACCESSING_CORE_PROTOCOL...";
  const displayArtist = currentTrack?.album?.artist?.name || "ANONYMOUS_ENTITY";
  const displayAlbum = currentTrack?.album?.title || "ENCRYPTED_DATABASE_V1";

  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-center {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes subtle-hologram-glow {
          0%, 100% { opacity: 1; filter: brightness(1.2) drop-shadow(0 0 8px rgba(34,211,238,0.4)); }
          50% { opacity: 0.8; filter: brightness(1) drop-shadow(0 0 3px rgba(34,211,238,0.2)); }
        }
      `,
        }}
      />

      <div
        className={`relative ${isLarge ? "w-96" : "w-80"} flex flex-col items-center justify-center p-6 border border-cyan-500/20 backdrop-blur-[3px] rounded-sm transition-all duration-1000 ${
          // Se for dia, adicionamos um fundo levemente mais escuro para dar contraste com as nuvens
          isNight ? "bg-black/10" : "bg-cyan-950/30"
        }`}
        style={{ animation: "subtle-hologram-glow 6s infinite ease-in-out" }}
      >
        {/* Cantoneiras HUD - Mais nítidas durante o dia */}
        <div
          className={`absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 ${isNight ? "border-cyan-400/40" : "border-cyan-400/80"}`}
        />
        <div
          className={`absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 ${isNight ? "border-cyan-400/40" : "border-cyan-400/80"}`}
        />
        <div
          className={`absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 ${isNight ? "border-cyan-400/40" : "border-cyan-400/80"}`}
        />
        <div
          className={`absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 ${isNight ? "border-cyan-400/40" : "border-cyan-400/80"}`}
        />

        {/* Título - Drop shadow reforçado para visibilidade no claro */}
        <div className="w-full overflow-hidden border-b border-cyan-500/20 pb-2 mb-3">
          <div className="whitespace-nowrap inline-block animate-[marquee-center_20s_linear_infinite]">
            <h2
              className={`text-base font-mono font-black uppercase tracking-[0.2em] ${
                isNight
                  ? "text-cyan-400/90 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  : "text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]"
              }`}
            >
              {displayTitle} <span className="inline-block w-24" />{" "}
              {displayTitle} <span className="inline-block w-24" />
            </h2>
          </div>
        </div>

        {/* Info de Artista - Opacidade aumentada se for dia */}
        <div
          className={`w-full flex items-center gap-2 mb-1 ${isNight ? "opacity-70" : "opacity-100"}`}
        >
          <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-tighter shrink-0 font-bold">
            Artist:
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap inline-block animate-[marquee-center_15s_linear_infinite]">
              <span
                className={`text-[11px] font-mono uppercase tracking-widest font-bold ${isNight ? "text-cyan-300" : "text-cyan-200"}`}
              >
                {displayArtist} <span className="inline-block w-20" />{" "}
                {displayArtist} <span className="inline-block w-20" />
              </span>
            </div>
          </div>
        </div>

        {/* Info de Álbum */}
        <div
          className={`w-full flex items-center gap-2 ${isNight ? "opacity-50" : "opacity-90"}`}
        >
          <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-tighter shrink-0 font-bold">
            Album:
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap inline-block animate-[marquee-center_18s_linear_infinite]">
              <span
                className={`text-[11px] font-mono uppercase tracking-widest ${isNight ? "text-cyan-300" : "text-cyan-200"}`}
              >
                {displayAlbum} <span className="inline-block w-20" />{" "}
                {displayAlbum} <span className="inline-block w-20" />
              </span>
            </div>
          </div>
        </div>

        {/* Rodapé Decorativo */}
        <div className="mt-5 w-full flex items-center gap-3 opacity-30">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          <span className="text-[6px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold">
            {isNight ? "NIGHT_MODE" : "DAY_OPTICS"}
          </span>
          <div className="flex-1 h-px bg-linear-to-r from-cyan-500 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};
