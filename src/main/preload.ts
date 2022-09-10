const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  send: <T>(channel: string, data: T) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: any) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
