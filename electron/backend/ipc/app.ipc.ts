import { ipcMain } from "electron";
import { getAppInfo } from "../core";

ipcMain.handle("get-app-info", () => getAppInfo());
