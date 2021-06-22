import { useState, useEffect, useCallback } from "react";
import axios from "axios";

type LoadingState = "idle" | "fetching" | "resolved" | "error";

type Options = {
  fetchOnInit?: boolean;
};

const useFetch = <T>(
  path: string,
  options?: Options,
): [
  T | undefined,
  LoadingState,
  (params?: Record<string, string>) => Promise<void>,
] => {
  const opt: Options = options || { fetchOnInit: false };

  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [loadedData, setData] = useState<T>();

  const fetchData = useCallback(
    async (params?: Record<string, string>) => {
      if (loadingState === "fetching") {
        return;
      }

      setLoadingState("fetching");

      const { data } = await axios.get<T>(path, { params });

      setData(data);
      setLoadingState("resolved");
    },
    [loadingState],
  );

  useEffect(() => {
    if (loadingState === "idle" && opt?.fetchOnInit) {
      fetchData();
    }
  }, [loadingState, options, fetchData]);

  return [loadedData, loadingState, fetchData];
};

export default useFetch;
