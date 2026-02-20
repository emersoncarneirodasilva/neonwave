import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { AlbumTracksList } from "../../components/Albums/AlbumTracksList";
import { useTracks } from "../../hooks/useTracks";
import { useAlbums } from "../../hooks/useAlbums";
import { useArtists } from "../../hooks/useArtists";
import type { Track } from "../../contexts/PlayerContext";

export interface Album {
  id: number;
  title: string;
  artistId: number;
  artistName?: string;
  year?: number;
}

export function AlbumTracksPage() {
  const { id } = useParams<{ id: string }>();
  const albumId = id ? Number(id) : null;

  const { listTracksByAlbum, updateTrack, deleteTrack } = useTracks();
  const { getAlbumById } = useAlbums();
  const { artists, fetchArtists } = useArtists();

  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  useEffect(() => {
    if (!albumId) return;

    async function fetchData() {
      setLoading(true);
      try {
        const trackData = await listTracksByAlbum(albumId ?? 0);
        setTracks(trackData);

        const albumData = await getAlbumById(albumId ?? 0);
        if (albumData) {
          const artist = artists.find((a) => a.id === albumData.artistId);
          setAlbum({
            ...albumData,
            artistName: artist?.name,
          });
        }
      } catch (err) {
        console.error("Erro ao carregar dados do álbum:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [albumId, listTracksByAlbum, getAlbumById, artists]);

  // Função memorizada para atualizar o nome/dados da música na lista
  const handleUpdateTrack = useCallback(
    async (data: Partial<Track> & { id: number }) => {
      await updateTrack(data);
      setTracks((prev) =>
        prev.map((t) => (t.id === data.id ? { ...t, ...data } : t)),
      );
    },
    [updateTrack],
  );

  // Função memorizada para remover a música da lista
  const handleDeleteTrack = useCallback(
    async (id: number) => {
      await deleteTrack(id);
      setTracks((prev) => prev.filter((t) => t.id !== id));
    },
    [deleteTrack],
  );

  if (!albumId) {
    return (
      <PageContainer>
        <EmptyState
          title="Álbum inválido"
          description="Nenhum ID de álbum fornecido."
        />
      </PageContainer>
    );
  }

  const filteredTracks = tracks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PageContainer>
      <PageHeader
        title={album ? album.title : `Álbum ${albumId}`}
        subtitle={
          album
            ? `${album.artistName ?? "Desconhecido"} • ${album.year ?? "-"}`
            : "Todas as músicas do álbum"
        }
      />

      <input
        placeholder="Buscar música..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded bg-input"
      />

      {loading && <div>Carregando músicas...</div>}

      {!loading && filteredTracks.length === 0 && (
        <EmptyState
          title="Nenhuma música encontrada"
          description={
            query
              ? "Nenhuma música corresponde à sua busca"
              : "Este álbum ainda não possui músicas"
          }
        />
      )}

      {!loading && filteredTracks.length > 0 && (
        <AlbumTracksList
          albumId={albumId}
          tracks={filteredTracks}
          updateTrack={handleUpdateTrack}
          deleteTrack={handleDeleteTrack}
        />
      )}
    </PageContainer>
  );
}
