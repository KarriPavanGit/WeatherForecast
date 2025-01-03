import React from "react";

const CurrentWeather = ({ data }) => {
  return (
    <div className="bg-gray-100 bg-opacity-90 text-black rounded-xl shadow-lg p-6 max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl font-bold text-gray-900">{data.city}</p>
          <p className="text-sm text-gray-600 capitalize">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="w-16 h-16"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="text-center">
        <p className="text-5xl font-extrabold text-gray-900">
          {Math.round(data.main.temp)}°C
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Feels like {Math.round(data.main.feels_like)}°C
        </p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Wind</p>
          <p className="text-lg font-semibold text-gray-900">{data.wind.speed} m/s</p>
        </div>
        <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-lg font-semibold text-gray-900">{data.main.humidity}%</p>
        </div>
        <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Pressure</p>
          <p className="text-lg font-semibold text-gray-900">{data.main.pressure} hPa</p>
        </div>
        <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Clouds</p>
          <p className="text-lg font-semibold text-gray-900">{data.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
