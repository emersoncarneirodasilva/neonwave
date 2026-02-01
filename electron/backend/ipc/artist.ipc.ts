import { ipcMain } from "electron";
import { artistsController } from "../container";

ipcMain.handle("create-artist", async (_event, data: unknown) => {
  return await artistsController.createArtist(data);
});

ipcMain.handle("list-artists", async () => {
  return await artistsController.getAllArtists();
});

ipcMain.handle("get-artist-by-name", async (_event, name: unknown) => {
  return await artistsController.getArtistByName(name);
});

ipcMain.handle("get-artist-by-id", async (_event, id: unknown) => {
  return await artistsController.getArtistById(id);
});

ipcMain.handle("list-artists-by-genre", async (_event, genreId: unknown) => {
  return await artistsController.getArtistsByGenreId(genreId);
});

ipcMain.handle("update-artist", async (_event, data: unknown) => {
  return await artistsController.updateArtist(data);
});

ipcMain.handle("delete-artist", async (_event, id: unknown) => {
  return await artistsController.deleteArtist(id);
});
