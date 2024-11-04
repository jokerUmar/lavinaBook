import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import BookPage from "./pages/BookPage/BookPage";
import { useContext, useEffect, useState } from "react";
import { MD5 } from "crypto-js";
import axios from "axios";
import { BooleanContext } from "./context/booleanContext";
import Bookshelf from "./pages/BookShelf/Bookshelf";
import Add from "./pages/Add/Add";
import Edit from "./pages/Edit/Edit";
import { AuthenticationForm } from "./pages/auth/Auth";
import ErrorPage from "./pages/errorPage/ErrorPage";
import { AuthBoolContext } from "./context/AuthBoolContext";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  let { bool, setBool } = useContext(BooleanContext);
  let { authbool, setAuthbool } = useContext(AuthBoolContext);
  const [myself, setMyself] = useState("");
  let navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationForm />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/shelf" element={<Bookshelf />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="*" element={<ErrorPage />} /> *
        </Route>
      </Routes>
    </>
  );
}

export default App;
