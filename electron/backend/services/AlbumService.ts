import { Album } from "../../../src/generated/client";
import { AlbumRepository } from "../repositories/contracts/AlbumRepository";

export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async createAlbum(
    title: string,
    artistId: number,
    year?: number
  ): Promise<Album> {
    try {
      if (!title || title.trim() === "")
        throw new Error("O título do álbum é obrigatório");

      if (artistId <= 0) throw new Error("ID do artista deve ser positivo");

      const existingAlbum = await this.albumRepository.getAlbumsByArtistId(
        artistId
      );

      if (
        existingAlbum.some(
          (a) => a.title.trim().toLowerCase() === title.trim().toLowerCase()
        )
      ) {
        throw new Error(`O artista já possui um álbum chamado "${title}"`);
      }

      return await this.albumRepository.createAlbum({
        title,
        artistId,
        year,
      });
    } catch (err) {
      console.error("Erro ao criar álbum:", err);
      throw err;
    }
  }

  async getAllAlbums(): Promise<Album[]> {
    try {
      return await this.albumRepository.getAllAlbums();
    } catch (err) {
      console.error("Erro ao buscar todos os álbuns:", err);
      throw new Error("Não foi possível buscar os álbuns");
    }
  }

  async getAlbumById(id: number): Promise<Album | null> {
    try {
      if (id <= 0) throw new Error("ID do álbum deve ser positivo");

      const album = await this.albumRepository.getAlbumById(id);

      if (!album) throw new Error(`Álbum com ID ${id} não encontrado`);

      return album;
    } catch (err) {
      console.error("Erro ao buscar álbum pelo ID:", err);
      throw err;
    }
  }

  async getAlbumsByArtistId(artistId: number): Promise<Album[]> {
    if (artistId <= 0) return [];

    try {
      const albums = await this.albumRepository.getAlbumsByArtistId(artistId);
      return albums ?? [];
    } catch (err) {
      console.error("Erro ao buscar álbuns pelo artista:", err);
      return [];
    }
  }

  async updateAlbum(
    id: number,
    data: { title?: string; year?: number; artistId?: number }
  ): Promise<Album> {
    try {
      if (id <= 0) throw new Error("ID do álbum deve ser positivo");

      if (data.title !== undefined && data.title.trim() === "")
        throw new Error("O título do álbum não pode ser vazio");

      if (data.artistId !== undefined && data.artistId <= 0)
        throw new Error("ID do artista deve ser positivo");

      const existeAlbum = await this.albumRepository.getAlbumById(id);

      if (!existeAlbum) throw new Error(`Álbum com ID ${id} não encontrado`);

      return await this.albumRepository.updateAlbum(id, data);
    } catch (err) {
      console.error("Erro ao atualizar álbum:", err);
      throw err;
    }
  }

  async deleteAlbum(id: number): Promise<void> {
    try {
      if (id <= 0) throw new Error("ID do álbum deve ser positivo");

      const existeAlbum = await this.albumRepository.getAlbumById(id);

      if (!existeAlbum) throw new Error(`Álbum com ID ${id} não encontrado`);

      await this.albumRepository.deleteAlbum(id);
    } catch (err) {
      console.error("Erro ao deletar álbum:", err);
      throw err;
    }
  }
}
