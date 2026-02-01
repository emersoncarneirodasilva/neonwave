import { Artist } from "../../../../src/generated/client";

export interface ArtistRepository {
  createArtist(data: { name: string; genreId: number }): Promise<Artist>;
  getAllArtists(): Promise<Artist[]>;
  getArtistByName(name: string): Promise<Artist | null>;
  getArtistById(id: number): Promise<Artist | null>;
  getArtistsByGenreId(genreId: number): Promise<Artist[]>;
  updateArtist(
    id: number,
    data: { name?: string; genreId?: number }
  ): Promise<Artist>;
  deleteArtist(id: number): Promise<void>;
}
