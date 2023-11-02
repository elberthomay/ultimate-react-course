import { useEffect, useState } from "react";

const ombdKey = "1df19dd5";
const omdbUrl = `http://www.omdbapi.com/?apikey=${ombdKey}&`;

export default function useMovies(callback = () => {}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchMovies() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await fetch(omdbUrl + `s=${query}`, { signal });
        if (res.ok) {
          const data = await res.json();
          setError(false);
          setMovies(data.Search ?? []);
        } else throw new Error("Fetch error");
      } catch (e) {
        if (e.name !== "AbortError") setError(true);
      } finally {
        callback();
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchMovies(), 800);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    if (error && !isLoading) {
      const intervalId = setInterval(() => {
        console.log(isLoading);
        fetchMovies();
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [error, isLoading]);

  return [query, movies, isLoading, error, setQuery];
}
