function StartScreen({ questionCount, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{questionCount} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onStart}>
        Start
      </button>
    </div>
  );
}

export default StartScreen;
