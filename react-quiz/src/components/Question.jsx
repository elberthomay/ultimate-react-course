import { useState } from "react";

export default function Question({ exam, answered, onAnswer, onCorrect }) {
  const { question, options, correctOption, points } = exam;
  function handleSelect(option) {
    if (option === correctOption) onCorrect(points);
    onAnswer();
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
