// hooks/useLibraryOverview.ts
import { useEffect, useState } from "react";
import { NeonWaveAPI } from "../api/neonwave";

export function useLibraryOverview() {
  const [loading, setLoading] = useState(true);

  const [tracksCount, setTracksCount] = useState(0);
  const [albumsCount, setAlbumsCount] = useState(0);
  const [artistsCount, setArtistsCount] = useState(0);
  const [genresCount, setGenresCount] = useState(0);

  const [recentTracks, setRecentTracks] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [tracks, albums, artists, genres] = await Promise.all([
          NeonWaveAPI.listTracks(),
          NeonWaveAPI.listAlbums(),
          NeonWaveAPI.listArtists(),
          NeonWaveAPI.listGenres(),
        ]);

        setTracksCount(tracks.length);
        setAlbumsCount(albums.length);
        setArtistsCount(artists.length);
        setGenresCount(genres.length);

        setRecentTracks(tracks.slice(-5).reverse());
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    loading,
    tracksCount,
    albumsCount,
    artistsCount,
    genresCount,
    recentTracks,
  };
}
