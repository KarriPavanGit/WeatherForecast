import React from "react";

const CurrentWeather = ({ data }) => {
  return (
    <div className="bg-white text-black rounded-lg shadow-xl p-6 max-w-lg mx-auto">
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-3xl font-bold">{data.city}</p>
        <p className="text-sm text-gray-600 capitalize">{data.weather[0].description}</p>
      </div>
      <img
        alt="weather"
        className="w-20 h-20"
        src={`icons/${data.weather[0].icon}.png`}
      />
    </div>
    <div className="text-center mb-6">
      <p className="text-6xl font-extrabold">{Math.round(data.main.temp)}°C</p>
    </div>
    <div className="bg-gray-100 rounded-lg p-6">
      <p className="text-xl font-semibold mb-4 text-gray-800">Details</p>
      <div className="flex justify-between mb-3">
        <span className="text-gray-600">Feels like</span>
        <span>{Math.round(data.main.feels_like)}°C</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-gray-600">Wind</span>
        <span>{data.wind.speed} m/s</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-gray-600">Humidity</span>
        <span>{data.main.humidity}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Pressure</span>
        <span>{data.main.pressure} hPa</span>
      </div>
    </div>
  </div>
  
  );
};

export default CurrentWeather;
