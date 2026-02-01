import { useEffect, useState } from "react";
import { useArtists } from "../../hooks/useArtists";
import { useGenres } from "../../hooks/useGenres";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { ArtistItem } from "../../components/Artists/ArtistItem";
import { CreateEntityModal } from "../../components/modal/CreateModalForm";

export function ArtistsPage() {
  const { artists, fetchArtists, loading, error, createArtist } = useArtists();
  const { genres, fetchGenres } = useGenres();

  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchArtists();
    fetchGenres();
  }, [fetchArtists, fetchGenres]);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        title="Artistas"
        subtitle="Todos os artistas da sua biblioteca"
      />

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Buscar artista..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-input"
        />
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 rounded hover:text-(--btn-secondary-hover) cursor-pointer"
        >
          + Novo Artista
        </button>
      </div>

      {loading && <div>Carregando artistas...</div>}

      {!loading && error && (
        <div className="text-danger">Erro ao carregar artistas: {error}</div>
      )}

      {!loading && filteredArtists.length === 0 && (
        <EmptyState
          title="Nenhum artista encontrado"
          description={
            query
              ? "Nenhum artista corresponde à sua busca"
              : "Os artistas aparecerão aqui quando você adicionar"
          }
        />
      )}

      {!loading && filteredArtists.length > 0 && (
        <ul className="space-y-2">
          {filteredArtists.map((artist) => (
            <ArtistItem
              key={artist.id}
              artist={artist}
              refresh={fetchArtists}
            />
          ))}
        </ul>
      )}

      {showModal && (
        <CreateEntityModal<{ name: string; genreId: number }>
          title="Criar Artista"
          fields={[
            { type: "text", name: "name", label: "Nome do artista" },
            {
              type: "select",
              name: "genreId",
              label: "Gênero",
              options: genres,
            },
          ]}
          initialValues={{
            name: "",
            genreId: genres[0]?.id ?? 0,
          }}
          onSave={async (data) => {
            await createArtist(data);
            setShowModal(false);
            fetchArtists();
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </PageContainer>
  );
}
