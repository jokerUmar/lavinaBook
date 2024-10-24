import "./home.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MD5 } from "crypto-js";
import Aside from "../../components/aside/Aside";
import img from "../../assets/Logo 1.svg";
import { BooleanContext } from "../../context/booleanContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DrawerAppBar from "../../components/header/Header";

function Home() {
  let { key, secret } = JSON.parse(localStorage.getItem("user"));
  let { bool, setBool } = useContext(BooleanContext);
  let navigate = useNavigate();

  function handleCard() {
    navigate("/book");
  }

  let x = {
    data: [
      {
        book: {
          id: 21,
          isbn: "9781118464465",
          title: "Raspberry Pi User Guide",
          cover: "http://url.to.book.cover",
          author: "Eben Upton",
          published: 2012,
          pages: 221,
        },
        status: 0,
      },
    ],
    isOk: true,
    message: "ok",
  };

  return (
    <div className="home">
      <div className="container">
        <div className="right">
          <DrawerAppBar />
          <div className="main">
            {x.data.length < 0 ? (
              <h1>EMPTY</h1>
            ) : (
              x.data.map((e) => {
                return (
                  <div className="card" onClick={handleCard}>
                    <img src={img} width={"125px"} alt="" />
                    {e?.book?.title ? (
                      <p className="card_name">{e.book.title}</p>
                    ) : (
                      <p className="card_name">no title</p>
                    )}
                    {e?.book?.author ? (
                      <p className="card_name">
                        {e.book.author} {e.book.published}
                      </p>
                    ) : (
                      <p className="card_name">no author</p>
                    )}

                    {e?.book?.pages ? (
                      <p className="card_name"> pages {e.book.pages}</p>
                    ) : (
                      <p className="card_name">no pages</p>
                    )}
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
