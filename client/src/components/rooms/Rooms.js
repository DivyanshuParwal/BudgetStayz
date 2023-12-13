import {
  Avatar,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Alert,
  Tooltip,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";

const Rooms = () => {
  const {
    state: { filteredRooms },
    dispatch,
  } = useValue();

  return (
    <>
      <Paper
        square
        elevation={3}
        sx={{ p: 3, display: { xs: "none", md: "block" } }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: { xs: "none", md: "block" }, textAlign: "center" }}
        >
          Discover Budget-Friendly Rooms
        </Typography>
        {filteredRooms.length === 0 ? (
          <Box sx={{ height: "100vh", position: "relative", p: 2 }}>
            <Alert
              variant="outlined"
              severity="info"
              sx={{ position: "absolute", top: "30%" }}
            >
              No rooms found near the searched location
            </Alert>
          </Box>
        ) : (
          <Box
            sx={{
              overflowY: "scroll",
              height: "100vh",
              p: 2,
              "::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <ImageList
              gap={12}
              sx={{
                mb: 8,
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))!important",
              }}
            >
              {filteredRooms.map((room) => (
                <Card key={room._id} sx={{ maxHeight: 350 }}>
                  <ImageListItem sx={{ height: "100% !important" }}>
                    <ImageListItemBar
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                      }}
                      title={room.price === 0 ? "Free Stay" : "$" + room.price}
                      actionIcon={
                        <Tooltip title={room.uName} sx={{ mr: "5px" }}>
                          <Avatar src={room.uPhoto} />
                        </Tooltip>
                      }
                      position="top"
                    />
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      loading="lazy"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({ type: "UPDATE_ROOM", payload: room })
                      }
                    />
                    <ImageListItemBar title={room.title} />
                  </ImageListItem>
                </Card>
              ))}
            </ImageList>
          </Box>
        )}
      </Paper>
      {filteredRooms.length === 0 ? (
        <Box sx={{ display: { xs: "block", md: "none" }, mt: 3 }}>
          <Alert variant="outlined" severity="info">
            No rooms found near the searched location
          </Alert>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            p: 1,
            display: { xs: "block", md: "none" },
          }}
        >
          <ImageList
            gap={14}
            sx={{
              mb: 8,
              gridTemplateColumns:
                "repeat(auto-fill, minmax(280px, 1fr))!important",
            }}
          >
            {filteredRooms.map((room) => (
              <Card key={room._id} sx={{ maxHeight: 350 }}>
                <ImageListItem sx={{ height: "100% !important" }}>
                  <ImageListItemBar
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                    }}
                    title={room.price === 0 ? "Free Stay" : "$" + room.price}
                    actionIcon={
                      <Tooltip title={room.uName} sx={{ mr: "5px" }}>
                        <Avatar src={room.uPhoto} />
                      </Tooltip>
                    }
                    position="top"
                  />
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    loading="lazy"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({ type: "UPDATE_ROOM", payload: room })
                    }
                  />
                  <ImageListItemBar title={room.title} />
                </ImageListItem>
              </Card>
            ))}
          </ImageList>
        </Box>
      )}
    </>
  );
};

export default Rooms;
