import { useState } from "react";
import useWeather from "./hooks/useWeather";
import Weather from "./components/Weather";

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, place, isLoading, error] = useWeather(location);
  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <div className="">
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search from Location"
        />
      </div>
      {isLoading && <p className="loader">Loading...</p>}
      {!isLoading && error && <p className="loader">{error}</p>}
      {!isLoading &&
        !error &&
        (weather ? <Weather weatherData={weather} place={place} /> : null)}
    </div>
  );
}
