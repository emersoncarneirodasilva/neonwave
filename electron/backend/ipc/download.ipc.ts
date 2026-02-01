import { ipcMain } from "electron";
import { downloadController } from "../container";

ipcMain.handle("download-youtube-audio", async (_event, payload: unknown) => {
  // payload deve ter: url, genreName, artistName, albumTitle, trackNumber, year
  return await downloadController.downloadYoutubeAudio(payload);
});
