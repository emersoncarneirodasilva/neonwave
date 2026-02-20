import { useState } from "react";
import { TrackItem } from "../Tracks/TrackItem";
import { usePlayer } from "../../contexts/PlayerContext";
import { PlaylistModal } from "../Tracks/PlaylistModal";
import type { Track } from "../../contexts/PlayerContext";

interface Props {
  albumId: number;
  tracks: Track[];
  updateTrack(
    data: Partial<Track> & { id: number; albumId?: number | null },
  ): Promise<void>;
  deleteTrack(id: number): Promise<void>;
}

export function AlbumTracksList({ tracks, updateTrack, deleteTrack }: Props) {
  const {
    mode,
    startSelection,
    finalizePlaylist,
    clearPlaylist,
    selectedTracks,
  } = usePlayer();

  const [showPlaylist, setShowPlaylist] = useState(false);

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
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            onDelete={deleteTrack}
            onUpdate={updateTrack}
          />
        ))}
      </ul>

      {showPlaylist && <PlaylistModal onClose={() => setShowPlaylist(false)} />}
    </>
  );
}
