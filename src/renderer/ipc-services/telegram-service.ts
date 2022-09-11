import { FileEntity } from "@/common/entities";
import { Message } from "@/common/gramjs";
import { TelegramChannel } from "@/common/ipc-channel";
import {
  DeleteMessageRequestData,
  DownloadFilesRequestData,
  GetCountriesListResponseData,
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

export const checkAuth = async (): Promise<boolean> => {
  return ipc.send(TelegramChannel.CHECK_AUTH);
};

export const getCountriesList =
  async (): Promise<GetCountriesListResponseData> => {
    return ipc.send(TelegramChannel.GET_COUNTRIES_LIST);
  };

export const sendCode = async (
  data: SendCodeRequestData
): Promise<SendCodeResponseData> => {
  return ipc.send(TelegramChannel.SEND_CODE, {
    data,
  });
};

export const signIn = async (
  data: SignInRequestData
): Promise<SignInResponseData> => {
  return ipc.send(TelegramChannel.SIGN_IN, {
    data,
  });
};

export const signInWithPassword = async (
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
  data: SendMediaToMeRequestData,
  onProgress: (
    eventData: number | { file: FileEntity; message: Message }
  ) => void
) => {
  ipc.sendKeepConnection(
    TelegramChannel.SEND_MEDIA_TO_ME,
    {
      data,
    },
    onProgress
  );
};
