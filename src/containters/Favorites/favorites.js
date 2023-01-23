import React, { useState, useEffect } from "react";
import {
  Button,
  Avatar,
  Snackbar,
  Alert,
  Typography,
  CardContent,
  Card,
} from "@mui/material";

import setWeather from "../../actions/setWeather";
import "./Home.css";

function Favorites({ far }) {
  const [favorites, setFavorites] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let storedFavorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    let tempArr = [];
    if (favorites.length > 0) {
      favorites.forEach((city, i) => {
        try {
          setWeather(String(city.Key)).then((weatherData) => {
            if (weatherData) {
              tempArr[i] = {
                index: i,
                far: weatherData.far,
                cel: weatherData.cel,
                rain: weatherData.rain,
                icon: weatherData.icon,
                text: weatherData.text,
              };
              setTemperatures([...tempArr]);
            }
          });
        } catch (err) {
          console.log(err);
        }
      });
    }
  }, [favorites]);

  const removeFav = (index) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites(favorites);
  };

  const handleClose = (e) => {
    setError(false);
  };

  return (
    <div>
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%", top: 100 }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
      <h1 className="headline">Your favorites cities </h1>
      <div>
        <div className="weather-container">
          {favorites.map((day, index) => (
            <Card sx={{ width: 200, minHeight: 400 }} className="card">
              <CardContent>
                <Button
                  sx={{ marginBottom: 7 }}
                  className="button"
                  onClick={() => removeFav(index)}
                >
                  Remove From Favorites
                </Button>
                <Typography variant="h5" component="div">
                  {day.LocalizedName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {temperatures[index]
                    ? `${
                        far
                          ? `${temperatures[index].far} °F`
                          : `${temperatures[index].cel} °C`
                      }`
                    : ""}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {temperatures[index] ? temperatures[index].text : ""}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {temperatures[index]
                    ? `${temperatures[index].rain ? `Rainning` : ""}`
                    : ""}
                </Typography>
                <Avatar
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                  src={
                    temperatures[index]
                      ? `icons/${temperatures[index].icon}.svg`
                      : `icons/34.svg`
                  }
                  alt={
                    temperatures[index]
                      ? `icons/${temperatures[index].icon}.svg`
                      : `icons/34.svg`
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Favorites;
