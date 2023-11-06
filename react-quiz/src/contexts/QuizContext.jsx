import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  score: 0,
  highScore: 0,
  index: 0,
  answered: false,
};

function reducer(state, action) {
  const { questions, score, highScore, index } = state;
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

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [started, setStarted] = useState(false);
  // const [ended, setEnded] = useState(false);

  const { status, questions, index } = state;

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

  const questionCount = questions.length;
  const maxScore = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

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
  return (
    <QuizContext.Provider
      value={{
        ...state,
        questionCount,
        maxScore,
        handleStartTest,
        handleAddScore,
        handleAnswer,
        handleNextQuestion,
        handleEndTest,
        handleReturn,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("QuizContext used outside scope");
  return context;
}
