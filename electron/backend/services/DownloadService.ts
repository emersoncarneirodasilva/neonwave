import fs from "fs";
import path from "path";
import { app } from "electron";
import { spawn } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import { GenresService } from "./GenreService";
import { ArtistService } from "./ArtistService";
import { TrackService } from "./TrackService";
import { AlbumService } from "./AlbumService";

ffmpeg.setFfprobePath(ffmpegStatic!);

export class DownloadService {
  constructor(
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistService,
    private readonly albumsService: AlbumService,
    private readonly tracksService: TrackService
  ) {}

  private downloadsDir = path.join(app.getPath("userData"), "downloads");

  async downloadYoutubeAudio(
    url: string,
    meta: {
      genreName: string;
      artistName: string;
      albumTitle: string;
      trackNumber: number;
      year?: number;
    }
  ) {
    const { genreName, artistName, albumTitle, trackNumber, year } = meta;

    if (!fs.existsSync(this.downloadsDir))
      fs.mkdirSync(this.downloadsDir, { recursive: true });

    // 1️⃣ Garantir gênero
    let genre = await this.genresService.getGenreByName(genreName);
    if (!genre) genre = await this.genresService.createGenre(genreName);

    // 2️⃣ Garantir artista
    let artist = await this.artistsService.getArtistByName(artistName);
    if (!artist)
      artist = await this.artistsService.createArtist(artistName, genre.id);

    // 3️⃣ Garantir álbum
    let albums = await this.albumsService.getAlbumsByArtistId(artist.id);
    let album = albums.find((a) => a.title === albumTitle);
    if (!album)
      album = await this.albumsService.createAlbum(albumTitle, artist.id, year);

    // 4️⃣ Baixar áudio
    const timestamp = Date.now();
    const outputTemplate = path.join(
      this.downloadsDir,
      `${trackNumber}-${timestamp}-%(title)s.%(ext)s`
    );

    const ytDlpPath = path.join(
      app.getAppPath(),
      "resources",
      "yt-dlp",
      "yt-dlp.exe"
    );

    await new Promise<void>((resolve, reject) => {
      const process = spawn(ytDlpPath, [
        "-f",
        "bestaudio",
        "-o",
        outputTemplate,
        url,
      ]);
      process.stdout.on("data", (data) => console.log(`[yt-dlp] ${data}`));
      process.stderr.on("data", (data) => console.error(`[yt-dlp] ${data}`));
      process.on("close", (code) =>
        code === 0 ? resolve() : reject(new Error("Erro ao baixar áudio"))
      );
    });

    // 5️⃣ Pegar arquivo baixado mais recente
    const files = fs
      .readdirSync(this.downloadsDir)
      .filter((f) => f.endsWith(".webm") || f.endsWith(".mp3"))
      .map((f) => ({
        name: f,
        time: fs.statSync(path.join(this.downloadsDir, f)).mtimeMs,
      }))
      .sort((a, b) => b.time - a.time);

    const downloadedFilePath = path.join(this.downloadsDir, files[0].name);

    // 6️⃣ Limpar título do arquivo para salvar no banco
    let trackTitle = path.basename(
      downloadedFilePath,
      path.extname(downloadedFilePath)
    );
    // remove prefixo "numero-timestamp-"
    trackTitle = trackTitle.replace(/^\d+-\d+-/, "");

    // 7️⃣ Pegar duração real usando ffmpeg
    const duration = await new Promise<number>((resolve) => {
      ffmpeg.ffprobe(downloadedFilePath, (err, metadata) => {
        if (err) {
          console.warn("Não foi possível calcular a duração:", err);
          resolve(0);
        } else {
          resolve(metadata.format.duration || 0);
        }
      });
    });

    // 8️⃣ Criar track no banco
    const track = await this.tracksService.createTrack(
      trackTitle,
      album.id,
      downloadedFilePath,
      trackNumber,
      duration
    );

    return track;
  }
}
