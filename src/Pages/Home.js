import { useEffect, useState } from "react";
import setWeather from "../components/setWeather";
import NextFive from "../components/NextFive";
import React from "react";
import "./Home.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Stack } from "@mui/material";
import { Favorite } from "@mui/icons-material";

function Home({ far }) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState({
    Key: "215854",
    Type: "City",
    LocalizedName: "Tel Aviv",
  });
  const [current, setCurrent] = useState({});
  const [fiveDays, setFiveDays] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (input) {
      try {
        fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${
            input}`
        )
          .then((resp) => resp.json())
          .then((json) => {
            setOptions(json);
            setError(null);
          })
          .catch(function (error) {
            console.log(`We got the error ${error}`);
            setError(error);
          });
      } catch (err) {
        setError(true);
      }
    }
  }, [input, API_KEY]);

  useEffect(() => {
    setWeather(String(city.Key))
      .then((weatherData) => {
        setCurrent({
          far: weatherData.far,
          cel: weatherData.cel,
          icon: weatherData.icon,
          rain: weatherData.rain,
          text: weatherData.text,
        });
      })
      .catch(function (error) {
        console.log(`We got the error ${error}`);
        setError(true);
      });
  }, [city]);

  useEffect(() => {
    if (city?.Key) {
      NextFive(String(city.Key)).then((fiveDays) => {
        setFiveDays(fiveDays);
      });
    }
  }, [city]);

  const updateInput = (event, newValue) => {
    if (event) {
      setInput(event.target.value);
    } else {
      setInput(newValue);
    }
  };

  const changeCity = (event, value) => {
    setCity(value);
    setOptions([]);
  };

  const addToFavorites = (e) => {
    let favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
    if (favorites.length < 5) {
      if (Object.keys(city).length > 0) {
        if (
          !favorites.some(
            (favCity) => favCity.LocalizedName === city?.LocalizedName
          )
        ) {
          favorites.push(city);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        } else {
          setShowAlert(true);
        }
      } else {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  };

  const handleClose = (e) => {
    setShowAlert(false);
  };

  return (
    <div>
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            There is an error with the server, hang tight!
          </Alert>
        </Snackbar>
      )}
      <Stack spacing={2} sx={{}}>
        <Autocomplete
          freeSolo
          className="search"
          onChange={changeCity}
          options={options}
          getOptionLabel={(option) => String(option.LocalizedName)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a City"
              variant="outlined"
              fullWidth
              onChange={updateInput}
            />
          )}
        />
      </Stack>
      {showAlert && (
        <Snackbar open autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            You can add up to 5 different places to favorites!
          </Alert>
        </Snackbar>
      )}
      <br />
      <br />
      <div className="upperScreen">
        <Card sx={{ maxwidth: 450, padding: 3 }} className="card">
          <Button onClick={addToFavorites}>
            {error ? "" : `Add ${city?.LocalizedName} to Favorites`} <Favorite />
          </Button>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
              {error
                ? "There is a error with the server, hang tight!"
                : `The current weather in ${city?.LocalizedName}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {error ? "" : `The current weather in ${city?.LocalizedName}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {error
                ? ""
                : `${far ? `${current.far} °F` : `${current.cel} °C`}`}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {error ? "" : `${current.rain ? "Rainning" : ""}`}{" "}
            </Typography>
          </CardContent>
        </Card>
        <img
          size="small"
          src={error ? `icons/34.svg` : `icons/${current.icon}.svg`}
          alt={error ? "error" : current.text}
        />
      </div>
      <div className="weather-container">
        {fiveDays &&
          fiveDays.map((day, index) => (
            <div className="eachDay">
              <Card sx={{ width: 200, mb: 0 }} className="card">
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }} component="div">
                    {day.date ? `${day.date}` : "loading..."}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {far ? `${day.dayF} °F` : `${Math.round(day.dayC)} °C`}
                    <br />
                    {day.dayRain ? `Rainning` : ``}
                    <br />
                    {day.dayText ? `${day.dayText}` : ``}
                    <br />
                    <Avatar
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                      size="small"
                      src={`icons/${day.dayIcon}.svg`}
                      alt={day.dayText}
                    />
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: 200, mt: 0.5 }} className="card">
                <CardContent>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {far ? `${day.nightF} °F` : `${Math.round(day.nightC)} °C`}

                    <br />
                    <Avatar
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                      src={`icons/${day.nightIcon}.svg`}
                      alt={day.NightText}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
