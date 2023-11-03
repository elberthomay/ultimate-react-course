import React from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: weather,
    } = this.props.weather;
    return (
      <>
        {`Weather for ${this.props.place}`}
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              max={max[i]}
              min={min[i]}
              weather={weather[i]}
              date={date}
              isToday={i === 0}
            />
          ))}
        </ul>
      </>
    );
  }
}

class Day extends React.Component {
  render() {
    const { max, min, date, weather, isToday } = this.props;
    const weatherIcon = getWeatherIcon(weather);
    const day =
      formatDay(date) !== formatDay(new Date().toDateString())
        ? formatDay(date)
        : "Today";
    return (
      <li className="day">
        <p>{isToday ? "Today" : formatDay(date)}</p>

        <span>{weatherIcon}</span>
        <p>
          {min}&deg; &mdash; {max}&deg;
        </p>
      </li>
    );
  }
}
