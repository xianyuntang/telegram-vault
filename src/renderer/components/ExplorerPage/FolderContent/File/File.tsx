import { Box, LinearProgress, Paper, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";

import { FileEntity } from "@/common/entities";

import { FileSelectedModel } from "./File.interface";
import FileIcon from "./FileIcon";

interface FileProps {
  file: FileEntity;
  onClick: (fileSelectedModel: FileSelectedModel) => void;
}

const File: React.FC<FileProps> = ({ file, onClick }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleFileOnClick = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    if (typeof onClick === "function" && file.id !== undefined)
      onClick({ [file.id]: newSelected });
  };
  return (
    <Paper
      sx={{
        position: "relative",
        width: "150px",
        height: "100px",
        padding: "8px",
        margin: "8px",
        opacity: file.uploading ? 0.3 : 1,
        backgroundColor: selected ? "#ce93d8" : "current",
      }}
      elevation={6}
      onClick={handleFileOnClick}
    >
      <FileIcon ext={file.fileExt} />
      <Box
        sx={{
          width: "100%",
          padding: "0 4px",
        }}
      >
        <Tooltip title={file.filename} enterDelay={500}>
          <Typography
            sx={{
              width: "100%",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            variant="subtitle2"
          >
            {file.filename}
          </Typography>
        </Tooltip>
      </Box>
      <Box
        sx={{ position: "absolute", width: "calc(100% - 16px)", top: "90px" }}
      >
        {file.uploading && file.progress !== undefined && (
          <LinearProgress variant="determinate" value={file.progress * 100} />
        )}
      </Box>
    </Paper>
  );
};

export default File;
