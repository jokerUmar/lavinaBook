import React, { useEffect, useState } from "react";
import "./bookshelf.css";
import { Button } from "@mui/material";
import img from "../../assets/book.png";
import DrawerAppBar from "../../components/header/Header";
import { AddingShelfContext } from "../../context/AddingShelfContext";
import DialogSelect from "../../components/status/Status";
import axios from "axios";
import { MD5 } from "crypto-js";

function Bookshelf() {
  const [dataBook, setdataBook] = useState([]);
  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  let { key, secret } = JSON.parse(localStorage.getItem("user"));

  // EDIT BOOK

  //  FUNCTION DELETE BOOK
  function deleteBook(id) {
    let str = "DELETE" + "/books/" + id + secret;
    let sign2 = hashGenerator(str);

    axios
      .delete(`https://no23.lavina.tech/books/${id}`, {
        headers: {
          Key: key,
          Sign: sign2,
        },
      })
      .then((res) => {
        setdataBook(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }

  // FUNCTION GET ALL BOOK
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
        if (res?.data?.data === null) {
          setdataBook([]);
        } else {
          setdataBook(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setdataBook([]);
      });
  }

  useEffect(() => {
    getAllBook();
  }, [dataBook]);

  return (
    <div className="shelf">
      <div className="container">
        <div className="box">
          <DrawerAppBar />

          <h1>my shelf</h1>
          <div className="book_main">
            <div className="book_box">
              {dataBook.length > 0 ? (
                dataBook.map((el) => {
                  return (
                    <div className="book_card" key={el?.book?.id}>
                      <img
                        src={el?.book?.cover ? el?.book?.cover : img}
                        alt="there is img"
                      />
                      <div className="book_card-right">
                        <p className="book_card-title">{el?.book?.title}</p>
                        <p
                          className="book_card-author"
                          style={{ width: "180px" }}
                        >
                          {el?.book?.author}, {el?.book?.published}
                        </p>
                        <p className="book_card-rating">
                          status : {el?.status}
                        </p>
                        <br />
                        <Button
                          onClick={() => deleteBook(el?.book?.id)}
                          variant="outlined"
                          color="error"
                        >
                          Remove
                        </Button>
                        <br />
                        <br />
                        <DialogSelect id={el?.book.id} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1
                  style={{
                    color: "red",
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  empty
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookshelf;
