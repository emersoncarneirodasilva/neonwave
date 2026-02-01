import { useNavigate } from "react-router-dom";
import type { Artist } from "../Artists/ArtistItem";

interface Props {
  artists: Artist[];
}

export function GenreArtistsList({ artists }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {artists.map((artist) => (
          <li
            key={artist.id}
            onClick={() => navigate(`/artists/${artist.id}`)}
            className="rounded-md border border-theme bg-surface px-4 py-3 transition hover-bg cursor-pointer"
          >
            <div className="font-semibold">{artist.name}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
