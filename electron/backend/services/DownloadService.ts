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

// 1. Detectar se o app está empacotado
const isDev = !app.isPackaged;

/**
 * Ajuste para o ffmpeg-static.
 * Em produção, o binário é extraído para a pasta 'app.asar.unpacked'
 * devido à configuração 'asarUnpack' que colocamos no package.json.
 */
const ffmpegPath = isDev
  ? ffmpegStatic
  : ffmpegStatic?.replace("app.asar", "app.asar.unpacked");

ffmpeg.setFfprobePath(ffmpegPath!);
ffmpeg.setFfmpegPath(ffmpegPath!);

export class DownloadService {
  constructor(
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistService,
    private readonly albumsService: AlbumService,
    private readonly tracksService: TrackService,
  ) {}

  // Pasta de downloads sempre no AppData do usuário para evitar erros de permissão
  private downloadsDir = path.join(app.getPath("userData"), "downloads");

  async downloadYoutubeAudio(
    url: string,
    meta: {
      genreName: string;
      artistName: string;
      albumTitle: string;
      trackNumber: number;
      year?: number;
    },
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
      `${trackNumber}-${timestamp}-%(title)s.%(ext)s`,
    );

    /**
     * LOCALIZAÇÃO DO YT-DLP:
     * Em Dev: pasta raiz/resources/yt-dlp/
     * Em Produção: pasta de instalação/resources/resources/yt-dlp/ (via extraResources)
     */
    const ytDlpPath = isDev
      ? path.join(app.getAppPath(), "resources", "yt-dlp", "yt-dlp.exe")
      : path.join(process.resourcesPath, "resources", "yt-dlp", "yt-dlp.exe");

    await new Promise<void>((resolve, reject) => {
      const processSpawn = spawn(ytDlpPath, [
        "-f",
        "bestaudio",
        "-o",
        outputTemplate,
        url,
      ]);

      processSpawn.stdout.on("data", (data) => console.log(`[yt-dlp] ${data}`));
      processSpawn.stderr.on("data", (data) =>
        console.error(`[yt-dlp] ${data}`),
      );

      processSpawn.on("close", (code) =>
        code === 0
          ? resolve()
          : reject(new Error(`Erro ao baixar áudio (Código ${code})`)),
      );

      processSpawn.on("error", (err) => {
        console.error("Falha ao iniciar yt-dlp:", err);
        reject(err);
      });
    });

    // 5️⃣ Pegar arquivo baixado mais recente
    const files = fs
      .readdirSync(this.downloadsDir)
      .filter(
        (f) => f.endsWith(".webm") || f.endsWith(".mp3") || f.endsWith(".m4a"),
      )
      .map((f) => ({
        name: f,
        time: fs.statSync(path.join(this.downloadsDir, f)).mtimeMs,
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length === 0)
      throw new Error("Arquivo baixado não encontrado na pasta.");

    const downloadedFilePath = path.join(this.downloadsDir, files[0].name);

    // 6️⃣ Limpar título do arquivo para salvar no banco
    let trackTitle = path.basename(
      downloadedFilePath,
      path.extname(downloadedFilePath),
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
      duration,
    );

    return track;
  }
}
