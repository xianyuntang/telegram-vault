import { AppBar, Box, Drawer, Grid, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FolderContent from "./FolderContent";

import FolderMenu from "./FolderMenu";

const LEFT_DRAWER_WIDTH = "256px";
const APP_BAR_HEIGHT = "64px";

const ExplorerPage: React.FC = () => {
  return (
    <Grid container>
      <AppBar
        sx={{
          height: APP_BAR_HEIGHT,
          width: `calc(100% - ${LEFT_DRAWER_WIDTH})`,
          marginLeft: LEFT_DRAWER_WIDTH,
        }}
        position="absolute"
      >
        <Toolbar>
          <Typography variant="h6">Telegram Vault</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          position: "relative",
          width: LEFT_DRAWER_WIDTH,

          [`& .MuiDrawer-paper`]: { width: LEFT_DRAWER_WIDTH, padding: "8px" },
        }}
        variant="permanent"
      >
        <FolderMenu />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: `calc(100vh - ${APP_BAR_HEIGHT})`,
          overflow: "auto",
          marginTop: APP_BAR_HEIGHT,
          padding: "8px",
        }}
      >
        <FolderContent />
      </Box>
    </Grid>
  );
};

export default ExplorerPage;
