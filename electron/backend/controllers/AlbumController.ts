import { Album } from "../../../src/generated/client";
import { AlbumService } from "../services/AlbumService";
import {
  createAlbumSchema,
  idSchema,
  updateAlbumSchema,
} from "../validations/albumValidations";

export class AlbumController {
  constructor(private readonly service: AlbumService) {}

  async createAlbum(data: unknown): Promise<Album | null> {
    try {
      const validData = createAlbumSchema.parse(data);

      return await this.service.createAlbum(
        validData.title,
        validData.artistId,
        validData.year
      );
    } catch (err) {
      console.error("Erro ao criar álbum:", err);
      return null;
    }
  }

  async getAllAlbums(): Promise<Album[]> {
    try {
      return await this.service.getAllAlbums();
    } catch (err) {
      console.error("Erro ao buscar álbuns:", err);
      return [];
    }
  }

  async getAlbumById(id: unknown): Promise<Album | null> {
    try {
      const validId = idSchema.parse(id);

      return await this.service.getAlbumById(validId);
    } catch (err) {
      console.error("Erro ao buscar álbum pelo ID:", err);
      return null;
    }
  }

  async getAlbumsByArtistId(artistId: unknown): Promise<Album[]> {
    try {
      const validArtistId = idSchema.parse(artistId);

      return await this.service.getAlbumsByArtistId(validArtistId);
    } catch (err) {
      console.error("Erro ao buscar álbuns pelo artista:", err);
      return [];
    }
  }

  async updateAlbum(data: unknown): Promise<Album | null> {
    try {
      const { id, title, year, artistId } = updateAlbumSchema.parse(data);

      return await this.service.updateAlbum(id, { title, year, artistId });
    } catch (err) {
      console.error("Erro ao atualizar álbum:", err);
      return null;
    }
  }

  async deleteAlbum(id: unknown): Promise<boolean> {
    try {
      const validId = idSchema.parse(id);

      await this.service.deleteAlbum(validId);

      return true;
    } catch (err) {
      console.error("Erro ao deletar álbum:", err);
      return false;
    }
  }
}
