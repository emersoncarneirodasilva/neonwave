export {};

declare global {
  interface Window {
    neonwave: {
      // App
      getAppInfo(): Promise<{
        name: string;
        version: string;
        status: string;
      }>;

      // Genres
      createGenre(data: CreateGenreDTO): Promise<Genre | null>;
      listGenres(): Promise<Genre[]>;
      getGenreById(id: number): Promise<Genre | null>;
      getGenreByName(name: string): Promise<Genre | null>;
      updateGenre(data: UpdateGenreDTO): Promise<Genre | null>;
      deleteGenre(id: number): Promise<boolean>;

      // Artists
      createArtist(data: CreateArtistDTO): Promise<Artist | null>;
      listArtists(): Promise<Artist[]>;
      getArtistByName(name: string): Promise<Artist | null>;
      getArtistById(id: number): Promise<Artist | null>;
      listArtistsByGenre(genreId: number): Promise<Artist[]>;
      updateArtist(data: UpdateArtistDTO): Promise<Artist | null>;
      deleteArtist(id: number): Promise<boolean>;

      // Albums
      createAlbum(data: CreateAlbumDTO): Promise<Album | null>;
      listAlbums(): Promise<Album[]>;
      getAlbumById(id: number): Promise<Album | null>;
      getAlbumsByArtistId(artistId: number): Promise<Album[]>;
      updateAlbum(data: UpdateAlbumDTO): Promise<Album | null>;
      deleteAlbum(id: number): Promise<boolean>;

      // Tracks
      createTrack(data: CreateTrackDTO): Promise<Track | null>;
      listTracks(): Promise<Track[]>;
      getTrackById(id: number): Promise<Track | null>;
      listTracksByAlbum(albumId: number): Promise<Track[]>;
      getTracksByName(name: string): Promise<Track[]>;
      updateTrack(data: UpdateTrackDTO): Promise<Track | null>;
      deleteTrack(id: number): Promise<boolean>;

      // Downloads
      downloadYoutubeAudio(payload: DownloadYoutubeDTO): Promise<Track | null>;
    };
  }
}
