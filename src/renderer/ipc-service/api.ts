import { IIpcRequest } from "renderer/shared/interface/ipc";

export class IpcService {
  public send<T>(
    channel: string,
    action: string,
    request: IIpcRequest = {}
  ): Promise<T> {
    if (!request.responseChannel) {
      request.responseChannel = `${channel}_${action}_response_${new Date().getTime()}`;
    }
    if (!request.action) {
      request.action = action;
    }

    window.api.send(channel, request);
    return new Promise((resolve, reject) => {
      window.api.receive(request.responseChannel as string, (response: any) => {
        if (response.hasOwnProperty("code")) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  }
}
