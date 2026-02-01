import { z } from "zod";

export const createGenreSchema = z.object({
  name: z.string().min(1, "O nome do gênero é obrigatório"),
});

export const idSchema = z.number().int().positive();

export const genreSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export const nameSchema = z.string().min(1, "O nome do gênero é obrigatório");

export const updateGenreSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "O nome do gênero é obrigatório"),
});
