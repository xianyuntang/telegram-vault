import bigInt from "big-integer";
import dayjs from "dayjs";
import path from "path";
import { Api } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { v4 as uuidv4 } from "uuid";

import { FileEntity, StoreKey } from "@/common/entities";
import { Message } from "@/common/gramjs";
import { SendMediaToMeResponseData } from "@/common/ipc-interface/telegram-interface";
import { store } from "@/main/core/db-client";
import { telegramClient } from "@/main/core/gramjs-client";

export const sendMediaToMe = async (
  file: FileEntity,
  message?: string
): Promise<SendMediaToMeResponseData> => {
  const updates = await telegramClient.invoke(
    new Api.messages.SendMedia({
      peer: "me",
      media: new Api.InputMediaUploadedDocument({
        file: await telegramClient.uploadFile({
          file: new CustomFile(file.filename, file.fileSize, file.filepath),
          workers: 2,
        }),
        attributes: [
          new Api.DocumentAttributeFilename({ fileName: file.filename }),
        ],
        mimeType: path.extname(file.filepath),
      }),
      message: message || "",
      randomId: bigInt(dayjs().unix()),
    })
  );

  const document = (updates.updates[1].message as Message).media.document;
  const newFile: FileEntity = {
    ...file,
    fileExt: path.extname(file.filepath),
    fileReference: document.fileReference,
    accessHash: document.accessHash.value.toString(),
    messageId: (updates.updates[1].message as Message).id,
    uploading: false,
  };
  if (!newFile.id) {
    newFile.id = uuidv4();
  }

  const key = `${StoreKey.FILE}.${newFile.folderId}`;
  const files = store.get(key, []) as FileEntity[];
  files.push(newFile);
  store.set(key, files);

  return { message: updates.updates[1].message as Message, file: newFile };
};

export const editMessage = async (
  id: number,
  file: { filename: string; fileSize: number; filepath: string },
  message?: string
): Promise<Message> => {
  const updates = await telegramClient.invoke(
    new Api.messages.EditMessage({
      peer: "me",
      id: id,
      media: new Api.InputMediaUploadedDocument({
        file: await telegramClient.uploadFile({
          file: new CustomFile(file.filename, file.fileSize, file.filepath),
          workers: 2,
        }),
        attributes: [
          new Api.DocumentAttributeFilename({ fileName: file.filename }),
        ],
        mimeType: path.extname(file.filepath),
      }),
      message: message || "",
    })
  );
  // TODO  edit database

  return updates.updates[0].message as Message;
};

export const getMessage = async (id: number): Promise<Message> => {
  const messages = await telegramClient.getMessages("me", { ids: id });
  return messages[0];
};

export const getDbMessages = async (): Promise<Message[]> => {
  return await telegramClient.getMessages("me", {
    limit: 1,
    search: "telegram-vault.db",
  });
};

export const deleteMessages = async (messageIds: number[]): Promise<void> => {
  const c = await telegramClient.invoke(
    new Api.messages.DeleteMessages({
      id: messageIds,
    })
  );
  console.log(c);
};
