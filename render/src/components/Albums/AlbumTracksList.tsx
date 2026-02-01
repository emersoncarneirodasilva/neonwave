import { useState, useEffect } from "react";
import { TrackItem } from "../Tracks/TrackItem";
import { usePlayer } from "../../contexts/PlayerContext";
import { PlaylistModal } from "../Tracks/PlaylistModal";
import type { Track } from "../../contexts/PlayerContext";

interface Props {
  albumId: number;
  tracks: Track[];
  updateTrack(
    data: Partial<Track> & { id: number; albumId?: number | null }
  ): Promise<void>;
  deleteTrack(id: number): Promise<void>;
}

export function AlbumTracksList({
  albumId,
  tracks,
  updateTrack,
  deleteTrack,
}: Props) {
  const {
    mode,
    startSelection,
    finalizePlaylist,
    clearPlaylist,
    selectedTracks,
  } = usePlayer();

  const [showPlaylist, setShowPlaylist] = useState(false);
  const [localTracks, setLocalTracks] = useState<Track[]>(tracks);

  useEffect(() => {
    setLocalTracks(tracks);
  }, [tracks]);

  async function handleUpdate(
    data: Partial<Track> & { id: number; albumId?: number | null }
  ) {
    await updateTrack(data);

    setLocalTracks((prev) => {
      if (data.albumId !== undefined && data.albumId !== albumId) {
        return prev.filter((t) => t.id !== data.id);
      }

      return prev.map((t) => (t.id === data.id ? { ...t, ...data } : t));
    });
  }

  async function handleDelete(id: number) {
    await deleteTrack(id);
    setLocalTracks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <div className="mb-4 flex gap-2">
        {mode === "normal" && (
          <button
            onClick={startSelection}
            className="action-btn action-btn-primary"
          >
            Criar lista
          </button>
        )}

        {mode === "selecting" && (
          <div className="flex gap-4">
            <button
              onClick={finalizePlaylist}
              disabled={!selectedTracks.length}
              className="action-btn action-btn-success"
            >
              Finalizar lista
            </button>
            <button
              onClick={clearPlaylist}
              className="action-btn action-btn-danger"
            >
              Cancelar
            </button>
          </div>
        )}

        {mode === "playlist" && (
          <button
            onClick={() => setShowPlaylist(true)}
            className="action-btn action-btn-toggle"
          >
            Mostrar lista
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {localTracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>

      {showPlaylist && <PlaylistModal onClose={() => setShowPlaylist(false)} />}
    </>
  );
}
