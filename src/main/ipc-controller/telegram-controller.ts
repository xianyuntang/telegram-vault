import increment from "add-filename-increment";
import { dialog, IpcMainEvent } from "electron";
import fs from "fs";
import path from "path";

import { FileEntity, StoreKey } from "@/common/entities";
import { IpcRequest } from "@/common/ipc-interface";
import {
  DeleteMessageRequestData,
  DownloadFileResponseData,
  DownloadFilesRequestData,
  SendCodeRequestData,
  SendMediaToMeRequestData,
  SignInRequestData,
  SignInWithPasswordRequestData,
} from "@/common/ipc-interface/telegram-interface";
import { authService, fileService, messageService } from "@/main//services";
import { store } from "@/main/core/db-client";
import { telegramClient } from "@/main/core/gramjs-client";
import { formatError } from "@/main/ipc-controller/utils";

export const checkAuth = async (event: IpcMainEvent, request: IpcRequest) => {
  try {
    const isLogin = await telegramClient.checkAuthorization();
    event.sender.send(request.responseChannel, isLogin);
  } catch (e) {
    event.sender.send(request.responseChannel, formatError(e));
  }
};

export const getCountriesList = async (
  event: IpcMainEvent,
  request: IpcRequest
) => {
  try {
    const response = await authService.getCountriesList();
    event.sender.send(request.responseChannel, response);
  } catch (e) {
    event.sender.send(request.responseChannel, formatError(e));
  }
};

export const sendCode = async (
  event: IpcMainEvent,
  request: IpcRequest<SendCodeRequestData>
) => {
  try {
    const response = await authService.sendCode(request.data.phoneNumber);
    event.sender.send(request.responseChannel, response);
  } catch (e) {
    event.sender.send(request.responseChannel, formatError(e));
  }
};

export const signIn = async (
  event: IpcMainEvent,
  request: IpcRequest<SignInRequestData>
) => {
  try {
    const response = await authService.signIn(
      request.data.phoneNumber,
      request.data.phoneCodeHash,
      request.data.phoneCode
    );
    event.sender.send(request.responseChannel, response);
    telegramClient.session.save();
  } catch (e) {
    event.sender.send(request.responseChannel, formatError(e));
  }
};

export const SignInWithPassword = async (
  event: IpcMainEvent,
  request: IpcRequest<SignInWithPasswordRequestData>
) => {
  try {
    const response = await authService.signInWithPassword(
      request.data.password
    );
    event.sender.send(request.responseChannel, response);
    telegramClient.session.save();
  } catch (e) {
    event.sender.send(request.responseChannel, formatError(e));
  }
};

export const downloadFiles = async (
  event: IpcMainEvent,
  request: IpcRequest<DownloadFilesRequestData>
) => {
  const saveFolder = await dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory"],
  });

  if (saveFolder.canceled) return;

  const downloadedFiles: DownloadFileResponseData = { filenames: [] };

  for (const file of request.data.files) {
    if (file.messageId) {
      const message = await messageService.getMessage(file.messageId);
      const response = await fileService.downloadFileFromMessage(message);
      const storePath = path.join(saveFolder.filePaths[0], response.filename);
      const storePathIncrement = increment.file(storePath);

      fs.writeFileSync(storePathIncrement.path, response.data);
      downloadedFiles.filenames.push(file.filename);
    }
  }

  event.sender.send(request.responseChannel, downloadedFiles);
};

export const deleteMessage = async (
  event: IpcMainEvent,
  request: IpcRequest<DeleteMessageRequestData>
) => {
  const messageIds = request.data.files.map((file) => file.messageId);
  const ids = new Set(request.data.files.map((file) => file.id));
  await messageService.deleteMessages(messageIds);

  const key = `${StoreKey.FILE}.${request.data.folderId}`;
  const files = store.get(key) as FileEntity[];

  const newFiles = files.filter((file) => {
    return !ids.has(file.id);
  });

  store.set(key, newFiles);

  event.sender.send(request.responseChannel, true);
};

export const sendMessageToMe = async (
  event: IpcMainEvent,
  request: IpcRequest<SendMediaToMeRequestData>
) => {
  const message = await messageService.sendMediaToMe(
    request.data.file,
    null,
    (progress) => event.sender.send(request.responseChannel, progress)
  );

  event.sender.send(request.responseChannel, message);
};
