import { Track } from "../../../../src/generated/client";

export interface TrackRepository {
  createTrack(data: {
    title: string;
    duration?: number;
    filePath: string;
    albumId: number;
    trackNumber: number;
  }): Promise<Track>;

  getAllTracks(): Promise<Track[]>;

  getTrackById(id: number): Promise<Track | null>;

  getTracksByAlbumId(albumId: number): Promise<Track[]>;

  getTracksByName(name: string): Promise<Track[]>;

  updateTrack(
    id: number,
    data: {
      title?: string;
      duration?: number;
      filePath?: string;
      albumId?: number;
      trackNumber?: number;
    }
  ): Promise<Track>;

  deleteTrack(id: number): Promise<void>;
}
