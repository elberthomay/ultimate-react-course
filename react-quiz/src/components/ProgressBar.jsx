import { useQuiz } from "../contexts/QuizContext";

export default function ProgressBar() {
  const { score, index: currentQuestion, answered, questions } = useQuiz();
  const questionCount = questions.length;
  const maxScore = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );
  return (
    <header className="progress">
      <progress max={questionCount} value={currentQuestion + answered} />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {questionCount}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </header>
  );
}
