import { useEffect, useState } from "react";

export default function useLocalStorage(name, initializer = null) {
  function getInitialData() {
    const initialData = JSON.parse(localStorage.getItem(name));
    if (initialData === null) {
      localStorage.setItem(name, JSON.stringify(initializer));
      return initializer;
    } else return initialData;
  }
  const [data, setData] = useState(getInitialData);
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(data));
  }, [data]);
  return [data, setData];
}
