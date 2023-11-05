import { useState } from "react";

export default function useFetch(
  url,
  initialData = null,
  callback = (data) => data,
  signal = undefined
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setData(callback(data));
      } else throw new Error("FetchError");
    } catch (err) {
      if (err.name !== "AbortError") setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return [isLoading, error, data, fetchData];
}
