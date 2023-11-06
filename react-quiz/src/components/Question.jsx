import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Question() {
  const { questions, index, answered, handleAnswer, handleAddScore } =
    useQuiz();
  const { question, options, correctOption, points } = questions[index];

  function handleSelect(option) {
    if (option === correctOption) handleAddScore(points);
    handleAnswer();
  }
  return (
    <div>
      <h4>{question}</h4>
      <div className="options">
        {options.map((option, index) => (
          <Option
            key={option}
            option={option}
            onSelect={() => handleSelect(index)}
            answered={answered}
            isCorrect={index === correctOption}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ option, onSelect, answered, isCorrect }) {
  const [selected, setSelected] = useState(false);
  function handleSelect() {
    setSelected(true);
    onSelect();
  }
  const className = `btn btn-option ${selected ? "answer" : ""} ${
    answered && isCorrect ? "correct" : "wrong"
  }`;
  return (
    <button disabled={answered} className={className} onClick={handleSelect}>
      {option}
    </button>
  );
}
