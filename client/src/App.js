import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/ProfilePage/ProfilePage";
import NavBar from "scenes/NavBar/NavBar";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/profile/:userId" component={ProfilePage} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
//Write Routes for HomePage,LoginPage,ProfilePage using BrowserRouter,Routes and Route
