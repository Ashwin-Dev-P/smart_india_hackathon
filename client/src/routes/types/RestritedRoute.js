import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import isLogin from "../../utils/isLogin";

const RestrictedRoute = () => {
  const auth = isLogin();

  return auth ? <Navigate to="/classes" /> : <Outlet />;
};

export default RestrictedRoute;
