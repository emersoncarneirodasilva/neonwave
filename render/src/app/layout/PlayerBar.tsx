import { useEffect, useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import { Pause, Play, Repeat, SkipBack, SkipForward } from "lucide-react";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    audioRef,
    mode,
    repeat,
    toggleRepeat,
  } = usePlayer();

  const audio = audioRef.current;
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audio) return;

    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, [audio]);

  return (
    <footer className="h-24 border-t border-theme px-4 flex flex-col justify-center">
      <div className="flex justify-between items-center">
        {/* INFO */}
        <div className="flex flex-col">
          <span className="font-medium text-primary">
            {currentTrack?.title || "Nenhuma música selecionada"}
          </span>
          <span className="text-xs text-muted">
            {formatTime(time)} / {formatTime(duration)}
          </span>
        </div>

        {/* CONTROLES */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRepeat}
            className={`btn-primary ${repeat ? "active" : ""}`}
          >
            <Repeat size={18} />
          </button>

          <button
            onClick={playPrev}
            disabled={mode !== "playlist"}
            className="btn-secondary px-3 py-2 rounded disabled:opacity-40"
          >
            <SkipBack size={18} />
          </button>

          <button
            onClick={togglePlay}
            disabled={!currentTrack}
            className="btn-secondary px-4 py-2 rounded disabled:opacity-40"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={playNext}
            disabled={mode !== "playlist"}
            className="btn-secondary px-3 py-2 rounded disabled:opacity-40"
          >
            <SkipForward size={18} />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={time}
        onChange={(e) => {
          if (audio) audio.currentTime = Number(e.target.value);
        }}
        className="w-full mt-2 accent-green-500 cursor-pointer"
        disabled={!currentTrack || duration === 0}
      />
    </footer>
  );
}
