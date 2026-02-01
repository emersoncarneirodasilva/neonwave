import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("neonwave", {
  // App Info
  getAppInfo: () => ipcRenderer.invoke("get-app-info"),

  // Genres
  createGenre: (data: unknown) => ipcRenderer.invoke("create-genre", data),
  listGenres: () => ipcRenderer.invoke("list-genres"),
  getGenreById: (id: unknown) => ipcRenderer.invoke("get-genre-by-id", id),
  getGenreByName: (name: unknown) =>
    ipcRenderer.invoke("get-genre-by-name", name),
  updateGenre: (data: unknown) => ipcRenderer.invoke("update-genre", data),
  deleteGenre: (id: unknown) => ipcRenderer.invoke("delete-genre", id),

  // Artists
  createArtist: (data: unknown) => ipcRenderer.invoke("create-artist", data),
  listArtists: () => ipcRenderer.invoke("list-artists"),
  getArtistByName: (name: unknown) =>
    ipcRenderer.invoke("get-artist-by-name", name),
  getArtistById: (id: unknown) => ipcRenderer.invoke("get-artist-by-id", id),
  listArtistsByGenre: (genreId: unknown) =>
    ipcRenderer.invoke("list-artists-by-genre", genreId),
  updateArtist: (data: unknown) => ipcRenderer.invoke("update-artist", data),
  deleteArtist: (id: unknown) => ipcRenderer.invoke("delete-artist", id),

  // Albums
  createAlbum: (data: unknown) => ipcRenderer.invoke("create-album", data),
  listAlbums: () => ipcRenderer.invoke("list-albums"),
  getAlbumById: (id: unknown) => ipcRenderer.invoke("get-album-by-id", id),
  getAlbumsByArtistId: (artistId: unknown) =>
    ipcRenderer.invoke("get-albums-by-artist-id", artistId),
  updateAlbum: (data: unknown) => ipcRenderer.invoke("update-album", data),
  deleteAlbum: (id: unknown) => ipcRenderer.invoke("delete-album", id),

  // Tracks
  createTrack: (data: unknown) => ipcRenderer.invoke("create-track", data),
  listTracks: () => ipcRenderer.invoke("list-tracks"),
  getTrackById: (id: unknown) => ipcRenderer.invoke("get-track-by-id", id),
  listTracksByAlbum: (albumId: unknown) =>
    ipcRenderer.invoke("list-tracks-by-album", albumId),
  getTracksByName: (name: unknown) =>
    ipcRenderer.invoke("get-tracks-by-name", name),
  updateTrack: (data: unknown) => ipcRenderer.invoke("update-track", data),
  deleteTrack: (id: unknown) => ipcRenderer.invoke("delete-track", id),

  // Downloads
  downloadYoutubeAudio: (payload: {
    url: string;
    genreName: string;
    artistName: string;
    albumTitle: string;
    trackNumber: number;
    year?: number;
  }) => ipcRenderer.invoke("download-youtube-audio", payload),
});

console.log("NeonWave preload loaded");
