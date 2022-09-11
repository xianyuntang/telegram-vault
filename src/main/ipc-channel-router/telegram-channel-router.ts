import { TelegramChannel } from "@/common/ipc-channel";
import { IpcChannelRouter } from "@/main/ipc-channel-router/interface";
import { telegramController } from "@/main/ipc-controller";

const telegramChannelRouters: IpcChannelRouter[] = [
  {
    name: TelegramChannel.CHECK_AUTH,
    handler: telegramController.checkAuth,
  },
  {
    name: TelegramChannel.SEND_CODE,
    handler: telegramController.sendCode,
  },
  {
    name: TelegramChannel.SIGN_IN,
    handler: telegramController.signIn,
  },
  {
    name: TelegramChannel.SIGN_IN_WITH_PASSWORD,
    handler: telegramController.SignInWithPassword,
  },
  {
    name: TelegramChannel.GET_COUNTRIES_LIST,
    handler: telegramController.getCountriesList,
  },
  {
    name: TelegramChannel.SEND_MEDIA_TO_ME,
    handler: telegramController.sendMessageToMe,
  },
  {
    name: TelegramChannel.DOWNLOAD_FILES,
    handler: telegramController.downloadFiles,
  },
  {
    name: TelegramChannel.DELETE_MESSAGE,
    handler: telegramController.deleteMessage,
  },
];

export default telegramChannelRouters;
