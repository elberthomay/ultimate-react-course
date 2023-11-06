// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message";
import useUrlLocation from "../hooks/useUrlLocation";
import useFetch from "../hooks/useFetch";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const {
    cities: { fetchCities },
  } = useCities();

  const [revgeoIsLoading, revgeoError, revgeo, fetchRevgeo] = useFetch(
    (fetchData) => (lat, lng) =>
      fetchData({
        url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      }),
    {}
  );

  const [addIsLoading, addError, addedCity, addCity] = useFetch(
    (fetchData) => (newCity) => {
      fetchData({
        url: "http://localhost:8000/cities",
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
    },
    null
  );

  const [lat, lng, setSearchParam] = useUrlLocation();

  useEffect(() => {
    if (lat && lng) fetchRevgeo(lat, lng);
  }, [lat, lng]);

  useEffect(() => {
    if (addedCity) {
      fetchCities();
      navigate("/app/cities");
    }
  }, [addedCity]);

  useEffect(() => {
    setCityName(revgeo?.city ?? "");
    setCountry(revgeo?.countryName ?? "");
    setEmoji(revgeo?.countryCode ? convertToEmoji(revgeo?.countryCode) : "");
  }, [revgeo]);

  function handleAddCity(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date: date.toISOString(),
      notes,
      position: { lat, lng },
    };
    addCity(newCity);
  }

  return (
    <>
      {(!lat || !lng) && (
        <Message message="select a point by clicking on the map" />
      )}
      {lat && lng && (
        <>
          {emoji ? (
            <form
              className={`${styles.form} ${addIsLoading ? styles.loading : ""}`}
              onSubmit={handleAddCity}
            >
              <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                  id="cityName"
                  onChange={(e) => setCityName(e.target.value)}
                  value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
              </div>

              <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                {/* <input
                  id="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                /> */}
                <ReactDatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="notes">
                  Notes about your trip to {cityName}
                </label>
                <textarea
                  id="notes"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                />
              </div>

              <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
              </div>
            </form>
          ) : (
            <Message message="looks like it's not a city, try clicking at another spot!" />
          )}
        </>
      )}
    </>
  );
}

export default Form;
