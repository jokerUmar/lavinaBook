import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthBoolContext } from "../context/AuthBoolContext";
import AuthCheck from "../zustand/Authcheker";

function DisableLogin() {
  let { check, changeTrue, changeFalse } = AuthCheck();
  let { pathname, hash } = useLocation();

  useEffect(() => {
    if ((x == true, pathname == "/")) {
      <Navigate to={"/home"} />;
    }
  });

  let x = JSON.parse(localStorage.getItem("checker"));

  return x ? <Navigate to={"/home"} /> : <Outlet />;
}

export default DisableLogin;
