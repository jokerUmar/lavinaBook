import React, { useContext } from "react";
import logo from "../../assets/Logo 1.svg";
import home from "../../assets/home.svg";
import shelf from "../../assets/Bookshelf.svg";
import addImg from "../../assets/add.svg";
import dift from "../../assets/Give Gift.svg";
import "./Aside.css";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";

function Aside() {
  let x = JSON.parse(localStorage.getItem("user"));
  let { side, setSide } = useContext(SidebarContext);

  return (
    <aside className={side == true ? "moveAside" : "aside"} id="asideBox">
      <img src={logo} alt="" />
      <div className="list_aside">
        <ul>
          <Link to={"/home"} className={"aside_link"}>
            <img src={home} alt="" />
            <p>Home</p>
          </Link>
          <Link to={"/add"} className="aside_link">
            <img src={addImg} alt="" className="addimg" />
            <p>Add New Book</p>
          </Link>
          <Link to={"/shelf"} className="aside_link">
            <img src={shelf} alt="" />
            <p>My Shelf</p>
          </Link>
          <Link to={"/edit"} className="aside_link">
            <img src={dift} alt="" />
            <p>Edit</p>
          </Link>
          <h3>{x.name}</h3>
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
