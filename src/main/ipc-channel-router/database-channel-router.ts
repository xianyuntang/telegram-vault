import { DatabaseChannel } from "@/common/ipc-channel";
import { IpcChannelRouter } from "@/main/ipc-channel-router/interface";
import { databaseController } from "@/main/ipc-controller";

const databaseChannelRouters: IpcChannelRouter[] = [
  {
    name: DatabaseChannel.GET_FOLDERS,
    handler: databaseController.getFolders,
  },
  {
    name: DatabaseChannel.CREATE_FOLDER,
    handler: databaseController.createFolder,
  },
  {
    name: DatabaseChannel.DELETE_FOLDER,
    handler: databaseController.deleteFolder,
  },
  {
    name: DatabaseChannel.GET_FILES,
    handler: databaseController.getFiles,
  },
];

export default databaseChannelRouters;
