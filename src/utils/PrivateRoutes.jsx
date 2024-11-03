import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthBoolContext } from "../context/AuthBoolContext";

function PrivateRoutes() {
  let { authbool, setAuthbool } = useContext(AuthBoolContext);

  return authbool ? <Outlet /> : <Navigate to={"/"} />;
}

export default PrivateRoutes;
