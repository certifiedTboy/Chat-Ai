import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";

interface HttpState<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
}

export function useHttp<TResponse = unknown, TPayload = unknown>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const handleRequest = async (
    endpoint: string,
    method: HttpMethod,
    withCredentials: RequestCredentials = "same-origin",
    payload?: TPayload,
    headers: HeadersInit = {
      "Content-Type": "application/json",
    },
  ): Promise<TResponse> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        credentials: withCredentials,
        headers,
        body: payload ? JSON.stringify(payload) : undefined,
      });

      const result: TResponse & { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Something went wrong!");
      }

      setData(result);

      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong!";

      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return [
    handleRequest,
    {
      isLoading,
      error,
      data,
    } satisfies HttpState<TResponse>,
  ] as const;
}
