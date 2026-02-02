import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { HomePage } from "../pages/HomePage";
import { GenresPage } from "../pages/GenresPage";
import { GenreArtistsPage } from "../pages/GenreArtistsPage";
import { ArtistsPage } from "../pages/ArtistsPage";
import { ArtistAlbumsPage } from "../pages/ArtistAlbumsPage";
import { AlbumsPage } from "../pages/AlbumsPage";
import { AlbumTracksPage } from "../pages/AlbumTracksPage";
import { TracksPage } from "../pages/TracksPage";
import { DownloadPage } from "../pages/DownloadPage";
import { NowPlayingPage } from "../pages/NowPlayingPage";
import { ThemesPage } from "../pages/ThemesPage";
import SplashScreen from "../pages/SplashScreen";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:id" element={<GenreArtistsPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:id" element={<ArtistAlbumsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:id" element={<AlbumTracksPage />} />
        <Route path="/tracks" element={<TracksPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/now-playing" element={<NowPlayingPage />} />
        <Route path="/themes" element={<ThemesPage />} />
      </Route>
    </Routes>
  );
}
