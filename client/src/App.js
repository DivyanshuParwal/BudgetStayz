import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import Room from "./components/rooms/Room";
import AddRoom from "./components/addRoom/AddRoom";
import Protected from "./components/protected/Protected";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Rooms from "./components/manageRooms/Rooms";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/user/Login";

const App = () => {
  const [toggleDark, settoggleDark] = useState(true);
  const myTheme = createTheme({
    // Theme settings
    palette: {
      mode: toggleDark ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Loading />
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route
            path="manageRooms/*"
            element={
              <Protected>
                <Rooms toggleDark={toggleDark} settoggleDark={settoggleDark} />
              </Protected>
            }
          />
          {["/addRoom", "/updateRoom"].map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <Protected>
                  <AddRoom toggleDark={toggleDark} />
                </Protected>
              }
            />
          ))}
          <Route
            path="/login"
            element={
              <Login toggleDark={toggleDark} settoggleDark={settoggleDark} />
            }
            exact
          />
          <Route
            path="*"
            element={
              <Home toggleDark={toggleDark} settoggleDark={settoggleDark} />
            }
          />
        </Routes>
      </BrowserRouter>
      <Room />
    </ThemeProvider>
  );
};

export default App;
