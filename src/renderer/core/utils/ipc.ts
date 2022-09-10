import dayjs from "dayjs";

import { IpcRequest } from "@/common/ipc-interface";

export const send = <T>(
  channel: string,
  request: IpcRequest = {}
): Promise<T> => {
  if (!request.responseChannel) {
    request.responseChannel = `${channel}-response-${dayjs().unix()}`;
  }

  window.api.send(channel, request);
  return new Promise((resolve, reject) => {
    window.api.receive(request.responseChannel as string, (response: never) => {
      if (Object.hasOwn(response, "code")) {
        reject(response);
      } else {
        resolve(response as T);
      }
    });
  });
};
