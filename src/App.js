import { useEffect, useState } from "react";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { Grid, Box, Link } from '@mui/material';
import { FaGithub } from 'react-icons/fa';  // Import GitHub icon from react-icons

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const localTime = new Date();
    const gmtPlus530Time = new Date(localTime.getTime() + (330 * 60000)); // GMT+5:30
    setTime(gmtPlus530Time);
  }, []);
  

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setIsLoading(true);  // Set loading state to true when fetching data
    setError(null); // Reset error

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again later."); // Handle error
      })
      .finally(() => {
        setIsLoading(false);  // Set loading state to false once the fetch is done
      });
  };

  return (
    <div className="bg-gradient-to-b from-teal-500 to-blue-700 text-white min-h-screen py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap mb-8">
        <h1 className="text-3xl font-bold text-center w-full sm:w-auto">Weather Forecast</h1>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            underline="none"
          >
            <FaGithub
              style={{
                fontSize: '26px',
                color: 'white',
                transition: 'color 0.3s',
              }}
              className="hover:text-blue-400"
            />
          </Link>
          <p className="text-sm">{time.toUTCString()}</p>
        </div>
      </div>


      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Search onSearchChange={handleOnSearchChange} />
        </Grid>
      </Grid>

      {/* Loading or Error Messages */}
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Weather Information */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;