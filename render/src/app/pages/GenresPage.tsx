import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/ui/PageContainer";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { useGenres } from "../../hooks/useGenres";
import { GenreItem } from "../../components/Genres/GenreItem";
import { CreateEntityModal } from "../../components/modal/CreateModalForm";

export function GenresPage() {
  const { genres, fetchGenres, createGenre, loading, error } = useGenres();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const filteredGenres = genres.filter((g) =>
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        title="Gêneros"
        subtitle="Todos os gêneros da sua biblioteca"
      />

      <div className="flex mb-4 gap-2">
        <input
          placeholder="Buscar gênero..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-input"
        />
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 rounded hover:text-(--btn-secondary-hover) cursor-pointer"
        >
          + Novo gênero
        </button>
      </div>

      {loading && <div>Carregando gêneros...</div>}

      {!loading && error && (
        <div className="text-danger">Erro ao carregar gêneros: {error}</div>
      )}

      {!loading && filteredGenres.length === 0 && (
        <EmptyState
          title="Nenhum gênero encontrado"
          description={
            query
              ? "Nenhum gênero corresponde à sua busca"
              : "Os gêneros aparecerão aqui quando você adicionar"
          }
        />
      )}

      {!loading && filteredGenres.length > 0 && (
        <ul className="space-y-2">
          {filteredGenres.map((genre) => (
            <GenreItem
              key={genre.id}
              genre={genre}
              onClick={() => navigate(`/genres/${genre.id}`)}
              refresh={fetchGenres}
            />
          ))}
        </ul>
      )}

      {showModal && (
        <CreateEntityModal<{ name: string }>
          title="Criar Gênero"
          fields={[{ type: "text", name: "name", label: "Nome do gênero" }]}
          initialValues={{ name: "" }}
          onSave={async ({ name }) => {
            await createGenre({ name });
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </PageContainer>
  );
}
