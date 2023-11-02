import { useState } from "react";
import Summary from "./components/Summary";
import MovieList from "./components/MovieLIst";
import NavBar from "./components/structures/NavBar";
import WatchedList from "./components/WatchedList";
import SearchBar from "./components/SearchBar";
import MovieCount from "./components/MovieCount";
import Logo from "./components/Logo";
import Main from "./components/structures/Main";
import ListBox from "./components/structures/ListBox";
import Loader from "./components/Loader";
import Error from "./components/Error";
import MovieDetails from "./components/MovieDetails";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [query, movies, isLoading, error, setQuery] =
    useMovies(handleCloseMovie);
  const [watched, setWatched] = useLocalStorage("watched", []);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) =>
    setSelectedId(id === selectedId ? null : id);

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched([...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  };

  const handleUpdateRating = (id, userRating) => {
    setWatched(
      watched.map((movie) =>
        movie.imdbID === id
          ? { ...movie, userRating, decisionCount: movie.decisionCount + 1 }
          : movie
      )
    );
  };

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <MovieCount movies={movies} />
      </NavBar>

      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && error && <Error />}
          {!isLoading &&
            !error &&
            (query.length > 2 && movies.length === 3 ? (
              <p className="error"> No movie is found!</p>
            ) : (
              <MovieList
                movies={movies}
                handleSelectMovie={handleSelectMovie}
                selectedId={selectedId}
              />
            ))}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onUpdateRating={handleUpdateRating}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onSelectMovie={handleSelectMovie}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
