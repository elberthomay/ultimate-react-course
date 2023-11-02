import { useEffect } from "react";

export default function useKey(key, callback) {
  useEffect(() => {
    const eventFunction = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };
    document.addEventListener("keydown", eventFunction);
    return () => document.removeEventListener("keydown", eventFunction);
  }, [callback, key]);
}
