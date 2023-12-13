import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import { clearRoom, deleteRoom } from "../../actions/room";
import { useNavigate } from "react-router-dom";

const RoomsActions = ({ params }) => {
  const { _id, lng, lat, price, title, description, images, uid } = params.row;
  const {
    dispatch,
    state: { currentUser, updatedRoom, addedImages, images: newImages },
  } = useValue();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    if (updatedRoom) {
      clearRoom(dispatch, currentUser, addedImages, updatedRoom);
    } else {
      clearRoom(dispatch, currentUser, newImages);
    }
    dispatch({ type: "UPDATE_LOCATION", payload: { lng, lat } });
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { price, title, description },
    });
    dispatch({ type: "UPDATE_IMAGES", payload: images });
    dispatch({ type: "UPDATE_UPDATED_ROOM", payload: { _id, uid } });
    navigate("/updateRoom");
  };

  return (
    <React.Fragment>
      <Tooltip title="View room details">
        <IconButton
          onClick={() => dispatch({ type: "UPDATE_ROOM", payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this room">
        <IconButton onClick={handleClickOpen}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this room">
        <IconButton
          onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default RoomsActions;
