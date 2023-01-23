const API_KEY = process.env.REACT_APP_API_KEY;

const getUserLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (location) => resolve(location),
      (error) => {
        reject(error);
        console.error("Current Position Error: " + error.message);
      }
    );
  });

async function getCurrentLocation() {
  try {
    const location = await getUserLocation();
    if (!location) return;

    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${location.coords.latitude},${location.coords.longitude}`
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export default getCurrentLocation;
