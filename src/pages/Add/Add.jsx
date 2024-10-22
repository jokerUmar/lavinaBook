import React, { useState } from "react";
import "./Add.css";
import { Button } from "@mui/material";
import axios from "axios";
import { MD5 } from "crypto-js";
import md5 from "md5";
import CryptoJS from "crypto-js";
import DrawerAppBar from "../../components/header/Header";

function Add({ myself }) {
  const [isbnData, setisbnData] = useState("");
  let { key, secret } = JSON.parse(localStorage.getItem("user"));

  function handleClick() {
    PostBook(isbnData);
  }

  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  const PostBook = async (dataIsbn) => {
    const body = {
      isbn: dataIsbn,
    };

    let str = `POST/books{isbn:"${dataIsbn}"}${secret}`;
    // const str = `${"POST"}${"/books"}${JSON.stringify(body)}${secret}`;

    let sign = hashGenerator(str);

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
  };

  // const PostBook = async (isbn) => {
  //   console.log(isbn);

  //   const method = "POST";
  //   const url = "/books";
  //   const body = { isbn };

  //   // Prepare the string to sign
  //   // const stringToSign = `${method}${url}${JSON.stringify(body)}${secret}`;
  //   let stringToSign = `POST/books{isbn:"${isbn}"}${secret}`;

  //   console.log(stringToSign);

  //   // Generate the MD5 hash (sign)
  //   const sign = MD5(stringToSign).toString();

  //   // Set up headers
  //   const headers = {
  //     Key: key,
  //     Sign: sign,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://no23.lavina.tech/books",
  //       body,
  //       {
  //         headers,
  //       }
  //     );
  //     console.log("Book created successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error creating book:", error);
  //   }
  // };

  return (
    <div className="add">
      <div className="container">
        <div className="box">
          <DrawerAppBar myself={myself} />

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
