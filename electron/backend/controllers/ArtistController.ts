import { Artist } from "../../../src/generated/client";
import { ArtistService } from "../services/ArtistService";
import {
  createArtistSchema,
  idSchema,
  nameSchema,
  updateArtistSchema,
} from "../validations/artistValidations";

export class ArtistController {
  constructor(private readonly service: ArtistService) {}

  async createArtist(data: unknown): Promise<Artist | null> {
    try {
      const validData = createArtistSchema.parse(data);

      return await this.service.createArtist(validData.name, validData.genreId);
    } catch (err) {
      console.error("Erro ao criar artista:", err);
      return null;
    }
  }

  async getAllArtists(): Promise<Artist[]> {
    try {
      return await this.service.getAllArtists();
    } catch (err) {
      console.error("Erro ao buscar artistas:", err);
      return [];
    }
  }

  async getArtistByName(name: unknown): Promise<Artist | null> {
    try {
      if (!name || (typeof name === "string" && name.trim() === ""))
        return null;

      const validName = nameSchema.parse(name);

      return await this.service.getArtistByName(validName);
    } catch (err) {
      console.error("Erro ao buscar artista pelo nome:", err);
      return null;
    }
  }

  async getArtistById(id: unknown): Promise<Artist | null> {
    try {
      const validId = idSchema.parse(id);

      return await this.service.getArtistById(validId);
    } catch (err) {
      console.error("Erro ao buscar artista pelo ID:", err);
      return null;
    }
  }

  async getArtistsByGenreId(genreId: unknown): Promise<Artist[]> {
    try {
      const validGenreId = idSchema.parse(genreId);

      return await this.service.getArtistsByGenreId(validGenreId);
    } catch (err) {
      console.error("Erro ao buscar artistas pelo gênero:", err);
      return [];
    }
  }

  async updateArtist(data: unknown): Promise<Artist | null> {
    try {
      const { id, name, genreId } = updateArtistSchema.parse(data);

      return await this.service.updateArtist(id, { name, genreId });
    } catch (err) {
      console.error("Erro ao atualizar artista:", err);
      return null;
    }
  }

  async deleteArtist(id: unknown): Promise<boolean> {
    try {
      const validId = idSchema.parse(id);

      await this.service.deleteArtist(validId);

      return true;
    } catch (err) {
      console.error("Erro ao deletar artista:", err);
      return false;
    }
  }
}
