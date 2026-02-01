import { Music2 } from "lucide-react";
import { usePlayer } from "../../contexts/PlayerContext";

interface Props {
  onClose: () => void;
}

export function PlaylistModal({ onClose }: Props) {
  const { playlist, clearPlaylist, currentTrack } = usePlayer();

  function handleCancelPlaylist() {
    clearPlaylist();
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-overlay z-50">
      <div className="modal w-96 max-h-[80vh] flex flex-col">
        {/* HEADER */}
        <div className="p-4 border-b border-theme flex justify-between items-center">
          <span className="modal-title">Playlist atual</span>
          <button onClick={onClose} className="icon icon-hover">
            ✕
          </button>
        </div>

        {/* LISTA */}
        <ul className="flex-1 overflow-y-auto p-4 space-y-1">
          {playlist.map((track, i) => {
            const isPlaying = currentTrack?.id === track.id;

            return (
              <li
                key={track.id}
                className={`
                  flex items-center justify-between gap-2
                  rounded px-2 py-1 text-sm
                  ${
                    isPlaying
                      ? "text-(--primary) bg-(--hover-bg) font-medium"
                      : "opacity-80 hover:bg-(--hover-bg)"
                  }
                `}
              >
                {/* TÍTULO */}
                <span className="truncate">
                  {i + 1}. {track.title}
                </span>

                {/* ÍCONE DE MÚSICA */}
                {isPlaying && (
                  <Music2 size={16} className="text-(--primary) shrink-0" />
                )}
              </li>
            );
          })}
        </ul>

        {/* FOOTER */}
        <div className="p-4 border-t border-theme flex justify-end gap-2">
          <button onClick={handleCancelPlaylist} className="modal-btn-danger">
            Cancelar lista
          </button>

          <button onClick={onClose} className="modal-btn-secondary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
