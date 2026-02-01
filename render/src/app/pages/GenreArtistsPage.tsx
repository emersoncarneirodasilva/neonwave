import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { useArtists } from "../../hooks/useArtists";
import { useGenres } from "../../hooks/useGenres";
import { GenreArtistsList } from "../../components/Genres/GenreArtistsList";
import type { Artist } from "../../components/Artists/ArtistItem";

export function GenreArtistsPage() {
  const { id } = useParams<{ id: string }>();
  const genreId = id ? Number(id) : null;

  const { listArtistsByGenre } = useArtists();
  const { getGenreById } = useGenres();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [genreName, setGenreName] = useState<string>("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!genreId) return;

    async function fetchData() {
      setLoading(true);

      const genre = await getGenreById(genreId ?? 0);
      setGenreName(genre?.name ?? "Desconhecido");

      const data = await listArtistsByGenre(genreId ?? 0);
      setArtists(data);

      setLoading(false);
    }

    fetchData();
  }, [genreId, listArtistsByGenre, getGenreById]);

  if (!genreId) {
    return (
      <PageContainer>
        <EmptyState
          title="Gênero inválido"
          description="Nenhum ID de gênero fornecido."
        />
      </PageContainer>
    );
  }

  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader title={genreName} subtitle="Artistas deste gênero" />

      <input
        placeholder="Buscar artista..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded bg-input"
      />

      {loading && <div>Carregando artistas...</div>}

      {!loading && filteredArtists.length === 0 && (
        <EmptyState
          title="Nenhum artista encontrado"
          description={
            query
              ? "Nenhum artista corresponde à sua busca"
              : "Este gênero ainda não possui artistas cadastrados"
          }
        />
      )}

      {!loading && artists.length > 0 && (
        <GenreArtistsList artists={filteredArtists} />
      )}
    </PageContainer>
  );
}
