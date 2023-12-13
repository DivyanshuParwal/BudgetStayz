import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  CssBaseline,
  Tooltip,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Container,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useValue } from "../../context/ContextProvider";
import { getRooms } from "../../actions/room";
import moment from "moment";
import { grey } from "@mui/material/colors";
import RoomsActions from "./RoomsActions";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";

const Rooms = ({ toggleDark, settoggleDark }) => {
  const {
    dispatch,
    state: { rooms, currentUser },
  } = useValue();

  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);

  const handleModeChange = () => {
    settoggleDark(!toggleDark);
  };

  useEffect(() => {
    if (rooms.length === 0) getRooms(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "images",
        headerName: "Photo",
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.images[0]} variant="rounded" />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "price",
        headerName: "Cost",
        width: 70,
        renderCell: (params) => "$" + params.row.price,
      },
      { field: "title", headerName: "Title", width: 170 },
      { field: "description", headerName: "Description", width: 200 },
      { field: "lng", headerName: "Longitude", width: 110 },
      { field: "lat", headerName: "Latitude", width: 110 },

      {
        field: "uName",
        headerName: "Added by",
        width: 80,
        renderCell: (params) => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      { field: "_id", hide: true },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => <RoomsActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <>
      <CssBaseline />
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
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Manage Your Rooms
        </Typography>
        <DataGrid
          columns={columns}
          rows={rooms.filter((room) => room.uid === currentUser.id)}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
            mx: 4,
          }}
        />
      </Box>
    </>
  );
};

export default Rooms;
