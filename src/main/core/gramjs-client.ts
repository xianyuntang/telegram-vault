import appConfig from "@/main/app-config";

const { TelegramClient } = require("telegram");
const { StoreSession } = require("telegram/sessions");

interface ApiCredentials {
  apiId: number;
  apiHash: string;
}

export const apiCredentials: ApiCredentials = {
  apiId: parseInt(appConfig.apiId as string),
  apiHash: appConfig.apiHash as string,
};

export const telegramClient: typeof TelegramClient = new TelegramClient(
  new StoreSession("session"),
  apiCredentials.apiId,
  apiCredentials.apiHash
);

export const connectTelegramClient = async (
  type: "production" | "development"
) => {
  if (type == "development") {
    // client.session.setDC(2, "149.154.167.40", 443);
  }

  await telegramClient.connect();
};
