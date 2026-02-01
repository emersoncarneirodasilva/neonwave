import { z } from "zod";

export const downloadYoutubeSchema = z.object({
  url: z.string().url(),
  genreName: z.string().min(1),
  artistName: z.string().min(1),
  albumTitle: z.string().min(1),
  trackNumber: z.number().positive(),
  year: z.number().optional(),
});
