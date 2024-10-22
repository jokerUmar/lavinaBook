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

function App() {
  let { bool, setBool } = useContext(BooleanContext);
  const [myself, setMyself] = useState("");

  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  useEffect(() => {
    let { key, secret } = JSON.parse(localStorage.getItem("user"));
    getMyself(key, secret);
  }, [bool]);

  function getMyself(key, secret) {
    let str = "GET" + "/myself" + secret;

    let sign1 = hashGenerator(str);

    axios
      .get(`https://no23.lavina.tech/myself`, {
        headers: {
          Accept: "application/json",
          Key: key,
          Sign: sign1,
        },
      })
      .then((res) => {
        setMyself(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }

  function getAllBook() {
    let str = "GET" + "/books" + secret;
    let sign2 = hashGenerator(str);

    axios
      .get(`https://no23.lavina.tech/books`, {
        headers: {
          Key: key,
          Sign: sign2,
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home myself={myself} />} />
        <Route path="/book" element={<BookPage myself={myself} />} />
        <Route path="/shelf" element={<Bookshelf myself={myself} />} />
        <Route path="/add" element={<Add myself={myself} />} />
        <Route path="/edit" element={<Edit myself={myself} />} />
      </Routes>
    </>
  );
}

export default App;
