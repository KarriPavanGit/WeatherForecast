import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <div className="flex flex-col lg:flex-row gap-4">
  {/* Forecast Component */}
  <div className="flex-grow p-4 bg-gray-100 bg-opacity-70 rounded-xl shadow-lg">
    <label className="block text-3xl font-bold text-gray-900 mb-6">Weekly Forecast</label>
    <Accordion allowZeroExpanded>
      {data.list.slice(0, 7).map((item, idx) => (
        <AccordionItem
          key={idx}
          className="border border-gray-300 rounded-xl mb-4 bg-transparent bg-white  backdrop-blur-lg"
        >
          <AccordionItemHeading>
            <AccordionItemButton className="flex justify-between  items-center p-6 hover:bg-gray-200 hover:border border-black rounded-xl transition">
              <div className="flex items-center space-x-6">
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  className="w-14 h-14"
                  alt="weather"
                />
                <div>
                  <label className="block text-lg font-medium text-gray-900">
                    {forecastDays[idx]}
                  </label>
                  <label className="block text-sm text-gray-500 capitalize">
                    {item.weather[0].description}
                  </label>
                </div>
              </div>
              <label className="text-lg font-bold text-gray-900">
                {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
              </label>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="p-6 bg-white bg-transparent backdrop-blur-lg rounded-xl">
            <div className="grid grid-cols-2 gap-6 text-gray-900">
              <div>
                <label className="block font-medium">Pressure:</label>
                <label>{item.main.pressure} hPa</label>
              </div>
              <div>
                <label className="block font-medium">Humidity:</label>
                <label>{item.main.humidity}%</label>
              </div>
              <div>
                <label className="block font-medium">Clouds:</label>
                <label>{item.clouds.all}%</label>
              </div>
              <div>
                <label className="block font-medium">Wind speed:</label>
                <label>{item.wind.speed} m/s</label>
              </div>
              <div>
                <label className="block font-medium">Sea level:</label>
                <label>{item.main.sea_level} m</label>
              </div>
              <div>
                <label className="block font-medium">Feels like:</label>
                <label>{item.main.feels_like}°C</label>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</div>
  );
};

export default Forecast;
