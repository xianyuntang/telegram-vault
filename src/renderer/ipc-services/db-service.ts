import { DatabaseChannel } from "@/common/ipc-channel";
import { ipc } from "@/renderer/core/utils";

export const fetchDatabase = async (): Promise<void> => {
  return ipc.send(DatabaseChannel.FETCH_DATABASE);
};
