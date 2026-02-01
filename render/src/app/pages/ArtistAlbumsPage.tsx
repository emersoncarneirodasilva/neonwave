import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { useAlbums } from "../../hooks/useAlbums";
import { useArtists } from "../../hooks/useArtists";
import { ArtistAlbumsList } from "../../components/Artists/ArtistAlbumsList";

export interface Album {
  id: number;
  title: string;
  artistId: number;
  year?: number;
}

export interface Artist {
  id: number;
  name: string;
}

export function ArtistAlbumsPage() {
  const { id } = useParams<{ id: string }>();
  const artistId = id ? Number(id) : null;

  const { getAlbumsByArtistId } = useAlbums();
  const { getArtistById } = useArtists();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!artistId) return;

    async function fetchData() {
      setLoading(true);

      const artistData = await getArtistById(artistId ?? 0);
      setArtist(artistData);

      const albumsData = await getAlbumsByArtistId(artistId ?? 0);
      setAlbums(albumsData);

      setLoading(false);
    }

    fetchData();
  }, [artistId, getAlbumsByArtistId, getArtistById]);

  if (!artistId) {
    return (
      <PageContainer>
        <EmptyState
          title="Artista inválido"
          description="Nenhum ID de artista fornecido."
        />
      </PageContainer>
    );
  }

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        title={artist ? artist.name : `Artista ${artistId}`}
        subtitle="Álbuns deste artista"
      />

      {/* Campo de busca */}
      <input
        placeholder="Buscar álbum..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded bg-input"
      />

      {loading && <div>Carregando álbuns...</div>}

      {!loading && filteredAlbums.length === 0 && (
        <EmptyState
          title="Nenhum álbum encontrado"
          description={
            query
              ? "Nenhum álbum corresponde à sua busca"
              : "Este artista ainda não possui álbuns cadastrados"
          }
        />
      )}

      {!loading && filteredAlbums.length > 0 && (
        <ArtistAlbumsList albums={filteredAlbums} />
      )}
    </PageContainer>
  );
}
