import { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";

function App() {
  const prefersDarkMode =
    "true" === (localStorage.getItem("darkMode") || "false");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const prefersFar = "true" === (localStorage.getItem("far") || "false");
  const [far, setFar] = useState(prefersFar);

  useEffect(() => {
    localStorage.setItem("far", far);
  }, [far]);

  const handleFarMode = () => {
    setFar(!far);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar
          onToggleDarkMode={handleToggleDarkMode}
          darkMode={darkMode}
          onFarMode={handleFarMode}
          far={far}
        />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home far={far} handleFarMode={handleFarMode} />}
            />
            <Route
              path="/home"
              element={<Home far={far} handleFarMode={handleFarMode} />}
            />
            <Route
              path="/favorites"
              element={<Favorites far={far} handleFarMode={handleFarMode} />}
            />
            <Route
              path="*"
              element={<Home far={far} handleFarMode={handleFarMode} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
