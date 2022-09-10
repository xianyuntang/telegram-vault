import { FolderEntity } from "@/common/entities";
import { DatabaseChannel } from "@/common/ipc-channel";
import {
  CreateFolderRequestData,
  DeleteFolderRequestData,
} from "@/common/ipc-interface/database-interface";
import { ipc } from "@/renderer/core/utils";

export const createFolder = async (
  data: CreateFolderRequestData
): Promise<FolderEntity> => {
  return ipc.send(DatabaseChannel.CREATE_FOLDER, {
    data,
  });
};

export const getFolders = async (): Promise<FolderEntity[]> => {
  return ipc.send(DatabaseChannel.GET_FOLDERS);
};

export const deleteFolder = async (
  data: DeleteFolderRequestData
): Promise<boolean> => {
  return ipc.send(DatabaseChannel.DELETE_FOLDER, { data });
};
