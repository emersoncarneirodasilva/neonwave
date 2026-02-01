import { useState, useEffect } from "react";
import type { Album } from "./AlbumItem";
import { useArtists } from "../../hooks/useArtists";

interface Props {
  album: Album;
  onSave(data: Partial<Album> & { id: number }): void;
  onClose(): void;
}

export function EditAlbumModal({ album, onSave, onClose }: Props) {
  const { artists, fetchArtists } = useArtists();
  const [title, setTitle] = useState(album.title);
  const [artistId, setArtistId] = useState(album.artistId);
  const [year, setYear] = useState(album.year ?? new Date().getFullYear());

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  function handleSave() {
    onSave({ id: album.id, title, artistId, year });
    onClose();
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
        <h2 className="modal-title text-lg">Editar Álbum</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
          placeholder="Título do álbum"
        />

        <select
          value={artistId}
          onChange={(e) => setArtistId(Number(e.target.value))}
          className="modal-select"
        >
          {artists.map((a) => (
            <option key={a.id} value={a.id} className="text-black">
              {a.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="modal-input"
          placeholder="Ano"
        />

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
