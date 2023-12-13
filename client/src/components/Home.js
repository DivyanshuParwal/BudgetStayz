import * as React from "react";
import NavBar from "./NavBar";
import ClusterMap from "./map/ClusterMap";
import Grid from "@mui/material/Grid";
import Rooms from "./rooms/Rooms";
import Fab from "@mui/material/Fab";
import { Typography, Box } from "@mui/material";
import { AddLocationAlt } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const Home = (props) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const handleClickOpen = () => {
    navigate("/addRoom");
  };

  return (
    <>
      <NavBar {...props} toggleDrawer={toggleDrawer} />
      <>
        <Grid container style={{ width: "100%", height: "100%" }}>
          <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <Rooms />
          </Grid>
          <Grid item xs={12} md={8}>
            <ClusterMap {...props} />
          </Grid>
        </Grid>
        <LightTooltip title="Add Room" placement="left">
          <Fab
            aria-label="add"
            size="small"
            sx={{
              position: "fixed",
              right: 35,
              bottom: 35,
            }}
            onClick={handleClickOpen}
          >
            <AddLocationAlt />
          </Fab>
        </LightTooltip>
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(65% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        />
        <SwipeableDrawer
          sx={{ display: { xs: "block", md: "none" } }}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              Budget-Friendly Rooms
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflowY: "scroll",
            }}
          >
            <Rooms />
          </StyledBox>
        </SwipeableDrawer>
      </>
    </>
  );
};

export default Home;
