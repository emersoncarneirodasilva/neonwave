import { useState } from "react";
import { useGenres } from "../../hooks/useGenres";
import { EditGenreModal } from "./EditGenreModal";
import { useDialog } from "../../hooks/useDialog";
import { Edit2, Trash2 } from "lucide-react";

export interface Genre {
  id: number;
  name: string;
}

interface Props {
  genre: Genre;
  onClick(): void;
  refresh(): void;
}

export function GenreItem({ genre, onClick, refresh }: Props) {
  const [editing, setEditing] = useState(false);
  const { updateGenre, deleteGenre } = useGenres();
  const { confirmDelete } = useDialog();

  async function handleDelete() {
    const confirmed = await confirmDelete(
      "Deseja deletar este gênero? Genêro associado a artistas não podem ser deletados."
    );
    if (!confirmed) return;
    await deleteGenre(genre.id);
    refresh();
  }

  async function handleSave(data: { id: number; name: string }) {
    await updateGenre(data);
    setEditing(false);
    refresh();
  }

  return (
    <>
      <li className="flex justify-between items-center px-3 py-2 rounded hover:bg-(--navlink-bg-active)">
        <div className="flex-1 cursor-pointer" onClick={onClick}>
          <div className="font-semibold">{genre.name}</div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setEditing(true)}>
            <Edit2 className="icon icon-edit cursor-pointer" size={18} />
          </button>
          <button onClick={handleDelete}>
            <Trash2 className="icon icon-danger cursor-pointer" size={18} />
          </button>
        </div>
      </li>

      {editing && (
        <EditGenreModal
          genre={genre}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
