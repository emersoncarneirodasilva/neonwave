import { unlink } from "fs/promises";
import { Track } from "../../../src/generated/client";
import { TrackRepository } from "../repositories/contracts/TrackRepository";

export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async createTrack(
    title: string,
    albumId: number,
    filePath: string,
    trackNumber: number,
    duration?: number
  ): Promise<Track> {
    try {
      if (!title || title.trim() === "") {
        throw new Error("O título da faixa é obrigatório");
      }

      if (albumId <= 0) {
        throw new Error("ID do álbum deve ser positivo");
      }

      if (!filePath || filePath.trim() === "") {
        throw new Error("O caminho do arquivo é obrigatório");
      }

      if (trackNumber <= 0) {
        throw new Error("O número da faixa deve ser positivo");
      }

      // Verifica duplicidade de trackNumber no álbum
      const existingTracks = await this.trackRepository.getTracksByAlbumId(
        albumId
      );

      if (existingTracks.some((t) => t.trackNumber === trackNumber)) {
        throw new Error(
          `Já existe uma faixa com o número ${trackNumber} neste álbum`
        );
      }

      return await this.trackRepository.createTrack({
        title,
        albumId,
        filePath,
        trackNumber,
        duration,
      });
    } catch (err) {
      console.error("Erro ao criar faixa:", err);
      throw err;
    }
  }

  async getAllTracks(): Promise<Track[]> {
    try {
      const tracks = await this.trackRepository.getAllTracks();
      return tracks ?? [];
    } catch (err) {
      console.error("Erro ao buscar todas as faixas:", err);
      throw new Error("Não foi possível buscar as faixas");
    }
  }

  async getTrackById(id: number): Promise<Track | null> {
    try {
      if (id <= 0) throw new Error("ID da faixa deve ser positivo");

      const track = await this.trackRepository.getTrackById(id);

      if (!track) throw new Error(`Faixa com ID ${id} não encontrada`);

      return track;
    } catch (err) {
      console.error("Erro ao buscar faixa pelo ID:", err);
      throw err;
    }
  }

  async getTracksByAlbumId(albumId: number): Promise<Track[]> {
    try {
      if (albumId <= 0) throw new Error("ID do álbum deve ser positivo");

      const tracks = await this.trackRepository.getTracksByAlbumId(albumId);
      return tracks ?? [];
    } catch (err) {
      console.error("Erro ao buscar faixas pelo álbum:", err);
      throw err;
    }
  }

  async getTracksByName(name: string): Promise<Track[]> {
    try {
      if (!name || name.trim() === "") return [];

      return await this.trackRepository.getTracksByName(name);
    } catch (err) {
      console.error("Erro ao buscar faixas pelo nome:", err);
      return [];
    }
  }

  async updateTrack(
    id: number,
    data: {
      title?: string;
      albumId?: number;
      filePath?: string;
      trackNumber?: number;
      duration?: number;
    }
  ): Promise<Track> {
    try {
      if (id <= 0) throw new Error("ID da faixa deve ser positivo");

      if (data.title && data.title.trim() === "") {
        throw new Error("O título da faixa não pode ser vazio");
      }

      // Se alterar número da faixa ou álbum, checa duplicidade
      if (data.trackNumber || data.albumId) {
        const albumIdToCheck =
          data.albumId ??
          (await this.trackRepository.getTrackById(id))?.albumId;

        const trackNumberToCheck = data.trackNumber;

        if (albumIdToCheck && trackNumberToCheck) {
          const existingTracks = await this.trackRepository.getTracksByAlbumId(
            albumIdToCheck
          );

          if (
            existingTracks.some(
              (t) => t.trackNumber === trackNumberToCheck && t.id !== id
            )
          ) {
            throw new Error(
              `Já existe uma faixa com o número ${trackNumberToCheck} neste álbum`
            );
          }
        }
      }

      return await this.trackRepository.updateTrack(id, data);
    } catch (err) {
      console.error("Erro ao atualizar faixa:", err);
      throw err;
    }
  }

  async deleteTrack(id: number): Promise<void> {
    try {
      if (id <= 0) throw new Error("ID da faixa deve ser positivo");

      const track = await this.trackRepository.getTrackById(id);

      if (!track) throw new Error(`Faixa com ID ${id} não encontrada`);

      if (track.filePath) {
        unlink(track.filePath).catch((err) => {
          console.warn(
            "Não foi possível remover o arquivo físico da faixa:",
            track.filePath,
            err
          );
        });
      }

      await this.trackRepository.deleteTrack(id);
    } catch (err) {
      console.error("Erro ao deletar faixa:", err);
      throw err;
    }
  }
}
