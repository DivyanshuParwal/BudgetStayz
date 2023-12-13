import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useValue } from "../../context/ContextProvider";
import jwtDecode from "jwt-decode";

const GoogleLogin = () => {
  const { dispatch } = useValue();

  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    const { sub: id, email, name, picture: photoURL } = decodedToken;
    dispatch({
      type: "UPDATE_USER",
      payload: {
        id,
        email,
        name,
        photoURL,
        token,
        google: true,
        role: "basic",
      },
    });
  };

  useEffect(() => {
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt();
    } catch (error) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
      console.log(error);
    }
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box id="signInDiv"></Box>
    </Box>
  );
};

export default GoogleLogin;
