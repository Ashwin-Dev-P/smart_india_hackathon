import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//utils
import isLogin from "../../utils/isLogin";

const PrivateRoute = () => {
  const auth = isLogin();

  return auth ? <Outlet private_route={true} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
