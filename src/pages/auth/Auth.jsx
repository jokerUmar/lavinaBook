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
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MD5 } from "crypto-js";

export function AuthenticationForm(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  let navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function postData() {
    axios
      .post(`https://no23.lavina.tech/signup`, {
        name: form.values.name,
        email: form.values.email,
        key: form.values.key,
        secret: form.values.secret,
      })
      .then((res) => {
        console.log(res);

        localStorage.setItem("user", JSON.stringify(res?.data?.data));

        setTimeout(() => {
          navigate("/home");
        }, 700);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  function getMyself() {
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
          return res;
        })
        .catch((err) => {
          return err;
        });
    } else {
      return false;
    }
  }

  //   myself localstorageni tekshiradi va ichida malumot bolsa qaytaradi bolnasa false
  function checkLogin() {
    let myself = getMyself();
    console.log(myself);

    if (type == "register") {
      if (myself == false) {
        postData();
      } else {
        let { key, secret, email } = JSON.parse(localStorage.getItem("user"));

        console.log(key, form.values.key);
        console.log(secret, form.values.secret);
        console.log(email, form.values.email);

        if (
          key !== form.values.key &&
          secret !== form.values.secret &&
          email !== form.values.email
        ) {
          postData();
        } else {
          form.values.name = "";
          form.values.key = "";
          form.values.secret = "";
          form.values.email = "";
          setOpen(true);
          setText("this account already exists");
        }
      }

      console.log(myself);
    } else if (type == "login") {
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
