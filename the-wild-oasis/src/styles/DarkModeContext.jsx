import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );
  const toggle = () => setDarkMode((darkMode) => !darkMode);

  useEffect(() => {
    const classToAdd = darkMode ? "dark-mode" : "light-mode";
    const classToRemove = darkMode ? "light-mode" : "dark-mode";
    document.documentElement.classList.add(classToAdd);
    document.documentElement.classList.remove(classToRemove);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const value = useContext(DarkModeContext);
  if (value === undefined)
    throw new Error("DarkModeContext accessed outside scope");
  else return value;
}
