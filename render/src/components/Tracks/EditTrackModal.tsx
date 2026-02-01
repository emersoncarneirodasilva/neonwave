import { useState, useEffect } from "react";
import { useAlbums } from "../../hooks/useAlbums";

export interface Track {
  id: number | string;
  title: string;
  trackNumber?: number;
  filePath: string;
  albumId?: number | null;
}

interface Props {
  track: Track;
  onSave(data: Partial<Track> & { id: number | string }): void;
  onClose(): void;
}

export function EditTrackModal({ track, onSave, onClose }: Props) {
  const { albums, fetchAlbums } = useAlbums();

  const [title, setTitle] = useState(track.title);
  const [trackNumber, setTrackNumber] = useState(track.trackNumber ?? 1);
  const [albumId, setAlbumId] = useState<number | null>(track.albumId ?? null);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  function handleSave() {
    onSave({
      id: track.id,
      title,
      trackNumber,
      albumId,
    });
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
        <h2 className="modal-title text-lg">Editar música</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
          placeholder="Título"
        />

        <input
          type="number"
          value={trackNumber}
          onChange={(e) => setTrackNumber(Number(e.target.value))}
          className="modal-input"
          placeholder="Número da faixa"
        />

        {/* SELECT DE ÁLBUM */}
        <select
          value={albumId ?? ""}
          onChange={(e) =>
            setAlbumId(e.target.value ? Number(e.target.value) : null)
          }
          className="modal-select"
        >
          {albums.map((album) => (
            <option key={album.id} value={album.id} className="text-black">
              {album.title}
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
