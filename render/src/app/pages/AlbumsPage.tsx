import { useEffect, useState } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import { useArtists } from "../../hooks/useArtists";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { AlbumItem } from "../../components/Albums/AlbumItem";
import { CreateEntityModal } from "../../components/modal/CreateModalForm";

export function AlbumsPage() {
  const { albums, fetchAlbums, createAlbum, loading, error } = useAlbums();
  const { artists, fetchArtists } = useArtists();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAlbums();
    fetchArtists(); // garantir que o select do modal tenha artistas
  }, [fetchAlbums, fetchArtists]);

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader title="Álbuns" subtitle="Todos os álbuns da sua biblioteca" />

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Buscar álbum..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-input"
        />

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 rounded hover:text-(--btn-secondary-hover) cursor-pointer"
        >
          + Novo álbum
        </button>
      </div>

      {loading && <div>Carregando álbuns...</div>}

      {!loading && error && <div className="text-danger">Erro: {error}</div>}

      {!loading && filteredAlbums.length === 0 && (
        <EmptyState
          title="Nenhum álbum encontrado"
          description={
            query
              ? "Nenhum álbum corresponde à sua busca"
              : "Os álbuns aparecerão aqui quando você adicionar"
          }
        />
      )}

      {!loading && filteredAlbums.length > 0 && (
        <ul className="space-y-2">
          {filteredAlbums.map((album) => (
            <AlbumItem key={album.id} album={album} refresh={fetchAlbums} />
          ))}
        </ul>
      )}

      {showModal && (
        <CreateEntityModal<{ title: string; artistId: number }>
          title="Criar Álbum"
          fields={[
            { type: "text", name: "title", label: "Nome do álbum" },
            {
              type: "select",
              name: "artistId",
              label: "Artista",
              options: artists,
            },
          ]}
          initialValues={{
            title: "",
            artistId: artists[0]?.id ?? 0,
          }}
          onSave={async (data) => {
            await createAlbum(data);
            setShowModal(false);
            fetchAlbums();
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </PageContainer>
  );
}
