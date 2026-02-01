import { useState, useEffect } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import { EditAlbumModal } from "./EditAlbumModal";
import { useNavigate } from "react-router-dom";
import { useArtists } from "../../hooks/useArtists";
import { useDialog } from "../../hooks/useDialog";
import { Edit2, Trash2 } from "lucide-react";

export interface Album {
  id: number;
  title: string;
  artistId: number;
  year?: number;
}

interface Props {
  album: Album;
  refresh(): void;
}

export function AlbumItem({ album, refresh }: Props) {
  const [editing, setEditing] = useState(false);
  const { deleteAlbum, updateAlbum } = useAlbums();
  const { artists, fetchArtists } = useArtists();
  const { confirmDelete } = useDialog();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const artistName =
    artists.find((a) => a.id === album.artistId)?.name ?? "Desconhecido";

  async function handleDelete() {
    const confirmed = await confirmDelete(
      "Deseja deletar este álbum? Álbuns com músicas não podem ser deletados."
    );

    if (!confirmed) return;

    await deleteAlbum(album.id);
    refresh();
  }

  async function handleSave(data: Partial<Album> & { id: number }) {
    await updateAlbum(data);
    setEditing(false);
    refresh();
  }

  return (
    <>
      <li className="flex justify-between items-center px-3 py-2 rounded hover:bg-(--navlink-bg-active)">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => navigate(`/albums/${album.id}`)}
        >
          <div className="font-semibold">
            {album.title} ({album.year ?? "-"})
          </div>
          <div className="text-sm opacity-60">Artista: {artistName}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            <Edit2 className="icon icon-edit cursor-pointer" size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <Trash2 className="icon icon-danger cursor-pointer" size={18} />
          </button>
        </div>
      </li>

      {editing && (
        <EditAlbumModal
          album={album}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
