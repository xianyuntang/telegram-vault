import { Message } from "@/common/gramjs";
import { telegramClient } from "@/main/core/gramjs-client";
const { Api } = require("telegram");

export const downloadFileFromMessage = async (
  message: Message
): Promise<{ data: Buffer; filename: string }> => {
  return {
    data: await telegramClient.downloadFile(
      new Api.InputDocumentFileLocation({
        id: message.media.document.id.value,
        accessHash: message.media.document.accessHash.value,
        fileReference: Buffer.from(message.media.document.fileReference),
        thumbSize: "",
      }),
      {
        dcId: message.media.document.dcId,
      }
    ),
    filename: message.media.document.attributes[0].fileName,
  };
};
