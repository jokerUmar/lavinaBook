import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthBoolContext } from "../context/AuthBoolContext";
import AuthCheck from "../zustand/Authcheker";

function PrivateRoutes() {
  let { authbool, setAuthbool } = useContext(AuthBoolContext);

  let { check } = AuthCheck();

  return check ? <Outlet /> : <Navigate to={"/"} />;
}

export default PrivateRoutes;
