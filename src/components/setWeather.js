const API_KEY = process.env.REACT_APP_API_KEY;
async function setWeather(locationKey) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com//currentconditions/v1/${locationKey}?apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    const answer = json[0];
    const final = {
      far: answer.Temperature.Imperial.Value,
      cel: answer.Temperature.Metric.Value,
      text: answer.WeatherText,
      icon: answer.WeatherIcon,
      rain: answer.HasPrecipitation,
    };
    return final;
  } catch (error) {
    console.error(error);
  }
}
export default setWeather;
