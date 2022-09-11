import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import * as path from "path";

import { registerIpcChannels } from "@/main/ipc-channel-router";

import { fetchDatabase } from "./core/db-client";
import { connectTelegramClient } from "./core/gramjs-client";
import { authService } from "./services";
const isDevelopment = !app.isPackaged;

const createWindow = async () => {
  const windowOptions: BrowserWindowConstructorOptions = {
    minWidth: 940,
    minHeight: 900,
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 20,
      y: 32,
    },
    webPreferences: {
      contextIsolation: true,
      devTools: isDevelopment,
      spellcheck: false,
      nodeIntegration: true,
      preload: path.resolve(__dirname, "preload.js"),
    },
  };
  const browserWindow = new BrowserWindow(windowOptions);

  if (isDevelopment) {
    await browserWindow.loadURL(`http://localhost:3000`);
    browserWindow.webContents.openDevTools();
  } else {
    await browserWindow.loadFile("./renderer/index.html");
  }
};

app.whenReady().then(async () => {
  if (app.isPackaged) {
    await connectTelegramClient("production");
  } else {
    await connectTelegramClient("development");
  }

  if (await authService.checkAuthorization()) {
    await fetchDatabase();
  }

  registerIpcChannels();

  await createWindow();
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});
