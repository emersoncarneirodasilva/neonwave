import { Album } from "../../../../src/generated/client";

export interface AlbumRepository {
  createAlbum(data: {
    title: string;
    year?: number;
    artistId: number;
  }): Promise<Album>;

  getAllAlbums(): Promise<Album[]>;

  getAlbumById(id: number): Promise<Album | null>;

  getAlbumsByArtistId(artistId: number): Promise<Album[]>;

  updateAlbum(
    id: number,
    data: {
      title?: string;
      year?: number;
      artistId?: number;
    }
  ): Promise<Album>;

  deleteAlbum(id: number): Promise<void>;
}
