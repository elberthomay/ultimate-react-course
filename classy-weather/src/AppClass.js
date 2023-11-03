import React from "react";
import Weather from "./WeatherClass";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// function formatDay(dateStr) {
//   return new Intl.DateTimeFormat("en", {
//     weekday: "short",
//   }).format(new Date(dateStr));
// }

export default class App extends React.Component {
  state = {
    location: "",
    isLoading: false,
    weather: {},
    place: "",
  };

  fetchWeather = async () => {
    const location = this.state.location;
    if (location.length < 2) return this.setState({ weather: {} });
    this.setState({ isLoading: true });
    try {
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        place: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({
        weather: weatherData.daily,
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    let initialLocation = localStorage.getItem("location");
    if (initialLocation === null) {
      localStorage.setItem("location", "");
      initialLocation = localStorage.getItem("location");
    }
    this.setState({ location: initialLocation });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      localStorage.setItem("location", this.state.location);
      this.fetchWeather();
    }
  }

  render() {
    const { location, weather, isLoading, place } = this.state;
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search from Location"
            value={location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading &&
          (weather?.weathercode ? (
            <Weather weather={weather} place={place} />
          ) : (
            ""
          ))}
      </div>
    );
  }
}
