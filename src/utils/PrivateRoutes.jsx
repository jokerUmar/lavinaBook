import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthBoolContext } from "../context/AuthBoolContext";
import AuthCheck from "../zustand/Authcheker";

function PrivateRoutes() {
  let { authbool, setAuthbool } = useContext(AuthBoolContext);
  let { check, changeTrue, changeFalse } = AuthCheck();

  let x = JSON.parse(localStorage.getItem("checker"));

  return x ? <Outlet /> : <Navigate to={"/"} />;
}

export default PrivateRoutes;
