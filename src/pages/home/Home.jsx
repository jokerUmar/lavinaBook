import "./home.css";
import React, { useContext, useEffect, useState } from "react";
import { BooleanContext } from "../../context/booleanContext";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import DrawerAppBar from "../../components/header/Header";
import LazyLoad from "react-lazy-load";
import axios from "axios";
import { MD5 } from "crypto-js";
import { Button } from "@mui/material";
import { AddingShelfContext } from "../../context/AddingShelfContext";

function Home() {
  let { key, secret } = JSON.parse(localStorage.getItem("user"));
  let { bool, setBool } = useContext(BooleanContext);
  let { search, setSearch } = useContext(SearchContext);
  let { adding, setAdding } = useContext(AddingShelfContext);

  const [loader, setLoader] = useState("LazyLoad");
  let navigate = useNavigate();

  function handleCard() {
    navigate("/book");
  }

  function handleAdd(item) {
    // starting

    function hashGenerator(string) {
      return MD5(string).toString();
    }

    const bodyString = `{"isbn":"${item.isbn}"}`;

    let str = `POST/books${bodyString}${secret}`;
    let sign = hashGenerator(str);

    const config = {
      headers: {
        Key: key,
        Sign: sign,
      },
    };

    const body = { isbn: item.isbn };

    axios
      .post(`https://no23.lavina.tech/books`, body, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="home">
      <div className="container">
        <div className="right">
          <DrawerAppBar />
          <div className="main">
            {typeof search?.data?.data == "undefined" ? (
              <h1
                style={{
                  color: "#1976D2",
                  textAlign: "center",
                  margin: "20px auto",
                }}
              >
                EMPTY
              </h1>
            ) : (
              search?.data?.data?.map((e) => {
                return (
                  <div className="card" key={e.isbn}>
                    <LazyLoad
                      height={"150px"}
                      offset={300}
                      threshold={0.95}
                      onContentVisible={() => {
                        setLoader("is-visible");
                      }}
                    >
                      <img
                        loading="lazy"
                        src={
                          e.cover.toString().split("/")[
                            e.cover.toString().split("/").length - 1
                          ] !== "-1-M.jpg"
                            ? e?.cover
                            : "https://picsum.photos/200/300"
                        }
                        width={"180px"}
                        height={"180px"}
                        alt=""
                      />
                    </LazyLoad>
                    <div className="card_name_box">
                      {e?.title ? (
                        <p className="card_name card_title">{e?.title}</p>
                      ) : (
                        <p className="card_name">no title</p>
                      )}
                      {e?.author ? (
                        <p className="card_name">
                          {e.author} {e.published}
                        </p>
                      ) : (
                        <p className="card_name">no author</p>
                      )}
                    </div>
                    <Button
                      className="add_btn"
                      variant="contained"
                      color="success"
                      onClick={() => handleAdd(e)}
                    >
                      Add to List
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
