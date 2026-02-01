import { useState, useCallback } from "react";
import { NeonWaveAPI, type NeonWaveAPIType } from "../api/neonwave";
import type { DownloadYoutubeDTO } from "../types/dto/DownloadDTO";

export function useDownloads() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDownloadedTrack, setLastDownloadedTrack] = useState<Awaited<
    ReturnType<NeonWaveAPIType["downloadYoutubeAudio"]>
  > | null>(null);

  const downloadYoutubeAudio = useCallback(
    async (payload: DownloadYoutubeDTO) => {
      setLoading(true);
      setError(null);
      try {
        const track = await NeonWaveAPI.downloadYoutubeAudio(payload);
        setLastDownloadedTrack(track);
        return track;
      } catch (err: any) {
        setError(err.message || "Erro ao baixar áudio");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    lastDownloadedTrack,
    downloadYoutubeAudio,
  };
}
