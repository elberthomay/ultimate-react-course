export default function ProgressBar({
  score,
  currentQuestion,
  answered,
  questionCount,
  maxScore,
}) {
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
