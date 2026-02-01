import { DownloadService } from "../services/DownloadService";
import { downloadYoutubeSchema } from "../validations/downloadValidations";

export class DownloadController {
  constructor(private readonly service: DownloadService) {}

  async downloadYoutubeAudio(payload: unknown): Promise<any | null> {
    try {
      const validPayload = downloadYoutubeSchema.parse(payload);

      const track = await this.service.downloadYoutubeAudio(validPayload.url, {
        genreName: validPayload.genreName,
        artistName: validPayload.artistName,
        albumTitle: validPayload.albumTitle,
        trackNumber: validPayload.trackNumber,
        year: validPayload.year,
      });

      return track;
    } catch (error) {
      console.error("Erro ao baixar áudio:", error);
      return null;
    }
  }
}
