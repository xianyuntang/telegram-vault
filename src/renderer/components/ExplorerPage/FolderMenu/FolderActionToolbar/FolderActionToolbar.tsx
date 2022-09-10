import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";

import { useDispatch, useSelector } from "@/renderer/hooks";
import { folderService } from "@/renderer/ipc-services";
import { addFolder, setFolders } from "@/renderer/stores/folder-slice";

export const FolderActionToolbar: React.FC = () => {
  const selectedFolders = useSelector((state) => state.folder.selectedFolders);
  const dispatch = useDispatch();

  const handleCreateFolderClick = async () => {
    const folder = await folderService.createFolder({ name: "abc" });
    dispatch(addFolder({ folder }));
  };

  const handleDeleteFolderClick = async () => {
    selectedFolders.forEach((folderId) => {
      folderService.deleteFolder({ id: folderId });
    });
    const folders = await folderService.getFolders();
    dispatch(setFolders({ folders }));
  };

  return (
    <AppBar sx={{ backgroundColor: "#a4cafe" }} position="sticky">
      <Toolbar
        variant="dense"
        sx={{
          width: "100%",
          borderBottom: "1px solid grey",
        }}
      >
        <IconButton onClick={handleCreateFolderClick}>
          <CreateNewFolderIcon />
        </IconButton>
        <IconButton onClick={handleDeleteFolderClick}>
          <DeleteForeverIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default FolderActionToolbar;
