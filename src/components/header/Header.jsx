import React, { useContext } from "react";
import "./header.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import bars from "../../assets/bars.svg";
import { SidebarContext } from "../../context/SidebarContext";

function Header({ myself }) {
  let { side, setSide } = useContext(SidebarContext);

  return (
    <header>
      <label htmlFor="search">
        <input type="text" placeholder="Search" />
        <Button
          sx={{ borderRadius: "100px", padding: "8px 20px", fontSize: "12px" }}
          variant="contained"
          color="success"
        >
          search
        </Button>
      </label>
      <div className="profile">
        <div className="pro">{myself?.name}</div>
      </div>

      <img
        onClick={() => setSide(!side)}
        className="header_bars"
        src={bars}
        width={"30px"}
        alt=""
      />
    </header>
  );
}

export default Header;
