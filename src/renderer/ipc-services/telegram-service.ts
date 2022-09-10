import { FileEntity } from "@/common/entities";
import { TelegramChannel } from "@/common/ipc-channel";
import {
  DeleteMessageRequestData,
  DownloadFilesRequestData,
  SendCodeRequestData,
  SendCodeResponseData,
  SendMediaToMeRequestData,
  SignInRequestData,
  SignInResponseData,
  SignInWithPasswordRequestData,
} from "@/common/ipc-interface/telegram-interface";
import { ipc } from "@/renderer/core/utils";

export const downloadFiles = async (data: DownloadFilesRequestData) => {
  return await ipc.send(TelegramChannel.DOWNLOAD_FILES, {
    data,
  });
};

export const checkAuth = (): Promise<boolean> => {
  return ipc.send(TelegramChannel.CHECK_AUTH);
};

export const sendCode = (
  data: SendCodeRequestData
): Promise<SendCodeResponseData> => {
  return ipc.send(TelegramChannel.SEND_CODE, {
    data,
  });
};

export const signIn = (
  data: SignInRequestData
): Promise<SignInResponseData> => {
  return ipc.send(TelegramChannel.SIGN_IN, {
    data,
  });
};

export const signInWithPassword = (
  data: SignInWithPasswordRequestData
): Promise<any> => {
  return ipc.send(TelegramChannel.SIGN_IN_WITH_PASSWORD, {
    data,
  });
};

export const deleteMessage = async (
  data: DeleteMessageRequestData
): Promise<boolean> => {
  return ipc.send(TelegramChannel.DELETE_MESSAGE, {
    data,
  });
};

export const sendMediaToMe = async (
  data: SendMediaToMeRequestData
): Promise<SendMediaToMeRequestData> => {
  return ipc.send(TelegramChannel.SEND_MEDIA_TO_ME, {
    data,
  });
};
