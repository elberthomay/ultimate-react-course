import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

function CityList() {
  const {
    cities: { isLoading, cities, fetchCities },
  } = useCities();

  const [deleteIsLoading, deleteError, deletedCity, deleteCity] = useFetch(
    (fetchData) => (id) => {
      fetchData({
        url: `http://localhost:8000/cities/${id}`,
        method: "DELETE",
        // body: JSON.stringify(newCity),
        // headers: { "Content-Type": "application/json" },
      });
    },
    null
  );

  useEffect(() => {
    if (deletedCity) {
      fetchCities();
    }
  }, [deletedCity]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {cities.length === 0 ? (
            <Message message="add your first city by clicking on the map" />
          ) : (
            <ul className={styles.cityList}>
              {cities.map((city) => (
                <CityItem city={city} key={city.id} onDelete={deleteCity} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default CityList;
