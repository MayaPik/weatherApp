import { useState, useMemo, useEffect } from "react";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  useMediaQuery,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  useEffect(() => {
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode);
    }
  }, [storedDarkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [far, setFar] = useState(false);

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
