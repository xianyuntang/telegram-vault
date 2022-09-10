import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FolderEntity } from "@/common/entities";
export interface FolderState {
  folders: FolderEntity[];
  selectedFolders: string[];
  currentFolderId: string;
}

const initialState: FolderState = {
  folders: [],
  selectedFolders: [],
  currentFolderId: "root",
};

interface SetFoldersPayload {
  folders: FolderEntity[];
}

interface AddFolderPayload {
  folder: FolderEntity;
}

interface AddSelectedFolderPayload {
  folderId: string;
}

interface RemoveSelectedFolderPayload {
  folderId: string;
}

interface SetCurrentFolderPayload {
  folderId: string;
}

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolders(state, action: PayloadAction<SetFoldersPayload>) {
      state.folders = action.payload.folders;
    },
    addFolder(state, action: PayloadAction<AddFolderPayload>) {
      state.folders.push(action.payload.folder);
    },
    addSelectedFolder(state, action: PayloadAction<AddSelectedFolderPayload>) {
      state.selectedFolders.push(action.payload.folderId);
    },
    removeSelectedFolder(
      state,
      action: PayloadAction<RemoveSelectedFolderPayload>
    ) {
      const index = state.selectedFolders.findIndex(
        (folderId) => folderId === action.payload.folderId
      );
      state.selectedFolders.splice(index, 1);
    },
    setCurrentFolder(state, action: PayloadAction<SetCurrentFolderPayload>) {
      state.currentFolderId = action.payload.folderId;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFolders,
  addFolder,
  addSelectedFolder,
  removeSelectedFolder,
  setCurrentFolder,
} = folderSlice.actions;

export default folderSlice.reducer;
