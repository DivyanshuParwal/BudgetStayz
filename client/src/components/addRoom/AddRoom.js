import React, { useEffect, useState } from "react";
import { Cancel, Send, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import AddDetails from "./addDetails/AddDetails";
import AddImages from "./addImages/AddImages";
import AddLocation from "./addLocation/AddLocation";
import { clearRoom, createRoom, updateRoom } from "../../actions/room";
import { useNavigate } from "react-router-dom";

const AddRoom = (props) => {
  const {
    state: {
      images,
      details,
      location,
      currentUser,
      updatedRoom,
      deletedImages,
      addedImages,
    },
    dispatch,
  } = useValue();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: "Location", completed: false },
    { label: "Details", completed: false },
    { label: "Images", completed: false },
  ]);
  const [showSubmit, setShowSubmit] = useState(false);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };

  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true);
    } else {
      if (steps[2].completed) setComplete(2, false);
    }
  }, [images]);

  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);

  useEffect(() => {
    if (location.lng || location.lat) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [location]);

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status;
      return [...steps];
    });
  };

  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps]);

  const handleSubmit = () => {
    const room = {
      lng: location.lng,
      lat: location.lat,
      price: details.price,
      title: details.title,
      description: details.description,
      images,
    };
    if (updatedRoom) {
      updateRoom(room, currentUser, dispatch, updatedRoom, deletedImages);
      return navigate("/manageRooms");
    }
    createRoom(room, currentUser, dispatch);
    navigate("/");
  };

  const handleClear = () => {
    if (updatedRoom) {
      clearRoom(dispatch, currentUser, addedImages, updatedRoom);
      navigate("/manageRooms");
    } else {
      clearRoom(dispatch, currentUser, images);
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {updatedRoom ? "Update Room" : "Add Room"}
          </Typography>
          <IconButton color="inherit" onClick={handleClear}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4 }}>
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          sx={{ mb: 3 }}
        >
          {steps.map((step, index) => (
            <Step key={step.label} completed={step.completed}>
              <StepButton onClick={() => setActiveStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ pb: 7 }}>
          {
            {
              0: <AddLocation {...props} />,
              1: <AddDetails />,
              2: <AddImages />,
            }[activeStep]
          }
          <Stack direction="row" sx={{ pt: 2, justifyContent: "space-around" }}>
            <Button
              color="inherit"
              disabled={!activeStep}
              onClick={() => setActiveStep((activeStep) => activeStep - 1)}
            >
              Back
            </Button>
            <Button disabled={checkDisabled()} onClick={handleNext}>
              Next
            </Button>
          </Stack>
          <Stack
            sx={{ alignItems: "center", justifyContent: "center", gap: 2 }}
            direction="row"
          >
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
              disabled={showSubmit ? false : true}
            >
              {updatedRoom ? "Update" : "Submit"}
            </Button>
            <Button
              variant="outlined"
              endIcon={<Cancel />}
              onClick={handleClear}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddRoom;
