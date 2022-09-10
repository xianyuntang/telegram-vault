import { FileEntity } from "@/common/entities";
import { DatabaseChannel } from "@/common/ipc-channel";
import { GetFilesRequestData } from "@/common/ipc-interface/database-interface";
import { ipc } from "@/renderer/core/utils";

export const getFiles = async (
  data: GetFilesRequestData
): Promise<FileEntity[]> => {
  return ipc.send(DatabaseChannel.GET_FILES, {
    data,
  });
};
