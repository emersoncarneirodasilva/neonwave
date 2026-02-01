import { Track } from "../../../src/generated/client";
import { TrackService } from "../services/TrackService";
import {
  createTrackSchema,
  idSchema,
  updateTrackSchema,
  nameSchema,
} from "../validations/trackValidations";

export class TrackController {
  constructor(private readonly service: TrackService) {}

  async createTrack(data: unknown): Promise<Track | null> {
    try {
      const validData = createTrackSchema.parse(data);

      return await this.service.createTrack(
        validData.title,
        validData.albumId,
        validData.filePath,
        validData.trackNumber,
        validData.duration
      );
    } catch (err) {
      console.error("Erro ao criar faixa:", err);
      return null;
    }
  }

  async getAllTracks(): Promise<Track[]> {
    try {
      return await this.service.getAllTracks();
    } catch (err) {
      console.error("Erro ao buscar faixas:", err);
      return [];
    }
  }

  async getTrackById(id: unknown): Promise<Track | null> {
    try {
      const validId = idSchema.parse(id);
      return await this.service.getTrackById(validId);
    } catch (err) {
      console.error("Erro ao buscar faixa pelo ID:", err);
      return null;
    }
  }

  async getTracksByAlbumId(albumId: unknown): Promise<Track[]> {
    try {
      const validAlbumId = idSchema.parse(albumId);
      return await this.service.getTracksByAlbumId(validAlbumId);
    } catch (err) {
      console.error("Erro ao buscar faixas pelo álbum:", err);
      return [];
    }
  }

  async getTracksByName(name: unknown): Promise<Track[]> {
    try {
      if (!name || (typeof name === "string" && name.trim() === "")) return [];

      const validName = nameSchema.parse(name);
      return await this.service.getTracksByName(validName);
    } catch (err) {
      console.error("Erro ao buscar faixas pelo nome:", err);
      return [];
    }
  }

  async updateTrack(data: unknown): Promise<Track | null> {
    try {
      const { id, title, albumId, filePath, trackNumber, duration } =
        updateTrackSchema.parse(data);

      return await this.service.updateTrack(id, {
        title,
        albumId,
        filePath,
        trackNumber,
        duration,
      });
    } catch (err) {
      console.error("Erro ao atualizar faixa:", err);
      return null;
    }
  }

  async deleteTrack(id: unknown): Promise<boolean> {
    try {
      const validId = idSchema.parse(id);
      await this.service.deleteTrack(validId);
      return true;
    } catch (err) {
      console.error("Erro ao deletar faixa:", err);
      return false;
    }
  }
}
