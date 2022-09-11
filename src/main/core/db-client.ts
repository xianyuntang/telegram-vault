import { app } from "electron";
import ElectronStore from "electron-store";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { FolderEntity, StoreKey } from "@/common/entities";
import { fileService, messageService } from "@/main//services";
import appConfig from "@/main/app-config";

const dbPath = path.join(app.getPath("userData"), "telegram-vault.db");

export const store = new ElectronStore({
  encryptionKey: appConfig.production ? appConfig.storeKey : undefined,
  name: "telegram-vault",
  fileExtension: "db",
});

store.onDidAnyChange(() => {
  saveDatabase();
});

export const initDB = async () => {
  const initData: FolderEntity[] = [{ id: "root", name: "/" }];
  store.set(StoreKey.FOLDER, initData);
  await saveDatabase(false);
};

export const fetchDatabase = async () => {
  const message = await messageService.getDbMessages();
  if (message.length) {
    const file = await fileService.downloadFileFromMessage(message[0]);
    fs.writeFileSync(dbPath, file.data);
  } else {
    await initDB();
  }
};

const saveDatabase = async (update = true) => {
  console.log("save database");
  const DB_MESSAGE_NAME = "telegram-vault.db";

  if (update) {
    const message = await messageService.getDbMessages();
    await messageService.editMessage(
      message[0].id,
      {
        filename: DB_MESSAGE_NAME,
        filepath: dbPath,
        fileSize: fs.statSync(dbPath).size,
      },
      "Do Not Delete This File !!!"
    );
  } else {
    try {
      await messageService.sendMediaToMe(
        {
          id: uuidv4(),
          folderId: "9MkbH2Bstf3xC2iigWy9sy96BCHzr9yx3Q4hyBUW",
          filename: DB_MESSAGE_NAME,
          filepath: dbPath,
          fileSize: fs.statSync(dbPath).size,
        },
        "Do not delete this file !!!"
      );
    } catch (e) {
      console.log(e);
    }
  }
};
