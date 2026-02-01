import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useDialog } from "../hooks/useDialog";

export interface Track {
  id: number | string;
  title: string;
  trackNumber?: number;
  filePath: string;
}

type PlayerMode = "normal" | "selecting" | "playlist";

interface PlayerContextData {
  currentTrack: Track | null;
  isPlaying: boolean;
  mode: PlayerMode;

  startSelection(): void;
  toggleSelectTrack(track: Track): void;
  finalizePlaylist(): void;
  clearPlaylist(): void;

  playTrack(track: Track): void;
  togglePlay(): void;
  playNext(): void;
  playPrev(): void;

  selectedTracks: Track[];
  playlist: Track[];

  repeat: boolean;
  toggleRepeat(): void;

  audioRef: React.RefObject<HTMLAudioElement>;
}

const PlayerContext = createContext<PlayerContextData | null>(null);

function fileName(path: string) {
  return path.split(/[/\\]/).pop()!;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const { confirmDialog } = useDialog();

  // ---- STATE (UI)
  const [mode, setMode] = useState<PlayerMode>("normal");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState<Track[]>([]);

  // ---- REFS (FONTE DE VERDADE DO PLAYER)
  const modeRef = useRef<PlayerMode>("normal");
  const repeatRef = useRef(false);
  const playlistRef = useRef<Track[]>([]);
  const indexRef = useRef<number>(-1);
  const trackRef = useRef<Track | null>(null);

  // manter refs sincronizadas
  useEffect(() => {
    modeRef.current = mode;
    repeatRef.current = repeat;
    playlistRef.current = playlist;
    trackRef.current = currentTrack;
  }, [mode, repeat, playlist, currentTrack]);

  // ---------- AUDIO (UMA ÚNICA VEZ) ----------
  useEffect(() => {
    const audio = audioRef.current;
    audio.preload = "metadata";

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);

    audio.onended = () => {
      // ▶️ PLAYLIST
      if (modeRef.current === "playlist") {
        const next = indexRef.current + 1;

        if (next < playlistRef.current.length) {
          playFromPlaylist(next);
          return;
        }

        if (repeatRef.current && playlistRef.current.length) {
          playFromPlaylist(0);
        }

        return;
      }

      // ▶️ NORMAL
      if (
        modeRef.current === "normal" &&
        repeatRef.current &&
        trackRef.current
      ) {
        playTrackInternal(trackRef.current);
      }
    };

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // ---------- FUNÇÕES INTERNAS (NÃO EXPORTADAS) ----------
  function playTrackInternal(track: Track) {
    const audio = audioRef.current;

    setCurrentTrack(track);
    trackRef.current = track;

    audio.src = `http://localhost:4000/music/${encodeURIComponent(
      fileName(track.filePath)
    )}`;
    audio.play().catch(() => {});
  }

  function playFromPlaylist(index: number) {
    const track = playlistRef.current[index];
    if (!track) return;

    indexRef.current = index;
    playTrackInternal(track);
  }

  // ---------- LIST MODE ----------
  function startSelection() {
    setSelectedTracks([]);
    setMode("selecting");
  }

  function toggleSelectTrack(track: Track) {
    setSelectedTracks((prev) =>
      prev.some((t) => t.id === track.id)
        ? prev.filter((t) => t.id !== track.id)
        : [...prev, track]
    );
  }

  function finalizePlaylist() {
    if (!selectedTracks.length) return;

    setPlaylist(selectedTracks);
    playlistRef.current = selectedTracks;

    setSelectedTracks([]);
    setMode("playlist");

    playFromPlaylist(0);
  }

  function clearPlaylist() {
    setPlaylist([]);
    playlistRef.current = [];
    indexRef.current = -1;
    setMode("normal");
  }

  // ---------- PLAYER ----------
  async function playTrack(track: Track) {
    if (mode === "playlist") {
      const confirmExit = await confirmDialog("Deseja sair da playlist atual?");
      if (!confirmExit) return;
      clearPlaylist();
    }

    indexRef.current = -1;
    playTrackInternal(track);
  }

  function togglePlay() {
    const audio = audioRef.current;
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
  }

  function playNext() {
    if (modeRef.current !== "playlist") return;
    playFromPlaylist(indexRef.current + 1);
  }

  function playPrev() {
    if (modeRef.current !== "playlist") return;
    playFromPlaylist(indexRef.current - 1);
  }

  function toggleRepeat() {
    setRepeat((r) => !r);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        mode,
        startSelection,
        toggleSelectTrack,
        finalizePlaylist,
        clearPlaylist,
        playTrack,
        togglePlay,
        playNext,
        playPrev,
        selectedTracks,
        playlist,
        repeat,
        toggleRepeat,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer fora do Provider");
  return ctx;
}
