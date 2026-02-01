import { Artist, PrismaClient } from "../../../../src/generated/client";
import { ArtistRepository } from "../contracts/ArtistRepository";

export class PrismaArtistRepository implements ArtistRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createArtist(data: { name: string; genreId: number }): Promise<Artist> {
    return this.prisma.artist.create({
      data,
      include: { genre: true, albums: true },
    });
  }

  async getAllArtists(): Promise<Artist[]> {
    return this.prisma.artist.findMany({
      include: { genre: true, albums: true },
    });
  }

  async getArtistByName(name: string): Promise<Artist | null> {
    return this.prisma.artist.findFirst({
      where: { name },
      include: { genre: true, albums: true },
    });
  }

  async getArtistById(id: number): Promise<Artist | null> {
    return this.prisma.artist.findUnique({
      where: { id },
      include: { genre: true, albums: true },
    });
  }

  async getArtistsByGenreId(genreId: number): Promise<Artist[]> {
    return this.prisma.artist.findMany({
      where: { genreId },
      include: { genre: true, albums: true },
    });
  }

  async updateArtist(
    id: number,
    data: { name?: string; genreId?: number }
  ): Promise<Artist> {
    return this.prisma.artist.update({
      where: { id },
      data,
      include: { genre: true, albums: true },
    });
  }

  async deleteArtist(id: number): Promise<void> {
    await this.prisma.artist.delete({ where: { id } });
  }
}
