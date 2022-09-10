import { IpcRequest } from "@/common/ipc-interface";

declare global {
  interface Window {
    api: {
      send(channel: string, request: IpcRequest): void;
      receive(channel: string, response: (response: never) => void): void;
    };
  }
}

export {};
