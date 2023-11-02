import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StarRating from "./StarRating";
import useKey from "../hooks/useKey";

const ombdKey = "1df19dd5";
const omdbUrl = `http://www.omdbapi.com/?apikey=${ombdKey}&`;

export default function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
  onUpdateRating,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {
    Title: null,
    Year: null,
    Poster: null,
    Runtime: null,
    imdbRating: null,
    Plot: null,
    Released: null,
    Actors: null,
    Director: null,
    Genre: null,
  };

  const isWatched = watched.find((movie) => movie.imdbID === selectedId);

  const decisionCount = useRef(isWatched?.decisionCount ?? 0);

  async function fetchMovie() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await fetch(omdbUrl + `i=${selectedId}`);
        if (res.ok) {
          const data = await res.json();
          setError(false);
          setMovie(data);
        } else throw new Error("Fetch error");
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleAddMovie = () => {
    onAddWatched({
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: parseInt(runtime),
      imdbRating: parseFloat(imdbRating),
      userRating: rating,
      decisionCount: decisionCount.current,
    });
    onCloseMovie();
  };

  const handleSetRating = (rating) => {
    setRating(rating);
    decisionCount.current++;
    if (isWatched) onUpdateRating(selectedId, rating);
  };

  useEffect(() => {}, [rating]);

  useEffect(() => {
    fetchMovie();
  }, [selectedId]);

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    if (!title) return;
    document.title = `MOVIE: ${title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    if (error && !isLoading) {
      const intervalId = setInterval(() => {
        fetchMovie();
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [error, isLoading]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && error && <Error />}
      {!isLoading && !error && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size="24"
                defaultRating={isWatched ? isWatched.userRating : null}
                onSetRating={handleSetRating}
              />
              {!isWatched ? (
                <button className="btn-add" onClick={handleAddMovie}>
                  + Add to list
                </button>
              ) : (
                <p> You have added this movie to your watched list</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
