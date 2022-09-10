import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "@/renderer/hooks";
import { folderService } from "@/renderer/ipc-services";
import {
  addSelectedFolder,
  removeSelectedFolder,
  setCurrentFolder,
  setFolders,
} from "@/renderer/stores/folder-slice";

import FolderActionToolbar from "./FolderActionToolbar";

const FolderMenu: React.FC = () => {
  const folders = useSelector((state) => state.folder.folders);
  const currentFolderId = useSelector((state) => state.folder.currentFolderId);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const newFolders = await folderService.getFolders();
      dispatch(setFolders({ folders: newFolders }));
    })();
  }, [dispatch]);

  const handleFolderCheckClick = (
    id: string,
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    if ((evt.target as HTMLInputElement).checked) {
      dispatch(addSelectedFolder({ folderId: id }));
    } else {
      dispatch(removeSelectedFolder({ folderId: id }));
    }
  };

  const handleFolderClick = (folderId: string) => {
    dispatch(setCurrentFolder({ folderId }));
  };
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <FolderActionToolbar />
      <List dense>
        {folders.map((folder) => (
          <ListItem
            sx={{
              backgroundColor:
                currentFolderId === folder.id ? "#d2d6dc" : "current",
            }}
            dense
            key={folder.id}
            disableGutters
          >
            <ListItemButton onClick={() => handleFolderClick(folder.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  onClick={(evt) => handleFolderCheckClick(folder.id, evt)}
                />
              </ListItemIcon>
              <ListItemText primary={folder.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FolderMenu;
