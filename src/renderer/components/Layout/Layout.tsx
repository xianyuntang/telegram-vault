import { CssBaseline, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AppRouterPath } from "@/renderer/components/AppRouter";
import { useDispatch } from "@/renderer/hooks";
import { telegramService } from "@/renderer/ipc-services";
const Layout: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let init = false;
    (async () => {
      setLoading(true);
      try {
        const isAuth = await telegramService.checkAuth();
        if (isAuth) {
          navigate(AppRouterPath.FILE_EXPLORER);
        } else {
          navigate(AppRouterPath.LOGIN);
        }
      } catch (e) {}
      if (!init) {
        setLoading(false);
      }
    })();
    return () => {
      init = true;
    };
  }, [dispatch, navigate]);
  return (
    <Grid
      container
      sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <CssBaseline />
      {loading ? (
        <Skeleton sx={{ width: "100%", height: "100%" }} />
      ) : (
        <Outlet />
      )}
    </Grid>
  );
};

export default Layout;
