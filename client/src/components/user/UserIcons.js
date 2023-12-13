import { Avatar, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";
import UserMenu from "./UserMenu";
import Profile from "./Profile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const UserIcons = () => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorUserMenu, setAnchorUserMenu] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Open Profile">
        <IconButton
          onClick={(e) =>
            !isMobileScreen
              ? dispatch({
                  type: "UPDATE_PROFILE",
                  payload: {
                    open: true,
                    file: null,
                    photoURL: currentUser?.photoURL,
                  },
                })
              : setAnchorUserMenu(e.currentTarget)
          }
        >
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      {isMobileScreen && (
        <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
      )}
      <Profile />
    </React.Fragment>
  );
};

export default UserIcons;
