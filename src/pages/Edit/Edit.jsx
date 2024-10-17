import React from "react";
import "./Edit.css";
import Aside from "../../components/aside/Aside";
import Header from "../../components/header/Header";

function Edit({ myself }) {
  return (
    <div className="edit">
      <div className="container">
        <Aside />
        <div className="box">
          <Header myself={myself} />

          <div className="book_main">
            <h1>Editdqwd</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
