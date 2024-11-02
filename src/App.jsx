import { Route, Routes } from "react-router-dom";
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
function App() {
  let { bool, setBool } = useContext(BooleanContext);
  const [myself, setMyself] = useState("");

  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  // function getAllBook() {
  //   let str = "GET" + "/books" + secret;
  //   let sign2 = hashGenerator(str);

  //   axios
  //     .get(`https://no23.lavina.tech/books`, {
  //       headers: {
  //         Key: key,
  //         Sign: sign2,
  //       },
  //     })
  //     .then((res) => {
  //       // console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/shelf" element={<Bookshelf />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
