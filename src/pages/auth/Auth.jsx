import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import "@mantine/core/styles.css";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MD5 } from "crypto-js";
import { AuthBoolContext } from "../../context/AuthBoolContext";
import AuthCheck from "../../zustand/Authcheker";
import usePreventBackNavigation from "../../utils/disableRoute/DisableRoute";

export function AuthenticationForm(props) {
  let { authbool, setAuthbool } = useContext(AuthBoolContext);
  let { check, changeTrue, changeFalse } = AuthCheck();

  console.log(check);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [myself, setMyself] = useState("");

  let navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function postSign() {
    axios
      .post(`https://no23.lavina.tech/signup`, {
        name: form.values.name,
        email: form.values.email,
        key: form.values.key,
        secret: form.values.secret,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res?.data?.data));

        setTimeout(() => {
          changeTrue();
          navigate("/home", { replace: true });
        }, 200);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          changeFalse();
          setOpen(true);
          setText(err.message);
        }
      });
  }

  function getMyself(key, secret) {
    let x = localStorage.getItem("user");

    if (x !== null) {
      //   let { key, secret } = JSON.parse(localStorage.getItem("user"));

      function hashGenerator(string) {
        return MD5(string).toString();
      }

      let str = `GET/myself${secret}`;

      let sign = hashGenerator(str);

      const config = {
        headers: {
          Key: key,
          Sign: sign,
        },
      };

      axios
        .get("https://no23.lavina.tech/myself", config)
        .then((res) => {
          setMyself(res?.data?.data);
        })
        .catch((err) => {
          setOpen(true);
          setText(err.message);
          setMyself(err);
          console.log(err);
        });
    } else {
      setMyself(false);
    }
  }

  //   myself localstorageni tekshiradi va ichida malumot bolsa qaytaradi bolnasa false
  function checkLogin() {
    if (type == "register") {
      getMyself(form.values.key, form.values.secret);
      if (myself === false) {
        postSign();
      } else {
        if (
          myself.key !== form.values.key &&
          myself.secret !== form.values.secret &&
          myself.email !== form.values.email
        ) {
          postSign();
        } else {
          form.values.name = "";
          form.values.key = "";
          form.values.secret = "";
          form.values.email = "";

          changeFalse();
          setOpen(true);
          setText("this account already exists");
        }
      }
    } else if (type == "login") {
      let x = localStorage.getItem("user");

      if (x !== null) {
        let { key, secret } = JSON.parse(localStorage.getItem("user"));

        function hashGenerator(string) {
          return MD5(string).toString();
        }

        let str = `GET/myself${secret}`;

        let sign = hashGenerator(str);

        const config = {
          headers: {
            Key: key,
            Sign: sign,
          },
        };

        axios
          .get("https://no23.lavina.tech/myself", config)
          .then((res) => {
            let data = res?.data?.data;
            if (
              data.key === form.values.key &&
              data.secret === form.values.secret &&
              data.email === form.values.email
            ) {
              // setAuthbool(true);
              changeTrue();
              navigate("/home");
            } else {
              // setAuthbool(false);
              changeFalse();
              setOpen(true);
              setText("The login or password was entered incorrectly");
            }
          })
          .catch((err) => {
            // setAuthbool(false);
            changeFalse();
            setOpen(true);
            setText(err.message);
          });
      } else {
        // setAuthbool(false);
        changeFalse();
        setOpen(true);
        setText("this account is not exist");
      }
    }
  }

  // Removed "props: PaperProps"
  const [type, toggle] = useToggle(["login", "register"]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      key: "",
      secret: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      secret: (val) =>
        val.length <= 6 ? "Secret should include at least 6 characters" : null,
    },
  });

  return (
    <div>
      <Paper
        style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}
        radius="md"
        p="xl"
        withBorder
        {...props}
      >
        {/* Spread props */}
        <Text size="lg" style={{ textAlign: "center" }} fw={500}>
          Welcome to library, {type} with
        </Text>
        <Divider label="" labelPosition="center" my="lg" />
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Key"
              placeholder="Your Key"
              value={form.values.key}
              onChange={(event) =>
                form.setFieldValue("key", event.currentTarget.value)
              }
              radius="md"
            />
            <PasswordInput
              required
              label="Secret"
              placeholder="Your Secret"
              value={form.values.secret}
              onChange={(event) =>
                form.setFieldValue("secret", event.currentTarget.value)
              }
              error={
                form.errors.secret &&
                "Secret should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button onClick={checkLogin} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
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
  );
}
