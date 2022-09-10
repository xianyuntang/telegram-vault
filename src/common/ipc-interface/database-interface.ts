export interface CreateFolderRequestData {
  name: string;
}

export interface DeleteFolderRequestData {
  id: string;
}

export interface GetFilesRequestData {
  folderId: string;
}
