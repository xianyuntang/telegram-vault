export interface Document {
  id: { value: bigint };
  accessHash: { value: bigint };
  fileReference: Buffer;
  dcId: number;
  attributes: [any];
}

export interface Media {
  document: Document;
}

export interface Message {
  id: number;
  media: Media;
}

export interface TelegramError {
  code: number;
  errorMessage: string;
}
