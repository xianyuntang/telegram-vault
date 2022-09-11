import { FileEntity } from "@/common/entities";
import { Country, Message } from "@/common/gramjs";

export interface GetCountriesListResponseData {
  countries: Country[];
}

export interface SendCodeRequestData {
  phoneNumber: string;
}

export interface SendCodeResponseData {
  phoneCodeHash: string;
}

export interface SignInRequestData {
  phoneNumber: string;
  phoneCodeHash: string;
  phoneCode: string;
}

export interface SignInResponseData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
}

export interface SignInWithPasswordRequestData {
  password: string;
}

export interface DeleteMessageRequestData {
  files: FileEntity[];
  folderId: string;
}

export interface SendMediaToMeRequestData {
  file: FileEntity;
}

export interface SendMediaToMeResponseData {
  message: Message;
  file: FileEntity;
}

export interface DownloadFilesRequestData {
  files: FileEntity[];
}

export interface DownloadFileResponseData {
  filenames: string[];
}
