import { IpcMainEvent } from "electron";

export interface IpcError {
  code: number;
  errorMessage: string;
}

export interface IpcChannel {
  name: string;
  handler(event: IpcMainEvent, request: IpcRequest): void;
}

export interface IpcRequest<T = unknown> {
  action?: string;
  responseChannel?: string;
  data?: T;
}
