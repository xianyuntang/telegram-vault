import { apiCredentials, telegramClient } from "@/main/core/gramjs-client";

const { Api } = require("telegram");
const Password = require("telegram/Password");

export const checkAuthorization = async () => {
  return await telegramClient.checkAuthorization();
};

export const getCountriesList = async () => {
  return await telegramClient.invoke(
    new Api.help.GetCountriesList({
      langCode: "en",
      hash: 0,
    })
  );
};

export const sendCode = async (phoneNumber: string) => {
  return await telegramClient.invoke(
    new Api.auth.SendCode({
      ...apiCredentials,
      phoneNumber,
      settings: new Api.CodeSettings({
        allowAppHash: true,
      }),
    })
  );
};

export const signIn = async (
  phoneNumber: string,
  phoneCodeHash: string,
  phoneCode: string
) => {
  return await telegramClient.invoke(
    new Api.auth.SignIn({ phoneNumber, phoneCodeHash, phoneCode })
  );
};

export const signInWithPassword = async (password: string) => {
  const passwordSrpResult = await telegramClient.invoke(
    new Api.account.GetPassword({})
  );
  const passwordSrpCheck = await Password.computeCheck(
    passwordSrpResult,
    password
  );
  return await telegramClient.invoke(
    new Api.auth.CheckPassword({ password: passwordSrpCheck })
  );
};
