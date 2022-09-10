import { ipcMain } from "electron";

import databaseChannelRouter from "@/main/ipc-channel-router/database-channel-router";
import telegramChannelRouter from "@/main/ipc-channel-router/telegram-channel-router";

const ipcChannelRouters = [telegramChannelRouter, databaseChannelRouter];

export const registerIpcChannels = () => {
  ipcChannelRouters.forEach((ipcChannelRouter) => {
    ipcChannelRouter.forEach((channel) => {
      console.log(`register channel: ${channel.name}`);
      ipcMain.on(channel.name, (event, request) => {
        channel.handler(event, request);
      });
    });
  });
};
