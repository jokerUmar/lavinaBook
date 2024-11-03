import React from "react";
import "./Bookpage.css";
import logo from "../../assets/Logo 1.svg";
import { Button } from "@mui/material";
import DrawerAppBar from "../../components/header/Header";

function BookPage({ myself }) {
  return (
    <div className="bookpage">
      <div className="container">
        <Aside />
        <div className="box">
          <DrawerAppBar />

          <div className="book_main">
            <div className="book_img">
              <img src={logo} width={"209px"} height={"277px"} alt="" />
            </div>
            <div className="book_info">
              <h3 className="book_name">Don’t Make Me Think </h3>
              <p className="book_author">By Steve Krug, 2000</p>
              <p className="book_num">Second Edition</p>
              <Button variant="contained" color="success">
                Add To List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
