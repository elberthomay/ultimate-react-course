import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import Question from "./Question";
export default function Test({ questions, score, addScore, endTest }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);

  function handleNextQuestion() {
    if (currentQuestion + 1 === questions.length) endTest();
    else {
      setCurrentQuestion((q) => q + 1);
      setAnswered(false);
    }
  }
  return (
    <>
      <ProgressBar
        score={score}
        currentQuestion={currentQuestion}
        questions={questions}
      />
      <Question
        key={currentQuestion}
        exam={questions[currentQuestion]}
        answered={answered}
        onAnswer={() => setAnswered(true)}
        onCorrect={addScore}
      />
      <Timer initialTime={300000} onTimeout={() => endTest()} />
      {answered && <button onClick={handleNextQuestion}>Next</button>}
    </>
  );
}
