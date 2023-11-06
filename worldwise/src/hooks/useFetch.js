import { useState } from "react";

export default function useFetch(
  inputFunction = (fetchData) => () => ({
    url: "",
    method: "GET",
    body: undefined,
  }),
  initialData = null,
  callback = (data) => data,
  signal = undefined
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);

  async function fetchData({
    url,
    method = "GET",
    body = undefined,
    headers = undefined,
  }) {
    setIsLoading(true);
    try {
      const res = await fetch(url, { method, body, headers });
      if (res.ok) {
        const data = await res.json();
        setData(callback(data));
      } else throw new Error("FetchError");
    } catch (err) {
      if (err.name !== "AbortError") setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return [isLoading, error, data, inputFunction(fetchData)];
}
