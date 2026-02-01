import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/routes/AppRoutes";
import { PlayerProvider } from "./contexts/PlayerContext";
import { DialogProvider } from "./contexts/DialogContext";
import { DownloadsProvider } from "./contexts/DownloadsContext";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DialogProvider>
        <DownloadsProvider>
          <PlayerProvider>
            <AppRoutes />
          </PlayerProvider>
        </DownloadsProvider>
      </DialogProvider>
    </BrowserRouter>
  </React.StrictMode>
);
