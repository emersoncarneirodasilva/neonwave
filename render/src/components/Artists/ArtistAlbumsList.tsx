import { useNavigate } from "react-router-dom";
import type { Album } from "../Albums/AlbumItem";

interface Props {
  albums: Album[];
}

export function ArtistAlbumsList({ albums }: Props) {
  const navigate = useNavigate();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {albums.map((album) => (
        <li
          key={album.id}
          className="rounded-md border border-theme bg-surface px-4 py-3 transition hover-bg cursor-pointer"
          onClick={() => navigate(`/albums/${album.id}`)}
        >
          <div>
            <div className="font-semibold">{album.title}</div>
            <div className="text-sm opacity-60">Ano: {album.year ?? "-"}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
