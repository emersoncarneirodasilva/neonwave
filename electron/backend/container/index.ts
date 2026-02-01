import path from "path";
import fs from "fs";
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

// Caminho absoluto do banco
const dbPath = path.join(process.cwd(), "prisma", "dev.db"); // ✅ raiz do projeto

if (!fs.existsSync(dbPath)) {
  throw new Error(`Arquivo dev.db não encontrado em: ${dbPath}`);
}

// Prisma
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
  trackService
);

// Controllers
export const genresController = new GenresController(genresService);
export const artistsController = new ArtistController(artistsService);
export const albumController = new AlbumController(albumService);
export const trackController = new TrackController(trackService);
export const downloadController = new DownloadController(downloadService);
