import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { useLibraryOverview } from "../../hooks/useLibraryOverview";
import { usePlayer } from "../../contexts/PlayerContext";
import HomeCard from "../../components/Home/HomeCard";

interface Artist {
  id: number;
  name: string;
  genreId: number;
}

interface Album {
  id: number;
  title: string;
  year: number;
  artistId: number;
  artist: Artist;
}

export interface Track {
  id: number | string;
  title: string;
  trackNumber?: number;
  filePath: string;
  duration: number;
  albumId: number;
  album: Album;
}

export function HomePage() {
  const { currentTrack } = usePlayer() as {
    currentTrack: Track | null;
  };

  const { tracksCount, albumsCount, artistsCount, genresCount } =
    useLibraryOverview();

  return (
    <PageContainer>
      <PageHeader
        title="Bem-vindo ao NeonWave"
        subtitle="Sua biblioteca musical offline, viva e organizada"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HomeCard title="Música tocando agora">
          {currentTrack ? (
            <div className="text-sm">
              <p className="font-medium">{currentTrack.title}</p>
              <p className="opacity-70">
                {currentTrack.album.artist.name} - {currentTrack.album.title} (
                {currentTrack.album.year})
              </p>
              {currentTrack.trackNumber && (
                <p className="opacity-60">Faixa {currentTrack.trackNumber}</p>
              )}
            </div>
          ) : (
            <p className="text-sm opacity-60">Nenhuma música tocada ainda</p>
          )}
        </HomeCard>

        <HomeCard title="Resumo da biblioteca">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              🎵 Músicas: <strong>{tracksCount}</strong>
            </div>
            <div>
              💿 Álbuns: <strong>{albumsCount}</strong>
            </div>
            <div>
              🎤 Artistas: <strong>{artistsCount}</strong>
            </div>
            <div>
              🎧 Gêneros: <strong>{genresCount}</strong>
            </div>
          </div>
        </HomeCard>
      </div>
    </PageContainer>
  );
}
