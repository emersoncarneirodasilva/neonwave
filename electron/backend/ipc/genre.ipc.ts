import { ipcMain } from "electron";
import { genresController } from "../container";

ipcMain.handle("create-genre", async (_event, data: unknown) => {
  return await genresController.createGenre(data);
});

ipcMain.handle("list-genres", async () => {
  return await genresController.getAllGenres();
});

ipcMain.handle("get-genre-by-id", async (_event, id: number) => {
  return await genresController.getGenreById(id);
});

ipcMain.handle("get-genre-by-name", async (_event, name: unknown) => {
  return await genresController.getGenreByName(name);
});

ipcMain.handle("update-genre", async (_event, data: unknown) => {
  return await genresController.updateGenre(data);
});

ipcMain.handle("delete-genre", async (_event, id: unknown) => {
  return await genresController.deleteGenre(id);
});
