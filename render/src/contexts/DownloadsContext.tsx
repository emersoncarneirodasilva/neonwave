import { createContext, useContext, type ReactNode } from "react";
import { useDownloads } from "../hooks/useDownloads";
import type { NeonWaveAPIType } from "../api/neonwave";

type DownloadsContextData = {
  loading: boolean;
  error: string | null;
  lastDownloadedTrack: Awaited<
    ReturnType<NeonWaveAPIType["downloadYoutubeAudio"]>
  > | null;
  downloadYoutubeAudio: NeonWaveAPIType["downloadYoutubeAudio"];
};

const DownloadsContext = createContext<DownloadsContextData | null>(null);

export function DownloadsProvider({ children }: { children: ReactNode }) {
  const downloads = useDownloads();

  return (
    <DownloadsContext.Provider value={downloads}>
      {children}
    </DownloadsContext.Provider>
  );
}

export function useDownloadsContext() {
  const context = useContext(DownloadsContext);

  if (!context) {
    throw new Error(
      "useDownloadsContext deve ser usado dentro de DownloadsProvider"
    );
  }

  return context;
}
