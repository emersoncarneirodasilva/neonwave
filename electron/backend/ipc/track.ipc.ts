import { ipcMain } from "electron";
import { trackController } from "../container";

ipcMain.handle("create-track", async (_event, data: unknown) => {
  return await trackController.createTrack(data);
});

ipcMain.handle("list-tracks", async () => {
  return await trackController.getAllTracks();
});

ipcMain.handle("get-track-by-id", async (_event, id: unknown) => {
  return await trackController.getTrackById(id);
});

ipcMain.handle("list-tracks-by-album", async (_event, albumId: unknown) => {
  return await trackController.getTracksByAlbumId(albumId);
});

ipcMain.handle("get-tracks-by-name", async (_event, name: unknown) => {
  return await trackController.getTracksByName(name);
});

ipcMain.handle("update-track", async (_event, data: unknown) => {
  return await trackController.updateTrack(data);
});

ipcMain.handle("delete-track", async (_event, id: unknown) => {
  return await trackController.deleteTrack(id);
});
