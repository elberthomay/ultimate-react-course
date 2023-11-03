import { useEffect, useState } from "react";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function useWeather(location) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState("");

  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchWeather() {
    console.log(location.length);
    if (location.length < 2) {
      setWeather(null);
      setPlace("");
      return;
    }
    setIsLoading(true);
    try {
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
        { signal }
      );
      if (!geoRes.ok) throw new Error("FetchError");
      const geoData = await geoRes.json();
      //   console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      setPlace(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
        { signal }
      );
      if (!geoRes.ok) throw new Error("FetchError");
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);

      setError(null);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (error && !isLoading) {
      const intervalId = setInterval(() => {
        fetchWeather();
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [error, isLoading]);

  useEffect(() => {
    console.log("trigger");
    fetchWeather();
    return () => controller.abort();
  }, [location]);

  return [weather, place, isLoading, error];
}
