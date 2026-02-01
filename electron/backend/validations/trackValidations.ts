import { z } from "zod";

// ID simples
export const idSchema = z.number().int().positive();

// Nome/título da Track
export const nameSchema = z.string().min(1, "O título da faixa é obrigatório");

// Criar Track
export const createTrackSchema = z.object({
  title: nameSchema,
  albumId: z.number().int().positive(),
  filePath: z.string().min(1, "O caminho do arquivo é obrigatório"),
  trackNumber: z.number().int().positive(),
  duration: z.number().int().positive().optional(),
});

// Atualizar Track
export const updateTrackSchema = z.object({
  id: idSchema,
  title: nameSchema.optional(),
  albumId: z.number().int().positive().optional(),
  filePath: z.string().min(1).optional(),
  trackNumber: z.number().int().positive().optional(),
  duration: z.number().int().positive().optional(),
});
