import { IpcMainEvent } from "electron";
import { store } from "main/core/db-client";
import { fetchDatabase as _fetchDatabase } from "main/core/db-client";
import { v4 as uuidv4 } from "uuid";

import { FolderEntity, StoreKey } from "@/common/entities";
import { IpcRequest } from "@/common/ipc-interface";
import {
  CreateFolderRequestData,
  DeleteFolderRequestData,
  EditFolderNameRequestData,
  GetFilesRequestData,
} from "@/common/ipc-interface/database-interface";

export const fetchDatabase = async (
  event: IpcMainEvent,
  request: IpcRequest
) => {
  await _fetchDatabase();
  event.sender.send(request.responseChannel, true);
};

export const getFolders = (event: IpcMainEvent, request: IpcRequest) => {
  const folders = store.get(StoreKey.FOLDER) as FolderEntity[];
  event.sender.send(request.responseChannel as string, folders);
};

export const createFolder = (
  event: IpcMainEvent,
  request: IpcRequest<CreateFolderRequestData>
) => {
  const folders = store.get(StoreKey.FOLDER, []) as FolderEntity[];
  const newFolder = { id: uuidv4(), name: request.data.name };
  folders.push(newFolder);
  store.set(StoreKey.FOLDER, folders);
  event.sender.send(request.responseChannel, newFolder);
};

export const deleteFolder = (
  event: IpcMainEvent,
  request: IpcRequest<DeleteFolderRequestData>
) => {
  const folders = store.get(StoreKey.FOLDER, []) as FolderEntity[];
  store.set(
    StoreKey.FOLDER,
    folders.filter((folder) => request.data.id != folder.id)
  );

  event.sender.send(request.responseChannel, true);
};

export const getFiles = (
  event: IpcMainEvent,
  request: IpcRequest<GetFilesRequestData>
) => {
  event.sender.send(
    request.responseChannel,
    store.get(`${StoreKey.FILE}.${request.data.folderId}`, [])
  );
};

export const editFolderName = (
  event: IpcMainEvent,
  request: IpcRequest<EditFolderNameRequestData>
) => {
  const folders = store.get(StoreKey.FOLDER) as FolderEntity[];
  const newFolders = folders.map((folder) => {
    if (folder.id === request.data.folderId) {
      folder.name = request.data.folderName;
    }
    return folder;
  });
  store.set(StoreKey.FOLDER, newFolders);
  event.sender.send(request.responseChannel, newFolders);
};
