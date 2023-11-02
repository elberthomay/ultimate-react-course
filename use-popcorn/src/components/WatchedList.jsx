export default function WatchedList({
  watched,
  onSelectMovie,
  onDeleteWatched,
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onSelectMovie, onDeleteWatched }) {
  const handleDeleteWatched = (e) => {
    e.stopPropagation();
    onDeleteWatched(movie.imdbID);
  };
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={handleDeleteWatched}>
          X
        </button>
      </div>
    </li>
  );
}
