export interface FileEntity {
  id: string;
  folderId: string | null;
  filename: string;
  fileSize: number;
  filepath: string;
  fileExt?: string;
  accessHash?: string;
  fileReference?: Buffer;
  messageId?: number;
  uploading?: boolean;
  progress?: number;
}
