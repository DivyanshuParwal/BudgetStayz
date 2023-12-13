import { Lock } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const LoginButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
  },
}));
const AccessMessage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 10 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Forbidden Access</AlertTitle>
        Please login or register to access this page
        <LoginButton
          variant="outlined"
          startIcon={<Lock />}
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </LoginButton>
      </Alert>
    </Container>
  );
};

export default AccessMessage;
