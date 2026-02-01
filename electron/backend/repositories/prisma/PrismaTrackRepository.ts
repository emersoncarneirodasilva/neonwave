import { PrismaClient, Track } from "../../../../src/generated/client";
import { TrackRepository } from "../contracts/TrackRepository";

export class PrismaTrackRepository implements TrackRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createTrack(data: {
    title: string;
    duration?: number;
    filePath: string;
    albumId: number;
    trackNumber: number;
  }): Promise<Track> {
    return this.prisma.track.create({
      data,
      include: {
        album: {
          include: { artist: true },
        },
      },
    });
  }

  async getAllTracks(): Promise<Track[]> {
    return this.prisma.track.findMany({
      include: {
        album: {
          include: {
            artist: {
              include: {
                genre: true,
              },
            },
          },
        },
      },
      orderBy: { trackNumber: "asc" },
    });
  }

  async getTrackById(id: number): Promise<Track | null> {
    return this.prisma.track.findUnique({
      where: { id },
      include: {
        album: {
          include: { artist: true },
        },
      },
    });
  }

  async getTracksByAlbumId(albumId: number): Promise<Track[]> {
    return this.prisma.track.findMany({
      where: { albumId },
      orderBy: { trackNumber: "asc" },
      include: {
        album: {
          include: { artist: true },
        },
      },
    });
  }

  async getTracksByName(name: string): Promise<Track[]> {
    return this.prisma.track.findMany({
      where: { title: { contains: name } },
      include: {
        album: {
          include: { artist: true },
        },
      },
    });
  }

  async updateTrack(
    id: number,
    data: {
      title?: string;
      duration?: number;
      filePath?: string;
      albumId?: number;
      trackNumber?: number;
    }
  ): Promise<Track> {
    return this.prisma.track.update({
      where: { id },
      data,
      include: {
        album: {
          include: { artist: true },
        },
      },
    });
  }

  async deleteTrack(id: number): Promise<void> {
    await this.prisma.track.delete({ where: { id } });
  }
}
