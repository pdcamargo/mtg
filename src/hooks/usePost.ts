import { useState, useEffect, useCallback } from "react";
import axios from "axios";

type LoadingState = "idle" | "fetching" | "resolved" | "error";

const usePost = <T>(
  path: string,
): [
  T | undefined,
  LoadingState,
  (body?: Record<string, unknown>) => Promise<void>,
] => {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [loadedData, setData] = useState<T>();

  const sendPostRequest = useCallback(
    async (body?: Record<string, unknown>) => {
      if (loadingState === "fetching") {
        return;
      }

      setLoadingState("fetching");

      const { data } = await axios.post<T>(path, body);

      setData(data);
      setLoadingState("resolved");
    },
    [loadingState],
  );

  return [loadedData, loadingState, sendPostRequest];
};

export default usePost;
