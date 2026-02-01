import { useState, useEffect } from "react";
import { useGenres } from "../../hooks/useGenres";
import type { UpdateArtistDTO } from "../../types/dto/ArtistDTO";

interface Artist {
  id: number;
  name: string;
  genreId: number;
}

interface Props {
  artist: Artist;
  onSave(data: UpdateArtistDTO): void;
  onClose(): void;
}

export function EditArtistModal({ artist, onSave, onClose }: Props) {
  const { genres, fetchGenres } = useGenres();
  const [name, setName] = useState(artist.name);
  const [genreId, setGenreId] = useState<number>(artist.genreId);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  function handleSave() {
    if (!name.trim()) return;

    onSave({
      id: artist.id,
      name,
      genreId,
    });
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center modal-overlay z-50"
      onClick={onClose}
    >
      <div
        className="modal p-4 rounded w-80 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title text-lg">Editar Artista</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal-input"
          placeholder="Nome do artista"
        />

        <select
          value={genreId}
          onChange={(e) => setGenreId(Number(e.target.value))}
          className="modal-select"
        >
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="modal-btn-secondary">
            Cancelar
          </button>
          <button onClick={handleSave} className="modal-btn-primary">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
