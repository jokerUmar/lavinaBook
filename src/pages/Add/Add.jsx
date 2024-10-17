import React, { useState } from "react";
import "./Add.css";
import Aside from "../../components/aside/Aside";
import Header from "../../components/header/Header";
import { Button } from "@mui/material";
import axios from "axios";
import { MD5 } from "crypto-js";

function Add({ myself }) {
  const [isbnData, setisbnData] = useState("");
  let { key, secret } = JSON.parse(localStorage.getItem("user"));

  function handleClick(params) {
    PostBook(isbnData);
  }

  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  function PostBook(dataIsbn) {
    const body = {
      isbn: dataIsbn,
    };

    let method = "POST";
    let url = "/books";

    let str = `${method}${url}${JSON.stringify(body)}${secret}`;

    let sign = hashGenerator(str);

    console.log(sign);

    const config = {
      headers: {
        Key: key,
        Sign: sign,
      },
    };

    axios
      .post("https://no23.lavina.tech/books", body, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="add">
      <div className="container">
        <Aside />
        <div className="box">
          <Header myself={myself} />

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
