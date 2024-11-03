import React, { useContext, useEffect, useState } from "react";
import "./Add.css";
import { Button } from "@mui/material";
import axios from "axios";
import { MD5 } from "crypto-js";
import md5 from "md5";
import DrawerAppBar from "../../components/header/Header";
import CryptoJS from "crypto-js";

function Add() {
  const [isbnData, setisbnData] = useState("");
  let { key, secret } = JSON.parse(localStorage.getItem("user"));

  function handleClick() {
    // PostBook(isbnData);
  }

  // const hashGenerator = (string) => {
  //   return MD5(string).toString();
  // };

  // const PostBook = (isbn) => {
  //   const body = {
  //     isbn: isbn,
  //   };

  //   const str = `POST/books{isbn:"${isbn}"}${secret}`;

  //   let sign = hashGenerator(str);

  //   const config = {
  //     headers: {
  //       Key: key,
  //       Sign: sign,
  //     },
  //   };
  //   console.log("key=", key, "secret=", secret, "isbn=", isbn, "sign=", sign);

  //   axios
  //     .post(`https://no23.lavina.tech/books`, body, config)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="add">
      <div className="container">
        <div className="box">
          <DrawerAppBar />

          <div className="add_main">
            <div className="add_box">
              <h3>Fill up Book Details</h3>

              <input
                onChange={(e) => setisbnData(e.target.value)}
                placeholder="isbn"
                type="number"
                name="isbn"
                id="isbn"
              />
              <br />
              <Button onClick={handleClick} variant="contained" color="success">
                Submit
              </Button>
            </div>

            <img
              src=""
              width={"300px"}
              height={"300px"}
              alt="There is an img"
              className="add_main_img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
