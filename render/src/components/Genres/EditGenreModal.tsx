import { useState } from "react";
import type { Genre } from "./GenreItem";

interface Props {
  genre: Genre;
  onSave(data: { id: number; name: string }): void;
  onClose(): void;
}

export function EditGenreModal({ genre, onSave, onClose }: Props) {
  const [name, setName] = useState(genre.name);

  function handleSave() {
    onSave({ id: genre.id, name });
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
        <h2 className="modal-title text-lg">Editar Gênero</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal-input"
          placeholder="Nome do gênero"
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
