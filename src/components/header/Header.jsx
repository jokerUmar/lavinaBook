import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo 1.svg";
import home from "../../assets/home.svg";
import shelf from "../../assets/Bookshelf.svg";
import addImg from "../../assets/add.svg";
import dift from "../../assets/Give Gift.svg";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { MD5 } from "crypto-js";
import { useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { AuthBoolContext } from "../../context/AuthBoolContext";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { key, secret } = JSON.parse(localStorage.getItem("user"));

  let { search, setSearch } = useContext(SearchContext);
  let { setAuthbool } = useContext(AuthBoolContext);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  let location = useLocation();
  const { hash, pathname } = location;
  let navigate = useNavigate();

  // functions

  function handleLogOut() {
    localStorage.removeItem("user");
    setAuthbool(false);
    navigate("/");
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function handleChange(e) {
    if (e.key == "Enter") {
      if (pathname !== "/home") {
        navigate("/home");
      }

      // using api

      if (e.target.value.length > 0) {
        getBookSearch(e.target.value);
      }
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

  function getBookSearch(search) {
    function hashGenerator(string) {
      return MD5(string).toString();
    }

    let str = `GET/books/` + search + secret;
    let sign = hashGenerator(str);

    const config = {
      headers: {
        Key: key,
        Sign: sign,
      },
    };

    axios
      .get(`https://no23.lavina.tech/books/${search}`, config)
      .then((res) => {
        setSearch(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setSearch([]);
        setText("something went wrong please try again");
        handleClick();
      });
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={logo} style={{ padding: "10px" }} alt="" />
      <Divider />
      <List
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Link to={"/home"} className={"aside_link"}>
          <img src={home} alt="" />
          <p>Home</p>
        </Link>

        <Link to={"/shelf"} className="aside_link">
          <img src={shelf} alt="" />
          <p>My Shelf</p>
        </Link>
        <Link to={"/edit"} className="aside_link">
          <img src={dift} alt="" />
          <p>Edit</p>
        </Link>
        <Button
          style={{ marginLeft: "30px", width: "100px !important" }}
          onClick={handleLogOut}
          variant="contained"
          color="error"
          className="logout_btn"
        >
          log out
        </Button>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", paddingTop: "60px" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block" } }}
          >
            <MenuIcon />
          </IconButton>
          <Search
            onKeyUp={(e) => handleChange(e)}
            style={{ marginLeft: "auto" }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Button
            style={{ marginLeft: "30px", width: "100px !important" }}
            onClick={handleLogOut}
            variant="contained"
            color="error"
            className="logout_btn_header"
          >
            log out
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
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
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
