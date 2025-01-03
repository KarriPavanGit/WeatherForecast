import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "white",
          color: "black", // Text color for the search input
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "white", // Background color for the dropdown
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? "#4A90E2" : "white", // Highlight selected option
          color: state.isSelected ? "white" : "black", // Text color for selected option
          cursor: "pointer",
        }),
        singleValue: (base) => ({
          ...base,
          color: "black", // Text color for the selected value
        }),
      }}
    />
  );
};

export default Search;