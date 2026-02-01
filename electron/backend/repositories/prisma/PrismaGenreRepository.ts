import { PrismaClient, Genre } from "../../../../src/generated/client";
import { GenreRepository } from "../contracts/GenreRepository";

export class PrismaGenreRepository implements GenreRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createGenre(data: { name: string }): Promise<Genre> {
    return this.prisma.genre.create({ data });
  }

  async getAllGenres(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async getGenreById(id: number): Promise<Genre | null> {
    return this.prisma.genre.findUnique({
      where: { id },
    });
  }

  async getGenreByName(name: string): Promise<Genre | null> {
    return this.prisma.genre.findUnique({ where: { name } });
  }

  async updateGenre(id: number, data: { name: string }): Promise<Genre> {
    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  async deleteGenre(id: number): Promise<void> {
    await this.prisma.genre.delete({
      where: { id },
    });
  }
}
