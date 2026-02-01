import { useEffect, useState } from "react";
import { TrackListPlayer } from "../../components/Tracks/TrackListPlayer";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { useTracks } from "../../hooks/useTracks";

export function TracksPage() {
  const tracksState = useTracks();
  const { tracks, fetchTracks, loading, error } = tracksState;

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchTracks(); // 🔥 ESSENCIAL
  }, [fetchTracks]);

  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        title="Músicas"
        subtitle="Todas as músicas da sua biblioteca"
      />

      <input
        placeholder="Buscar música..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded bg-input"
      />

      {loading && <div>Carregando músicas...</div>}

      {!loading && error && <div className="text-danger">Erro: {error}</div>}

      {!loading && !error && filteredTracks.length === 0 && (
        <EmptyState
          title="Nenhuma música encontrada"
          description={
            query
              ? "Nenhuma música corresponde à sua busca"
              : "As músicas aparecerão aqui quando você adicionar músicas"
          }
        />
      )}

      {!loading && !error && filteredTracks.length > 0 && (
        <TrackListPlayer {...tracksState} tracks={filteredTracks} />
      )}
    </PageContainer>
  );
}
