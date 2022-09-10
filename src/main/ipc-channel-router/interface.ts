import { IpcMainEvent } from "electron";

import { IpcRequest } from "@/common/ipc-interface";

export interface IpcChannelRouter {
  name: string;
  handler: (event: IpcMainEvent, request: IpcRequest) => void;
}
