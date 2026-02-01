import type { CreateGenreDTO, UpdateGenreDTO } from "../types/dto/GenreDTO";
import type { CreateArtistDTO, UpdateArtistDTO } from "../types/dto/ArtistDTO";
import type { CreateAlbumDTO, UpdateAlbumDTO } from "../types/dto/AlbumDTO";
import type { CreateTrackDTO, UpdateTrackDTO } from "../types/dto/TrackDTO";
import type { DownloadYoutubeDTO } from "../types/dto/DownloadDTO";

export const NeonWaveAPI = {
  // App
  getAppInfo: () => window.neonwave.getAppInfo(),

  // Genres
  createGenre: (data: CreateGenreDTO) => window.neonwave.createGenre(data),
  listGenres: () => window.neonwave.listGenres(),
  getGenreById: (id: number) => window.neonwave.getGenreById(id),
  getGenreByName: (name: string) => window.neonwave.getGenreByName(name),
  updateGenre: (data: UpdateGenreDTO) => window.neonwave.updateGenre(data),
  deleteGenre: (id: number) => window.neonwave.deleteGenre(id),

  // Artists
  createArtist: (data: CreateArtistDTO) => window.neonwave.createArtist(data),
  listArtists: () => window.neonwave.listArtists(),
  getArtistByName: (name: string) => window.neonwave.getArtistByName(name),
  getArtistById: (id: number) => window.neonwave.getArtistById(id),
  listArtistsByGenre: (genreId: number) =>
    window.neonwave.listArtistsByGenre(genreId),
  updateArtist: (data: UpdateArtistDTO) => window.neonwave.updateArtist(data),
  deleteArtist: (id: number) => window.neonwave.deleteArtist(id),

  // Albums
  createAlbum: (data: CreateAlbumDTO) => window.neonwave.createAlbum(data),
  listAlbums: () => window.neonwave.listAlbums(),
  getAlbumById: (id: number) => window.neonwave.getAlbumById(id),
  getAlbumsByArtistId: (artistId: number) =>
    window.neonwave.getAlbumsByArtistId(artistId),
  updateAlbum: (data: UpdateAlbumDTO) => window.neonwave.updateAlbum(data),
  deleteAlbum: (id: number) => window.neonwave.deleteAlbum(id),

  // Tracks
  createTrack: (data: CreateTrackDTO) => window.neonwave.createTrack(data),
  listTracks: () => window.neonwave.listTracks(),
  getTrackById: (id: number) => window.neonwave.getTrackById(id),
  listTracksByAlbum: (albumId: number) =>
    window.neonwave.listTracksByAlbum(albumId),
  getTracksByName: (name: string) => window.neonwave.getTracksByName(name),
  updateTrack: (data: UpdateTrackDTO) => window.neonwave.updateTrack(data),
  deleteTrack: (id: number) => window.neonwave.deleteTrack(id),

  // Downloads
  downloadYoutubeAudio: (payload: DownloadYoutubeDTO) =>
    window.neonwave.downloadYoutubeAudio(payload),
};

export type NeonWaveAPIType = typeof NeonWaveAPI;
