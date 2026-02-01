export interface CreateArtistDTO {
  name: string;
  genreId: number;
}

export interface UpdateArtistDTO {
  id: number;
  name: string;
  genreId: number;
}
