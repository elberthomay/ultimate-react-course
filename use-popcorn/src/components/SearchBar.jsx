import { useEffect, useRef, useState } from "react";
import useKey from "../hooks/useKey";

export default function SearchBar({ query, setQuery }) {
  const inputElement = useRef(null);
  useKey("Enter", () => {
    console.log("trigger");
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });
  useEffect(() => {
    inputElement.current.focus();
  }, []);
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
    </form>
  );
}
