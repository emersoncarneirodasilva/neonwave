export interface CreateAlbumDTO {
  title: string;
  artistId: number;
  year?: number;
}

export interface UpdateAlbumDTO {
  id: number;
  title?: string;
  artistId?: number;
  year?: number;
}
