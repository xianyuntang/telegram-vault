import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { Box } from "@mui/material";
import React from "react";
interface FileIconProps {
  ext?: string;
}
const FileIcon: React.FC<FileIconProps> = ({ ext }) => {
  return (
    <Box>
      <InsertDriveFileRoundedIcon color="action" className="file-icon__icon" />
      <span className="file-icon__ext">{ext}</span>
    </Box>
  );
};

export default FileIcon;
