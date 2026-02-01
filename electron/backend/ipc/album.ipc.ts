import { ipcMain } from "electron";
import { albumController } from "../container";

ipcMain.handle("create-album", async (_event, data: unknown) => {
  return await albumController.createAlbum(data);
});

ipcMain.handle("list-albums", async () => {
  return await albumController.getAllAlbums();
});

ipcMain.handle("get-album-by-id", async (_event, id: unknown) => {
  return await albumController.getAlbumById(id);
});

ipcMain.handle("get-albums-by-artist-id", async (_event, artistId: unknown) => {
  return await albumController.getAlbumsByArtistId(artistId);
});

ipcMain.handle("update-album", async (_event, data: unknown) => {
  return await albumController.updateAlbum(data);
});

ipcMain.handle("delete-album", async (_event, id: unknown) => {
  return await albumController.deleteAlbum(id);
});
