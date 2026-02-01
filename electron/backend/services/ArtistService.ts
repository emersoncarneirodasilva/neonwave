import { Artist } from "../../../src/generated/client";
import { ArtistRepository } from "../repositories/contracts/ArtistRepository";

export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async createArtist(name: string, genreId: number): Promise<Artist> {
    try {
      const existing = await this.artistRepository.getArtistByName(name);

      if (existing) throw new Error(`Já existe um artista chamado "${name}"`);

      return await this.artistRepository.createArtist({ name, genreId });
    } catch (err) {
      console.error("Erro ao criar artista:", err);
      throw err;
    }
  }

  async getAllArtists(): Promise<Artist[]> {
    try {
      return await this.artistRepository.getAllArtists();
    } catch (err) {
      console.error("Erro ao buscar todos os artistas:", err);
      throw new Error("Não foi possível buscar os artistas");
    }
  }

  async getArtistByName(name: string): Promise<Artist | null> {
    if (!name || name.trim() === "") return null;

    try {
      return await this.artistRepository.getArtistByName(name);
    } catch (err) {
      console.error("Erro ao buscar artista pelo nome:", err);
      return null;
    }
  }

  async getArtistById(id: number): Promise<Artist | null> {
    try {
      if (id <= 0) throw new Error("ID do artista deve ser positivo");

      const artist = await this.artistRepository.getArtistById(id);

      if (!artist) throw new Error(`Artista com ID ${id} não encontrado`);

      return artist;
    } catch (err) {
      console.error("Erro ao buscar artista pelo ID:", err);
      throw err;
    }
  }

  async getArtistsByGenreId(genreId: number): Promise<Artist[]> {
    try {
      if (genreId <= 0) throw new Error("ID do gênero deve ser positivo");

      return await this.artistRepository.getArtistsByGenreId(genreId);
    } catch (err) {
      console.error("Erro ao buscar artistas pelo gênero:", err);
      throw err;
    }
  }

  async updateArtist(
    id: number,
    data: { name?: string; genreId?: number }
  ): Promise<Artist> {
    try {
      if (id <= 0) throw new Error("ID do artista deve ser positivo");

      if (!data.name || data.name.trim() === "")
        throw new Error("O nome do artista é obrigatório");

      const existeArtist = await this.artistRepository.getArtistByName(
        data.name
      );

      if (existeArtist && existeArtist.id !== id)
        throw new Error(`Já existe um artista com o nome "${data.name}"`);

      const updateArtist = await this.artistRepository.updateArtist(id, data);
      return updateArtist;
    } catch (err) {
      console.error("Erro ao atualizar artista:", err);
      throw err;
    }
  }

  async deleteArtist(id: number): Promise<void> {
    try {
      if (id <= 0) throw new Error("ID do artista deve ser positivo");

      const existeArtist = await this.artistRepository.getArtistById(id);

      if (!existeArtist) throw new Error(`Artista com ID ${id} não encontrado`);

      await this.artistRepository.deleteArtist(id);
    } catch (err) {
      console.error("Erro ao deletar artista:", err);
      throw err;
    }
  }
}
