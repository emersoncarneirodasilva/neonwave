import path from "path";
import { app, BrowserWindow } from "electron";
import http from "http";
import fs from "fs";
import url from "url";

// IPCs do seu backend
import "./backend/ipc/app.ipc";
import "./backend/ipc/genre.ipc";
import "./backend/ipc/artist.ipc";
import "./backend/ipc/album.ipc";
import "./backend/ipc/track.ipc";
import "./backend/ipc/download.ipc";

const isDev = !app.isPackaged;
let server: http.Server;

function startDownloadServer() {
  const downloadsPath = path.join(app.getPath("userData"), "downloads");

  server = http.createServer((req, res) => {
    if (!req.url) return;

    try {
      const parsedUrl = url.parse(req.url, true);
      let pathname = decodeURIComponent(parsedUrl.pathname || "");

      // Só aceitar /music/filename
      if (!pathname.startsWith("/music/")) {
        res.writeHead(403);
        return res.end("Acesso negado");
      }

      pathname = pathname.replace(/^\/music\//, "");
      const filePath = path.join(downloadsPath, pathname);

      // Segurança: garantir que está dentro da pasta downloads
      if (!filePath.startsWith(downloadsPath) || !fs.existsSync(filePath)) {
        res.writeHead(404);
        return res.end("Arquivo não encontrado");
      }

      // Obter informações do arquivo
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;

      // Definir Content-Type baseado na extensão
      const ext = path.extname(filePath).toLowerCase();
      let contentType = "application/octet-stream";
      if (ext === ".mp3") contentType = "audio/mpeg";
      if (ext === ".wav") contentType = "audio/wav";
      if (ext === ".webm") contentType = "audio/webm";
      if (ext === ".ogg") contentType = "audio/ogg";
      if (ext === ".m4a") contentType = "audio/mp4";

      // Verificar se há Range header (essencial para seeking)
      const range = req.headers.range;

      if (range) {
        // Parse do Range header
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        // Stream parcial do arquivo
        const fileStream = fs.createReadStream(filePath, { start, end });

        // Resposta 206 Partial Content
        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": contentType,
          "Cache-Control": "no-cache",
          "X-Content-Type-Options": "nosniff",
        });

        fileStream.pipe(res);
        fileStream.on("error", (err) => {
          console.error("Erro ao fazer stream:", err);
          res.end();
        });
      } else {
        // Sem Range, envia o arquivo completo
        res.writeHead(200, {
          "Content-Length": fileSize,
          "Content-Type": contentType,
          "Accept-Ranges": "bytes",
          "Cache-Control": "no-cache",
          "X-Content-Type-Options": "nosniff",
        });

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        fileStream.on("error", (err) => {
          console.error("Erro ao fazer stream:", err);
          res.end();
        });
      }
    } catch (err) {
      console.error("Erro no servidor:", err);
      res.writeHead(500);
      res.end("Erro interno");
    }
  });

  server.listen(4000, () => {
    console.log(
      "Mini servidor de downloads rodando em http://localhost:4000/music"
    );
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  console.log("NeonWave Electron started");
}

app.whenReady().then(() => {
  startDownloadServer();
  createWindow();
});

app.on("window-all-closed", () => {
  if (server) server.close();
  if (process.platform !== "darwin") app.quit();
});
