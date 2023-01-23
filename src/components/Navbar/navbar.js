import { Home, Favorite, LightMode, DarkMode } from "@mui/icons-material";
import { Button } from "@mui/material";

import "./navbar.css";

function Navbar({ onToggleDarkMode, darkMode, onFarMode, far }) {
  return (
    <div className="nav">
      <div className="links">
        <Button href="/home" variant="contained">
          <Home />
        </Button>
        <Button href="/favorites" variant="contained">
          <Favorite />
        </Button>
        <Button onClick={onToggleDarkMode} variant="outlined">
          {darkMode ? <DarkMode /> : <LightMode />}
        </Button>
        <Button onClick={onFarMode} variant="outlined">
          {far ? "°F" : "°C"}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
