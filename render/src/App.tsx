import { useEffect, useState } from "react";
import { DownloadAudio } from "./components/Tests/Downloads/DonwloadAudio";
// import { GenresList } from "./components/Genres/GenresList";
// import { ArtistsList } from "./components/Artists/ArtistsList";
// import { AlbumsList } from "./components/Albums/AlbumsList";
// import { TracksList } from "./components/Tracks/TracksList";

type AppInfo = {
  name: string;
  version: string;
  status: string;
};

export default function App() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    window.neonwave.getAppInfo().then(setAppInfo);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">NeonWave</h1>

      {appInfo && (
        <div className="mb-6 text-sm text-(--text-muted)">
          <p>Name: {appInfo.name}</p>
          <p>Version: {appInfo.version}</p>
          <p>Status: {appInfo.status}</p>
        </div>
      )}

      {/* TEST AREA */}
      <DownloadAudio />

      {/* Outros testes */}
      {/*
      <GenresList />
      <ArtistsList />
      <AlbumsList />
      <TracksList />
      */}
    </div>
  );
}
