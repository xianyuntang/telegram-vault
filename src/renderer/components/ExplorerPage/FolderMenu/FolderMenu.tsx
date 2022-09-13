import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Checkbox,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FolderEntity } from "@/common/entities";
import { useDispatch, useSelector } from "@/renderer/hooks";
import { folderService } from "@/renderer/ipc-services";
import {
  addSelectedFolder,
  removeSelectedFolder,
  setCurrentFolder,
  setFolders,
} from "@/renderer/stores/folder-slice";

import FolderActionToolbar from "./FolderActionToolbar";

interface EditFolderNameForm {
  folderName: string;
}

const FolderMenu: React.FC = () => {
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const folders = useSelector((state) => state.folder.folders);
  const currentFolderId = useSelector((state) => state.folder.currentFolderId);

  const { register, getValues, setValue } = useForm<EditFolderNameForm>({
    defaultValues: {
      folderName: "",
    },
  });

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

  const handleEditFolderNameClick = async (folder: FolderEntity) => {
    if (editingFolderId === folder.id) {
      const newFolders = await folderService.editFolderName({
        folderId: editingFolderId,
        folderName: getValues("folderName"),
      });
      setEditingFolderId(null);
      dispatch(setFolders({ folders: newFolders }));
    } else {
      setValue("folderName", folder.name);
      setEditingFolderId(folder.id);
    }
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
            secondaryAction={
              folder.id !== "root" && (
                <IconButton onClick={() => handleEditFolderNameClick(folder)}>
                  <EditIcon />
                </IconButton>
              )
            }
          >
            <ListItemButton
              onClick={() => handleFolderClick(folder.id)}
              disableRipple={folder.id === editingFolderId}
            >
              <ListItemIcon>
                {folder.id !== "root" && (
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    onClick={(evt) => handleFolderCheckClick(folder.id, evt)}
                  />
                )}
              </ListItemIcon>
              {folder.id === editingFolderId ? (
                <ListItemText
                  sx={{ width: "150px", marginLeft: "-20px" }}
                  primary={
                    <InputBase
                      size="small"
                      fullWidth
                      sx={{ width: "100px" }}
                      autoFocus
                      {...register("folderName")}
                    />
                  }
                />
              ) : (
                <ListItemText
                  sx={{ width: "150px", marginLeft: "-20px" }}
                  primary={folder.name}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FolderMenu;
