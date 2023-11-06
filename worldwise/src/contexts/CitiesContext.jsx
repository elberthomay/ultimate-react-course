import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const CitiesContext = createContext();

export function CitiesProvider({ children }) {
  const [citiesIsLoading, citiesError, cities, fetchCities] = useFetch(
    (fetchData) => () => fetchData({ url: "http://localhost:8000/cities" }),
    []
  );

  const [currentCityIsLoading, currentCityError, currentCity, getcurrentCity] =
    useFetch(
      (fetchData) => (id) =>
        fetchData({ url: `http://localhost:8000/cities/${id}` }),
      null
    );

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities: {
          isLoading: citiesIsLoading,
          error: citiesError,
          cities,
          fetchCities,
        },
        currentCity: {
          isLoading: currentCityIsLoading,
          error: currentCityError,
          currentCity,
          getcurrentCity,
        },
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context used outside scope");
  return context;
}
