import React from "react";
import "./bookshelf.css";
import { Button } from "@mui/material";
import Aside from "../../components/aside/Aside";
import img from "../../assets/book.png";
import DrawerAppBar from "../../components/header/Header";

function Bookshelf({ myself }) {
  return (
    <div className="shelf">
      <div className="container">
        <div className="box">
          <DrawerAppBar />

          <h1>my shelf</h1>
          <div className="book_main">
            <div className="book_card">
              <img src={img} alt="" />
              <div className="book_card-right">
                <p className="book_card-title">Don’t Make Me think</p>
                <p className="book_card-author">Steve Krug, 2000</p>
                <p className="book_card-rating">4.5/5</p>
                <br />
                <Button variant="outlined" color="error">
                  Remove
                </Button>
                <br />
                <br />
                <Button variant="contained" color="success">
                  succes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookshelf;
