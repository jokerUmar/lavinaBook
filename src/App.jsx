import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import BookPage from "./pages/BookPage/BookPage";
import { useContext, useState } from "react";
import { BooleanContext } from "./context/booleanContext";
import Bookshelf from "./pages/BookShelf/Bookshelf";
import Add from "./pages/Add/Add";
import Edit from "./pages/Edit/Edit";
import { AuthenticationForm } from "./pages/auth/Auth";
import ErrorPage from "./pages/errorPage/ErrorPage";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  let navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationForm />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} exact />
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
