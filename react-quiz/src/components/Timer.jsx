import { useEffect, useState } from "react";

export default function Timer({ initialTime, onTimeout }) {
  const [time, setTime] = useState(initialTime);
  const timeInSecond = time / 1000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => time - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      onTimeout();
    }, time);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="timer">
      {Math.floor(timeInSecond / 60)
        .toString()
        .padStart(2, "0")}{" "}
      : {timeInSecond % 60}
    </div>
  );
}
