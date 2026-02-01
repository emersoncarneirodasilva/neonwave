import { Genre } from "../../../src/generated/client";
import { GenreRepository } from "../repositories/contracts/GenreRepository";

export class GenresService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async createGenre(name: string): Promise<Genre> {
    try {
      const existingGenre = await this.genreRepository.getGenreByName(name);
      if (existingGenre) {
        throw new Error(`Já existe um gênero com o nome "${name}"`);
      }

      return await this.genreRepository.createGenre({ name });
    } catch (err) {
      console.error("Erro ao criar gênero:", err);
      throw err;
    }
  }

  async getAllGenres(): Promise<Genre[]> {
    try {
      const genres = await this.genreRepository.getAllGenres();

      return genres.filter((g) => g.name && g.name.trim() !== "");
    } catch (err) {
      console.error("Erro ao buscar todos os gêneros:", err);
      throw new Error("Não foi possível buscar os gêneros");
    }
  }

  async getGenreById(id: number): Promise<Genre | null> {
    try {
      if (id <= 0) {
        throw new Error("O ID do gênero deve ser um número positivo");
      }

      const genre = await this.genreRepository.getGenreById(id);
      if (!genre) {
        throw new Error(`Gênero com ID ${id} não encontrado`);
      }

      return genre;
    } catch (err) {
      console.error("Erro ao buscar o gênero pelo ID:", err);
      throw err;
    }
  }

  async getGenreByName(name: string): Promise<Genre | null> {
    if (!name || name.trim() === "") {
      throw new Error("O nome do gênero é obrigatório");
    }

    try {
      return await this.genreRepository.getGenreByName(name);
    } catch (err) {
      console.error("Erro ao buscar gênero pelo nome:", err);
      return null;
    }
  }

  async updateGenre(id: number, name: string): Promise<Genre | null> {
    try {
      if (id <= 0) {
        throw new Error("O ID do gênero deve ser um número positivo");
      }

      if (!name || name.trim() === "") {
        throw new Error("O nome do gênero é obrigatório");
      }

      const existingGenre = await this.genreRepository.getGenreByName(name);
      if (existingGenre && existingGenre.id !== id) {
        throw new Error(`Já existe um gênero com o nome "${name}"`);
      }

      const updatedGenre = await this.genreRepository.updateGenre(id, { name });
      return updatedGenre;
    } catch (err) {
      console.error("Erro ao atualizar gênero:", err);
      throw err;
    }
  }

  async deleteGenre(id: number): Promise<boolean> {
    try {
      if (id <= 0) {
        throw new Error("O ID do gênero deve ser um número positivo");
      }

      const existingGenre = await this.genreRepository.getGenreById(id);
      if (!existingGenre) {
        throw new Error(`Gênero com ID ${id} não encontrado`);
      }

      await this.genreRepository.deleteGenre(id);
      return true;
    } catch (err) {
      console.error("Erro ao deletar gênero:", err);
      return false;
    }
  }
}
