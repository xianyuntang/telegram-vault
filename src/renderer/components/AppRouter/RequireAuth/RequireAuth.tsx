import React from "react";
import { Navigate } from "react-router-dom";

import { AppRouterPath } from "@/renderer/components/AppRouter/AppRouterPath";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuth = true;
  return isAuth ? <>{children}</> : <Navigate to={AppRouterPath.LOGIN} />;
};

export default RequireAuth;
