function FinishedScreen({ score, highScore, maxScore, onReset }) {
  const percentage = Math.ceil((score / maxScore) * 100);
  let emoji;
  if (percentage === 100) emoji = "🤩";
  else if (percentage > 80) emoji = "🤑";
  else if (percentage > 60) emoji = "😮‍💨";
  else if (percentage > 40) emoji = "🤮";
  else if (percentage > 20) emoji = "🤢";
  else emoji = "💩";

  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxScore} ({percentage}%)
        {emoji}
      </p>
      <p className="highscore">Highscore: {highScore} points</p>
      <button className="btn btn-ui" onClick={onReset}>
        Try Again
      </button>
    </>
  );
}

export default FinishedScreen;
