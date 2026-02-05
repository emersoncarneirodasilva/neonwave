import type { Track } from "../../../../app/pages/HomePage";
import { usePlayer } from "../../../../contexts/PlayerContext";
import { MarqueeText } from "./MarqueeText";

interface BuildingHUDProps {
  width: number;
}

export const BuildingHUD = ({ width }: BuildingHUDProps) => {
  const { currentTrack } = usePlayer() as { currentTrack: Track | null };

  const hudStyle =
    width >= 1000
      ? {
          top: "28%",
          right: "22%",
          width: "200px",
          transform: "perspective(400px) rotateY(-10deg) skewY(17deg)",
        }
      : {
          top: "28%",
          right: "4.5%",
          width: "220px",
          transform: "perspective(400px) rotateY(-10deg) skewY(17deg)",
        };

  // Se não houver música, retornamos null para não renderizar nada
  if (!currentTrack) return null;

  return (
    <div
      className="absolute pointer-events-none select-none text-right z-20"
      style={hudStyle}
    >
      {/* TÍTULO DA MÚSICA */}
      <MarqueeText
        text={currentTrack.title}
        className="font-mono text-6xl text-cyan-300 leading-tight"
        style={{
          textShadow: "0 0 6px #22d3ee, 0 0 12px #22d3ee, 0 0 18px #22d3ee",
        }}
      />

      {/* NOME DO ÁLBUM */}
      <MarqueeText
        text={`Álbum: ${currentTrack.album.title}`}
        className="mt-3 font-mono text-lg text-pink-300"
        style={{
          textShadow: "0 0 6px #ec4899, 0 0 12px #ec4899, 0 0 18px #ec4899",
        }}
      />

      {/* NOME DO ARTISTA */}
      <MarqueeText
        text={`Artista: ${currentTrack.album.artist.name}`}
        className="mt-1 font-mono text-md text-purple-300"
        style={{
          textShadow: "0 0 6px #a855f7, 0 0 12px #a855f7, 0 0 18px #a855f7",
        }}
      />
    </div>
  );
};
