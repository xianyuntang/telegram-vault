import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  Box,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

import { FileEntity } from "@/common/entities";
import { Message } from "@/common/gramjs";
import File, {
  FileSelectedModel,
} from "@/renderer/components/ExplorerPage/FolderContent/File";
import { useDispatch, useSelector } from "@/renderer/hooks";
import { fileService, telegramService } from "@/renderer/ipc-services";
import { getFiles } from "@/renderer/ipc-services/file-service";

const FolderContent: React.FC = () => {
  const [files, setFiles] = useImmer<FileEntity[]>([]);
  const [selectedFiles, setSelectedFiles] = useImmer<FileSelectedModel>({});
  const currentFolderId = useSelector((state) => state.folder.currentFolderId);

  useEffect(() => {
    (async () => {
      const newFiles = await fileService.getFiles({
        folderId: currentFolderId,
      });
      setFiles(newFiles);
    })();
  }, [setFiles, currentFolderId]);

  const handleFileOnDrop = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    Array.from(evt.dataTransfer.files).forEach(async (file) => {
      const newFile: FileEntity = {
        id: uuidv4(),
        filename: file.name,
        filepath: file.path,
        fileSize: file.size,
        folderId: currentFolderId,
        uploading: true,
      };

      setFiles((value) => {
        value.push(newFile);
      });

      await telegramService.sendMediaToMe({ file: newFile }, (eventData) =>
        handleFileUploading(newFile.id, eventData)
      );
    });
  };

  const handleFileUploading = (
    fileId: string,
    eventData: number | { file: FileEntity; message: Message }
  ) => {
    if (typeof eventData === "number") {
      setFiles((value) => {
        for (const item of value) {
          if (item.id === fileId) {
            item.progress = eventData;
          }
        }
      });
    } else {
      setFiles((value) => {
        for (const item of value) {
          if (item.id === fileId) {
            item.uploading = false;
          }
        }
      });
    }
  };

  const handleFileOnDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  const handleFileSelectedClick = (fileSelectedModel: FileSelectedModel) => {
    console.log(fileSelectedModel);
    setSelectedFiles((files) => {
      const key = Object.keys(fileSelectedModel)[0];
      if (key in files) {
        files[key] = fileSelectedModel[key];
      } else {
        return { ...files, ...fileSelectedModel };
      }
    });
  };

  const getSelectedFileEntities = () => {
    return files.filter((file) => {
      return file.id in selectedFiles;
    });
  };

  const downloadFiles = async () => {
    const selectedFileEntities = getSelectedFileEntities();
    const response = await telegramService.downloadFiles({
      files: selectedFileEntities,
    });
  };
  const deleteFiles = async () => {
    const selectedFileEntities = getSelectedFileEntities();
    const response = await telegramService.deleteMessage({
      files: selectedFileEntities,
      folderId: currentFolderId,
    });

    if (response) {
      const newFiles = await getFiles({ folderId: currentFolderId });
      setFiles(newFiles);
    }
  };

  const actions = [
    { icon: <FileDownloadIcon />, name: "Download", action: downloadFiles },
    { icon: <DeleteIcon />, name: "Delete", action: deleteFiles },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        padding: "8px",
        userSelect: "none",
      }}
      onDrop={handleFileOnDrop}
      onDragOver={handleFileOnDragOver}
    >
      <Grid
        container
        sx={{ height: "fit-content", width: "100%" }}
        flexWrap="wrap"
      >
        {files.map((file) => (
          <File file={file} key={file.id} onClick={handleFileSelectedClick} />
        ))}
      </Grid>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default FolderContent;
