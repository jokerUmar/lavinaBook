import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MD5 } from "crypto-js";
import axios from "axios";

export default function DialogSelect({ id }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");

  let { key, secret } = JSON.parse(localStorage.getItem("user"));
  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  const handleChange = (event) => {
    setStatus(Number(event.target.value) || "");
  };

  function EditBook() {
    let body = {
      status: status - 1,
    };

    let str = "PATCH" + "/books/" + id + JSON.stringify(body) + secret;
    let sign2 = hashGenerator(str);

    let config = {
      headers: {
        Key: key,
        Sign: sign2,
      },
    };

    axios
      .patch(`https://no23.lavina.tech/books/${id}`, body, config)
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Status
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>give the status</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">status</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={status}
                onChange={handleChange}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value={1}>0</MenuItem>
                <MenuItem value={2}>1</MenuItem>
                <MenuItem value={3}>2</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose(), EditBook();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
