import React from "react";
import "./Edit.css";
import Aside from "../../components/aside/Aside";
import DrawerAppBar from "../../components/header/Header";

function Edit({ myself }) {
  return (
    <div className="edit">
      <div className="container">
        <div className="box">
          <DrawerAppBar myself={myself} />

          <div className="book_main">
            <h1>Editdqwd</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
