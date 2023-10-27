import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="close" onClick={toggleIsOpen}>
        X
      </div>
      {<Steps isOpen={isOpen} />}
    </>
  );
}

function Steps({ isOpen }) {
  const [step, setStep] = useState(0);

  const incrStep = () => setStep((prev) => (prev + 1) % 3);
  const decrStep = () => setStep((prev) => (prev - 1 + 3) % 3);

  return (
    isOpen && (
      <div className="steps">
        <div className="numbers">
          <div className={step >= 0 ? "active" : ""}>1</div>
          <div className={step >= 1 ? "active" : ""}>2</div>
          <div className={step >= 2 ? "active" : ""}>3</div>
        </div>
        <div className="message">{`Step ${step + 1}: ${messages[step]}`}</div>
        <div className="buttons">
          <button
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
            className="btn"
            onClick={decrStep}
          >
            Previous
          </button>
          <button
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
            className="btn"
            onClick={incrStep}
          >
            Next
          </button>
        </div>
      </div>
    )
  );
}
