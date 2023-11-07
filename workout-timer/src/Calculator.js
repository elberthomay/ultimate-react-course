import { memo, useCallback, useEffect, useReducer, useState } from "react";
import clickSound from "./ClickSound.m4a";

function calculateDuration(number, sets, speed, durationBreak) {
  return (number * sets * speed) / 60 + (sets - 1) * durationBreak;
}

function reducer(state, action) {
  const { number, sets, speed, durationBreak, duration } = state;
  const { type, payload } = action;
  switch (type) {
    case "setNumber":
      return {
        ...state,
        number: payload,
        duration: calculateDuration(payload, sets, speed, durationBreak),
      };
    case "setSets":
      return {
        ...state,
        sets: payload,
        duration: calculateDuration(number, payload, speed, durationBreak),
      };
    case "setSpeed":
      return {
        ...state,
        speed: payload,
        duration: calculateDuration(number, sets, payload, durationBreak),
      };
    case "setDurationBreak":
      return {
        ...state,
        durationBreak: payload,
        duration: calculateDuration(number, sets, speed, payload),
      };
    case "incDuration":
      return {
        ...state,
        duration: duration + 1,
      };
    case "decDuration":
      return {
        ...state,
        duration: duration < 1 ? 0 : duration - 1,
      };

    default:
      break;
  }
}

const playSound = function (allowSound) {
  if (!allowSound) return;
  const sound = new Audio(clickSound);
  sound.play();
};

const initialState = (workouts) => ({
  number: workouts.at(0).numExercises,
  sets: 3,
  speed: 90,
  durationBreak: 5,
  duration: calculateDuration(workouts.at(0).numExercises, 3, 90, 5),
});

function Calculator({ workouts, allowSound }) {
  const [state, dispatch] = useReducer(reducer, initialState(workouts));
  const { number, sets, speed, durationBreak, duration } = state;
  // const [number, setNumber] = useState(workouts.at(0).numExercises);
  // const [sets, setSets] = useState(3);
  // const [speed, setSpeed] = useState(90);
  // const [durationBreak, setDurationBreak] = useState(5);

  // const [duration, setDuration] = useState(calculateDuration);
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const handleInc = () => {
    playSound(allowSound);
    dispatch({ type: "incDuration" });
  };

  const handleDec = () => {
    playSound(allowSound);
    dispatch({ type: "decDuration" });
  };
  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select
            value={number}
            onChange={(e) =>
              dispatch({ type: "setNumber", payload: Number(e.target.value) })
            }
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => {
              playSound(allowSound);
              dispatch({ type: "setSets", payload: Number(e.target.value) });
            }}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => {
              playSound(allowSound);
              dispatch({ type: "setSpeed", payload: Number(e.target.value) });
            }}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => {
              playSound(allowSound);
              dispatch({
                type: "setDurationBreak",
                payload: Number(e.target.value),
              });
            }}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
