import path from "path";
import fs from "fs";
import { app } from "electron"; // Importação necessária para localizar pastas do sistema
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../../src/generated/client";

import { PrismaGenreRepository } from "../repositories/prisma/PrismaGenreRepository";
import { PrismaArtistRepository } from "../repositories/prisma/PrismaArtistRepository";
import { PrismaAlbumRepository } from "../repositories/prisma/PrismaAlbumRepository";
import { PrismaTrackRepository } from "../repositories/prisma/PrismaTrackRepository";

import { GenresService } from "../services/GenreService";
import { ArtistService } from "../services/ArtistService";
import { AlbumService } from "../services/AlbumService";
import { TrackService } from "../services/TrackService";
import { DownloadService } from "../services/DownloadService";

import { GenresController } from "../controllers/GenreController";
import { ArtistController } from "../controllers/ArtistController";
import { AlbumController } from "../controllers/AlbumController";
import { TrackController } from "../controllers/TrackController";
import { DownloadController } from "../controllers/DownloadController";

// 1. Lógica de detecção de ambiente e caminhos
const isDev = !app.isPackaged;
const userDataPath = app.getPath("userData");

// O banco que o app vai REALMENTE usar
const dbPath = isDev
  ? path.join(process.cwd(), "prisma", "dev.db")
  : path.join(userDataPath, "database.db");

// 2. Garantir que o banco de dados exista em produção
if (!isDev) {
  if (!fs.existsSync(dbPath)) {
    // Onde o banco inicial foi colocado pelo electron-builder (extraResources)
    const templateDbPath = path.join(process.resourcesPath, "prisma", "dev.db");

    try {
      // Cria a pasta AppData do seu app se ela ainda não existir
      if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath, { recursive: true });
      }
      // Copia o banco zerado para a pasta de dados do usuário
      fs.copyFileSync(templateDbPath, dbPath);
      console.log("Banco de dados de produção criado com sucesso.");
    } catch (err) {
      console.error("Erro crítico ao copiar banco de dados:", err);
    }
  }
} else {
  // Verificação simples apenas em dev para evitar erros de arquivo faltando
  if (!fs.existsSync(dbPath)) {
    console.warn(`Aviso: Banco de dados dev não encontrado em: ${dbPath}`);
  }
}

// 3. Inicialização do Prisma com o adapter do Better-SQLite3
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
export const prisma = new PrismaClient({ adapter });

// Repositories
const genreRepository = new PrismaGenreRepository(prisma);
const artistRepository = new PrismaArtistRepository(prisma);
const albumRepository = new PrismaAlbumRepository(prisma);
const trackRepository = new PrismaTrackRepository(prisma);

// Services
const genresService = new GenresService(genreRepository);
const artistsService = new ArtistService(artistRepository);
const albumService = new AlbumService(albumRepository);
const trackService = new TrackService(trackRepository);
const downloadService = new DownloadService(
  genresService,
  artistsService,
  albumService,
  trackService,
);

// Controllers
export const genresController = new GenresController(genresService);
export const artistsController = new ArtistController(artistsService);
export const albumController = new AlbumController(albumService);
export const trackController = new TrackController(trackService);
export const downloadController = new DownloadController(downloadService);
