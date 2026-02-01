import { Genre } from "../../../../src/generated/client";

export interface GenreRepository {
  createGenre(data: { name: string }): Promise<Genre>;
  getAllGenres(): Promise<Genre[]>;
  getGenreById(id: number): Promise<Genre | null>;
  getGenreByName(name: string): Promise<Genre | null>;
  updateGenre(id: number, data: { name: string }): Promise<Genre>;
  deleteGenre(id: number): Promise<void>;
}
