export interface CreateTrackDTO {
  title: string;
  albumId: number;
  filePath: string;
  trackNumber: number;
  duration?: number;
}

export interface UpdateTrackDTO {
  id: number;
  title?: string;
  albumId?: number;
  filePath?: string;
  trackNumber?: number;
  duration?: number;
}
