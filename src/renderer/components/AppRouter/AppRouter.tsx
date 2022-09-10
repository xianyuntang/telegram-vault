import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import ExplorerPage from "@/renderer/components/ExplorerPage";
import Layout from "@/renderer/components/Layout/Layout";
import LoginPage from "@/renderer/components/LoginPage";

import { AppRouterPath } from "./AppRouterPath";
import RequireAuth from "./RequireAuth/RequireAuth";
export const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={AppRouterPath.ROOT} element={<Layout />}>
          <Route
            path={AppRouterPath.FILE_EXPLORER}
            element={
              <RequireAuth>
                <ExplorerPage />
              </RequireAuth>
            }
          />
          <Route path={AppRouterPath.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
