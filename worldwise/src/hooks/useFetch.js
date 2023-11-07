import { useCallback, useState } from "react";

const defaultCallback = (data) => data;

//WARNING! inputFunction and callback must be stable or will result in infinite loop!
//remove from component or use useCallback.
export default function useFetch(
  inputFunction = (fetchData) => () => ({
    url: "",
    method: "GET",
    body: undefined,
  }),
  initialData = null,
  callback = defaultCallback,
  signal = undefined
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);

  const fetchData = useCallback(
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
    },
    [callback]
  );

  const outputFunction = useCallback(inputFunction(fetchData), [
    fetchData,
    inputFunction,
  ]);

  return [isLoading, error, data, outputFunction];
}
