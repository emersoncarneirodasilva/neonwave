import { Album, PrismaClient } from "../../../../src/generated/client";
import { AlbumRepository } from "../contracts/AlbumRepository";

export class PrismaAlbumRepository implements AlbumRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createAlbum(data: {
    title: string;
    year?: number;
    artistId: number;
  }): Promise<Album> {
    return this.prisma.album.create({
      data,
      include: {
        artist: true,
      },
    });
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany({
      include: {
        artist: true,
      },
    });
  }

  async getAlbumById(id: number): Promise<Album | null> {
    return this.prisma.album.findUnique({
      where: { id },
      include: {
        artist: true,
      },
    });
  }

  async getAlbumsByArtistId(artistId: number): Promise<Album[]> {
    return this.prisma.album.findMany({
      where: { artistId },
      include: {
        artist: true,
      },
    });
  }

  async updateAlbum(
    id: number,
    data: {
      title?: string;
      year?: number;
      artistId?: number;
    }
  ): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data,
      include: {
        artist: true,
      },
    });
  }

  async deleteAlbum(id: number): Promise<void> {
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
