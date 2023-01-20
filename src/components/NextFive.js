const API_KEY = process.env.REACT_APP_API_KEY;

async function NextFive(locationKey) {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    const answer = json.DailyForecasts;
    console.log(answer);
    const final = answer.map((each) => ({
      date: new Date(each.Date).toLocaleDateString("il-IL", {
        weekday: "long",
      }),
      dayF: each.Temperature.Maximum.Value,
      dayC: ((each.Temperature.Maximum.Value - 32) * 5) / 9,
      dayRain: each.Day.HasPrecipitation,
      dayIcon: each.Day.Icon,
      dayText: each.Day.IconPhrase,
      nightF: each.Temperature.Minimum.Value,
      nightC: ((each.Temperature.Minimum.Value - 32) * 5) / 9,
      nightRain: each.Night.HasPrecipitation,
      nightIcon: each.Night.Icon,
      nightText: each.Night.IconPhrase,
    }));
    return final;
  } catch (error) {
    console.error(error);
  }
}

export default NextFive;
