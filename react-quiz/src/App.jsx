import { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import Main from "./components/structural/Main";
import StartScreen from "./components/StartScreen";
import ProgressBar from "./components/ProgressBar";
import Question from "./components/Question";
import Timer from "./components/Timer";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/structural/Footer";

const initialState = {
  questions: [],
  status: "loading",
  score: 0,
  highScore: 0,
  index: 0,
  answered: false,
};

function reducer(state, action) {
  const { questions, status, score, highScore, index } = state;
  const { type, payload = undefined } = action;
  switch (type) {
    case "load":
      return { ...state, status: "loading" };
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "errorOccured":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "started" };
    case "addScore":
      return { ...state, score: score + payload };
    case "answer":
      return { ...state, answered: true };
    case "nextQuestion":
      return index + 1 !== questions.length
        ? { ...state, index: index + 1, answered: false }
        : index;
    case "endQuiz":
      return {
        ...state,
        status: "ended",
        highScore: score > highScore ? score : highScore,
      };
    case "resetQuiz":
      return { ...initialState, questions, status: "ready", highScore };
    default:
      break;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [started, setStarted] = useState(false);
  // const [ended, setEnded] = useState(false);

  const { status, questions, score, highScore, index, answered } = state;
  console.log(questions);

  async function fetchQuestions() {
    dispatch({ type: "load" });
    try {
      const res = await fetch("http://localhost:8000/questions");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } else throw new Error("FetchError");
    } catch (err) {
      if (err.name !== "AbortError") dispatch({ type: "errorOccured" });
    }
  }

  const handleStartTest = () => dispatch({ type: "startQuiz" });

  const handleAnswer = () =>
    index + 1 === questions.length
      ? handleEndTest()
      : dispatch({ type: "answer" });

  const handleAddScore = (point) =>
    dispatch({ type: "addScore", payload: point });

  const handleNextQuestion = () => dispatch({ type: "nextQuestion" });

  const handleEndTest = () => dispatch({ type: "endQuiz" });

  const handleReturn = () => dispatch({ type: "resetQuiz" });

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (status === "error") {
      const intervalId = setInterval(() => {
        fetchQuestions();
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [status]);

  const maxScore = questions.reduce((sum, { points }) => sum + points, 0);

  return (
    <div className="app">
      <Header />
      {status === "loading" && <p className="loader"></p>}
      {status === "error" && <p className="error">error has occured</p>}
      <Main>
        {status === "ready" && (
          <StartScreen
            questionCount={questions.length}
            onStart={handleStartTest}
          />
        )}
        {status === "started" && (
          <>
            {/* <Test
            questions={questions}
            score={score}
            scorePerQuestion={15}
            addScore={(s) => dispatch({ type: "addScore", payload: s })}
            endTest={handleEndTest}
          /> */}
            <ProgressBar
              score={score}
              currentQuestion={index}
              answered={answered}
              questionCount={questions.length}
              maxScore={maxScore}
            />
            <Question
              key={index}
              exam={questions[index]}
              answered={answered}
              onAnswer={handleAnswer}
              onCorrect={handleAddScore}
            />
            <Footer>
              <Timer
                initialTime={questions.length * 30000}
                onTimeout={handleEndTest}
              />
              {answered && (
                <button className="btn btn-ui" onClick={handleNextQuestion}>
                  Next
                </button>
              )}
            </Footer>
          </>
        )}
        {status === "ended" && (
          <FinishedScreen
            score={score}
            highScore={highScore}
            maxScore={maxScore}
            onReset={handleReturn}
          />
        )}
      </Main>
    </div>
  );
}
