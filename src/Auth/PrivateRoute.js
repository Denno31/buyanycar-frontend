import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.userInfo);

  return userInfo?.userInfo ? children : <Navigate to="/" />;
};
export default PrivateRoute;
