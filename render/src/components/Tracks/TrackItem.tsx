import { useState } from "react";
import { usePlayer, type Track } from "../../contexts/PlayerContext";
import { EditTrackModal } from "./EditTrackModal";
import { useDialog } from "../../hooks/useDialog";
import { Edit2, Pause, Play, Trash2 } from "lucide-react";

interface Props {
  track: Track;
  index: number;
  onDelete(id: number): void;
  onUpdate(data: Partial<Track> & { id: number | string }): void;
}

export function TrackItem({ track, index, onDelete, onUpdate }: Props) {
  const {
    mode,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    toggleSelectTrack,
    selectedTracks,
  } = usePlayer();

  const { confirmDelete } = useDialog();
  const [editing, setEditing] = useState(false);

  const isCurrent = currentTrack?.id === track.id;
  const isSelected = selectedTracks.some((t) => t.id === track.id);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();

    const confirm = await confirmDelete(
      `Deseja deletar a música "${track.title}"?`
    );

    if (confirm) {
      onDelete(track.id as number);
    }
  }

  return (
    <>
      <li
        onClick={() =>
          mode === "selecting" ? toggleSelectTrack(track) : playTrack(track)
        }
        className={`
          flex items-center gap-2 px-3 py-2 rounded cursor-pointer
          hover:bg-(--navlink-bg-active)
          ${isSelected ? "bg-(--hover-bg-strong)" : ""}
        `}
      >
        {mode === "selecting" && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelectTrack(track)}
            onClick={(e) => e.stopPropagation()}
          />
        )}

        <span
          className={`w-8 text-center ${
            isCurrent ? "text-(--btn-primary-active)" : "text-muted"
          }`}
        >
          {track.trackNumber ?? index + 1}
        </span>

        <span
          className={`flex-1 truncate px-2 ${
            isCurrent ? "text-(--btn-primary-active)" : ""
          }`}
        >
          {track.title}
        </span>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              isCurrent ? togglePlay() : playTrack(track);
            }}
          >
            {isCurrent && isPlaying ? (
              <Pause
                size={18}
                className={
                  isCurrent ? "text-(--btn-primary-active)" : "icon icon-hover"
                }
              />
            ) : (
              <Play
                size={18}
                className={
                  isCurrent ? "text-(--btn-primary-active)" : "icon icon-hover"
                }
              />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            <Edit2 size={18} className="icon icon-edit" />
          </button>

          <button onClick={handleDelete}>
            <Trash2 size={18} className="icon icon-danger" />
          </button>
        </div>
      </li>

      {editing && (
        <EditTrackModal
          track={track}
          onSave={onUpdate}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
