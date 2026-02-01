import { useEffect, useState } from "react";
import { NeonWaveAPI } from "../../api/neonwave";
import type { DownloadYoutubeDTO } from "../../types/dto/DownloadDTO";
import { useDownloadsContext } from "../../contexts/DownloadsContext";

export function DownloadTrackForm() {
  const { downloadYoutubeAudio } = useDownloadsContext();

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [artists, setArtists] = useState<{ id: number; name: string }[]>([]);
  const [albums, setAlbums] = useState<{ id: number; title: string }[]>([]);

  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  const [newGenreName, setNewGenreName] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [trackNumber, setTrackNumber] = useState(1);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    NeonWaveAPI.listGenres().then(setGenres).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedGenreId) {
      setArtists([]);
      setAlbums([]);
      return;
    }

    NeonWaveAPI.listArtistsByGenre(selectedGenreId)
      .then(setArtists)
      .catch(console.error);
  }, [selectedGenreId]);

  useEffect(() => {
    if (!selectedArtistId) {
      setAlbums([]);
      return;
    }

    NeonWaveAPI.getAlbumsByArtistId(selectedArtistId)
      .then(setAlbums)
      .catch(console.error);
  }, [selectedArtistId]);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let genreId = selectedGenreId;
      if (!genreId && newGenreName.trim()) {
        const genre = await NeonWaveAPI.createGenre({ name: newGenreName });
        genreId = genre.id;
        setGenres((g) => [...g, genre]);
      }

      let artistId = selectedArtistId;
      if (!artistId && newArtistName.trim() && genreId) {
        const artist = await NeonWaveAPI.createArtist({
          name: newArtistName,
          genreId,
        });
        artistId = artist.id;
        setArtists((a) => [...a, artist]);
      }

      let albumId = selectedAlbumId;
      if (!albumId && newAlbumTitle.trim() && artistId) {
        const album = await NeonWaveAPI.createAlbum({
          title: newAlbumTitle,
          artistId,
          year,
        });
        albumId = album.id;
        setAlbums((a) => [...a, album]);
      }

      if (!albumId) throw new Error("Álbum não definido.");

      const payload: DownloadYoutubeDTO = {
        url: youtubeUrl,
        genreName: genres.find((g) => g.id === genreId)?.name || newGenreName,
        artistName:
          artists.find((a) => a.id === artistId)?.name || newArtistName,
        albumTitle:
          albums.find((a) => a.id === albumId)?.title || newAlbumTitle,
        trackNumber,
        year,
      };

      await downloadYoutubeAudio(payload);

      setSuccess("Download finalizado com sucesso!");
      setYoutubeUrl("");
    } catch (e: any) {
      setError(e.message ?? "Erro ao iniciar download");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface rounded-lg p-6 max-w-3xl space-y-5">
      <h3 className="text-lg font-semibold text-primary">
        Adicionar faixa via YouTube
      </h3>

      {/* GÊNERO */}
      <div className="grid grid-cols-2 gap-2">
        <select
          value={selectedGenreId ?? ""}
          onChange={(e) => setSelectedGenreId(Number(e.target.value) || null)}
          className="modal-select"
        >
          <option value="">Selecionar gênero</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Novo gênero"
          value={newGenreName}
          onChange={(e) => setNewGenreName(e.target.value)}
          className="modal-input"
        />
      </div>

      {/* ARTISTA */}
      <div className="grid grid-cols-2 gap-2">
        <select
          value={selectedArtistId ?? ""}
          onChange={(e) => setSelectedArtistId(Number(e.target.value) || null)}
          className="modal-select"
        >
          <option value="">Selecionar artista</option>
          {artists.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Novo artista"
          value={newArtistName}
          onChange={(e) => setNewArtistName(e.target.value)}
          className="modal-input"
        />
      </div>

      {/* ÁLBUM */}
      <div className="grid grid-cols-2 gap-2">
        <select
          value={selectedAlbumId ?? ""}
          onChange={(e) => setSelectedAlbumId(Number(e.target.value) || null)}
          className="modal-select"
        >
          <option value="">Selecionar álbum</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Novo álbum"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          className="modal-input"
        />
      </div>

      {/* URL */}
      <input
        placeholder="URL do YouTube"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="modal-input w-full"
      />

      {/* META + AÇÃO */}
      <div className="flex justify-between items-end gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-xs text-muted">Faixa</label>
            <input
              type="number"
              min={1}
              value={trackNumber}
              onChange={(e) => setTrackNumber(Number(e.target.value))}
              className="modal-input"
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-xs text-muted">Ano</label>
            <input
              type="number"
              value={year ?? ""}
              onChange={(e) => setYear(Number(e.target.value))}
              className="modal-input"
            />
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="modal-btn-primary disabled:opacity-50"
        >
          {loading ? "Baixando..." : "Iniciar download"}
        </button>
      </div>

      {error && <p className="text-danger text-sm">{error}</p>}
      {success && <p className="text-success text-sm">{success}</p>}
    </div>
  );
}
