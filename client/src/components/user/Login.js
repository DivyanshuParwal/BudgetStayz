import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Tooltip, AppBar, Toolbar, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GoogleLogin from "./GoogleLogin";
import { useEffect, useRef, useState } from "react";
import { login, register } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";
import PasswordField from "./PasswordField";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        BudgetStayz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn({ toggleDark, settoggleDark }) {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isRegister) return login({ email, password }, dispatch);

    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Passwords do not match",
        },
      });
    register({ name, email, password }, dispatch);
  };

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);
  const handleModeChange = () => {
    settoggleDark(!toggleDark);
  };

  return (
    <>
      <AppBar color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="a"
                href="#"
                onClick={() => navigate("/")}
                noWrap
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BudgetStayz
              </Typography>
            </Box>
            <IconButton onClick={handleModeChange} color="inherit">
              {toggleDark === true ? (
                <Tooltip title="Light Mode">
                  <LightModeIcon fontSize="medium" />
                </Tooltip>
              ) : (
                <Tooltip title="Dark Mode">
                  <DarkModeIcon fontSize="medium" />
                </Tooltip>
              )}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Container component="main" maxWidth="xs">
        <Paper elevation={5} sx={{ p: 3, m: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isRegister ? "Register" : "Sign In"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {isRegister && (
                <TextField
                  autoFocus
                  margin="normal"
                  variant="standard"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  inputRef={nameRef}
                  inputProps={{ minLength: 2 }}
                  required
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                variant="standard"
                label="Email Address"
                type="email"
                inputRef={emailRef}
                autoFocus={!isRegister}
              />
              <PasswordField {...{ passwordRef }} />
              {isRegister && (
                <PasswordField
                  passwordRef={confirmPasswordRef}
                  id="confirmPassword"
                  label="Confirm Password"
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isRegister ? "Sign Up" : "Sign In"}
              </Button>
              <Typography variant="body2" align="center">
                {isRegister
                  ? "Do you have an account?"
                  : "Don't have an account?"}
                <Button onClick={() => setIsRegister(!isRegister)}>
                  {isRegister ? "Sign In" : "Sign Up"}
                </Button>
              </Typography>
              <Divider sx={{ mt: 2 }}>OR</Divider>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <GoogleLogin />
              </Box>
            </Box>
          </Box>
          <Copyright sx={{ mt: 1 }} />
        </Paper>
      </Container>
    </>
  );
}
