import { useEffect, useState } from "react";
import { useArtists } from "../../hooks/useArtists";
import { useGenres } from "../../hooks/useGenres";
import { EditArtistModal } from "./EditArtistModal";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../hooks/useDialog";
import { Edit2, Trash2 } from "lucide-react";

export interface Artist {
  id: number;
  name: string;
  genreId: number;
}

interface Props {
  artist: Artist;
  refresh(): void;
}

export function ArtistItem({ artist, refresh }: Props) {
  const [editing, setEditing] = useState(false);
  const { deleteArtist, updateArtist } = useArtists();
  const { genres, fetchGenres } = useGenres();
  const { confirmDelete } = useDialog();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const genreName =
    genres.find((g) => g.id === artist.genreId)?.name ?? "Não definido";

  async function handleDelete() {
    const confirmed = await confirmDelete(
      "Deseja deletar este artista? Artista só será deletado se não tiver álbuns."
    );

    if (!confirmed) return;

    await deleteArtist(artist.id);
    refresh();
  }

  async function handleSave(data: {
    id: number;
    name: string;
    genreId: number;
  }) {
    await updateArtist(data);
    setEditing(false);
    refresh();
  }

  return (
    <>
      <li className="flex justify-between items-center px-3 py-2 rounded hover:bg-(--navlink-bg-active)">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => navigate(`/artists/${artist.id}`)}
        >
          <div className="font-semibold">{artist.name}</div>
          <div className="text-sm opacity-60">Gênero: {genreName}</div>
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
        <EditArtistModal
          artist={artist}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
