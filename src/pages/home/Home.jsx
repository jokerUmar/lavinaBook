import "./home.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MD5 } from "crypto-js";
import Aside from "../../components/aside/Aside";
import Header from "../../components/header/Header";
import img from "../../assets/Logo 1.svg";
import { BooleanContext } from "../../context/booleanContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Home({ myself }) {
  let { key, secret } = JSON.parse(localStorage.getItem("user"));
  let { bool, setBool } = useContext(BooleanContext);
  let navigate = useNavigate();

  function handleCard() {
    navigate("/book");
  }

  return (
    <div className="home">
      <div className="container">
        <Aside />
        <div className="right">
          <Header myself={myself} />

          <div className="main">
            <div className="card" onClick={handleCard}>
              <img src={img} width={"125px"} alt="" />
              <p className="card_name">Don’t Make Me think</p>
              <p className="card_author">Steve Krug, 2000</p>
              <p className="card_rating">4.5/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
