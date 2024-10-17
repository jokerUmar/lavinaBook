import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import bg_login from "../../assets/authencation-bg.png";
import { Alert, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BooleanContext } from "../../context/booleanContext";

function Login() {
  let navigate = useNavigate();

  let { bool, setBool } = useContext(BooleanContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  let key = "MyUserKey" + Math.floor(Math.random() * 1000000);
  let mySecret = "MyUserSecret" + String(Math.floor(Math.random() * 10000000));

  function postData() {
    if (!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      setOpen(true);
      setText("please write the email in full");
    } else {
      axios
        .post(`https://no23.lavina.tech/signup`, {
          name: name,
          email: email,
          key: name.length > 0 && email.length > 0 ? key : "",
          secret: name.length > 0 && email.length > 0 ? mySecret : "",
        })
        .then((res) => {
          console.log(res);

          setBool(true);
          if (name.length > 0 && email.length > 0) {
            localStorage.setItem("user", JSON.stringify(res?.data?.data));
            setTimeout(() => {
              navigate("/home");
            }, 700);
          }
        })
        .catch((err) => {
          if (err) {
            handleClick();
            console.log(err);
            setText("please fill the form");
          }
        });
    }
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div style={{ backgroundImage: `url(${bg_login})` }} className="owerflow">
      <div className="container">
        <div className="login">
          <Typography variant="h3" component="h2">
            My Book <br /> Shelf
          </Typography>
          <p className="login_text1">Welcome Back !</p>
          <p className="login_text2">
            Sign in to continue to yourDigital Library
          </p>
          <label htmlFor="email">email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              e.target.value.length > 0 ? setEmail(e.target.value) : "";
            }}
          />
          <br />
          <label htmlFor="name">name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              e.target.value.length > 0 ? setName(e.target.value) : "";
            }}
          />
          <br />
          <Button
            variant="contained"
            className="login_btn"
            sx={{
              backgroundColor: "#FA7C54",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={postData}
          >
            Login
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "250px" }}
            >
              {text}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default Login;
