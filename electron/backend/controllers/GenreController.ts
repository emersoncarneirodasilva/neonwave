import { Genre } from "../../../src/generated/client";
import { GenresService } from "../services/GenreService";
import {
  createGenreSchema,
  idSchema,
  nameSchema,
  updateGenreSchema,
} from "../validations/genreValidations";

export class GenresController {
  constructor(private readonly service: GenresService) {}

  async createGenre(data: unknown): Promise<Genre | null> {
    try {
      const validData = createGenreSchema.parse(data);

      return await this.service.createGenre(validData.name);
    } catch (err) {
      console.error("Erro ao criar gênero:", err);
      return null;
    }
  }

  async getAllGenres(): Promise<Genre[]> {
    try {
      return await this.service.getAllGenres();
    } catch (err) {
      console.error("Erro ao buscar todos os gêneros:", err);
      return [];
    }
  }

  async getGenreById(id: unknown): Promise<Genre | null> {
    try {
      const validId = idSchema.parse(id);
      return await this.service.getGenreById(validId);
    } catch (err) {
      console.error("Erro ao buscar gênero pelo ID:", err);
      return null;
    }
  }

  async getGenreByName(name: unknown): Promise<Genre | null> {
    try {
      if (!name || (typeof name === "string" && name.trim() === "")) {
        // campo vazio: retorna null, não faz nada
        return null;
      }

      const validName = nameSchema.parse(name);
      return await this.service.getGenreByName(validName);
    } catch (err) {
      console.error("Erro ao buscar gênero pelo nome:", err);
      return null;
    }
  }

  async updateGenre(data: unknown): Promise<Genre | null> {
    try {
      const validData = updateGenreSchema.parse(data);
      return await this.service.updateGenre(validData.id, validData.name);
    } catch (err) {
      console.error("Erro ao atualizar gênero:", err);
      return null;
    }
  }

  async deleteGenre(id: unknown): Promise<boolean> {
    try {
      const validId = idSchema.parse(id);
      return await this.service.deleteGenre(validId);
    } catch (err) {
      console.error("Erro ao deletar gênero:", err);
      return false;
    }
  }
}
