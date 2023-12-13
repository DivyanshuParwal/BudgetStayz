import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { storeRoom } from "../actions/room";
import { logout } from "../actions/user";
import { useValue } from "../context/ContextProvider";
import UserIcons from "./user/UserIcons";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LoginIcon from "@mui/icons-material/Login";
import BedIcon from "@mui/icons-material/Bed";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import { styled } from "@mui/material/styles";

const UserAvatar = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(2),
  },
}));

const NavBar = ({ toggleDark, settoggleDark, toggleDrawer }) => {
  const {
    dispatch,
    state: {
      currentUser,
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
    },
  } = useValue();

  const navigate = useNavigate();
  const handleLogout = () => {
    storeRoom(
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
      currentUser.id
    );
    logout(dispatch);
  };
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
            <IconButton
              onClick={toggleDrawer(true)}
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <BedIcon />
            </IconButton>
            {!currentUser ? (
              <>
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
                <Button
                  color="inherit"
                  startIcon={<LoginIcon />}
                  sx={{ display: { xs: "none", md: "inline-flex" }, ml: 2 }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <IconButton
                  onClick={() => navigate("/login")}
                  color="inherit"
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <LoginIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("manageRooms")}
                  color="inherit"
                  startIcon={<RoomPreferencesIcon />}
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    mr: 2,
                  }}
                >
                  Manage Rooms
                </Button>
                <UserAvatar>
                  <UserIcons />
                </UserAvatar>
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
                <Button
                  color="inherit"
                  startIcon={<Logout />}
                  sx={{ display: { xs: "none", md: "inline-flex" }, ml: 2 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
