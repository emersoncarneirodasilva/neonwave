import { z } from "zod";

export const createArtistSchema = z.object({
  name: z.string().min(1, "O nome do artista é obrigatório"),
  genreId: z.number().int().positive(),
});

export const idSchema = z.number().int().positive();

export const updateArtistSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "O nome do artista é obrigatório"),
  genreId: z.number().int().positive(),
});

export const nameSchema = z.string().min(1, "O nome do artista é obrigatório");
