import { useState } from "react";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather.js";
import Forecast from "./components/Forecast.js";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
  <Search onSearchChange={handleOnSearchChange} />
  {currentWeather && <CurrentWeather data={currentWeather} />}
  {forecast && <Forecast data={forecast} />}
</div>

  );
}

export default App;