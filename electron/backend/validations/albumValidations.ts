import { z } from "zod";

export const createAlbumSchema = z.object({
  title: z.string().min(1, "O título do álbum é obrigatório"),
  artistId: z.number().int().positive("ID do artista deve ser positivo"),
  year: z.number().int().positive("Ano deve ser positivo").optional(),
});

export const updateAlbumSchema = z.object({
  id: z.number().int().positive("ID do álbum deve ser positivo"),
  title: z.string().min(1).optional(),
  artistId: z.number().int().positive().optional(),
  year: z.number().int().positive().optional(),
});

export const idSchema = z.number().int().positive("ID deve ser positivo");
